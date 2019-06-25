import op from 'object-path';
import PropTypes from 'prop-types';
import Checkpoint from './Checkpoint';

import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

const noop = () => {};
/**
 * -----------------------------------------------------------------------------
 * Hook Component: Checkpoints
 * -----------------------------------------------------------------------------
 */
let Checkpoints = ({ index, points = [], ...props }, ref) => {
    // Refs
    const containerRef = useRef();
    const prevStateRef = useRef({});
    const stateRef = useRef({
        complete: false,
        index,
        init: false,
        update: Date.now(),
        previous: {},
    });

    // State
    const [state, setNewState] = useState(stateRef.current);

    // Internal Interface
    const setState = newState => {
        prevStateRef.current = stateRef.current;
        stateRef.current.previous = stateRef.current;
        stateRef.current = { ...stateRef.current, ...newState };

        setNewState(stateRef.current);
    };

    const getValue = currIndex => {
        currIndex = currIndex || op.get(stateRef.current, 'index');

        const values = points.map((point, i) => op.get(point, 'value', i));

        let value = values[currIndex];
        value = isNaN(value) && !value ? values : value;

        return value;
    };

    const next = () => {
        let { index } = stateRef.current;
        if (index < points.length) {
            index += 1;
        }

        setState({ index });
    };

    const prev = () => {
        let { index } = stateRef.current;
        if (index > 0) {
            index -= 1;
        }

        setState({ index });
    };

    const complete = () => setState({ index: points.length });

    const restart = () => setState({ index: 0 });

    const onCheckpointChange = (e, index) => {
        const { readOnly } = props;
        if (readOnly === true) {
            return;
        }

        if (e.target.checked) {
            index += 1;
        }

        setState({ index });
    };

    // External Interface
    useImperativeHandle(ref, () => ({
        container: containerRef.current,
        setState,
        state,
        complete,
        next,
        prev,
        restart,
        value: getValue(),
    }));

    // Side Effects
    useEffect(() => {
        const {
            index: prevIndex,
            complete: prevComplete,
        } = stateRef.current.previous;

        const { init, index: currIndex } = stateRef.current;

        const complete = currIndex >= points.length;
        const { onChange, onComplete } = props;

        if (prevIndex !== currIndex) {
            const value = getValue(currIndex);

            setState({ value });

            const evt = { type: 'change', ...state, props, value };
            delete evt.init;

            onChange(evt);
        }

        if (prevComplete !== complete && init === true) {
            setState({ complete });

            if (complete === true) {
                onComplete({ type: 'complete', state, props });
            }
        }
    }, [props]);

    useLayoutEffect(() => {
        const { init } = stateRef.current;
        if (init !== true) {
            setState({ init: true });
        }
    });

    const render = () => {
        const { className, labelAlign, name, readOnly } = props;
        const { complete, index } = stateRef.current;

        return (
            <div ref={containerRef} className={className}>
                {points.map((point, i) => {
                    const { icon, label, value, ...cprops } = point;
                    let key = `checkpoint-${i}`;
                    key += name || '';

                    return (
                        <Checkpoint
                            key={key}
                            name={name}
                            label={label}
                            labelAlign={labelAlign}
                            value={value || i}
                            checked={i < index || complete === true}
                            disabled={i > index && readOnly === true}
                            onChange={e => onCheckpointChange(e, i)}
                            {...cprops}>
                            {icon}
                        </Checkpoint>
                    );
                })}
            </div>
        );
    };

    return render();
};

Checkpoints = forwardRef(Checkpoints);

Checkpoints.propTypes = {
    className: PropTypes.string,
    index: PropTypes.number,
    labelAlign: PropTypes.oneOf([
        Checkpoint.ALIGN_TOP,
        Checkpoint.ALIGN_BOTTOM,
    ]),
    name: PropTypes.string,
    points: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.node,
            icon: PropTypes.node,
            value: PropTypes.any,
        }),
    ),
    readOnly: PropTypes.bool,
    onChange: PropTypes.func,
    onComplete: PropTypes.func,
};

Checkpoints.defaultProps = {
    className: 'updox-checkpoints',
    index: 0,
    labelAlign: Checkpoint.ALIGN_BOTTOM,
    points: [],
    readOnly: true,
    onChange: noop,
    onComplete: noop,
};

export { Checkpoints as default, Checkpoint };
