
/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component, Fragment } from 'react';
import Checkbox from 'components/common-ui/Checkbox';


/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: CheckboxAtom
 * -----------------------------------------------------------------------------
 */

class CheckboxAtom extends Component {

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
                <Checkbox label='Check Me' />
            </Fragment>
        );
    }
}

// Default properties
CheckboxAtom.defaultProps = {};

export default CheckboxAtom;
