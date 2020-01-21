import React from 'react';
import op from 'object-path';

export default ({ attributes, children, element, formats = {} }) => {
    let output;
    Object.entries(formats).forEach(([key, { block: Block }]) => {
        if (element.type !== key || output) return;
        output = <Block {...attributes}>{children}</Block>;
    });

    return output || null;
};
