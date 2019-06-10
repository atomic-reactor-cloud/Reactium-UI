/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */

import Lipsum from 'toolkit/Lipsum';
import React, { Component } from 'react';
import { Alert } from 'components/common-ui';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: AlertMolecule
 * -----------------------------------------------------------------------------
 */

class AlertMolecule extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Alert>
                <Lipsum />
            </Alert>
        );
    }
}

// Default properties
AlertMolecule.defaultProps = {};

export default AlertMolecule;
