/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import _ from 'underscore';
import React, { Component } from 'react';
import { Button, Icon, Scene } from 'components/common-ui';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: SceneMolecule
 * -----------------------------------------------------------------------------
 */

class SceneMolecule extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    constructor(props) {
        super(props);
        this.state = {
            animation: Scene.ENUMS.ANIMATION.COVER,
            direction: Scene.ENUMS.DIRECTION.LEFT,
            duration: 0.25,
        };
        this.scene = null;
    }

    render() {
        const { animation, direction, duration } = this.state;
        let directions = Object.values(Scene.ENUMS.DIRECTION);

        if (animation === Scene.ENUMS.ANIMATION.FADE) {
            directions = [Scene.ENUMS.DIRECTION.IN, Scene.ENUMS.DIRECTION.OUT];
        } else {
            directions = _.without(
                directions,
                Scene.ENUMS.DIRECTION.IN,
                Scene.ENUMS.DIRECTION.OUT,
            );
        }

        return (
            <div className='flex middle column'>
                <div className='btn-group'>
                    <div className='form-group'>
                        <select
                            value={animation}
                            style={{ width: 120 }}
                            onChange={e =>
                                this.setState({ animation: e.target.value })
                            }>
                            {Object.values(Scene.ENUMS.ANIMATION).map(anime => (
                                <option key={`animation-${anime}`}>
                                    {anime}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='form-group'>
                        <select
                            value={direction}
                            style={{ width: 120 }}
                            onChange={e =>
                                this.setState({ direction: e.target.value })
                            }>
                            {directions.map(dir => (
                                <option key={`direction-${dir}`}>{dir}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-group'>
                        <input
                            type='number'
                            value={duration}
                            min={0}
                            step={0.05}
                            placeholder='seconds'
                            style={{ width: 100 }}
                            onChange={e =>
                                this.setState({
                                    duration: Number(e.target.value),
                                })
                            }
                        />
                    </div>
                </div>
                <div
                    style={{
                        width: '100vw',
                        height: 300,
                        position: 'relative',
                        margin: '25px -25px',
                    }}>
                    <Scene
                        active='dashboard'
                        animation={animation}
                        direction={direction}
                        duration={duration}
                        width='100%'
                        height={300}
                        onChange={console.log}
                        ref={elm => {
                            this.scene = elm;
                        }}>
                        <div
                            id='dashboard'
                            className='p-20 bg-white'
                            style={{
                                height: '100%',
                            }}>
                            <div className='flex middle'>
                                <Button size='xs' color='clear' readOnly>
                                    <Icon.Feather.Monitor
                                        width={16}
                                        height={16}
                                    />
                                </Button>
                                Dashboard
                            </div>
                        </div>
                        <div
                            id='profile'
                            className='p-20 bg-white'
                            style={{
                                height: '100%',
                            }}>
                            <div className='flex middle'>
                                <Button
                                    color='clear'
                                    size='xs'
                                    onClick={() => this.scene.back()}>
                                    <Icon.Feather.ChevronLeft
                                        width={16}
                                        height={16}
                                    />
                                </Button>
                                Profile
                            </div>
                        </div>
                        <div
                            id='menu'
                            className='p-20 white bg-blue'
                            style={{
                                height: '100%',
                            }}>
                            <div className='flex middle'>
                                <Button
                                    color='primary'
                                    size='xs'
                                    onClick={() => this.scene.back()}>
                                    <Icon.Feather.ChevronLeft
                                        width={16}
                                        height={16}
                                    />
                                </Button>
                                Menu
                            </div>
                        </div>
                    </Scene>
                </div>
                <div className='btn-group'>
                    <Button
                        onClick={() =>
                            this.scene.navTo(
                                {
                                    panel: 'dashboard',
                                    direction: 'right',
                                },
                                null,
                                true,
                            )
                        }>
                        <Icon.Feather.Monitor />
                    </Button>
                    <Button
                        onClick={() => {
                            const { index = 0 } = this.scene;
                            const direction =
                                index > this.scene.indexOf('profile')
                                    ? 'right'
                                    : 'left';
                            this.scene.navTo({
                                panel: 'profile',
                                direction,
                            });
                        }}>
                        <Icon.Feather.User />
                    </Button>
                    <Button
                        onClick={() => {
                            const { index = 0 } = this.scene;
                            const direction =
                                index > this.scene.indexOf('menu')
                                    ? 'right'
                                    : 'left';
                            this.scene.navTo({
                                panel: 'menu',
                                direction,
                            });
                        }}>
                        <Icon.Feather.MoreHorizontal />
                    </Button>
                </div>
            </div>
        );
    }
}

// Default properties
SceneMolecule.defaultProps = {};

export default SceneMolecule;
