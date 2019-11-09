import cn from 'classnames';
import op from 'object-path';
import PropTypes from 'prop-types';
import { TweenMax, Power2 } from 'gsap/umd/TweenMax';

import ENUMS from './enums';

import React, {
    forwardRef,
    useImperativeHandle,
    useLayoutEffect as useWindowEffect,
    useRef,
    useState,
    useEffect,
} from 'react';

// Server-Side Render safe useLayoutEffect (useEffect when node)
const useLayoutEffect =
    typeof window !== 'undefined' ? useWindowEffect : useEffect;

const noop = () => {};

/**
 * -----------------------------------------------------------------------------
 * Hook Component: Collapsible
 * -----------------------------------------------------------------------------
 */
let Collapsible = ({ debug, children, ...props }, ref) => {
    // Refs
    const stateRef = useRef({
        ...props,
        init: false,
    });

    const containerRef = useRef();

    // State
    const [, setNewState] = useState(stateRef.current);

    // Internal Interface
    const setState = newState => {
        // Update the stateRef
        stateRef.current = {
            ...stateRef.current,
            ...newState,
        };

        // Trigger useEffect()
        setNewState(stateRef.current);
    };

    const numberize = str => Number(String(str).replace(/[a-z]/g, ''));

    const collapse = () => {
        const { animation, expanded } = stateRef.current;

        if (expanded !== true) {
            setState({ animation: null });
            return Promise.resolve();
        }

        if (animation) {
            return animation;
        }

        const {
            animationEase,
            animationSpeed,
            direction,
            maxSize,
            minSize,
            onBeforeCollapse,
            onCollapse,
        } = stateRef.current;

        const container = containerRef.current;
        const dir =
            direction === ENUMS.DIRECTION.HORIZONTAL ? 'width' : 'height';

        if (!maxSize) {
            container.style[dir] = 'auto';
        }
        container.style.display = 'block';
        container.style.overflow = 'hidden';

        const to = minSize ? numberize(minSize) : 0;

        onBeforeCollapse({
            target: container,
            type: ENUMS.EVENT.BEFORE_COLLAPSE,
        });

        const tween = new Promise(resolve =>
            TweenMax.to(container, animationSpeed, {
                [dir]: to,
                ease: animationEase,
                onComplete: () => {
                    const evt = {
                        target: container,
                        type: ENUMS.EVENT.COLLAPSE,
                    };

                    setState({ animation: null, expanded: false });

                    container.removeAttribute('style');

                    if (minSize) {
                        container.style.display = 'block';
                        container.style[dir] = numberize(minSize) + 'px';
                    }

                    onCollapse(evt);
                    resolve();
                },
            }),
        );

        setState({ animation: tween });

        return tween;
    };

    const expand = () => {
        const { animation, expanded } = stateRef.current;

        if (expanded === true) {
            setState({ animation: null });
            return Promise.resolve();
        }

        if (animation) {
            return animation;
        }

        const {
            animationEase,
            animationSpeed,
            direction,
            onBeforeExpand,
            onExpand,
            maxSize,
            minSize,
        } = stateRef.current;

        const container = containerRef.current;
        if (!container) {
            return Promise.resolve();
        }

        const dir =
            direction === ENUMS.DIRECTION.HORIZONTAL ? 'width' : 'height';

        container.classList.add('expanded');
        container.style[dir] = maxSize ? numberize(maxSize) + 'px' : 'auto';
        container.style.display = 'block';
        container.style.overflow = 'hidden';

        onBeforeExpand({
            target: container,
            type: ENUMS.EVENT.BEFORE_EXPAND,
        });

        const tween = new Promise(resolve =>
            TweenMax.from(container, animationSpeed, {
                [dir]: numberize(minSize),
                ease: animationEase,
                onComplete: () => {
                    const evt = {
                        target: container,
                        type: ENUMS.EVENT.EXPAND,
                    };
                    setState({ expanded: true, animation: null });

                    container.removeAttribute('style');

                    if (maxSize) {
                        container.style[dir] = numberize(maxSize) + 'px';
                    }

                    onExpand(evt);
                    resolve();
                },
            }),
        );

        setState({ animation: tween });

        return tween;
    };

    const toggle = e => {
        const { expanded } = stateRef.current;
        return expanded !== true ? expand(e) : collapse(e);
    };

    const setSize = () => {
        const { direction, expanded, maxSize, minSize } = stateRef.current;

        if (debug) {
            console.log({ expanded, minSize, maxSize, direction });
        }

        if (debug) {
            console.log({ step: 1 });
        }

        if (maxSize || minSize) {
            if (debug) {
                console.log({ step: 2 });
            }
            const container = containerRef.current;

            if (debug) {
                console.log({ step: 3 });
            }
            const dir =
                direction === ENUMS.DIRECTION.HORIZONTAL ? 'width' : 'height';

            if (debug) {
                console.log({ step: 4 });
            }

            if (expanded && maxSize) {
                if (debug) {
                    console.log({ step: 4.1 });
                }
                container.style[dir] = numberize(maxSize) + 'px';
            }

            if (expanded !== true && minSize) {
                if (debug) {
                    console.log({ step: 5.1 });
                }

                let size = numberize(minSize);
                size = size === 1 ? 0 : size;

                if (debug) {
                    console.log({ step: 5.2, size });
                }

                if (debug) {
                    console.log({ step: 5.3, dir, container });
                }
                container.style[dir] = size + 'px';
                if (debug) {
                    console.log({ step: 5.4, size });
                }
                container.style.display = size !== 0 ? 'block' : 'none';
            }

            if (debug) {
                console.log({ step: 6 });
            }
        }

        if (debug) {
            console.log({ step: 7 });
        }
    };

    // External Interface
    useImperativeHandle(ref, () => ({
        collapse,
        container: containerRef.current,
        expand,
        setState,
        state: stateRef.current,
        toggle,
    }));

    useEffect(() => setState(props), Object.values(props));

    useEffect(() => {
        const { init, maxSize } = stateRef.current;

        if (!init) {
            setSize();
            setState({ init: true });
        }

        if (typeof window === 'undefined') {
            return;
        }

        window.addEventListener('resize', setSize);

        return () => window.removeEventListener('resize', setSize);
    }, [
        op.get(stateRef, 'current.init'),
        Number(op.get(stateRef, 'current.maxSize', 0)),
        Number(op.get(stateRef, 'current.minSize', 0)),
    ]);

    const render = () => {
        let {
            className,
            expanded,
            namespace,
            width,
            height,
            style = {},
        } = stateRef.current;

        className = cn({
            [className]: !!className,
            [namespace]: true,
            expanded,
        });

        return (
            <div ref={containerRef} className={className} style={style}>
                {children}
            </div>
        );
    };

    return render();
};

Collapsible = forwardRef(Collapsible);

Collapsible.ENUMS = ENUMS;

Collapsible.propTypes = {
    animationEase: PropTypes.object,
    animationSpeed: PropTypes.number,
    className: PropTypes.string,
    debug: PropTypes.bool,
    direction: PropTypes.oneOf(Object.values(ENUMS.DIRECTION)),
    expanded: PropTypes.bool,
    maxSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    minSize: PropTypes.number,
    namespace: PropTypes.string,
    onBeforeCollapse: PropTypes.func,
    onBeforeExpand: PropTypes.func,
    onCollapse: PropTypes.func,
    onExpand: PropTypes.func,
    style: PropTypes.object,
};

Collapsible.defaultProps = {
    animationEase: Power2.easeInOut,
    animationSpeed: 0.25,
    className: null,
    debug: false,
    direction: ENUMS.DIRECTION.VERTICAL,
    expanded: true,
    namespace: 'ar-collapsible',
    onBeforeCollapse: noop,
    onBeforeExpand: noop,
    onCollapse: noop,
    onExpand: noop,
    style: {},
};

export { Collapsible as default };
