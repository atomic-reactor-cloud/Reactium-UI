/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component, Fragment } from 'react';

/**
 * -----------------------------------------------------------------------------
 * React Component: ButtonDanger
 * -----------------------------------------------------------------------------
 */

export default class ButtonDanger extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    render() {
        return (
            <div className={'row'}>
                <div className={'col-xs-12 col-sm text-center my-10'}>
                    <div className={'mb-xs-8 mb-sm-10'}>
                        <button className={'btn-danger'}>Danger</button>
                    </div>
                    <small>
                        <kbd>.btn-danger</kbd>
                    </small>
                </div>
                <div className={'col-xs-12 col-sm text-center my-10'}>
                    <div className={'mb-xs-8 mb-sm-10'}>
                        <button className={'btn-danger-pill'}>
                            Danger Pill
                        </button>
                    </div>
                    <small>
                        <kbd>.btn-danger-pill</kbd>
                    </small>
                </div>
                <div className={'col-xs-12 col-sm text-center my-10'}>
                    <div className={'mb-xs-8 mb-sm-10'}>
                        <button className={'btn-danger-outline'}>
                            Outline
                        </button>
                    </div>
                    <small>
                        <kbd>.btn-danger-outline</kbd>
                    </small>
                </div>
                <div className={'col-xs-12 col-sm text-center my-10'}>
                    <div className={'mb-xs-8 mb-sm-10'}>
                        <button className={'btn-danger-outline-pill'}>
                            Outline Pill
                        </button>
                    </div>
                    <small>
                        <kbd>.btn-danger-outline-pill</kbd>
                    </small>
                </div>
            </div>
        );
    }
}
