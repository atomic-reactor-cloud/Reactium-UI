/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component, Fragment } from 'react';
import ButtonPrimary from 'toolkit/buttons/ButtonPrimary';
import ButtonSecondary from 'toolkit/buttons/ButtonSecondary';
import ButtonTertiary from 'toolkit/buttons/ButtonTertiary';
import ButtonDanger from 'toolkit/buttons/ButtonDanger';
import ButtonSuccess from 'toolkit/buttons/ButtonSuccess';

/**
 * -----------------------------------------------------------------------------
 * React Component: ButtonOverview
 * -----------------------------------------------------------------------------
 */

export default class ButtonOverview extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    render() {
        return (
            <Fragment>
                <ButtonPrimary />
                <ButtonSecondary />
                <ButtonTertiary />
                <ButtonDanger />
                <ButtonSuccess />
            </Fragment>
        );
    }
}
