import _ from 'underscore';
import cn from 'classnames';
import ENUMS from './enums';
import PropTypes from 'prop-types';
import React, { forwardRef, useMemo } from 'react';

ENUMS.LINK = ({ children, ...props }) => <a {...props}>{children}</a>;

/**
 * -----------------------------------------------------------------------------
 * Functional Component: Button
 * -----------------------------------------------------------------------------
 */
let Button = (
    {
        active,
        appearance,
        block,
        children,
        className,
        color,
        outline,
        readOnly,
        size,
        style = {},
        type,
        ...props
    },
    ref,
) => {
    const cname = () => {
        const c = _.compact([
            'btn',
            color,
            size,
            outline === true ? 'outline' : null,
            appearance,
        ]).join('-');

        return cn({
            active,
            [className]: !!className,
            [c]: true,
            ['btn-block']: block,
        });
    };

    const render = () => {
        const exclude = [
            'active',
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

        const elementProps = { ...props };
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
            return (
                <span className={cname()} {...elementProps} style={s} ref={ref}>
                    {children}
                </span>
            );
        }

        switch (type) {
            case ENUMS.TYPE.LINK:
                return (
                    <ENUMS.LINK className={cname()} style={s} {...elementProps}>
                        {children}
                    </ENUMS.LINK>
                );

            case ENUMS.TYPE.LABEL:
                return (
                    <button
                        className={cname()}
                        style={s}
                        type='button'
                        {...elementProps}
                        ref={ref}>
                        {children}
                    </button>
                );

            default:
                return (
                    <button
                        className={cname()}
                        style={s}
                        type={type}
                        {...elementProps}
                        ref={ref}>
                        {children}
                    </button>
                );
        }
    };

    return render();
};

Button = forwardRef(Button);

Button.ENUMS = ENUMS;

Button.propTypes = {
    active: PropTypes.bool,
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
    active: false,
    appearance: null,
    block: false,
    color: ENUMS.COLOR.PRIMARY,
    outline: false,
    readOnly: false,
    size: ENUMS.SIZE.SM,
    style: {},
    tabIndex: 0,
    type: ENUMS.TYPE.BUTTON,
};

export { Button as default, ENUMS };
