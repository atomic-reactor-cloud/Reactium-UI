import _ from 'underscore';
import op from 'object-path';
import uuid from 'uuid/v4';
import Portal from 'components/common-ui/Portal';
import { useDerivedState } from 'reactium-core/sdk';
import { useSlate } from 'slate-react';
import {
    isMarkActive,
    toggleMark,
    useSelected,
} from 'components/common-ui/RichTextEditor/_utils';

import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';

const Buttons = ({ formats = {} }) => (
    <div className='btn-group'>
        {Object.entries(formats).map(([key, value]) => {
            const { button: Button, icon: Icon } = value;
            return (
                Button &&
                Icon && (
                    <Button key={`ar-rte-toolbar-btn-${key}`}>
                        <Icon />
                    </Button>
                )
            );
        })}
    </div>
);

const Toolbar = ({ blocks, className, formats, id, style }) => {
    const editor = useSlate();

    const containerRef = useRef();

    if (typeof window === 'undefined') return null;

    const { range, rect, selected } = useSelected();

    const [state, setState] = useDerivedState({});

    const getPosition = () => {
        const element = containerRef.current;
        if (!element || !rect || !selected) return {};

        const minX = 4;
        const minY = 4;

        element.style.display = 'block';
        element.classList.remove('invert');
        element.classList.remove('no-arrow');

        let { x, width, height, top: y } = rect;

        x = x - element.offsetWidth / 2;
        x += width / 2;
        x = Math.max(minX, x);

        const h = element.offsetHeight + height;
        y -= h;
        y = Math.max(minY, y);

        if (x === minX) {
            element.classList.add('no-arrow');
        }

        if (y === minY) {
            y = rect.bottom + height;
            element.classList.add('invert');
        }
        return { left: x, top: y, opacity: 1 };
    };

    const render = useMemo(() => {
        const _style = {
            ...style,
            ...getPosition(),
            display: selected ? 'block' : 'none',
        };

        return (
            <Portal>
                <div style={_style} ref={containerRef} className={className}>
                    <Buttons formats={formats} />
                </div>
            </Portal>
        );
    });

    return render;
};

Toolbar.defaultProps = {
    style: {},
};

export { Toolbar as default };
