import cn from 'classnames';
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
let Collapsible = (props, ref) => {
    // Refs
    const stateRef = useRef({
        prevState: {},
        ...props,
    });

    const containerRef = useRef();

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
            onBeforeCollapse,
            onCollapse,
        } = stateRef.current;

        const container = containerRef.current;

        container.style.height = 'auto';
        container.style.display = 'block';
        container.style.overflow = 'hidden';
        container.classList.remove('expanded');

        onBeforeCollapse({
            target: container,
            type: ENUMS.EVENT.BEFORE_COLLAPSE,
        });

        const tween = new Promise(resolve =>
            TweenMax.to(container, animationSpeed, {
                ease: animationEase,
                height: 0,
                onComplete: () => {
                    const evt = {
                        target: container,
                        type: ENUMS.EVENT.COLLAPSE,
                    };

                    container.removeAttribute('style');
                    setState({ animation: null, expanded: false });
                    onCollapse(evt);
                    resolve();
                },
            }),
        );

        setState({ animation: tween });

        return tween;
    };

    const expand = () => {
        const { expanded, animation } = stateRef.current;

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
            onBeforeExpand,
            onExpand,
        } = stateRef.current;

        const container = containerRef.current;

        container.style.height = 'auto';
        container.style.display = 'block';
        container.style.overflow = 'hidden';
        container.classList.remove('expanded');

        onBeforeExpand({
            target: container,
            type: ENUMS.EVENT.BEFORE_EXPAND,
        });

        const tween = new Promise(resolve =>
            TweenMax.from(container, animationSpeed, {
                ease: animationEase,
                height: 0,
                onComplete: () => {
                    const evt = {
                        target: container,
                        type: ENUMS.EVENT.EXPAND,
                    };

                    container.removeAttribute('style');
                    setState({ expanded: true, animation: null });
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
        const { children } = props;
        let { className, expanded, namespace } = stateRef.current;

        className = cn({
            [className]: !!className,
            [namespace]: true,
            expanded,
        });

        return (
            <div ref={containerRef} className={className}>
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
    expanded: PropTypes.bool,
    namespace: PropTypes.string,
    onBeforeCollapse: PropTypes.func,
    onBeforeExpand: PropTypes.func,
    onCollapse: PropTypes.func,
    onExpand: PropTypes.func,
};

Collapsible.defaultProps = {
    animationEase: Power2.easeInOut,
    animationSpeed: 0.25,
    className: null,
    expanded: true,
    namespace: 'ar-collapsible',
    onBeforeCollapse: noop,
    onBeforeExpand: noop,
    onCollapse: noop,
    onExpand: noop,
};

export { Collapsible as default };
