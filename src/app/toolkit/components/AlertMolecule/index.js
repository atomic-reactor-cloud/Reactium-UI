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
import { Feather } from 'components/common-ui/Icon';

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
                <Alert color={this.state.color}>
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

                <h3 className='my-xs-20'>Import</h3>
                <div style={{ margin: '0 -25px' }}>
                    <Code>
                        {"import { Alert } from '@atomic-reactor/reactium-ui';"}
                    </Code>
                </div>

                <h3 className='my-xs-20'>Usage</h3>
                <div style={{ margin: '0 -25px' }}>
                    <Code>
                        {`<Alert
                            dismissable
                            color={Alert.ENUMS.COLOR.DANGER}
                            icon={<Feather.AlertOctagon />}>
                            Hey Yo! If you keep trying that, you're going to have a bad time.
                        </Alert>`}
                    </Code>
                </div>
                <div className='my-xs-25'>
                    <Alert
                        dismissable
                        color={Alert.ENUMS.COLOR.DANGER}
                        icon={<Feather.AlertOctagon />}>
                        Hey Yo! If you keep trying that, you're going to have a
                        bad time.
                    </Alert>
                </div>

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

                <h3 className='my-xs-20'>ENUMS</h3>
                <div style={{ margin: '0 -25px' }}>
                    <Code language='json'>
                        {JSON.stringify(Alert.ENUMS, null, 2)}
                    </Code>
                </div>

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
