import cn from 'classnames';
import React from 'react';

const Row = ({
    children,
    className,
    namespace = 'ar-data-table-row',
    selectable = false,
    ...props
}) =>
    selectable ? (
        <label
            className={cn({
                [namespace]: !!namespace,
                [className]: !!className,
            })}
            {...props}>
            {children}
        </label>
    ) : (
        <div
            className={cn({
                [namespace]: !!namespace,
                [className]: !!className,
            })}
            {...props}>
            {children}
        </div>
    );

export default Row;
