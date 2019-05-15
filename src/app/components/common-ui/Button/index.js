import React, {
    forwardRef,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import _ from 'underscore';
import cn from 'classnames';
import ENUMS from './enums';

/**
 * -----------------------------------------------------------------------------
 * Functional Component: Button
 * -----------------------------------------------------------------------------
 */
let Button = (
    { children, className, color, outline, size, style, inlineStyle, ...props },
    ref,
) => {
    outline = outline === true ? 'outline' : null;

    const buttonClassName = _.compact([
        'btn',
        color,
        size,
        outline,
        style,
    ]).join('-');

    const btn = useRef();

    useImperativeHandle(ref, () => ({
        element: btn.current,
    }));

    const render = () => {
        const cls = cn({ [className]: !!className, [buttonClassName]: true });
        return (
            <button className={cls} {...props} ref={btn} style={inlineStyle}>
                {children}
            </button>
        );
    };

    return render();
};

Button = forwardRef(Button);

Button.ENUMS = ENUMS;

Button.defaultProps = {
    color: ENUMS.COLOR.PRIMARY,
    inlineStyle: null,
    size: ENUMS.SIZE.SM,
    type: 'button',
    tabIndex: 0,
};

export { Button as default, ENUMS };
