import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';

import _ from 'underscore';
import cn from 'classnames';
import ENUMS from './enums';
import PropTypes from 'prop-types';

/**
 * -----------------------------------------------------------------------------
 * Functional Component: Button
 * -----------------------------------------------------------------------------
 */
let Button = ({ children, ...props }, ref) => {
    // Refs
    const containerRef = useRef();
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
        element: containerRef.current,
        setState,
        state,
    }));

    // Side Effects
    useEffect(() => setState(props), Object.values(props));

    const cname = () => {
        const {
            appearance,
            className,
            color,
            outline,
            size,
        } = stateRef.current;
        const c = _.compact([
            'btn',
            color,
            size,
            outline === true ? 'outline' : null,
            appearance,
        ]).join('-');

        return cn({ [className]: !!className, [c]: true });
    };

    const render = () => {
        const exclude = [
            'appearance',
            'children',
            'className',
            'color',
            'outline',
            'prevState',
            'size',
        ];

        const elementProps = { ...stateRef.current };
        exclude.forEach(key => {
            delete elementProps[key];
        });

        return (
            <button className={cname()} {...elementProps} ref={containerRef}>
                {children}
            </button>
        );
    };

    return render();
};

Button = forwardRef(Button);

Button.ENUMS = ENUMS;

Button.propTypes = {
    appearance: PropTypes.oneOf(Object.values(ENUMS.APPEARANCE)),
    color: PropTypes.oneOf(Object.values(ENUMS.COLOR)),
    outline: PropTypes.bool,
    size: PropTypes.oneOf(Object.values(ENUMS.SIZE)),
    tabIndex: PropTypes.number,
    type: PropTypes.oneOf(Object.values(ENUMS.TYPE)),
};

Button.defaultProps = {
    appearance: null,
    color: ENUMS.COLOR.PRIMARY,
    outline: false,
    size: ENUMS.SIZE.SM,
    tabIndex: 0,
    type: ENUMS.TYPE.BUTTON,
};

export { Button as default, ENUMS };
