import _ from 'underscore';
import uuid from 'uuid/v4';
import cn from 'classnames';
import op from 'object-path';
import PropTypes from 'prop-types';
import Prefs from 'components/common-ui/Prefs';
import Button from 'components/common-ui/Button';
import { Feather } from 'components/common-ui/Icon';
import Collapsible from 'components/common-ui/Collapsible';
import Dismissable from 'components/common-ui/Dismissable';

import ENUMS from './enums';

import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';

const noop = () => {};

/**
 * -----------------------------------------------------------------------------
 * Hook Component: Dialog
 * -----------------------------------------------------------------------------
 */
let Dialog = ({ children, pref, ...props }, ref) => {
    // Refs
    const containerRef = useRef();
    const contentRef = useRef();
    const stateRef = useRef({
        prevState: {},
        ...props,
        ...Prefs.get(pref),
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

        // Update prefs
        setPrefs();
    };

    const setPrefs = () => {
        const { expanded } = stateRef.current;
        if (pref) {
            Prefs.set(pref, { expanded });
        }
    };

    // External Interface
    useImperativeHandle(ref, () => ({
        collapse: () => contentRef.current.collapse(),
        container: containerRef,
        content: contentRef,
        expand: () => contentRef.current.expand(),
        hide: () => containerRef.current.hide(),
        show: () => containerRef.current.show(),
        setState,
        state,
        toggle: {
            collapse: () => contentRef.current.toggle(),
            visible: () => containerRef.current.toggle(),
        },
    }));

    // Side Effects
    useEffect(() => setState(props), Object.values(props));

    // Handlers
    const _onButtonClick = (e, callback = noop) => {
        const { dismiss, toggle } = e.currentTarget.dataset;

        if (toggle) {
            contentRef.current.toggle();
            return;
        }

        if (dismiss) {
            containerRef.current
                .hide()
                .then(() => setState({ visible: false }));
        }

        callback(e);
    };

    const _onCollapse = e => {
        e.target = contentRef.current;
        const { onCollapse } = stateRef.current;
        setState({ expanded: false });
        onCollapse(e);
    };

    const _onExpand = e => {
        e.target = contentRef.current;
        const { onExpand } = stateRef.current;
        setState({ expanded: true });
        onExpand(e);
    };

    const _onHide = e => {
        e.target = containerRef.current;
        const { onHide } = stateRef.current;
        setState({ visible: false });
        onHide(e);
    };

    const _onShow = e => {
        e.target = containerRef.current;
        const { onShow } = stateRef.current;
        setState({ visible: true });
        onShow(e);
    };

    const _clone = elements =>
        React.Children.map(elements, (element, i) => {
            const { onClick } = element.props;
            const key = `dialog-clone-${uuid()}`;
            const newProps = {
                ...element.props,
                key,
            };

            if (onClick) {
                newProps.onClick = e => _onButtonClick(e, onClick);
            }

            return React.cloneElement(element, newProps);
        });

    // Renderers
    const renderHeader = () => {
        const {
            collapsible,
            dismissable,
            expanded = true,
            header = {},
            id,
            namespace,
        } = stateRef.current;
        const { elements = [], title } = header;

        const cname = cn({
            [`${namespace}-header`]: true,
            expanded,
        });

        return (
            <div className={cname}>
                {title && <h2>{title}</h2>}
                {(elements.length > 0 || collapsible || dismissable) && (
                    <div className={`${namespace}-header-buttons`}>
                        {elements.length > 0 && _clone(elements)}
                        {collapsible === true && (
                            <Button
                                data-toggle
                                onClick={_onButtonClick}
                                size={Button.ENUMS.SIZE.XS}
                                color={Button.ENUMS.COLOR.CLEAR}
                                className='ar-dialog-header-btn toggle'>
                                <Feather.ChevronDown />
                            </Button>
                        )}
                        {dismissable === true && (
                            <Button
                                data-dismiss
                                onClick={_onButtonClick}
                                size={Button.ENUMS.SIZE.XS}
                                color={Button.ENUMS.COLOR.CLEAR}
                                className='ar-dialog-header-btn dismiss'>
                                <Feather.X />
                            </Button>
                        )}
                    </div>
                )}
            </div>
        );
    };

    const renderContent = () => {
        const { collapsible, expanded, namespace } = stateRef.current;

        return collapsible ? (
            <Collapsible
                ref={contentRef}
                expanded={expanded}
                onCollapse={_onCollapse}
                onExpand={_onExpand}>
                <div className={`${namespace}-content`}>{children}</div>
                {renderFooter()}
            </Collapsible>
        ) : (
            <>
                <div ref={contentRef} className={`${namespace}-content`}>
                    {children}
                </div>
                {renderFooter()}
            </>
        );
    };

    const renderFooter = () => {
        const { footer = {}, namespace } = stateRef.current;
        const { elements = [], align } = footer;

        const cname = cn({
            [`${namespace}-footer`]: true,
            [`flex-${align}`]: true,
        });

        return (
            <div className={cname}>
                {elements.length > 0 && _clone(elements)}
            </div>
        );
    };

    const render = () => {
        const { className, dismissable, namespace, visible } = stateRef.current;
        const Content = () => (
            <div
                ref={!dismissable ? containerRef : null}
                className={cn({
                    [className]: !!className,
                    [namespace]: !!namespace,
                    visible,
                })}>
                {renderHeader()}
                {renderContent()}
            </div>
        );

        return dismissable === true ? (
            <Dismissable
                visible={visible}
                ref={containerRef}
                onHide={_onHide}
                onShow={_onShow}>
                <Content />
            </Dismissable>
        ) : (
            <Content />
        );
    };

    return render();
};

Dialog = forwardRef(Dialog);

Dialog.ENUMS = ENUMS;

Dialog.propTypes = {
    className: PropTypes.string,
    collapsible: PropTypes.bool,
    debug: PropTypes.bool,
    dismissable: PropTypes.bool,
    expanded: PropTypes.bool,
    footer: PropTypes.shape({
        align: PropTypes.oneOf(Object.values(ENUMS.ALIGN)),
        elements: PropTypes.arrayOf(PropTypes.element),
    }),
    header: PropTypes.shape({
        title: PropTypes.node,
        elements: PropTypes.arrayOf(PropTypes.element),
    }),
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    namespace: PropTypes.string,
    onCollapse: PropTypes.func,
    onExpand: PropTypes.func,
    onHide: PropTypes.func,
    onShow: PropTypes.func,
    pref: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    style: PropTypes.object,
    visible: PropTypes.bool,
};

Dialog.defaultProps = {
    collapsible: true,
    debug: false,
    dismissable: true,
    footer: {
        align: ENUMS.ALIGN.RIGHT,
        elements: [],
    },
    header: {
        title: 'Dialog Title',
        elements: [],
    },
    id: uuid(),
    namespace: 'ar-dialog',
    onCollapse: noop,
    onExpand: noop,
    onHide: noop,
    onShow: noop,
    style: {},
    visible: false,
};

export { Dialog as default };
