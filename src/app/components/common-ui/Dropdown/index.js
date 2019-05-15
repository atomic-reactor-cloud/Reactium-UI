import _ from 'underscore';
import cn from 'classnames';
import op from 'object-path';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { TweenMax, Power2 } from 'gsap/umd/TweenMax';
import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

const ENUMS = {
    EVENT: {
        BLUR: 'onblur',
        CLICK: 'onclick',
        FOCUS: 'onfocus',
        BEFORE_COLLAPSE: 'beforeCollapse',
        BEFORE_EXPAND: 'beforeExpand',
        COLLAPSE: 'collapse',
        EXPAND: 'expand',
    },
};

const noop = () => {};

/**
 * -----------------------------------------------------------------------------
 * Hook Component: Dropdown
 * -----------------------------------------------------------------------------
 */
let Dropdown = (props, ref) => {
    let animation = null;
    let ElementComponent = null;

    // State
    const [expanded, setExpanded] = useState(props.expanded);

    // Refs
    const containerRef = useRef();
    const menuRef = useRef();

    // Internal Interface
    const cname = suffix => _.compact([props.namespace, suffix]).join('-');

    const collapse = () => {
        if (expanded !== true) {
            animation = null;
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
        } = props;

        // setExpanded(true);
        const menu = menuRef.current;

        menu.style.height = 'auto';
        menu.style.display = 'block';
        menu.style.overflow = 'hidden';
        menu.classList.remove('expanded');

        onBeforeCollapse({
            type: ENUMS.EVENT.BEFORE_COLLAPSE,
            menu,
            target: ElementComponent,
        });

        animation = new Promise(resolve =>
            TweenMax.to(menu, animationSpeed, {
                ease: animationEase,
                height: 0,
                onComplete: () => {
                    const evt = {
                        type: ENUMS.EVENT.COLLAPSE,
                        menu,
                        target: ElementComponent,
                    };

                    menu.removeAttribute('style');
                    setExpanded(false);
                    onCollapse(evt);
                    animation = null;
                    resolve();
                },
            }),
        );

        return animation;
    };

    const dismiss = (e = {}) => {
        const { dismissable } = props;

        if (dismissable === true && !isChild(op.get(e, 'target'))) {
            return collapse(e);
        } else {
            return Promise.resolve();
        }
    };

    const expand = () => {
        if (expanded === true) {
            animation = null;
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
        } = props;

        // setExpanded(true);
        const menu = menuRef.current;

        menu.style.height = 'auto';
        menu.style.display = 'block';
        menu.style.overflow = 'hidden';
        menu.classList.remove('expanded');

        onBeforeExpand({
            type: ENUMS.EVENT.BEFORE_EXPAND,
            menu,
            target: ElementComponent,
        });

        animation = new Promise(resolve =>
            TweenMax.from(menu, animationSpeed, {
                ease: animationEase,
                height: 0,
                onComplete: () => {
                    const evt = {
                        type: ENUMS.EVENT.EXPAND,
                        menu,
                        target: ElementComponent,
                    };

                    menu.removeAttribute('style');
                    setExpanded(true);
                    onExpand(evt);
                    animation = null;
                    resolve();
                },
            }),
        );

        return animation;
    };

    const isChild = child => {
        if (!child) {
            return false;
        }

        const parent = containerRef.current;
        let node = child.parentNode;
        while (node !== null) {
            if (node === parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    };

    const toggle = e => {
        return expanded !== true ? expand(e) : collapse(e);
    };

    // External Interface
    useImperativeHandle(ref, () => ({
        collapse,
        container: containerRef.current,
        expand,
        toggle,
    }));

    // Before Render
    useEffect(() => {
        document.addEventListener('click', dismiss);

        return function cleanup() {
            document.removeEventListener('click', dismiss);
        };
    });

    // After Render
    useLayoutEffect(() => {
        const { collapseEvent, expandEvent, toggleEvent } = props;
        const selector = op.get(props, 'selector') || 'button';

        ElementComponent = containerRef.current.querySelector(selector);

        if (collapseEvent || expandEvent) {
            if (collapseEvent) {
                ElementComponent[collapseEvent] = e => collapse(e);
            }

            if (expandEvent) {
                ElementComponent[expandEvent] = e => expand(e);
            }
        } else {
            ElementComponent[toggleEvent] = e => toggle(e);
        }
    });

    const render = () => {
        const { children, namespace } = props;

        const contClassName = cn({ [namespace]: true, [cname()]: true });
        const menuClassName = cn({ [cname('menu')]: true, expanded });

        return (
            <div ref={containerRef} className={contClassName}>
                {children}
                <div ref={menuRef} className={menuClassName}>
                    <ul>
                        <li>item 1</li>
                        <li>item 2</li>
                        <li>item 3</li>
                        <li>item 4</li>
                        <li>item 5</li>
                    </ul>
                </div>
            </div>
        );
    };

    return render();
};

Dropdown = forwardRef(Dropdown);

Dropdown.ENUMS = ENUMS;

Dropdown.propTypes = {
    animationEase: PropTypes.object,
    animationSpeed: PropTypes.number,
    className: PropTypes.string,
    collapseEvent: PropTypes.oneOf(Object.values(ENUMS.EVENT)),
    dismissable: PropTypes.bool,
    expanded: PropTypes.bool,
    expandEvent: PropTypes.oneOf(Object.values(ENUMS.EVENT)),
    namespace: PropTypes.string,
    selector: PropTypes.string,
    toggleEvent: PropTypes.oneOf(Object.values(ENUMS.EVENT)),
    onBeforeCollapse: PropTypes.func,
    onBeforeExpand: PropTypes.func,
    onCollapse: PropTypes.func,
    onExpand: PropTypes.func,
};

Dropdown.defaultProps = {
    animationEase: Power2.easeInOut,
    animationSpeed: 0.25,
    className: 'ar-dropdown',
    collapseEvent: null,
    dismissable: true,
    expanded: false,
    expandEvent: null,
    namespace: 'ar-dropdown',
    selector: '[data-dropdown-element]',
    toggleEvent: ENUMS.EVENT.CLICK,
    onBeforeCollapse: noop,
    onBeforeExpand: noop,
    onCollapse: noop,
    onExpand: noop,
};

export { Dropdown as default };
