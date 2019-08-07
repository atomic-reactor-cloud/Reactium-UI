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

ENUMS.LINK = ({ children, ...props }) => <a {...props}>{children}</a>;

/**
 * -----------------------------------------------------------------------------
 * Functional Component: Button
 * -----------------------------------------------------------------------------
 */
let Button = ({ children, readOnly, style = {}, type, ...props }, ref) => {
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
            block = false,
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

        return cn({
            [className]: !!className,
            [c]: true,
            ['btn-block']: block,
        });
    };

    const render = () => {
        const exclude = [
            'appearance',
            'block',
            'children',
            'className',
            'color',
            'outline',
            'prevState',
            'readOnly',
            'size',
            'style',
        ];

        const elementProps = { ...stateRef.current };
        exclude.forEach(key => {
            if (key === 'readOnly' && readOnly === true) {
                delete elementProps.onClick;
                delete elementProps.type;
            } else {
                delete elementProps[key];
            }
        });

        const s = { ...style };
        if (readOnly) {
            s['pointerEvents'] = 'none';
            s['userSelect'] = 'none';
        }

        return readOnly ? (
            <span
                className={cname()}
                {...elementProps}
                style={s}
                ref={containerRef}>
                {children}
            </span>
        ) : type === ENUMS.TYPE.LINK ? (
            <ENUMS.LINK className={cname()} style={s} {...elementProps}>
                {children}
            </ENUMS.LINK>
        ) : (
            <button
                className={cname()}
                style={s}
                type={type}
                {...elementProps}
                ref={containerRef}>
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
    block: PropTypes.bool,
    color: PropTypes.oneOf(Object.values(ENUMS.COLOR)),
    outline: PropTypes.bool,
    readOnly: PropTypes.bool,
    size: PropTypes.oneOf(Object.values(ENUMS.SIZE)),
    style: PropTypes.object,
    tabIndex: PropTypes.number,
    type: PropTypes.oneOf(Object.values(ENUMS.TYPE)),
};

Button.defaultProps = {
    appearance: null,
    color: ENUMS.COLOR.PRIMARY,
    outline: false,
    readOnly: false,
    size: ENUMS.SIZE.SM,
    style: {},
    tabIndex: 0,
    type: ENUMS.TYPE.BUTTON,
};

export { Button as default, ENUMS };
