import React, {
    forwardRef,
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
let Button = (props, ref) => {
    const [state, setNewState] = useState(props);

    const setState = newState => setNewState({ ...state, ...newState });

    const elementRef = useRef();

    useImperativeHandle(ref, () => ({
        element: elementRef.current,
        setState,
        state,
    }));

    const cname = () => {
        const { appearance, className, color, outline, size } = state;
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
        const { children } = state;
        const exclude = [
            'appearance',
            'children',
            'className',
            'color',
            'outline',
            'size',
        ];
        const elementProps = _.without(Object.keys(state), exclude).reduce(
            (obj, key) => {
                obj[key] = state[key];
                return obj;
            },
            {},
        );

        return (
            <button className={cname()} {...elementProps} ref={elementRef}>
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
    size: PropTypes.oneOf(Object.values(ENUMS.SIZE)),
    tabIndex: PropTypes.number,
    type: PropTypes.oneOf(Object.values(ENUMS.TYPE)),
};

Button.defaultProps = {
    appearance: null,
    color: ENUMS.COLOR.PRIMARY,
    size: ENUMS.SIZE.SM,
    tabIndex: 0,
    type: ENUMS.TYPE.BUTTON,
};

export { Button as default, ENUMS };
