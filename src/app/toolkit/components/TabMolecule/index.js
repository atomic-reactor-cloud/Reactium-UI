/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component } from 'react';
import { Button, Collapsible, Icon, Tabs } from 'components/common-ui';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: TabMolecule
 * -----------------------------------------------------------------------------
 */

export default class TabMolecule extends Component {
    static defaultProps = {
        expanded: true,
    };

    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    constructor(props) {
        super(props);
        this.tabs = null;
        this.toggleButton = null;
    }

    render() {
        return <Tabs ref={elm => (this.tabs = elm)} />;
    }
}
