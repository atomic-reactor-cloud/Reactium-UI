import React from 'react';
import Heading from '../Heading';
import ENUMS from '../enums';

const Headings = ({ columns, namespace }) =>
    !columns ? null : (
        <div className={`${namespace}-headings`}>
            {Object.entries(columns).map(([key, value]) => {
                value =
                    typeof value === 'string'
                        ? { label: value, textAlign: ENUMS.TEXT_ALIGN.LEFT }
                        : value;

                const { label, ...itemProps } = value;

                return (
                    <Heading key={`${namespace}-heading-${key}`} {...itemProps}>
                        {label}
                    </Heading>
                );
            })}
        </div>
    );

export default Headings;
