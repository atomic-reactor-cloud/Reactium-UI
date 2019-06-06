import cn from 'classnames';
import PropTypes from 'prop-types';
import { TweenMax, Power2 } from 'gsap/umd/TweenMax';
import React, {
    forwardRef,
    useRef,
    useState,
    useImperativeHandle,
} from 'react';

const ENUMS = {
    EVENT: {
        BEFORE_COLLAPSE: 'beforeCollapse',
        BEFORE_EXPAND: 'beforeExpand',
        COLLAPSE: 'collapse',
        EXPAND: 'expand',
    },
};

const noop = () => {};

/**
 * -----------------------------------------------------------------------------
 * Hook Component: Collapsible
 * -----------------------------------------------------------------------------
 */
let Collapsible = (props, ref) => {
    // State
    const [state, setNewState] = useState(props);

    // Refs
    const containerRef = useRef();

    // Internal Interface
    const setState = newState => setNewState({ ...state, ...newState });

    const collapse = () => {
        const { animation, expanded } = state;

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
        } = state;

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
        const { expanded, animation } = state;

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
        } = state;

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
        const { expanded } = state;
        return expanded !== true ? expand(e) : collapse(e);
    };

    // External Interface
    useImperativeHandle(ref, () => ({
        collapse,
        container: containerRef.current,
        expand,
        setState,
        state,
        toggle,
    }));

    const render = () => {
        let { className } = state;
        const { children, expanded, namespace } = state;

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
    className: 'ar-collapsible',
    expanded: true,
    namespace: 'ar-collapsible',
    onBeforeCollapse: noop,
    onBeforeExpand: noop,
    onCollapse: noop,
    onExpand: noop,
};

export { Collapsible as default };
