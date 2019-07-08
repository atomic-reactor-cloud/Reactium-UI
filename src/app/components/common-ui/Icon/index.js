import React from 'react';
import op from 'object-path';
import cn from 'classnames';
import Linear from './Linear';
import Feather from './Feather';
import PropTypes from 'prop-types';
import Button from 'components/common-ui/Button';

const icons = {
    Feather,
    Linear,
};

const ENUMS = {
    COLOR: Button.ENUMS.COLOR,
};

delete ENUMS.COLOR.CLEAR;

const Icon = ({ size, color, name, ...props }) => {
    const { className } = props;

    const Ico = op.get(icons, name);

    if (!Ico) {
        return null;
    }

    const cx = cn({
        [className]: !!className,
        'ar-icon': true,
        [color]: true,
    });

    return Ico({ ...props, width: size, height: size, className: cx });
};

Icon.ENUMS = ENUMS;
Icon.Feather = Feather;
Icon.Linear = Linear;
Icon.propTypes = {
    color: PropTypes.oneOf(Object.values(ENUMS.COLOR)),
    size: PropTypes.number,
};
Icon.defaultProps = {
    color: ENUMS.COLOR.SECONDARY,
    size: 24,
};

export { Icon as default, Feather, Linear };
