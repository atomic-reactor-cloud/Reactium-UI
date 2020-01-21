import _ from 'underscore';
import uuid from 'uuid/v4';
import cn from 'classnames';
import op from 'object-path';
import ENUMS from './enums';
import isHotkey from 'is-hotkey';

import { Button, Icon } from 'components/common-ui';
import Reactium, { useDerivedState } from 'reactium-core/sdk';

import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';

import Leaf from 'components/common-ui/RichTextEditor/Leaf';
import Element from 'components/common-ui/RichTextEditor/Element';
import Toolbar from 'components/common-ui/RichTextEditor/Toolbar';
import {
    isMarkActive,
    toggleMark,
    useBlocks,
    useFormats,
    useSelected,
} from 'components/common-ui/RichTextEditor/_utils';

import { withHistory } from 'slate-history';
import { Slate, Editable, withReact } from 'slate-react';
import { Editor, Transforms, Text, createEditor } from 'slate';

/**
 * -----------------------------------------------------------------------------
 * Functional Component: RichTextEditor
 * -----------------------------------------------------------------------------
 */
const noop = () => {};

const RichTextEditor = forwardRef(
    (
        {
            className,
            id,
            namespace,
            onFocus,
            onChange,
            value: initialValue,
            ...props
        },
        ref,
    ) => {
        const editor = useMemo(
            () => withHistory(withReact(createEditor())),
            [],
        );

        const [formats] = useFormats(`${id}-formats`, editor);

        const [blocks] = useBlocks(`${id}-blocks`, editor);

        const [value, setValue] = useState(initialValue);

        const [state, setState] = useDerivedState({
            ...props,
            change: 0,
            id,
        });

        const [handle, handleDeps] = useMemo(
            () => [
                () => ({
                    blocks,
                    editor,
                    formats,
                    props,
                    setState,
                    setValue,
                    state,
                    toggleMark,
                    value,
                }),
                [blocks, editor, formats, value, op.get(state, 'updated')],
            ],
            [blocks, editor, formats, value, op.get(state, 'updated')],
        );

        const _onChange = newValue => setValue(newValue);

        const _onBeforeInput = e => {
            const keys = Object.keys(formats || {});
            const index = _.findIndex(Object.values(formats || {}), {
                name: e.inputType,
            });
            const format = op.get(keys, index);
            if (format) return toggleMark(editor, format);
        };

        const _onKeyDown = e => {
            Object.entries(formats).forEach(([format, item]) => {
                const { hotkey } = item;
                if (!hotkey) return;
                if (!isHotkey(hotkey, e)) return;
                e.preventDefault();
                toggleMark(editor, format);
            });
        };

        const cname = () => {
            return cn({ [className]: !!className, [namespace]: !!namespace });
        };

        const cx = cls => _.uniq([namespace, cls]).join('-');

        useEffect(() => {
            const { change = 0 } = state;
            //if (change !== 2) return setState({ change: change + 1 });
            onChange({
                type: 'change',
                target: handle(),
                currentTarget: editor,
            });
        }, [op.get(state, 'updated')]);

        useImperativeHandle(ref, handle, handleDeps);

        // const _renderElement = useCallback(
        //     props => <Element {...props} {...handle()} />,
        //     [formats],
        // );
        //
        const _renderLeaf = useCallback(
            props => <Leaf {...props} {...handle()} />,
            [],
        );

        const render = useMemo(() => {
            // const { value } = state;
            return (
                <div className={cname()}>
                    <Slate editor={editor} onChange={_onChange} value={value}>
                        <Editable
                            {...props}
                            onDOMBeforeInput={_onBeforeInput}
                            onKeyDown={_onKeyDown}
                            renderLeaf={_renderLeaf}
                        />
                        <Toolbar {...handle()} className={cx('toolbar')} />
                    </Slate>
                </div>
            );
        });

        return render;
    },
);

RichTextEditor.propTypes = {
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    id: PropTypes.string,
    namespace: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    placeholder: PropTypes.string,
    spellCheck: PropTypes.bool,
    value: PropTypes.array,
};

RichTextEditor.defaultProps = {
    autoFocus: true,
    id: 'rte',
    namespace: 'ar-rte',
    onChange: noop,
    onFocus: noop,
    placeholder: 'Enter content...',
    spellCheck: true,
    value: [
        {
            type: 'paragraph',
            children: [
                {
                    text: 'Lorem ipsum dolor sit amet',
                },
            ],
        },
    ],
};

export default RichTextEditor;
