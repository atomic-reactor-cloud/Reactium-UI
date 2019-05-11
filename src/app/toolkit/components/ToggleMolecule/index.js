
/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component, Fragment } from 'react';
import Toggle from 'components/common-ui/Toggle';


/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: ToggleMolecule
 * -----------------------------------------------------------------------------
 */

class ToggleMolecule extends Component {

    static dependencies() {
        return (typeof module !== 'undefined') ? module.children : [];
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Fragment>
                <Toggle label='Toggle Me' />
            </Fragment>
        );
    }
}

// Default properties
ToggleMolecule.defaultProps = {};

export default ToggleMolecule;
