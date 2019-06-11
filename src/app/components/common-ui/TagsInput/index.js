import lunr from 'lunr';
import uuid from 'uuid/v4';
import _ from 'underscore';
import cn from 'classnames';
import op from 'object-path';
import PropTypes from 'prop-types';
import { Feather } from 'components/common-ui/Icon';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';

const noop = () => {};

const ENUMS = {
    DIRECTION: {
        HORIZONTAL: 'horizontal',
        VERTICAL: 'vertical',
    },
    EVENT: {
        BLUR: 'blur',
        CHANGE: 'change',
        ERROR: 'error',
        FOCUS: 'focus',
        INIT: 'init',
    },
};

/**
 * -----------------------------------------------------------------------------
 * Hook Component: TagsInput
 * -----------------------------------------------------------------------------
 */
let TagsInput = (
    {
        className,
        data,
        direction,
        formatter,
        id,
        name,
        namespace,
        onBlur,
        onChange,
        onError,
        onFocus,
        onKeyDown,
        onInit,
        sortable,
        validator,
        value,
        ...props
    },
    ref,
) => {
    // Refs
    const containerRef = useRef();
    const inputRef = useRef();
    const stateRef = useRef({
        prevState: {},
        data,
        focus: false,
        index: null,
        initialized: false,
        search: null,
        suggest: [],
        value,
        ...props,
    });
    const valueRef = useRef();

    // State
    const [state, setNewState] = useState(stateRef.current);

    // Internal Interface
    const setState = newState => {
        const prevState = { ...stateRef.current };
        stateRef.current = { prevState, ...stateRef.current, ...newState };
        setNewState(stateRef.current);
    };

    const _value = value => {
        value = value || op.get(stateRef.current, 'value', []) || [];
        return Array.isArray(value) ? value : JSON.parse(value);
    };

    const _valueString = value => JSON.stringify(_value(value));

    const _addTag = val => {
        val = isNaN(val) ? val : Number(val);

        const isValid = validator(val, { state, ref });

        if (isValid !== true) {
            const evt = {
                type: ENUMS.EVENT.ERROR,
                value: val,
                error: isValid,
                target: inputRef,
            };

            onError(evt);
            return;
        }

        val = formatter(val);

        const value = _value();
        value.push(val);

        setState({ value, changed: Date.now() });
        inputRef.current.value = '';
    };

    const _onChange = () => {
        const { initialized } = stateRef.current;

        const evt = {
            type: ENUMS.EVENT.CHANGE,
            value: _value(),
            target: valueRef.current,
        };

        // Trigger onInit() instead of onChange on first load.
        if (initialized !== true) {
            stateRef.current.initialized = true;
            evt.type = ENUMS.EVENT.INIT;
            onInit(evt);
            return;
        }

        onChange(evt);
    };

    const _onFocus = e => {
        const { type } = e;
        const focus = type === ENUMS.EVENT.FOCUS;

        setState({ focus });

        if (type === ENUMS.EVENT.FOCUS) {
            onFocus(e);
        }

        if (type === ENUMS.EVENT.BLUR) {
            onBlur(e);
        }
    };

    const _onKeyDown = e => {
        if (e.keyCode === 13) {
            e.preventDefault();
            _addTag(e.target.value);
        }

        if (e.keyCode === 8 && e.target.value.length < 1 && e.shiftKey) {
            _onRemove(_value().length - 1);
        }

        onKeyDown(e);
    };

    const _onKeyUp = e => {
        onKeyUp(e);
    };

    const _onRemove = index => {
        if (index < 0) {
            return;
        }

        const value = _value();
        const list = Array.from(value);
        list.splice(index, 1);
        setState({ value: list, changed: Date.now(), backspace: false });

        inputRef.current.focus();
    };

    const _onReorder = e => {
        const value = _value();

        const startIndex = op.get(e, 'source.index');
        const endIndex = op.get(e, 'destination.index');
        const list = Array.from(value);
        const [item] = list.splice(startIndex, 1);

        if (typeof endIndex === 'undefined') {
            setState({ value: list, changed: Date.now() });
            return;
        }

        list.splice(endIndex, 0, item);
        setState({ value: list, changed: Date.now() });
    };

    const _index = () => {
        const { data = [] } = stateRef.current;

        if (data.length > 0) {
            const index = lunr(function() {
                this.field('label');
                this.field('value');

                data.forEach((item, i) => {
                    item['id'] = i;
                    this.add(item);
                });
            });

            setState({ index });
        }
    };

    const _search = search => {
        if (!search || String(search).length < 2) {
            setState({ suggest: [] });
            return;
        }

        const { index } = stateRef.current;

        if (!index) {
            return;
        }

        search =
            '+' +
            String(search)
                .trim()
                .split(' ')
                .join(' +');
        const rankings = index.search(search);
        const ranker = op.get(_.max(rankings, 'score'), 'score') || 0;
        const results = rankings
            .filter(item => item.score >= ranker)
            .map(item => {
                const id = isNaN(item.ref) ? item.ref : Number(item.ref);
                return data[id] || _.findWhere(data, { value: id });
            });

        setState({ suggest: results });
    };

    // External Interface
    useImperativeHandle(ref, () => ({
        container: containerRef.current,
        setState,
        state,
        value: _value(),
    }));

    // Side Effects
    useEffect(() => _index(), [data]);

    useEffect(() => _onChange(), [state.changed]);

    useEffect(() => setState(props), Object.values(props));

    const renderTag = (label, index) => (
        <span
            key={`${namespace}-tag-${index}`}
            className={`${namespace}-tag`}
            data-value={value}>
            <span className='label'>{label}</span>
            <button type='button' onClick={() => _onRemove(index)}>
                <Feather.X />
            </button>
        </span>
    );

    const renderDraggableTag = (label, index) => (
        <Draggable
            key={`${namespace}-tag-${index}`}
            draggableId={`${namespace}-tag-${index}`}
            index={index}>
            {(provided, snapshot) => (
                <span
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={cn({
                        [`${namespace}-tag`]: true,
                        dragging: snapshot.isDragging,
                    })}>
                    <span className='label'>{label}</span>
                    <button type='button' onClick={() => _onRemove(index)}>
                        <Feather.X />
                    </button>
                </span>
            )}
        </Draggable>
    );

    const renderTags = () => {
        const value = _value();

        return sortable ? (
            <DragDropContext onDragEnd={_onReorder}>
                <Droppable
                    droppableId={`${id}-${uuid()}`}
                    direction={direction}>
                    {(provided, snapshot) => (
                        <div
                            className={cn({
                                [`${namespace}-tags`]: true,
                                dropping: snapshot.isDraggingOver,
                            })}
                            {...provided.droppableProps}
                            ref={provided.innerRef}>
                            {value.map(renderDraggableTag)}
                            <input
                                type='text'
                                autoComplete='off'
                                {...props}
                                ref={inputRef}
                                onBlur={_onFocus}
                                onFocus={_onFocus}
                                onKeyDown={_onKeyDown}
                                onChange={e => _search(e.target.value)}
                            />
                            {renderSuggestions()}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        ) : (
            <div className={`${namespace}-tags`}>
                {value.map(renderTag)}
                <input
                    type='text'
                    autoComplete='off'
                    {...props}
                    ref={inputRef}
                    onBlur={_onFocus}
                    onFocus={_onFocus}
                    onKeyDown={_onKeyDown}
                    onChange={e => _search(e.target.value)}
                />
                {renderSuggestions()}
            </div>
        );
    };

    const renderSuggestions = () => {
        const { suggest } = stateRef.current;
        console.log(suggest);

        return null;
    };

    const render = () => {
        const { focus = false } = stateRef.current;

        const cname = cn({
            [className]: !!className,
            [namespace]: !!namespace,
            focus,
        });

        return (
            <>
                <input
                    type='hidden'
                    id={id}
                    name={name}
                    value={_valueString()}
                    ref={valueRef}
                />
                <div ref={containerRef} className={cname}>
                    {renderTags()}
                </div>
            </>
        );
    };

    return render();
};

TagsInput = forwardRef(TagsInput);

TagsInput.propTypes = {
    className: PropTypes.string,
    formatter: PropTypes.func,
    namespace: PropTypes.string,
    sortable: PropTypes.bool,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onError: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    onInit: PropTypes.func,
    validator: PropTypes.func,
};

TagsInput.defaultProps = {
    direction: ENUMS.DIRECTION.HORIZONTAL,
    id: uuid(),
    formatter: value => value,
    namespace: 'ar-tags-input',
    onBlur: noop,
    onChange: noop,
    onError: noop,
    onFocus: noop,
    onKeyDown: noop,
    onInit: noop,
    sortable: false,
    validator: value => value.length > 0,
};

export { TagsInput as default };
