import _ from 'underscore';
import cn from 'classnames';
import op from 'object-path';
import PropTypes from 'prop-types';

import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

const noop = () => {};

const ENUMS = {
    BUFFER: 2,
    DIRECTION: {
        HORIZONTAL: 'horizontal',
        VERTICAL: 'vertical',
    },
    EVENT: {
        CHANGE: 'change',
    },
    MAX: 'max',
    MIN: 'min',
};

/**
 * -----------------------------------------------------------------------------
 * Hook Component: Slider
 * -----------------------------------------------------------------------------
 */
let Slider = ({ iDocument, value, ...props }, ref) => {
    // Refs
    const barRef = useRef();
    const containerRef = useRef();
    const handleMaxRef = useRef();
    const handleMinRef = useRef();
    const selRef = useRef();
    const stateRef = useRef({
        max: Math.ceil(op.get(props, ENUMS.MAX, 100)),
        min: Math.floor(op.get(props, ENUMS.MIN, 0)),
        prevState: {},
        range: Boolean(typeof value !== 'number'),
        value,
        ...props,
    });

    // State
    const [state, setNewState] = useState(stateRef.current);

    // Internal Interface
    const setState = newState => {
        // Get the previous state
        const prevState = { ...stateRef.current };

        // Update the stateRef
        stateRef.current = {
            ...prevState,
            ...newState,
            prevState,
        };

        // Trigger useEffect()
        setNewState(stateRef.current);
    };

    const _dragStart = e => {
        setState({ dragging: e.target.dataset.handle, handle: e.target });

        const doc = iDocument || document;
        doc.addEventListener('mousemove', _drag);
        doc.addEventListener('mouseup', _dragEnd);
    };

    const _drag = e => {
        let {
            buffer,
            handle,
            direction,
            dragging,
            max,
            min,
            range,
            value,
        } = stateRef.current;

        if (!dragging) {
            return;
        }

        const hpos = {
            x: handle.offsetLeft,
            y: handle.offsetTop,
            w: handle.offsetWidth,
            h: handle.offsetHeight,
        };

        let barW = barRef.current.offsetWidth;
        let barH = barRef.current.offsetHeight;

        let maxX = barW;
        let maxY = barH;
        let minX = 0;
        let minY = 0;

        const w = hpos.w;
        const h = hpos.h;
        const x =
            direction === ENUMS.DIRECTION.HORIZONTAL
                ? Math.min(Math.max(0, e.clientX - w), maxX)
                : 0;

        const y =
            direction === ENUMS.DIRECTION.VERTICAL
                ? Math.min(Math.max(0, e.clientY - h), maxY)
                : 0;

        const vals = _.range(min, max + 1);
        const px = Math.floor((x / barW) * 100);
        const py = Math.floor((y / barH) * 100);

        let pv = direction === ENUMS.DIRECTION.HORIZONTAL ? px : py;
        pv = Math.ceil((pv / vals.length) * 100);

        // Ensure v can't be lower/higher than min/max values
        const v = Math.max(Math.min(vals[pv], max), min);

        value = range ? { ...value, [dragging]: v } : v;

        // Set value when ranged -> based on value.min/max being equal
        if (range && op.has(value, 'max') && op.has(value, 'min')) {
            if (value.min > value.max - buffer) {
                value[dragging] =
                    dragging === ENUMS.MIN
                        ? value[ENUMS.MAX] - buffer
                        : value[ENUMS.MIN] + buffer;
            }
        }

        setState({ value });
    };

    const _dragEnd = e => {
        setState({ dragging: null, handle: null });
    };

    const _positionFromValue = ({ handle, value }) => {
        const { direction, max, min, onChange } = stateRef.current;
        const vals = _.range(min, max + 1);

        const i = vals.indexOf(value);
        const p = Math.floor((i / vals.length) * 100);

        return direction === ENUMS.DIRECTION.HORIZONTAL
            ? { top: 0, left: `${p}%` }
            : { left: 0, top: `${p}%` };
    };

    const _move = () => {
        const sel = selRef.current;
        const { direction, onChange, range = false, value } = stateRef.current;
        const v = range === true ? value : { min: value };
        const handles = {
            [ENUMS.MIN]: handleMinRef.current,
            [ENUMS.MAX]: handleMaxRef.current,
        };

        Object.entries(v).forEach(([key, value]) => {
            const handle = handles[key];
            const pos = _positionFromValue({ handle, value });
            handle.style.left = pos.left;
            handle.style.top = pos.top;
        });

        if (range === true) {
            if (direction === ENUMS.DIRECTION.HORIZONTAL) {
                const left = Number(
                    handles[ENUMS.MIN].style.left.split('%').join(''),
                );
                const right = Number(
                    handles[ENUMS.MAX].style.left.split('%').join(''),
                );
                const barW = right - left;

                sel.style.left = handles[ENUMS.MIN].style.left;
                sel.style.width = `${barW}%`;
            } else {
                const top = Number(
                    handles[ENUMS.MIN].style.top.split('%').join(''),
                );
                const bottom = Number(
                    handles[ENUMS.MAX].style.top.split('%').join(''),
                );
                const barH = bottom - top;

                sel.style.top = handles[ENUMS.MIN].style.top;
                sel.style.height = `${barH}%`;
            }
        }

        onChange({
            type: ENUMS.EVENT.CHANGE,
            value,
        });
    };

    // External Interface
    useImperativeHandle(ref, () => ({
        setState,
        state,
    }));

    // Side Effects
    useEffect(() => setState(props), Object.values(props));

    useEffect(() => _move(), [stateRef.current.value]);

    const render = () => {
        let { value } = stateRef.current;

        const {
            children,
            className,
            direction,
            dragging = false,
            name,
            namespace,
            range,
        } = stateRef.current;

        const cname = cn({
            [className]: !!className,
            [namespace]: !!namespace,
            [direction]: !!direction,
        });

        const bcname = `${namespace}-bar`;
        const scname = `${namespace}-range`;
        const maxcname = cn({
            dragging: dragging === ENUMS.MAX,
            [`${namespace}-handle`]: true,
        });
        const mincname = cn({
            dragging: dragging === ENUMS.MIN,
            [`${namespace}-handle`]: true,
        });

        value = range ? value : { [ENUMS.MIN]: value };

        return (
            <div ref={containerRef} className={cname}>
                <input
                    name={name}
                    type='hidden'
                    defaultValue={value[ENUMS.MIN]}
                />
                {range && (
                    <input
                        name={name}
                        type='hidden'
                        defaultValue={value[ENUMS.MAX]}
                    />
                )}
                <div className={bcname} ref={barRef}>
                    <button
                        type='button'
                        className={mincname}
                        ref={handleMinRef}
                        onMouseDown={_dragStart}
                        onTouchStart={_dragStart}
                        onTouchEnd={_dragEnd}
                        onTouchMove={_drag}
                        data-handle={ENUMS.MIN}
                    />
                    {range === true && op.has(value, 'max') && (
                        <button
                            type='button'
                            className={maxcname}
                            ref={handleMaxRef}
                            onMouseDown={_dragStart}
                            onTouchStart={_dragStart}
                            onTouchEnd={_dragEnd}
                            onTouchMove={_drag}
                            data-handle={ENUMS.MAX}
                        />
                    )}
                    {range && <div className={scname} ref={selRef} />}
                </div>
            </div>
        );
    };

    return render();
};

Slider = forwardRef(Slider);

Slider.ENUMS = ENUMS;

Slider.propTypes = {
    buffer: PropTypes.number,
    className: PropTypes.string,
    direction: PropTypes.oneOf(Object.values(ENUMS.DIRECTION)),
    max: PropTypes.number,
    min: PropTypes.number,
    namespace: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
            max: PropTypes.number,
            min: PropTypes.number,
        }),
    ]),
};

Slider.defaultProps = {
    buffer: ENUMS.BUFFER,
    direction: ENUMS.DIRECTION.HORIZONTAL,
    min: 0,
    max: 100,
    namespace: 'ar-slider',
    onChange: noop,
    value: 100,
};

export { Slider as default };
