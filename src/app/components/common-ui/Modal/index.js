import cn from 'classnames';
import PropTypes from 'prop-types';
import Dismissable from '../Dismissable';

import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';

/**
 * -----------------------------------------------------------------------------
 * Hook Component: Modal
 * -----------------------------------------------------------------------------
 */
let Modal = (props, ref) => {
    // Refs
    const dissmissableRef = useRef();
    const stateRef = useRef({
        animation: null,
        prevState: {},
        ...props,
    });

    // State
    const [state, setNewState] = useState(stateRef.current);

    // Internal Interface
    const setState = newState => {
        const prevState = { ...stateRef.current };
        stateRef.current = { ...stateRef.current, ...newState, prevState };
        setNewState(stateRef.current);
    };

    const dismiss = () => {
        const { dismissable } = stateRef.current;

        if (dismissable) {
            dissmissableRef.current.hide();
        }
    };

    const show = content => {
        if (content) {
            setState({ children: content });
        }

        dissmissableRef.current.show();
    };

    // External Interface
    useImperativeHandle(ref, () => ({
        state,
        ...dissmissableRef.current,
        dismiss,
        show,
    }));

    // Side Effects
    useEffect(() => setState(props), Object.values(props));

    const render = () => {
        const {
            children,
            className,
            dismissable,
            namespace,
            visible = false,
        } = stateRef.current;

        const cname = cn({
            [className]: !!className,
            visible,
        });

        return (
            <Dismissable
                {...stateRef.current}
                ref={dissmissableRef}
                className={cname}>
                {dismissable && (
                    <button
                        type='button'
                        className={`${namespace}-bg`}
                        onClick={dismiss}
                    />
                )}
                {!dismissable && <div className={`${namespace}-bg`} />}
                <div className={`${namespace}-wrapper`}>
                    <div className={`${namespace}-content`}>{children}</div>
                </div>
            </Dismissable>
        );
    };

    return render();
};

Modal = forwardRef(Modal);

Modal.propTypes = {
    ...Dismissable.propTypes,
    dismissable: PropTypes.bool,
};

Modal.defaultProps = {
    ...Dismissable.defaultProps,
    dismissable: true,
    namespace: 'ar-modal',
};

export { Modal as default };
