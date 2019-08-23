import _ from 'underscore';
import cn from 'classnames';
import op from 'object-path';
import PropTypes from 'prop-types';

import React, {
    forwardRef,
    useEffect,
    useLayoutEffect as useWindowEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';

const useLayoutEffect =
    typeof window !== 'undefined' ? useWindowEffect : useEffect;

const noop = () => {};

const ENUMS = {
    STATUS: {
        COMPLETE: 'COMPLETE',
        READY: 'READY',
        SENDING: 'SENDING',
        ERROR: 'ERROR',
    },
};

/**
 * -----------------------------------------------------------------------------
 * Hook Component: WebForm
 * -----------------------------------------------------------------------------
 */
let WebForm = (props, ref) => {
    const {
        className,
        namespace,
        required,
        onBeforeSubmit,
        onComplete,
        onError,
        onSubmit,
        onUpdate,
        showError,
        validator,
        value,
        name,
        id,
        children,
        ...formProps
    } = props;

    // Refs
    const formRef = useRef();
    const stateRef = useRef({
        value,
        error: null,
        mounted: false,
        status: ENUMS.STATUS.READY,
        elements: {},
    });

    // State
    const [, setNewState] = useState(stateRef.current);

    // Internal Interface
    const setState = newState => {
        // Update the stateRef
        stateRef.current = {
            ...stateRef.current,
            ...newState,
        };

        // Trigger useEffect()
        setNewState(stateRef.current);
    };

    const getElements = () => {
        const elements = op.get(formRef, 'current.elements', {});
        const ids = Object.keys(elements).filter(key => !isNaN(key));

        setState({
            elements: ids.reduce((obj, i) => {
                const element = elements[i];
                const name = element.name;

                if (name) {
                    if (op.has(obj, name)) {
                        if (!Array.isArray(obj[name])) {
                            obj[name] = [obj[name]];
                        }
                        obj[name].push(element);
                    } else {
                        obj[name] = element;
                    }
                }

                return obj;
            }, {}),
        });
    };

    const applyValue = value => {
        value = value || stateRef.current.value;

        const elements = _.flatten(
            Object.values(stateRef.current.elements).map(element => {
                if (Array.isArray(element)) {
                    return element;
                } else {
                    return [element];
                }
            }),
        );

        Object.entries(elements).forEach(([, element]) => {
            const name = element.name;
            const type = element.type;
            const val = op.get(value, name, '');

            if (Array.isArray(val)) {
                // Checkbox & Radio
                if (['checkbox', 'radio'].includes(type)) {
                    const v = !isNaN(element.value)
                        ? Number(element.value)
                        : element.value;
                    element.checked = val.includes(v);
                }

                // Select: Multiple
                if (type === 'select-multiple') {
                    const ids = Object.keys(element.options).filter(
                        key => !isNaN(key),
                    );
                    const options = ids.map(i => element.options[i]);

                    options.forEach(option => {
                        const v = !isNaN(option.value)
                            ? Number(option.value)
                            : option.value;
                        option.selected = val.includes(v);
                    });
                }
            } else {
                element.value = val;
            }
        });

        onUpdate({ value, elements });
    };

    const update = value => {
        value = value || stateRef.current.value;
        setState({ value });
        getElements();
        applyValue(value);
    };

    // External Interface
    useImperativeHandle(ref, () => ({
        setState,
        state: stateRef.current,
        update,
    }));

    // Side Effects
    useLayoutEffect(() => {
        update(value);
    }, Object.values(value));

    const getValue = k => {
        const elements = op.get(stateRef, 'current.elements', {});
        const keys = Object.keys(elements);
        const formData = new FormData(formRef.current);
        for (const key of formData.keys()) {
            keys.push(key);
        }

        const value = keys.reduce((obj, key) => {
            let v = _.compact(_.uniq(formData.getAll(key))) || [];

            v = v.length === 1 && v.length !== 0 ? v[0] : v;
            v = v.length === 0 ? null : v;

            obj[key] = v;

            return obj;
        }, {});

        setState({ value });

        if (k) {
            return stateRef.current.value[k];
        }

        return stateRef.current.value;
    };

    const validate = value => {
        value = value || getValue();

        if (required.length < 1 && validator) {
            return validator({ value });
        }

        const errors = required.filter(k => _.isEmpty(value[k]));
        const valid = errors.length > 0 ? errors : true;

        return validator && valid !== true
            ? validator({ errors, value })
            : valid === true
            ? true
            : valid.reduce(
                  (obj, k) => {
                      if (!obj.focus) {
                          obj.focus = k;
                      }
                      if (!obj.message) {
                          obj.message = [`${k} is a required field`];
                      }

                      obj.fields.push(k);
                      obj.errors.push(`${k} is a required field`);

                      return obj;
                  },
                  { message: null, focus: null, fields: [], errors: [] },
              );
    };

    const complete = () => {
        const { value, error, status } = stateRef.current;
        onComplete({ value, error, status });
    };

    const submit = e => {
        if (e) {
            e.preventDefault();
        }

        const { status } = stateRef.current;
        if (status === ENUMS.STATUS.SENDING) {
            return;
        }

        setState({ error: null });

        const value = getValue();

        const valid = validate(value);

        onBeforeSubmit({ value, valid });

        if (valid !== true) {
            // stringify errors if they are an array.
            if (Array.isArray(op.get(valid, 'message'))) {
                valid.message = valid.message.join(', ');
            }

            setState({ error: valid });
            onError({ error: valid, value });
            return;
        }

        if (!op.has(value, 'type')) {
            value.type = id || name || 'form';
        }

        setState({ status: ENUMS.STATUS.SENDING });

        try {
            onSubmit({ value, valid });
            setState({ status: ENUMS.STATUS.COMPLETE });
        } catch (error) {
            setState({ error, status: ENUMS.STATUS.ERROR });
        }

        complete();
    };

    const render = () => {
        const cname = cn({ [className]: !!className, [namespace]: true });
        const errorMsg = op.get(stateRef, 'current.error.message');

        return (
            <form
                className={cname}
                {...formProps}
                onSubmit={submit}
                ref={formRef}>
                {errorMsg && showError === true && (
                    <div className='webform-error'>{errorMsg}</div>
                )}
                {children}
            </form>
        );
    };

    return render();
};

WebForm = forwardRef(WebForm);

WebForm.ENUMS = ENUMS;

WebForm.propTypes = {
    className: PropTypes.string,
    namespace: PropTypes.string,
    required: PropTypes.array,
    onBeforeSubmit: PropTypes.func,
    onComplete: PropTypes.func,
    onError: PropTypes.func,
    onSubmit: PropTypes.func,
    onUpdate: PropTypes.func,
    showError: PropTypes.bool,
    validator: PropTypes.func,
    value: PropTypes.object,
    name: PropTypes.string.required,
    id: PropTypes.string,
};

WebForm.defaultProps = {
    className: 'webform',
    required: [],
    onBeforeSubmit: noop,
    onComplete: noop,
    onError: noop,
    onSubmit: null,
    onUpdate: noop,
    showError: true,
    validator: () => true,
    name: 'form',
    value: {},
};

export { WebForm as default };
