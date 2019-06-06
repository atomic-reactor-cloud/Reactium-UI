import cn from 'classnames';
import React from 'react';

const Column = ({
    children,
    className,
    namespace = 'ar-data-table-col',
    textAlign = 'left',
    verticalAlign = 'top',
    width,
    style = {},
    ...props
}) => (
    <div
        className={cn({
            [namespace]: !!namespace,
            [className]: !!className,
            [textAlign]: !!textAlign,
            [verticalAlign]: !!verticalAlign,
        })}
        style={{
            width,
            maxWidth: width,
            minWidth: width ? width : Math.floor((1 / 12) * 100) + '%',
            flexGrow: width ? 0 : 1,
            flexShrink: width ? 0 : 1,
            ...style,
        }}
        {...props}>
        {children}
    </div>
);

export default Column;
