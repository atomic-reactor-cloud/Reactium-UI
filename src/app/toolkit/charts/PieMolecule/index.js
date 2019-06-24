/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component } from 'react';
import { PieChart } from 'components/common-ui/Charts';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: PieMolecule
 * -----------------------------------------------------------------------------
 */

class PieMolecule extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                <PieChart onInit={console.log} data={this.props.data} animate />
            </>
        );
    }
}

// Default properties
PieMolecule.defaultProps = {
    data: [
        { label: 'Cats', value: 1 },
        { label: 'Dogs', value: 1 },
        { label: 'People', value: 2 },
    ],
};

export default PieMolecule;
