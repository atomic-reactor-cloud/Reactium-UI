import Reactium from 'reactium-core/sdk';
import { Editor, Transforms, Text } from 'slate';
import React, { useEffect, useState } from 'react';
import { Button, Icon } from 'components/common-ui';
import {
    isBlockActive,
    toggleBlock,
} from 'components/common-ui/RichTextEditor/_utils';

const buttonProps = {
    size: 'xs',
    color: 'tertiary',
    style: { padding: 0 },
};

const iconProps = {
    size: 18,
};

const defaultFormats = editor => ({
    ol: {
        name: 'formatStrike',
        block: props => (
            <ol>
                <li {...props} />
            </ol>
        ),
        icon: () => <Icon {...iconProps} name='Linear.List2' />,
        button: props => (
            <Button
                {...buttonProps}
                {...props}
                active={isMarkActive(editor, 'ol')}
                onMouseDown={e => toggleBlock(editor, 'ol', e)}
            />
        ),
    },
    ul: {
        name: 'formatStrike',
        block: props => (
            <ul>
                <li {...props} />
            </ul>
        ),
        icon: () => <Icon {...iconProps} name='Linear.List' />,
        button: props => (
            <Button
                {...buttonProps}
                {...props}
                active={isMarkActive(editor, 'ul')}
                onMouseDown={e => toggleBlock(editor, 'ul', e)}
            />
        ),
    },
});

const useBlocks = (hookID, editor) => {
    const STATUS = {
        INIT: 'INIT',
        PENDING: 'PENDING',
        READY: 'READY',
    };

    const [status, setStatus] = useState(STATUS.INIT);
    const [formats, setFormats] = useState();

    useEffect(() => {
        if (status !== STATUS.INIT) return;
        setStatus(STATUS.PENDING);
        const newFormats = { ...defaultFormats(editor) };
        Reactium.Hook.run(hookID, newFormats).then(() =>
            setFormats(newFormats),
        );
    }, [status]);

    return [formats, setFormats];
};

export default useBlocks;
