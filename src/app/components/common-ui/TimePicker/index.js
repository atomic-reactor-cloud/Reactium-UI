import _ from 'underscore';
import cn from 'classnames';
import op from 'object-path';
import PropTypes from 'prop-types';
import Picker from '../Picker';
import { Feather } from '../Icon';

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
 * Hook Component: TimePicker
 * -----------------------------------------------------------------------------
 */
let TimePicker = ({ iDocument, iWindow, ...props }, ref) => {
    // Refs
    const ampRef = useRef();
    const containerRef = useRef();
    const hourRef = useRef();
    const minuteRef = useRef();
    const pickerRef = useRef();
    const secondsRef = useRef();
    const stateRef = useRef({
        prevState: {},
        ...props,
    });

    // State
    const [state, setNewState] = useState(stateRef.current);

    // Internal Interface
    const setState = newState => {
        // Get the previous state
        const prevState = { ...stateRef.current };

        // Update the stateRef
        stateRef.current = {
            ...prevState,
            ...newState,
            prevState,
        };

        // Trigger useEffect()
        setNewState(stateRef.current);
    };

    // External Interface
    useImperativeHandle(ref, () => ({
        setState,
        state,
    }));

    // Side Effects
    useEffect(() => setState(props), Object.values(props));

    const renderUI = (provided, snapshot) => {
        const { namespace, seconds } = stateRef.current;
        const cname = cn({
            [namespace]: !!namespace,
        });

        const inputProps = {
            defaultValue: '00',
            maxLength: 2,
            type: 'text',
        };

        return (
            <div ref={containerRef} className={cname}>
                <div className={`${namespace}-nav`}>
                    <button type='button'>
                        <Feather.ChevronUp />
                    </button>
                </div>
                <div className={`${namespace}-input`}>
                    <span>
                        <input {...inputProps} ref={hourRef} />
                    </span>
                    <span>
                        <input {...inputProps} ref={minuteRef} />
                    </span>
                    {seconds === true && (
                        <span>
                            <input {...inputProps} ref={secondsRef} />
                        </span>
                    )}
                    <span>
                        <input {...inputProps} ref={ampRef} defaultValue='pm' />
                    </span>
                </div>
                <div className={`${namespace}-nav`}>
                    <button type='button'>
                        <Feather.ChevronDown />
                    </button>
                </div>
            </div>
        );
    };

    const render = () => {
        let { className, style = {}, width, picker } = stateRef.current;
        let { placeholder } = picker;
        style = { ...style, width };

        return (
            <Picker
                {...picker}
                children={renderUI}
                ref={pickerRef}
                className={className}
                style={style}
                iDocument={iDocument}
                iWindow={iWindow}
            />
        );
    };

    return render();
};

TimePicker = forwardRef(TimePicker);

TimePicker.propTypes = {
    picker: PropTypes.shape(Picker.propTypes),
    className: PropTypes.string,
    readOnly: PropTypes.bool,
    seconds: PropTypes.bool,
    style: PropTypes.object,
    width: PropTypes.number,
};

TimePicker.defaultProps = {
    namespace: 'ar-timepicker',
    seconds: true,
    style: {},
    width: 180,
    picker: {
        placeholder: 'Select Time',
        readOnly: true,
        icon: {
            closed: <Feather.Clock />,
            opened: <Feather.Clock />,
        },
    },
};

export { TimePicker as default };
