/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */

import Properties from './Properties';
import Usage from './Usage';
import React, { Component } from 'react';
import { Button, Checkbox, DataTable } from 'components/common-ui';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: ButtonAtom
 * -----------------------------------------------------------------------------
 */

export default class ButtonAtom extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    state = {
        appearance: null,
        color: Button.ENUMS.COLOR.PRIMARY,
        disabled: false,
        outline: false,
        readOnly: false,
        size: Button.ENUMS.SIZE.XS,
    };

    render() {
        let { appearance } = this.state;
        appearance =
            String(appearance).toLowerCase() === 'default' ? null : appearance;

        const buttonProps = { ...this.state, appearance };

        return (
            <div>
                <p>
                    The Button component can be used for programmatic access to
                    the many styles, sizes and states of a button.
                </p>
                <div className='flex-center mb-xs-20'>
                    <div className='btn-group'>
                        <div className='form-group'>
                            <select
                                name='color'
                                value={this.state.color || ''}
                                onChange={e =>
                                    this.setState({
                                        [e.target.name]: e.target.value,
                                    })
                                }>
                                {Object.values(Button.ENUMS.COLOR).map(val => (
                                    <option key={`color-${val}`}>{val}</option>
                                ))}
                            </select>
                        </div>
                        <div className='form-group'>
                            <select
                                name='size'
                                value={this.state.size || ''}
                                onChange={e =>
                                    this.setState({
                                        [e.target.name]: e.target.value,
                                    })
                                }>
                                {Object.values(Button.ENUMS.SIZE).map(val => (
                                    <option key={`size-${val}`}>{val}</option>
                                ))}
                            </select>
                        </div>
                        <div className='form-group'>
                            <select
                                name='appearance'
                                value={this.state.appearance || ''}
                                onChange={e =>
                                    this.setState({
                                        [e.target.name]: e.target.value,
                                    })
                                }>
                                <option value={null}>default</option>
                                {Object.values(Button.ENUMS.APPEARANCE).map(
                                    val => (
                                        <option key={`appearance-${val}`}>
                                            {val}
                                        </option>
                                    ),
                                )}
                            </select>
                        </div>
                        <div className='form-group'>
                            <select
                                name='outline'
                                value={this.state.outline || ''}
                                onChange={e =>
                                    this.setState({
                                        [e.target.name]:
                                            e.target.value === 'true'
                                                ? true
                                                : false,
                                    })
                                }>
                                <option value={false}>no outline</option>
                                <option value={true}>outline</option>
                            </select>
                        </div>
                        <div className='form-group'>
                            <select
                                name='readOnly'
                                value={this.state.readOnly || ''}
                                onChange={e =>
                                    this.setState({
                                        [e.target.name]:
                                            e.target.value === 'true'
                                                ? true
                                                : false,
                                        disabled:
                                            e.target.value !== 'true'
                                                ? this.state.disabled
                                                : false,
                                    })
                                }>
                                <option value={false}>clickable</option>
                                <option value={true}>readOnly</option>
                            </select>
                        </div>
                        <div className='form-group'>
                            <select
                                name='disabled'
                                value={this.state.disabled || ''}
                                onChange={e =>
                                    this.setState({
                                        [e.target.name]:
                                            e.target.value === 'true'
                                                ? true
                                                : false,
                                        readOnly:
                                            e.target.value !== 'true'
                                                ? this.state.readOnly
                                                : false,
                                    })
                                }>
                                <option value={false}>enabled</option>
                                <option value={true}>disabled</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='flex middle center'>
                    <Button {...buttonProps}>Button</Button>
                </div>
                <div className='hr mx--32' />
                <h3 className='my-xs-20'>Properties</h3>
                <div className='ar-data-table'>
                    <Properties />
                </div>

                <div className='hr mx--32' />
                <h3 className='my-xs-20'>Import</h3>
                <div style={{ margin: '0 -25px' }}>
                    <Usage>
                        {
                            "import { Button } from '@atomic-reactor/reactium-ui';"
                        }
                    </Usage>
                </div>
                <h3 className='my-xs-20'>Usage</h3>
                <div style={{ margin: '0 -25px' }}>
                    <div className='row flex-middle bg-black'>
                        <div className='col-xs-12 col-sm-9'>
                            <Usage>
                                {
                                    '<Button color={Button.ENUMS.COLOR.PRIMARY} size={Button.ENUMS.SIZE.SM}>Button</Button>'
                                }
                            </Usage>
                        </div>
                        <div className='col-xs-12 col-sm-3 flex-center py-20'>
                            <Button
                                color={Button.ENUMS.COLOR.PRIMARY}
                                size={Button.ENUMS.SIZE.SM}>
                                Button
                            </Button>
                        </div>
                    </div>
                </div>
                <h3 className='my-xs-20'>ENUMS</h3>
                <div style={{ margin: '0 -25px' }}>
                    <Usage language='json'>
                        {JSON.stringify(Button.ENUMS, null, 4)}
                    </Usage>
                </div>
            </div>
        );
    }
}
