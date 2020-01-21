/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import op from 'object-path';
import { Helmet } from 'react-helmet';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import RichTextEditor from 'components/common-ui/RichTextEditor';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: EditorOrganism
 * -----------------------------------------------------------------------------
 */

const EditorOrganism = props => {
    const editorRef = useRef();

    const onChange = e => {
        // console.log(e);
    };

    const render = () => {
        return (
            <div style={{ paddingTop: 100, paddingLeft: 150 }}>
                <Helmet>
                    <title>Rich Text Editor</title>
                    <link
                        rel='stylesheet'
                        href='/assets/style/reactium-ui.css'
                    />
                </Helmet>
                <RichTextEditor ref={editorRef} onChange={onChange} />
            </div>
        );
    };

    return render();
};

// Default properties
EditorOrganism.defaultProps = {};

export default EditorOrganism;
