/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React from 'react';
import ENUMS from './enums';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Feather } from 'components/common-ui/Icon';

/**
 * -----------------------------------------------------------------------------
 * Functional Component: Checkbox
 * -----------------------------------------------------------------------------
 */
const cn = ({ className, color = ENUMS.COLOR.DANGER, label, labelAlign }) => {
    const lbl = `ar-checkbox-label-${labelAlign}`;
    const clr = `ar-checkbox-${color}`;

    return classnames({
        [className]: !!className,
        [lbl]: !!label,
        [clr]: true,
        'ar-checkbox': true,
    });
};

const Checkbox = ({
    className,
    htmlFor,
    id,
    label,
    labelAlign,
    labelStyle,
    name,
    style,
    title,
    ...props
}) => (
    <label
        aria-label={label}
        aria-labelledby={!label && name}
        className={cn({ labelAlign, label, className })}
        htmlFor={id || name}
        style={style}
        title={title}>
        <span
            className={classnames({ ['sr-only']: !label })}
            style={labelStyle}>
            {label || title || name}
        </span>
        <input {...props} />
        <span>
            <Feather.Check width={14} height={14} />
        </span>
    </label>
);

Checkbox.ENUMS = ENUMS;

Checkbox.propTypes = {
    className: PropTypes.string,
    label: PropTypes.any,
    labelAlign: PropTypes.oneOf(Object.values(ENUMS.ALIGN)),
    labelStyle: PropTypes.object,
    style: PropTypes.object,
    title: PropTypes.string,
    type: PropTypes.oneOf(Object.values(ENUMS.TYPE)),
};

Checkbox.defaultProps = {
    labelAlign: ENUMS.ALIGN.LEFT,
    type: ENUMS.TYPE.CHECKBOX,
};

export { Checkbox as default, ENUMS };
