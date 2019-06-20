import _ from 'underscore';
import cn from 'classnames';
import op from 'object-path';
import PropTypes from 'prop-types';
import ENUMS from './enums';

import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';

const noop = () => {};

const Label = forwardRef(
    ({ children, className, namespace = 'ar-slider' }, ref) => (
        <div
            className={cn({
                [`${namespace}-tooltip`]: true,
                [className]: !!className,
            })}
            ref={ref}>
            <div className='container'>{children}</div>
        </div>
    ),
);

/**
 * -----------------------------------------------------------------------------
 * Hook Component: Slider
 * -----------------------------------------------------------------------------
 */
let Slider = ({ labelFormat, iDocument, value, ...props }, ref) => {
    // Refs
    const barRef = useRef();
    const containerRef = useRef();
    const handleMaxRef = useRef();
    const handleMinRef = useRef();
    const labelRef = useRef();
    const selRef = useRef();
    const stateRef = useRef({
        max: Math.ceil(op.get(props, ENUMS.MAX, 100)),
        min: Math.floor(op.get(props, ENUMS.MIN, 0)),
        prevState: {},
        range: Boolean(typeof value !== 'number'),
        value,
        ...props,
    });

    const [handles] = useState({
        [ENUMS.MIN]: handleMinRef,
        [ENUMS.MAX]: handleMaxRef,
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
        setState({ dragging: e.target.dataset.handle, focus: e.target });

        const doc = iDocument || document;
        doc.addEventListener('mousemove', _drag);
        doc.addEventListener('mouseup', _dragEnd);
    };

    const _drag = e => {
        let {
            buffer,
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

        const handle = handles[dragging].current;

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

        const w = hpos.w;
        const h = hpos.h;
        const x =
            direction === ENUMS.DIRECTION.HORIZONTAL
                ? Math.min(Math.max(0, e.clientX - w * 2.25), maxX)
                : 0;

        const y =
            direction === ENUMS.DIRECTION.VERTICAL
                ? Math.min(Math.max(0, e.clientY - h * 2.25), maxY)
                : 0;

        const vals = _.range(min, max + 1);

        if (direction === ENUMS.DIRECTION.VERTICAL) {
            vals.reverse();
        }

        const px = x / barW;
        const py = y / barH;

        const len = vals.length - 1;
        let pv = direction === ENUMS.DIRECTION.HORIZONTAL ? px : py;

        pv = Math.floor(pv * len);
        pv = Math.min(pv, len);

        const v = vals[pv];

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

    const _dragEnd = () => {
        setState({ dragging: null });
    };

    const _positionFromValue = ({ value }) => {
        const { direction, max, min } = stateRef.current;
        const vals = _.range(min, max + 1);

        if (direction === ENUMS.DIRECTION.VERTICAL) {
            vals.reverse();
        }

        const len = vals.length - 1;
        const i = vals.indexOf(value);
        const p = Math.ceil((i / len) * 100);

        return direction === ENUMS.DIRECTION.HORIZONTAL
            ? { top: 0, left: `${p}%` }
            : { left: 0, top: `${p}%` };
    };

    const _move = () => {
        const sel = selRef.current;
        const lbl = labelRef.current;
        const {
            direction,
            dragging,
            onChange,
            range = false,
            value,
        } = stateRef.current;
        const v = range === true ? value : { min: value };

        Object.entries(v).forEach(([key, value]) => {
            const handle = handles[key].current;
            const pos = _positionFromValue({ handle, value });
            handle.style.left = pos.left;
            handle.style.top = pos.top;
        });

        if (range === true) {
            if (direction === ENUMS.DIRECTION.HORIZONTAL) {
                const left = Number(
                    handles[ENUMS.MIN].current.style.left.split('%').join(''),
                );
                const right = Number(
                    handles[ENUMS.MAX].current.style.left.split('%').join(''),
                );
                const barW = right - left;

                sel.style.left = handles[ENUMS.MIN].current.style.left;
                sel.style.width = `${barW}%`;
            } else {
                const top = Number(
                    handles[ENUMS.MAX].current.style.top.split('%').join(''),
                );
                const bottom = Number(
                    handles[ENUMS.MIN].current.style.top.split('%').join(''),
                );
                const barH = bottom - top;

                sel.style.top = handles[ENUMS.MAX].current.style.top;
                sel.style.height = `${barH}%`;
            }
        }

        onChange({
            type: ENUMS.EVENT.CHANGE,
            value,
        });

        if (dragging) {
            const handle = handles[dragging].current;

            if (direction === ENUMS.DIRECTION.HORIZONTAL) {
                lbl.style.left = handle.style.left;
                lbl.style.top = 'auto';
            } else {
                lbl.style.left = `${handle.offsetWidth * 2.65}px`;
                lbl.style.top = `${handle.offsetTop +
                    handle.offsetWidth -
                    3}px`;
            }

            lbl.style.opacity = 1;
        }
    };

    const _onKeyPress = e => {
        const { keyCode } = e;
        const { handle } = e.target.dataset;
        let { max, min, range, value } = stateRef.current;

        let inc;

        switch (keyCode) {
            case 38:
            case 39:
                inc = 1;
                break;

            case 37:
            case 40:
                inc = -1;
                break;
        }

        if (keyCode >= 37 && keyCode <= 40) {
            e.preventDefault();
            e.stopPropagation();

            let v = range ? value[handle] + inc : value + inc;
            v = Math.min(Math.max(min, v), max);

            value = range ? { ...value, [handle]: v } : v;
            setState({ value });
        }
    };

    // External Interface
    useImperativeHandle(ref, () => ({
        setState,
        state,
    }));

    // Side Effects
    useEffect(() => setState(props), Object.values(props));

    useEffect(() => _move(), [stateRef.current.value]);

    useEffect(() => {
        const { dragging } = stateRef.current;
        const doc = iDocument || document;

        if (Boolean(dragging)) {
            doc.body.style.cursor = 'grabbing';
        } else {
            doc.body.style.cursor = 'default';
            labelRef.current.style.opacity = 0;
        }
    }, [stateRef.current.dragging]);

    const renderTicks = () => {
        let {
            direction,
            max,
            min,
            namespace,
            tickFormat,
            ticks = false,
        } = stateRef.current;

        if (!ticks) {
            return null;
        }

        ticks = ticks === true ? [min, max] : ticks;

        if (direction === ENUMS.DIRECTION.VERTICAL) {
            ticks.reverse();
        }

        return (
            <div className={`${namespace}-ticks`}>
                {ticks.map(tick => (
                    <span
                        className={`${namespace}-tick`}
                        style={_positionFromValue({ value: tick })}
                        key={`tick-${tick}`}>
                        {tickFormat(tick)}
                    </span>
                ))}
            </div>
        );
    };

    const render = () => {
        let { value } = stateRef.current;

        const {
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
                        onKeyDown={_onKeyPress}
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
                            onKeyDown={_onKeyPress}
                            data-handle={ENUMS.MAX}
                        />
                    )}
                    {range && <div className={scname} ref={selRef} />}
                    <Label ref={labelRef} namespace={namespace}>
                        {labelFormat(value[dragging])}
                    </Label>
                </div>
                {renderTicks()}
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
    labelFormat: PropTypes.func,
    max: PropTypes.number,
    min: PropTypes.number,
    namespace: PropTypes.string,
    onChange: PropTypes.func,
    tickFormat: PropTypes.func,
    ticks: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.arrayOf(PropTypes.number),
    ]),
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
    labelFormat: label => label,
    min: 0,
    max: 100,
    namespace: 'ar-slider',
    onChange: noop,
    tickFormat: tick => tick,
    ticks: [],
    value: 100,
};

export { Slider as default };
