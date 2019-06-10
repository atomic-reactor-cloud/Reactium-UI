import uuid from 'uuid/v4';
import _ from 'underscore';
import cn from 'classnames';
import op from 'object-path';
import PropTypes from 'prop-types';
import Button from 'components/common-ui/Button';
import Dialog from 'components/common-ui/Dialog';

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
 * Hook Component: Tabs
 * -----------------------------------------------------------------------------
 */
let Tabs = ({ activeTab, data = {}, id, namespace, ...props }, ref) => {
    // Refs
    const containerRef = useRef();
    const stateRef = useRef({
        prevState: {},
        activeTab,
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

    const _onTabClick = (e, index, callback = noop) => {
        const { activeTab } = stateRef.current;

        if (activeTab !== index) {
            setState({ activeTab: index });
        }
    };

    // External Interface
    useImperativeHandle(ref, () => ({
        setState,
        state,
    }));

    // Side Effects
    useEffect(() => setState(props), Object.values(props));

    const renderContent = () => {
        return <div className={`${namespace}-panels`} id={`${id}-panels`} />;
    };

    const renderTabs = () => {
        return (
            <div className={`${namespace}-bar`} id={`${id}-bar`}>
                {Object.entries(data).map(([index, { tab }], i) => {
                    const key = `${id}-tab-${i}`;

                    if (typeof tab === 'string') {
                    } else {
                        const { onClick } = tab.props;

                        return React.cloneElement(tab, {
                            ...tab.props,
                            key,
                            onClick: () => _onTabClick(e, index, onClick),
                        });
                    }
                })}
            </div>
        );
    };

    const render = () => {
        const { namespace } = stateRef.current;

        return <Dialog {...props}>{renderContent()}</Dialog>;
    };

    return render();
};

Tabs = forwardRef(Tabs);

Tabs.propTypes = {
    ...Dialog.propTypes,
    activeTab: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    data: PropTypes.shape({
        tab: PropTypes.node.isRequired,
        content: PropTypes.node.isRequired,
    }).isRequired,
    disabled: PropTypes.bool,
};

Tabs.defaultProps = {
    ...Dialog.defaultProps,
    activeTab: 'tab1',
    data: {
        tab1: {
            tab: 'Tab 1',
            content: 'Content 1',
        },
        tab2: {
            tab: 'Tab 2',
            content: 'Content 2',
        },
        tab3: {
            tab: 'Tab 3',
            content: 'Content 3',
        },
    },
    disabled: false,
    id: `ar-tab-${uuid()}`,
    namespace: 'ar-tab',
};

export { Tabs as default };
