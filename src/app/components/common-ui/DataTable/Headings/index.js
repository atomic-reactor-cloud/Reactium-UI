import React from 'react';
import Heading from '../Heading';
import ENUMS from '../enums';

const Headings = ({ columns, namespace, onClick, sort, sortable, sortBy }) =>
    !columns ? null : (
        <div className={`${namespace}-headings`}>
            {Object.entries(columns).map(([key, value]) => {
                value =
                    typeof value === 'string'
                        ? { label: value, textAlign: ENUMS.TEXT_ALIGN.LEFT }
                        : value;

                let { label, ...columnProps } = value;

                label =
                    typeof labelFunction === 'function'
                        ? labelFunction(key, label)
                        : label;

                columnProps = {
                    field: key,
                    label,
                    onClick,
                    sort,
                    sortable,
                    sortBy,
                    ...columnProps,
                };

                const className =
                    sortBy === key && sortable
                        ? String(`sort-active-${sort}`).toLowerCase()
                        : null;

                return (
                    <Heading
                        key={`${namespace}-heading-${key}`}
                        className={className}
                        {...columnProps}>
                        {label}
                    </Heading>
                );
            })}
        </div>
    );

export default Headings;
