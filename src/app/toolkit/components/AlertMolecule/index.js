/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */

import Sass from './Sass';
import _ from 'underscore';
import Events from './Events';
import Methods from './Methods';
import Code from 'toolkit/Code';
import Properties from './Properties';
import React, { Component } from 'react';
import { Alert } from 'components/common-ui';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: AlertMolecule
 * -----------------------------------------------------------------------------
 */

class AlertMolecule extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    constructor(props) {
        super(props);
        this.state = {
            color: Alert.ENUMS.COLOR.PRIMARY,
        };
    }

    render() {
        return (
            <div>
                <Alert dismissable color={this.state.color}>
                    <p>
                        Provide contextual feedback messages for typical user
                        actions.
                    </p>
                    <p>You can specify the following colors:</p>

                    <div className='form-group mt-xs-20' style={{ width: 160 }}>
                        <select
                            name='color'
                            value={this.state.color || ''}
                            onChange={e =>
                                this.setState({
                                    [e.target.name]: e.target.value,
                                })
                            }>
                            {_.without(
                                Object.values(Alert.ENUMS.COLOR),
                                'clear',
                            ).map(val => (
                                <option key={`color-${val}`}>{val}</option>
                            ))}
                        </select>
                    </div>
                </Alert>

                <div className='hr mx--32' />
                <h3 className='my-xs-20'>Properties</h3>
                <div className='hr mx--32' />
                <div className='ar-data-table'>
                    <Properties />
                </div>

                <div className='hr mx--32' />
                <h3 className='my-xs-20'>Methods</h3>
                <div className='hr mx--32' />
                <div className='ar-data-table'>
                    <Methods />
                </div>

                <div className='hr mx--32' />
                <h3 className='my-xs-20'>Events</h3>
                <div className='hr mx--32' />
                <div className='ar-data-table'>
                    <Events />
                </div>
                <div className='hr mx--32' />

                <h3 className='my-xs-20'>SCSS</h3>
                <div style={{ margin: '0 -25px -25px -25px' }}>
                    <Code language='scss'>{Sass()}</Code>
                </div>
            </div>
        );
    }
}

// Default properties
AlertMolecule.defaultProps = {};

export default AlertMolecule;
