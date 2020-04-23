/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */

import React from 'react';
import _ from 'underscore';
import op from 'object-path';
import { useDerivedState, useHookComponent } from 'reactium-core/sdk';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: AlertMolecule
 * -----------------------------------------------------------------------------
 */

const AlertMolecule = () => {
    const { Alert, Feather } = useHookComponent('ReactiumUI');

    const [state, setState] = useDerivedState({
        color: 'primary',
    });

    return !Alert ? null : (
        <div>
            <div className='mb-xs-25'>
                <Alert
                    dismissable
                    style={{ marginBottom: 24 }}
                    color={op.get(Alert, 'ENUMS.COLOR.DANGER')}
                    icon={<Feather.AlertOctagon />}>
                    Hey Yo! If you keep trying that, you're going to have a bad
                    time.
                </Alert>
            </div>

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
        </div>
    );
};

AlertMolecule.dependencies = () =>
    typeof module !== 'undefined' ? module.children : [];

export default AlertMolecule;
