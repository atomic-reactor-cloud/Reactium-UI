/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component } from 'react';
import { Picker } from 'components/common-ui';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: Picker
 * -----------------------------------------------------------------------------
 */

class PickerMolecule extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div style={{ minHeight: 400 }}>
                <Picker
                    visible={true}
                    placeholder='Select something'
                    iDocument={this.props.iDocument}
                    iWindow={this.props.iWindow}>
                    {(provided, snapshot) => 'Your UI Hear'}
                </Picker>
            </div>
        );
    }
}

export default PickerMolecule;
