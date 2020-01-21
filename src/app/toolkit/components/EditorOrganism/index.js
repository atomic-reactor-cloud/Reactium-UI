/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React from 'react';
import RichTextEditor from 'components/common-ui/RichTextEditor';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: EditorOrganism
 * -----------------------------------------------------------------------------
 */

const EditorOrganism = props => {
    const onChange = e => {
        console.log(e);
    };

    return <RichTextEditor onChange={onChange} />;
};

// Dependencies
EditorOrganism.dependencies = () => {
    return typeof module !== 'undefined' ? module.children : [];
};

// Default properties
EditorOrganism.defaultProps = {};

export default EditorOrganism;
