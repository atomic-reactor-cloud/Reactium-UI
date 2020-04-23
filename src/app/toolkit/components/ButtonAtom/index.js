/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */

import React from 'react';
import op from 'object-path';
import { useDerivedState, useHookComponent } from 'reactium-core/sdk';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: ButtonAtom
 * -----------------------------------------------------------------------------
 */

const ButtonAtom = () => {
    const { Button } = useHookComponent('ReactiumUI');

    const [state, setNewState] = useDerivedState({
        appearance: null,
        color: Button.ENUMS.COLOR.PRIMARY,
        disabled: false,
        outline: false,
        readOnly: false,
        size: Button.ENUMS.SIZE.XS,
    });

    const setState = newState => {
        if (op.get(newState, 'appearance') === Button.ENUMS.APPEARANCE.CIRCLE) {
            op.set(newState, 'size', Button.ENUMS.SIZE.SM);
        }

        setNewState(newState);
    };

    const render = () => {
        let { appearance } = state;

        appearance =
            String(appearance).toLowerCase() === 'default' ? null : appearance;

        const buttonProps = { ...state, appearance };

        if (appearance === Button.ENUMS.APPEARANCE.CIRCLE) {
            buttonProps.style = { width: 80, height: 80, padding: 0 };
        }

        return (
            <div style={{ minHeight: 220 }}>
                <div className='flex-center mb-xs-20'>
                    <div className='btn-group'>
                        <div className='form-group'>
                            <select
                                name='color'
                                value={state.color || ''}
                                onChange={e =>
                                    setState({
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
                                value={state.size || ''}
                                onChange={e =>
                                    setState({
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
                                value={state.appearance || ''}
                                onChange={e =>
                                    setState({
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
                                value={state.outline || ''}
                                onChange={e =>
                                    setState({
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
                                value={state.readOnly || ''}
                                onChange={e =>
                                    setState({
                                        [e.target.name]:
                                            e.target.value === 'true'
                                                ? true
                                                : false,
                                        disabled:
                                            e.target.value !== 'true'
                                                ? state.disabled
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
                                value={state.disabled || ''}
                                onChange={e =>
                                    setState({
                                        [e.target.name]:
                                            e.target.value === 'true'
                                                ? true
                                                : false,
                                        readOnly:
                                            e.target.value !== 'true'
                                                ? state.readOnly
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
                    <Button {...buttonProps} type='link' href='#'>
                        Button
                    </Button>
                </div>
            </div>
        );
    };

    return render();
};

ButtonAtom.dependencies = () =>
    typeof module !== 'undefined' ? module.children : [];

export default ButtonAtom;
