/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component, Fragment } from 'react';

/**
 * -----------------------------------------------------------------------------
 * React Component: ButtonSuccess
 * -----------------------------------------------------------------------------
 */

export default class ButtonSuccess extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    render() {
        return (
            <div className={'row'}>
                <div className={'col-xs-12 col-sm text-center my-10'}>
                    <div className={'mb-xs-8 mb-sm-10'}>
                        <button className={'btn-success'}>Success</button>
                    </div>
                    <small>
                        <kbd>.btn-success</kbd>
                    </small>
                </div>
                <div className={'col-xs-12 col-sm text-center my-10'}>
                    <div className={'mb-xs-8 mb-sm-10'}>
                        <button className={'btn-success-pill'}>
                            Success Pill
                        </button>
                    </div>
                    <small>
                        <kbd>.btn-success-pill</kbd>
                    </small>
                </div>
                <div className={'col-xs-12 col-sm text-center my-10'}>
                    <div className={'mb-xs-8 mb-sm-10'}>
                        <button className={'btn-success-outline'}>
                            Outline
                        </button>
                    </div>
                    <small>
                        <kbd>.btn-success-outline</kbd>
                    </small>
                </div>
                <div className={'col-xs-12 col-sm text-center my-10'}>
                    <div className={'mb-xs-8 mb-sm-10'}>
                        <button className={'btn-success-outline-pill'}>
                            Outline Pill
                        </button>
                    </div>
                    <small>
                        <kbd>.btn-success-outline-pill</kbd>
                    </small>
                </div>
            </div>
        );
    }
}
