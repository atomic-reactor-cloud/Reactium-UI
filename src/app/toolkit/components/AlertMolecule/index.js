/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */

import React from 'react';
import Sass from './Sass';
import op from 'object-path';
import _ from 'underscore';
import Events from './Events';
import Methods from './Methods';
import Code from 'toolkit/Code';
import Properties from './Properties';
import { useDerivedState, useHookComponent } from 'reactium-core/sdk';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: AlertMolecule
 * -----------------------------------------------------------------------------
 */

const AlertMolecule = props => {
    const [state, setState] = useDerivedState(props);
    const { Alert, Feather } = useHookComponent('ReactiumUI');

    return !Alert ? null : (
        <div>
            <Alert color={state.color}>
                <p>
                    Provide contextual feedback messages for typical user
                    actions.
                </p>
                <p>You can specify the following colors:</p>

                <div className='form-group mt-xs-20' style={{ width: 160 }}>
                    <select
                        name='color'
                        value={state.color || ''}
                        onChange={e =>
                            setState({
                                [e.target.name]: e.target.value,
                            })
                        }>
                        <option key={`color-${state.color}`}>
                            {state.color}
                        </option>
                        {_.chain(Object.values(op.get(Alert, 'ENUMS.COLOR')))
                            .without('clear')
                            .without(state.color)
                            .value()
                            .map(val => (
                                <option key={`color-${val}`}>{val}</option>
                            ))}
                    </select>
                </div>
            </Alert>

            <div className='hr mx--32' />

            <h3 className='my-xs-20'>Import</h3>
            <div className='ht' style={{ margin: '0 -25px' }}>
                <Code>
                    {"import { Alert } from '@atomic-reactor/reactium-ui';"}
                </Code>
            </div>

            <h3 className='my-xs-20'>Usage</h3>
            <div className='ht' style={{ margin: '0 -25px' }}>
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
                    color={op.get(Alert, 'ENUMS.COLOR.DANGER')}
                    icon={<Feather.AlertOctagon />}>
                    Hey Yo! If you keep trying that, you're going to have a bad
                    time.
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
            <div className='ht' style={{ margin: '0 -25px' }}>
                <Code language='json'>
                    {JSON.stringify(op.get(Alert, 'ENUMS', {}), null, 2)}
                </Code>
            </div>

            <h3 className='my-xs-20'>SCSS</h3>
            <div className='ht' style={{ margin: '0 -25px -25px -25px' }}>
                <Code language='scss'>{Sass()}</Code>
            </div>
        </div>
    );
};

// Default properties
AlertMolecule.defaultProps = {
    color: 'primary',
};
AlertMolecule.dependencies = () => {
    return typeof module !== 'undefined' ? module.children : [];
};

export default AlertMolecule;
