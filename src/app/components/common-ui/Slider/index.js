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
let Slider = ({ iDocument, iWindow, ...props }, ref) => {
    // Refs
    const barRef = useRef();
    const containerRef = useRef();
    const handleMaxRef = useRef();
    const handleMinRef = useRef();
    const stateRef = useRef({
        max: Math.ceil(op.get(props, ENUMS.MAX, 100)),
        min: Math.floor(op.get(props, ENUMS.MIN, 0)),
        prevState: {},
        range: typeof op.get(props, 'value') !== 'number',
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
            handle,
            direction,
            dragging = false,
            max = 100,
            min = 0,
            range,
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

        // TODO: Setup max/min based on range requirements.

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
        const v = Math.min(vals[pv], max);
        const value = range ? { [dragging]: v } : v;

        setState({ value });
    };

    const _dragEnd = e => {
        setState({ dragging: null, handle: null });
    };

    // External Interface
    useImperativeHandle(ref, () => ({
        setState,
        state,
    }));

    // Side Effects
    useEffect(() => setState(props), Object.values(props));

    const positionFromValue = ({
        direction,
        dragging = ENUMS.MIN,
        handle = handleMinRef.current,
        max = 100,
        min = 0,
        range,
        value,
    }) => {
        const vals = _.range(min, max + 1);
        const v = range ? value[dragging] : value;
        const i = vals.indexOf(v);
        const p = Math.floor((i / vals.length) * 100);

        return direction === ENUMS.DIRECTION.HORIZONTAL
            ? { top: 0, left: `${p}%` }
            : { left: 0, top: `${p}%` };
    };

    useEffect(() => {
        const {
            dragging,
            handle = handleMinRef.current,
            onChange,
            value,
        } = state;
        const pos = positionFromValue(state);

        handle.style.left = pos.left;
        handle.style.top = pos.top;

        onChange({
            type: ENUMS.EVENT.CHANGE,
            target: handle,
            value,
            position: pos,
            dragging,
        });
    }, [state.value]);

    useLayoutEffect(() => {
        const doc = iDocument || document;
        const win = iWindow || window;
    });

    const render = () => {
        const {
            children,
            className,
            direction,
            dragging = false,
            namespace,
            range,
            value,
        } = stateRef.current;

        const cname = cn({
            [className]: !!className,
            [namespace]: !!namespace,
            [direction]: !!direction,
        });

        const bcname = `${namespace}-bar`;
        const maxcname = cn({
            dragging: dragging === ENUMS.MAX,
            [`${namespace}-handle`]: true,
        });
        const mincname = cn({
            dragging: dragging === ENUMS.MIN,
            [`${namespace}-handle`]: true,
        });

        return (
            <div ref={containerRef} className={cname}>
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
                    {range === true && (
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
                </div>
            </div>
        );
    };

    return render();
};

Slider = forwardRef(Slider);

Slider.ENUMS = ENUMS;

Slider.propTypes = {
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
    direction: ENUMS.DIRECTION.HORIZONTAL,
    min: 0,
    max: 100,
    namespace: 'ar-slider',
    onChange: noop,
    range: false,
    value: 100,
};

export { Slider as default };
