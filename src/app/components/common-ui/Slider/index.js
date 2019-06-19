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
        max: op.get(props, ENUMS.MAX, 100),
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
        const {
            handle,
            direction,
            dragging = false,
            max = 100,
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

        const px = Math.floor((x / barW) * 100);
        const py = Math.floor((y / barH) * 100);

        let v =
            direction === ENUMS.DIRECTION.HORIZONTAL
                ? (px / 100) * max
                : (py / 100) * max;
        v = Math.floor(v);

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

    useEffect(() => {
        const {
            direction,
            dragging = ENUMS.MIN,
            handle = handleMinRef.current,
            max = 100,
            range,
            value,
        } = state;

        const v = range ? value[dragging] : value;
        const p = Math.floor((v / max) * 100);

        if (direction === ENUMS.DIRECTION.HORIZONTAL) {
            handle.style.left = `${p}%`;
            handle.style.top = 0;
        } else {
            handle.style.top = `${p}%`;
            handle.style.left = 0;
        }

        // console.log({ pos: state.pos, value: state.value });
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
