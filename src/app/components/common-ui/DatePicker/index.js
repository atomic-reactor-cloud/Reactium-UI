import _ from 'underscore';
import cn from 'classnames';
import moment from 'moment';
import ENUMS from './enums';
import op from 'object-path';
import Picker from '../Picker';
import { Feather } from '../Icon';
import PropTypes from 'prop-types';
import Calendar from './Calendar';
import { TweenMax, Power2 } from 'gsap/umd/TweenMax';

import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

const noop = () => {};

const stateToPickerProps = ({
    className,
    icon,
    iDocument,
    iWindow,
    name,
    namespace,
    onChange,
    picker = {},
    placeholder,
    readOnly,
    style = {},
    width,
    value,
}) => {
    style = { ...style, width };

    return {
        className,
        icon,
        iDocument,
        iWindow,
        name,
        onChange,
        placeholder,
        readOnly,
        style,
        value,
        ...picker,
    };
};

ENUMS.DEBUG = true;

/**
 * -----------------------------------------------------------------------------
 * Hook Component: DatePicker
 * -----------------------------------------------------------------------------
 */
let DatePicker = ({ iDocument, iWindow, ...props }, ref) => {
    // Refs
    const containerRef = useRef();
    const pickerRef = useRef();
    const stateRef = useRef({
        prevState: {},
        ...props,
    });

    // State
    const [state, setNewState] = useState(stateRef.current);

    // Internal Interface
    const setState = (newState, caller) => {
        // Get the previous state
        const prevState = { ...stateRef.current };

        // let { value } = newState;
        //
        // if (value) {
        //     newState.value = formatTime(value);
        // }

        // Update the stateRef
        stateRef.current = {
            ...prevState,
            ...newState,
            prevState,
        };

        if (ENUMS.DEBUG) {
            console.log('setstate()', caller, stateRef.current);
        }

        // Trigger useEffect()
        setNewState(stateRef.current);
    };

    // External Interface
    useImperativeHandle(ref, () => ({
        setState,
        state,
    }));

    // Side Effects
    useEffect(() => setState(props, 'useEffect()'), Object.values(props));

    const renderUI = (provided, snapshot) => {
        return <Calendar />;
    };

    const render = () => {
        const { namespace, id } = stateRef.current;
        const pickerProps = stateToPickerProps({
            ...stateRef.current,
            iDocument,
            iWindow,
        });

        return (
            <Picker
                id={id}
                {...pickerProps}
                children={renderUI}
                ref={pickerRef}
            />
        );
    };

    return render();
};

DatePicker = forwardRef(DatePicker);

DatePicker.propTypes = {
    className: PropTypes.string,
    icon: PropTypes.shape({
        closed: PropTypes.node,
        opened: PropTypes.node,
    }),
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    name: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    namespace: PropTypes.string,
    onChange: PropTypes.func,
    picker: PropTypes.shape(Picker.propTypes),
    readOnly: PropTypes.bool,
    selected: PropTypes.array,
    style: PropTypes.object,
    value: PropTypes.string,
    width: PropTypes.number,
};

DatePicker.defaultProps = {
    icon: {
        closed: <Feather.Calendar />,
        opened: <Feather.Calendar />,
    },
    namespace: 'ar-datepicker',
    onChange: noop,
    picker: {},
    placeholder: 'Select Date',
    readOnly: false,
    selected: [moment().format('L')],
    style: {},
    value: moment().format('L'),
    width: 140,
};

export { DatePicker as default };
