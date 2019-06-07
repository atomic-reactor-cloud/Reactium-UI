import cn from 'classnames';
import React from 'react';
import ENUMS from '../enums';

const Column = ({
    children,
    className,
    field,
    labelFunction,
    namespace = 'ar-data-table-col',
    onClick,
    textAlign = ENUMS.TEXT_ALIGN.LEFT,
    verticalAlign = ENUMS.VERTICAL_ALIGN.TOP,
    width,
    sortable = false,
    style = {},
    title,
    ...props
}) => {
    const colProps = {
        onClick,
        className: cn({
            [namespace]: !!namespace,
            [className]: !!className,
            [textAlign]: !!textAlign,
            [verticalAlign]: !!verticalAlign,
            sortable,
        }),
        style: {
            width,
            maxWidth: width,
            minWidth: width ? width : Math.floor((1 / 12) * 100) + '%',
            flexGrow: width ? 0 : 1,
            flexShrink: width ? 0 : 1,
            ...style,
        },
        title,
    };

    return sortable ? (
        <button {...colProps} type='button'>
            {labelFunction ? labelFunction(field, children) : children}
        </button>
    ) : (
        <div {...colProps}>
            {labelFunction ? labelFunction(field, children) : children}
        </div>
    );
};
export default Column;
