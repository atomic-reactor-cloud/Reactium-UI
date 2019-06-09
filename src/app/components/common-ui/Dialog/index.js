import _ from 'underscore';
import uuid from 'uuid/v4';
import cn from 'classnames';
import op from 'object-path';
import PropTypes from 'prop-types';
import Button from 'components/common-ui/Button';
import { Feather } from 'components/common-ui/Icon';
import Collapsible from 'components/common-ui/Collapsible';

import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';

const noop = () => {};

const ENUMS = {
    ALIGN: {
        LEFT: 'left',
        RIGHT: 'right',
        CENTER: 'center',
    },
};

/**
 * -----------------------------------------------------------------------------
 * Hook Component: Dialog
 * -----------------------------------------------------------------------------
 */
let Dialog = ({ children, ...props }, ref) => {
    // Refs
    const containerRef = useRef();
    const contentRef = useRef();
    const stateRef = useRef({
        prevState: {},
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

    // External Interface
    useImperativeHandle(ref, () => ({
        container: containerRef,
        content: contentRef,
        setState,
        state,
        toggle: () => contentRef.current.toggle(),
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
            // Do hide
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
            expanded,
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
        const { className, namespace, visible = false } = stateRef.current;

        return (
            <div
                ref={containerRef}
                className={cn({
                    [className]: !!className,
                    [namespace]: !!namespace,
                    visible,
                })}>
                {renderHeader()}
                {renderContent()}
            </div>
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
    style: PropTypes.object,
    visible: PropTypes.bool,
};

Dialog.defaultProps = {
    collapsible: true,
    debug: false,
    dismissable: true,
    expanded: true,
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
    style: {},
    visible: true,
};

export { Dialog as default };
