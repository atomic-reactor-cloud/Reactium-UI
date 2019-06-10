/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component } from 'react';
import { Tabs } from 'components/common-ui';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: TabMolecule
 * -----------------------------------------------------------------------------
 */

export default class TabMolecule extends Component {
    static defaultProps = {
        expanded: true,
        data: [
            {
                id: 'tab1',
                tab: <button type='button'>Tab 1</button>,
                content: <div className='p-xs-16'>Content 1</div>,
            },
            {
                id: 'tab2',
                tab: 'Tab 2',
                content: <div className='p-xs-16'>Content 2</div>,
            },
            {
                id: 'tab3',
                tab: 'Tab 3',
                content: <div className='p-xs-16'>Content 3</div>,
            },
        ],
    };

    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    render() {
        const { data } = this.props;
        return <Tabs activeTab={1} data={data} />;
    }
}
