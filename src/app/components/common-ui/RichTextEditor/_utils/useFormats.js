import Reactium from 'reactium-core/sdk';
import { Editor, Transforms, Text } from 'slate';
import React, { useEffect, useState } from 'react';
import { Button, Icon } from 'components/common-ui';
import {
    isMarkActive,
    toggleMark,
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
    bold: {
        name: 'formatBold',
        hotkey: 'mod+b',
        leaf: props => <strong {...props} />,
        icon: () => <Icon {...iconProps} name='Linear.Bold' />,
        button: props => (
            <Button
                {...buttonProps}
                {...props}
                active={isMarkActive(editor, 'bold')}
                onMouseDown={e => toggleMark(editor, 'bold', e)}
            />
        ),
    },
    italic: {
        name: 'formatItalic',
        hotkey: 'mod+i',
        leaf: props => <em {...props} />,
        icon: () => <Icon {...iconProps} size={16} name='Linear.Italic' />,
        button: props => (
            <Button
                {...buttonProps}
                {...props}
                active={isMarkActive(editor, 'italic')}
                onMouseDown={e => toggleMark(editor, 'italic', e)}
            />
        ),
    },
    underline: {
        name: 'formatUnderline',
        hotkey: 'mod+u',
        leaf: props => <u {...props} />,
        icon: () => <Icon {...iconProps} name='Linear.Underline' />,
        button: props => (
            <Button
                {...buttonProps}
                {...props}
                active={isMarkActive(editor, 'underline')}
                onMouseDown={e => toggleMark(editor, 'underline', e)}
            />
        ),
    },
    strike: {
        name: 'formatStrike',
        hotkey: 'mod+-',
        leaf: props => <span className='strike' {...props} />,
        icon: () => <Icon {...iconProps} name='Linear.Strikethrough' />,
        button: props => (
            <Button
                {...buttonProps}
                {...props}
                active={isMarkActive(editor, 'strike')}
                onMouseDown={e => toggleMark(editor, 'strike', e)}
            />
        ),
    },
});

const useFormats = (hookID, editor) => {
    const STATUS = {
        INIT: 'INIT',
        PENDING: 'PENDING',
        READY: 'READY',
    };

    const [status, setStatus] = useState(STATUS.INIT);
    const [formats, setFormats] = useState(defaultFormats(editor));

    useEffect(() => {
        if (status !== STATUS.INIT) return;
        setStatus(STATUS.PENDING);
        const newFormats = { ...formats };
        Reactium.Hook.run(hookID, newFormats).then(() => {
            setFormats(newFormats);
            setStatus(STATUS.READY);
        });
    }, [status]);

    return [formats, setFormats];
};

export default useFormats;
