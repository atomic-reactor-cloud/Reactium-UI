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

const ENUMS = {};

/**
 * -----------------------------------------------------------------------------
 * Hook Component: Dialog
 * -----------------------------------------------------------------------------
 */
let Dialog = ({ children, ...props }, ref) => {
    // Refs
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
        setState,
        state,
    }));

    // Side Effects
    useEffect(() => setState(props), Object.values(props));

    // Handlers
    const _onHeaderButtonClick = (e, callback) => {
        const { toggle } = e.currentTarget.dataset;

        if (toggle) {
            contentRef.current.toggle();
        } else {
            callback(e);
        }
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

    // Renderers
    const renderHeader = () => {
        const { header = {}, expanded, namespace } = stateRef.current;
        const { buttons = [], title } = header;

        const cname = cn({
            [`${namespace}-header`]: true,
            expanded,
        });

        return (
            <div className={cname}>
                {title && <h2>{title}</h2>}
                {buttons.length > 0 && (
                    <div className={`${namespace}-header-buttons`}>
                        {React.Children.map(buttons, (element, i) => {
                            const { onClick = noop } = element.props;
                            return React.cloneElement(element, {
                                ...element.props,
                                onClick: e => _onHeaderButtonClick(e, onClick),
                            });
                        })}
                    </div>
                )}
            </div>
        );
    };

    const renderContent = () => {
        const { expanded, namespace } = stateRef.current;

        return (
            <Collapsible
                ref={contentRef}
                expanded={expanded}
                onCollapse={_onCollapse}
                onExpand={_onExpand}>
                <div className={`${namespace}-content`}>{children}</div>
                {renderFooter()}
            </Collapsible>
        );
    };

    const renderFooter = () => {
        const { footer, namespace } = stateRef.current;
        return <div className={`${namespace}-footer`}>{footer}</div>;
    };

    const render = () => {
        const { className, namespace } = stateRef.current;

        return (
            <div
                className={cn({
                    [className]: !!className,
                    [namespace]: !!namespace,
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
    debug: PropTypes.bool,
    expanded: PropTypes.bool,
    footer: PropTypes.node,
    header: PropTypes.shape({
        title: PropTypes.node,
        buttons: PropTypes.arrayOf(PropTypes.element),
    }),
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    namespace: PropTypes.string,
    onCollapse: PropTypes.func,
    onExpand: PropTypes.func,
    style: PropTypes.object,
};

Dialog.defaultProps = {
    debug: false,
    expanded: true,
    header: {
        title: 'Dialog',
        buttons: [
            <Button
                type='button'
                data-toggle={true}
                size={Button.ENUMS.SIZE.XS}
                className='ar-dialog-toggle'
                color={Button.ENUMS.COLOR.CLEAR}
                key={`${uuid()}-ar-dialog-toggle`}>
                <Feather.ChevronDown width={16} height={16} />
            </Button>,
        ],
    },
    id: uuid(),
    namespace: 'ar-dialog',
    onCollapse: noop,
    onExpand: noop,
    style: {},
};

export { Dialog as default };
