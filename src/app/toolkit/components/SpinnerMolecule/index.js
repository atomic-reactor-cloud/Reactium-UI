/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */

import _ from 'underscore';
import cn from 'classnames';
import React, { Component } from 'react';
import { Spinner } from 'components/common-ui';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: Loading
 * -----------------------------------------------------------------------------
 */

export default class SpinnerMolecule extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    render() {
        const dark = ['white', 'white-dark', 'grey-light'];
        return (
            <div className='row'>
                {_.without(Object.values(Spinner.COLOR))
                    .filter(color => !dark.includes(color))
                    .map(color => (
                        <div
                            key={`toolkit-spinner-${color}`}
                            className='col-xs-6 col-md-4 py-xs-20'>
                            <Spinner
                                className='flex middle center'
                                color={color}
                            />
                        </div>
                    ))}
                {_.without(Object.values(Spinner.COLOR))
                    .filter(color => dark.includes(color))
                    .map(color => (
                        <div
                            key={`toolkit-spinner-${color}`}
                            className='col-xs-6 col-md-4 py-xs-20'>
                            <Spinner
                                className='flex middle center ar-spinner-shadow'
                                color={color}
                            />
                        </div>
                    ))}
            </div>
        );
    }
}
