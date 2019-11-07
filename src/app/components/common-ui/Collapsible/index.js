import cn from 'classnames';
import op from 'object-path';
import PropTypes from 'prop-types';
import { TweenMax, Power2 } from 'gsap/umd/TweenMax';

import ENUMS from './enums';

import React, {
    forwardRef,
    useImperativeHandle,
    useRef,
    useState,
    useEffect,
} from 'react';

const noop = () => {};

/**
 * -----------------------------------------------------------------------------
 * Hook Component: Collapsible
 * -----------------------------------------------------------------------------
 */
let Collapsible = ({ children, ...props }, ref) => {
    // Refs
    const stateRef = useRef({
        ...props,
        width: 0,
        height: 0,
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
            minSize = 0,
            onBeforeCollapse,
            onCollapse,
        } = stateRef.current;

        const container = containerRef.current;
        const dir =
            direction === ENUMS.DIRECTION.HORIZONTAL ? 'width' : 'height';

        container.style[dir] = 'auto';
        container.style.display = 'block';
        container.style.overflow = 'hidden';

        onBeforeCollapse({
            target: container,
            type: ENUMS.EVENT.BEFORE_COLLAPSE,
        });

        const tween = new Promise(resolve =>
            TweenMax.to(container, animationSpeed, {
                [dir]: minSize,
                ease: animationEase,
                onComplete: () => {
                    const evt = {
                        target: container,
                        type: ENUMS.EVENT.COLLAPSE,
                    };

                    setState({ animation: null, expanded: false });

                    container.removeAttribute('style');

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
            minSize = 0,
        } = stateRef.current;

        const container = containerRef.current;
        const dir =
            direction === ENUMS.DIRECTION.HORIZONTAL ? 'width' : 'height';

        container.classList.add('expanded');
        container.style[dir] = 'auto';
        container.style.display = 'block';
        container.style.overflow = 'hidden';

        onBeforeExpand({
            target: container,
            type: ENUMS.EVENT.BEFORE_EXPAND,
        });

        const tween = new Promise(resolve =>
            TweenMax.from(container, animationSpeed, {
                [dir]: minSize,
                ease: animationEase,
                onComplete: () => {
                    const evt = {
                        target: container,
                        type: ENUMS.EVENT.EXPAND,
                    };
                    setState({ expanded: true, animation: null });
                    container.removeAttribute('style');
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
    direction: PropTypes.oneOf(Object.values(ENUMS.DIRECTION)),
    expanded: PropTypes.bool,
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
    direction: ENUMS.DIRECTION.VERTICAL,
    expanded: true,
    minSize: 0,
    namespace: 'ar-collapsible',
    onBeforeCollapse: noop,
    onBeforeExpand: noop,
    onCollapse: noop,
    onExpand: noop,
    style: {},
};

export { Collapsible as default };
