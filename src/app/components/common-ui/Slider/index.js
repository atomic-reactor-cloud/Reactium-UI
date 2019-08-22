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

    // State
    const [handles] = useState({
        [ENUMS.MIN]: handleMinRef,
        [ENUMS.MAX]: handleMaxRef,
    });

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

        if (e.type === 'touchmove') {
            e.clientX = e.touches[0].clientX;
            e.clientY = e.touches[0].clientY;
        }

        const handle = handles[dragging].current;
        const bar = barRef.current;
        const cont = containerRef.current;
        const lbl = labelRef.current;
        const sel = selRef.current;

        let barW = bar.offsetWidth;
        let barH = bar.offsetHeight;

        let minX = 0;
        let minY = 0;
        let maxX = barW;
        let maxY = barH;

        if (range) {
            const handleW = handle.offsetWidth + 4;
            switch (dragging) {
                case ENUMS.MIN:
                    maxX = handles[ENUMS.MAX].current.offsetLeft - handleW;
                    minY = handles[ENUMS.MAX].current.offsetTop + handleW;
                    break;

                case ENUMS.MAX:
                    minX = handles[ENUMS.MIN].current.offsetLeft + handleW;
                    maxY = handles[ENUMS.MIN].current.offsetTop - handleW;
                    break;
            }
        }

        const x =
            direction === ENUMS.DIRECTION.HORIZONTAL
                ? Math.min(Math.max(minX, e.clientX - cont.offsetLeft), maxX)
                : 0;

        const y =
            direction === ENUMS.DIRECTION.VERTICAL
                ? Math.min(Math.max(minY, e.clientY - cont.offsetTop), maxY)
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

        handle.style.left = `${x}px`;
        handle.style.top = `${y}px`;

        lbl.style.top =
            direction === ENUMS.DIRECTION.HORIZONTAL ? 0 : handle.style.top;
        lbl.style.left =
            direction === ENUMS.DIRECTION.HORIZONTAL
                ? handle.style.left
                : `${handle.offsetWidth}px`;
        lbl.style.display = 'block';

        if (range) {
            if (direction === ENUMS.DIRECTION.HORIZONTAL) {
                const selW =
                    handles[ENUMS.MAX].current.offsetLeft -
                    handles[ENUMS.MIN].current.offsetLeft;
                sel.style.left = handles[ENUMS.MIN].current.style.left;
                sel.style.width = `${selW}px`;
            } else {
                const selH =
                    handles[ENUMS.MIN].current.offsetTop -
                    handles[ENUMS.MAX].current.offsetTop;
                sel.style.top = handles[ENUMS.MAX].current.style.top;
                sel.style.height = `${selH}px`;
            }
        }

        setState({ value });
    };

    const _dragEnd = () => {
        setState({ dragging: null });
        const doc = iDocument || document;
        doc.removeEventListener('mousemove', _drag);
        doc.removeEventListener('mouseup', _dragEnd);
        doc.removeEventListener('touchmove', _drag);
        doc.removeEventListener('touchend', _dragEnd);
    };

    const _dragStart = e => {
        setState({ dragging: e.target.dataset.handle, focus: e.target });
        const doc = iDocument || document;
        doc.addEventListener('mousemove', _drag);
        doc.addEventListener('mouseup', _dragEnd);
        doc.addEventListener('touchmove', _drag);
        doc.addEventListener('touchend', _dragEnd);
    };

    const _move = () => {
        const {
            direction,
            dragging,
            onChange,
            range = false,
            value,
        } = stateRef.current;

        if (!dragging) {
            const sel = selRef.current;
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
                        handles[ENUMS.MIN].current.style.left
                            .split('%')
                            .join(''),
                    );
                    const right = Number(
                        handles[ENUMS.MAX].current.style.left
                            .split('%')
                            .join(''),
                    );
                    const barW = right - left;

                    sel.style.left = handles[ENUMS.MIN].current.style.left;
                    sel.style.width = `${barW}%`;
                } else {
                    const top = Number(
                        handles[ENUMS.MAX].current.style.top
                            .split('%')
                            .join(''),
                    );
                    const bottom = Number(
                        handles[ENUMS.MIN].current.style.top
                            .split('%')
                            .join(''),
                    );
                    const barH = bottom - top;

                    sel.style.top = handles[ENUMS.MAX].current.style.top;
                    sel.style.height = `${barH}%`;
                }
            }
        }

        onChange({
            type: ENUMS.EVENT.CHANGE,
            value,
        });
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

    const _positionFromValue = ({ value }) => {
        const bar = barRef.current;
        const cont = containerRef.current;

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

    // External Interface
    useImperativeHandle(ref, () => ({
        setState,
        state: stateRef.current,
    }));

    // Side Effects
    useEffect(() => setState(props), Object.values(props));

    // Side Effect: movement
    useEffect(() => _move(), [stateRef.current.value]);

    // Side Effect: cursor and label
    useEffect(() => {
        const { dragging, snap, value } = stateRef.current;
        const doc = iDocument || document;

        if (Boolean(dragging)) {
            doc.body.style.cursor = 'grabbing';
        } else {
            doc.body.style.cursor = 'default';
            labelRef.current.style.display = 'none';
            if (snap) {
                _move();
            }
        }
    }, [stateRef.current.dragging]);

    // Renderers
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
        ticks.sort();

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
    name: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    namespace: PropTypes.string,
    onChange: PropTypes.func,
    snap: PropTypes.bool,
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
    snap: false,
    tickFormat: tick => tick,
    ticks: [],
    value: 0,
};

export { Slider as default };
