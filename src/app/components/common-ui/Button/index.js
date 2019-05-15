import React, { useLayoutEffect, useRef, useState } from 'react';
import _ from 'underscore';
import cn from 'classnames';
import ENUMS from './enums';

/**
 * -----------------------------------------------------------------------------
 * Functional Component: Button
 * -----------------------------------------------------------------------------
 */
let Button = (
    { children, className, color, outline, size, style, ...props },
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

    const cls = cn({ [className]: !!className, [buttonClassName]: true });
    const btn = useRef();

    const [height, setHeight] = useState(null);

    const updateHeight = () => {
        const elm = btn.current;
        if (elm && style === ENUMS.STYLE.CIRCLE) {
            const pos = elm.getBoundingClientRect();
            let w = parseFloat(pos.width);

            if (height !== w) {
                setHeight(w);
            }
            setTimeout(() => updateHeight(), 1);
        }
    };

    useLayoutEffect(updateHeight);

    return (
        <button className={cls} {...props} ref={btn} style={{height}}>
            {children}
        </button>
    );
};

Button.ENUMS = ENUMS;

Button.defaultProps = {
    type: 'button',
    tabIndex: 0,
};

export { Button as default, ENUMS };
