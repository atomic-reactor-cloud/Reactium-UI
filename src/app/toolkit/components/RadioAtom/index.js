
/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component, Fragment } from 'react';
import Radio from 'components/common-ui/Radio';


/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: RadioAtom
 * -----------------------------------------------------------------------------
 */

class RadioAtom extends Component {

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
                <Radio />
            </Fragment>
        );
    }
}

// Default properties
RadioAtom.defaultProps = {};

export default RadioAtom;
