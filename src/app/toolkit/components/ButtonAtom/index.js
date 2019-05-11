/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component, Fragment } from 'react';
import Button, { ENUMS } from 'components/common-ui/Button';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: ButtonAtom
 * -----------------------------------------------------------------------------
 */

export default class ButtonAtom extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    render() {
        return (
            <Fragment>
                <Button
                    outline
                    color={ENUMS.COLOR.PRIMARY}
                    size={ENUMS.SIZE.XS}
                    style={ENUMS.STYLE.CIRCLE}>
                    Button
                </Button>
            </Fragment>
        );
    }
}
