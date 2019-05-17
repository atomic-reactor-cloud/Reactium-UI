import _ from 'underscore';
import cn from 'classnames';
import PropTypes from 'prop-types';

import React, {
    forwardRef,
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
let Tabs = (props, ref) => {
    // State
    const [state, setNewState] = useState(props);

    // Refs
    const containerRef = useRef();

    // Internal Interface
    const cname = suffix => _.compact([state.namespace, suffix]).join('-');

    const setState = newState => setNewState({ ...state, ...newState });

    const _onTabClick = e => {
        const { tab } = e.target.dataset;
        const container = containerRef.current;
        const { activeTab, onChange, tabSelector } = state;
        const tabContainer = container.querySelector(tabSelector);
        const tabs = Array.from(tabContainer.children);

        const evt = {
            activeTab: Number(tab),
            previousTab: activeTab,
            tabButton: e.target,
            tabContainerr: tabs[tab],
            type: 'change',
        };

        setState({ activeTab: Number(tab), update: Date.now() });
        onChange(evt);
    };

    // External Interface
    useImperativeHandle(ref, () => ({
        container: containerRef.current,
        setState,
        state,
    }));

    // Side effects
    useLayoutEffect(() => {
        const container = containerRef.current;
        const { activeTab, tabButtonSelect, tabSelector } = state;
        const btnContainer = container.querySelector(tabButtonSelect);
        const tabContainer = container.querySelector(tabSelector);

        const btns = Array.from(btnContainer.children);
        const tabs = Array.from(tabContainer.children);

        btnContainer.classList.add(cname('bar'));
        tabContainer.classList.add(cname('container'));

        let b = -1;
        btns.forEach(btn => {
            const tag = String(btn.tagName).toUpperCase();
            if (tag === 'BUTTON') {
                b += 1;

                btn.onclick = _onTabClick;
                btn.dataset.tab = b;
                btn.classList.remove('active');
                btn.classList.add('ar-tab-button');
                if (activeTab === b) {
                    btn.classList.add('active');
                }
            }
        });

        tabs.forEach((tab, i) => {
            tab.classList.remove('active');
            tab.classList.add(cname('tab'));
            if (activeTab === i) {
                tab.classList.add('active');
            }
        });
    });

    const render = () => {
        let { children, className, namespace } = state;
        className = cn({ [className]: !!className, [namespace]: true });

        return (
            <div ref={containerRef} className={className}>
                {children}
            </div>
        );
    };

    return render();
};

Tabs = forwardRef(Tabs);

Tabs.propTypes = {
    activeTab: PropTypes.number,
    className: PropTypes.string,
    namespace: PropTypes.string,
    tabButtonSelector: PropTypes.string,
    tabSelector: PropTypes.string,
    onChange: PropTypes.func,
};

Tabs.defaultProps = {
    activeTab: 0,
    className: 'ar-tabs-default',
    namespace: 'ar-tabs',
    tabButtonSelect: '[data-tab-bar]',
    tabSelector: '[data-tabs]',
    onChange: noop,
};

export { Tabs as default };
