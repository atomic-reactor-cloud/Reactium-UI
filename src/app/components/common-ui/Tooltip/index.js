import cn from 'classnames';
import op from 'object-path';
import PropTypes from 'prop-types';

import ENUMS from './enums';

import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

const noop = () => {};

/**
 * -----------------------------------------------------------------------------
 * Hook Component: Tooltip
 * -----------------------------------------------------------------------------
 */
let Tooltip = (props, ref) => {
    // Refs
    const containerRef = useRef();
    const stateRef = useRef({
        prevState: {},
        timer: null,
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

    const getPosition = ({ align, verticalAlign, element, e }) => {
        let x = 0,
            y = 0;

        const w = element.offsetWidth;
        const h = element.offsetHeight;
        const rect = element.getBoundingClientRect();

        switch (align) {
            case ENUMS.ALIGN.LEFT:
                x = rect.x;
                break;

            case ENUMS.ALIGN.CENTER:
                x = rect.x + w / 2;
                break;

            case ENUMS.ALIGN.RIGHT:
                x = rect.x + w;
                break;
        }

        switch (verticalAlign) {
            case ENUMS.VERTICAL_ALIGN.TOP:
                y = rect.y;
                break;

            case ENUMS.VERTICAL_ALIGN.MIDDLE:
                y = rect.y + h / 2;
                break;

            case ENUMS.VERTICAL_ALIGN.BOTTOM:
                y = rect.y + h;
                break;
        }

        return { x: Math.floor(x), y: Math.floor(y) };
    };

    const hide = e => {
        const { autohide } = e;
        const element = e.target;
        const { tooltip } = element.dataset;

        if (tooltip) {
            let { onHide, timer } = stateRef.current;

            if (timer) {
                clearTimeout(timer);
                timer = null;
            }

            setState({
                visible: false,
                timer,
                align: props.align || Tooltip.defaultProps.align,
                verticalAlign:
                    props.verticalAlign || Tooltip.defaultProps.verticalAlign,
            });

            if (!autohide) {
                element.setAttribute('title', tooltip);
                element.removeEventListener('mouseleave', hide);
            }

            onHide({ event: ENUMS.EVENT.HIDE, target: e.target, ref });
        }
    };

    const show = e => {
        const dataset = e.target.dataset;
        const element = e.target;
        const title = element.getAttribute('title');
        const { tooltip } = dataset;

        if (title && tooltip) {
            let {
                align: defaultAlign,
                autohide: defaultAutohide,
                onShow,
                timer,
                verticalAlign: defaultVerticalAlign,
            } = stateRef.current;

            if (timer) {
                clearTimeout(timer);
            }

            const align = op.get(dataset, 'align', defaultAlign);
            const autohide = op.get(dataset, 'autohide', defaultAutohide);
            const verticalAlign = op.get(
                dataset,
                'verticalAlign',
                defaultVerticalAlign,
            );

            // Give screen readers a chance to read the title before we clip it off.
            setTimeout(() => element.removeAttribute('title'), 1);

            const newState = { visible: true, children: title };

            if (align && Object.values(ENUMS.ALIGN).includes(align)) {
                newState.align = align;
            }

            if (
                verticalAlign &&
                Object.values(ENUMS.VERTICAL_ALIGN).includes(verticalAlign)
            ) {
                newState.verticalAlign = verticalAlign;
            }

            dataset.tooltip = title;

            // position the tooltip to the target element
            const pos = getPosition({ align, verticalAlign, element, e });

            containerRef.current.style.left = `${pos.x}px`;
            containerRef.current.style.top = `${pos.y}px`;

            element.addEventListener('mouseleave', hide);

            if (autohide) {
                timer = setTimeout(
                    () => hide({ target: element, autohide: true }),
                    autohide,
                );
                newState.timer = timer;
            }

            onShow({ event: ENUMS.EVENT.SHOW, target: e.target, ref });

            setState(newState);
        }
    };

    // External Interface
    useImperativeHandle(ref, () => ({
        hide,
        setState,
        show,
        state,
    }));

    // Side Effects
    useEffect(() => setState(props), Object.values(props));

    useLayoutEffect(() => {
        const win = op.has(props, 'iWindow') ? props.iWindow : window;

        win.addEventListener('mouseover', show);

        return () => {
            win.removeEventListener('mouseover', show);
        };
    }, Object.values(props));

    // Renderers
    const render = () => {
        const {
            align = ENUMS.ALIGN.CENTER,
            children,
            className,
            namespace,
            verticalAlign = ENUMS.VERTICAL_ALIGN.CENTER,
            visible = false,
        } = stateRef.current;

        const cname = cn({
            [className]: !!className,
            [namespace]: !!namespace,
            [align]: !!align,
            [verticalAlign]: !!verticalAlign,
            visible,
        });

        return (
            <div ref={containerRef} className={cname}>
                <div className='container'>{children}</div>
            </div>
        );
    };

    return render();
};

Tooltip = forwardRef(Tooltip);

Tooltip.ENUMS = ENUMS;

Tooltip.propTypes = {
    align: PropTypes.oneOf(Object.values(ENUMS.ALIGN)),
    autohide: PropTypes.number,
    className: PropTypes.string,
    namespace: PropTypes.string,
    onHide: PropTypes.func,
    onShow: PropTypes.func,
    verticalAlign: PropTypes.oneOf(Object.values(ENUMS.VERTICAL_ALIGN)),
    visible: PropTypes.bool,
};

Tooltip.defaultProps = {
    align: ENUMS.ALIGN.CENTER,
    namespace: 'ar-tooltip',
    onHide: noop,
    onShow: noop,
    verticalAlign: ENUMS.VERTICAL_ALIGN.TOP,
    visible: false,
};

export { Tooltip as default };
