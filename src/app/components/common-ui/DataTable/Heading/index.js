import React from 'react';
import Column from '../Column';

const Heading = ({
    children,
    namespace = 'ar-data-table-heading',
    ...props
}) => (
    <Column namespace={namespace} {...props}>
        {children}
    </Column>
);

export default Heading;
