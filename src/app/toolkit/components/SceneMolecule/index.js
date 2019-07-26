/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import _ from 'underscore';
import Events from './Events';
import Methods from './Methods';
import Code from 'toolkit/Code';
import Properties from './Properties';
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

    Demo = () => {
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
                        animationSpeed={duration}
                        width='100%'
                        height={300}
                        onChange={console.log}
                        ref={elm => {
                            this.scene = elm;
                        }}>
                        <div
                            id='dashboard'
                            className='p-20 white bg-grey'
                            style={{
                                height: '100%',
                            }}>
                            <div className='flex middle'>
                                <Button size='xs' color='clear' readOnly>
                                    <Icon.Feather.Monitor
                                        style={{ fill: '#FFFFFF' }}
                                        width={16}
                                        height={16}
                                    />
                                </Button>
                                Dashboard
                            </div>
                        </div>
                        <div
                            id='profile'
                            className='p-20 white bg-gray'
                            style={{
                                height: '100%',
                            }}>
                            <div className='flex middle'>
                                <Button
                                    color='clear'
                                    size='xs'
                                    onClick={() => this.scene.back()}>
                                    <Icon.Feather.ChevronLeft
                                        style={{ fill: '#FFFFFF' }}
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
                                    color='clear'
                                    size='xs'
                                    onClick={() => this.scene.back()}>
                                    <Icon.Feather.ChevronLeft
                                        style={{ fill: '#FFFFFF' }}
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
    };

    render() {
        const { Demo } = this;
        const { animation, direction, duration } = this.state;
        return (
            <>
                <div className='mb-xs-32'>
                    <p>
                        The Scene component is similar to the Carousel component
                        in that it renders elements inside a container and
                        allows you to navigate between them. The major
                        difference is that the Scene component allows you to
                        navigate in different directions and with different
                        animations.
                    </p>
                </div>
                <Demo />

                <div className='hr mx--32' />

                <h3 className='my-xs-20'>Import</h3>
                <div className='ht' style={{ margin: '0 -25px' }}>
                    <Code>
                        {"import { Scene } from '@atomic-reactor/reactium-ui';"}
                    </Code>
                </div>

                <h3 className='my-xs-20'>Usage</h3>
                <div className='ht' style={{ margin: '0 -25px -25px -25px' }}>
                    <Code>
                        {`<Scene
                            active='dashboard'
                            animation={Scene.ENUMS.ANIMATION.COVER}
                            animationSpeed={Scene.ENUMS.DURATION}
                            direction={Scene.ENUMS.DIRECTION.LEFT}
                            width={Scene.ENUMS.SIZE.WIDTH}
                            height={Scene.ENUMS.SIZE.HEIGHT}
                            onBeforeChange={console.log}
                            onChange={console.log}>
                                <div id='dashboard'>Dashboard</div>
                                <div id='profile'>Profile</div>
                                <div id='menu'>Menu</div>
                        </Scene>`}
                    </Code>
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
                <div className='ht' style={{ margin: '0 -25px -25px -25px' }}>
                    <Code language='json'>
                        {JSON.stringify(Scene.ENUMS, null, 2)}
                    </Code>
                </div>
            </>
        );
    }
}

export default SceneMolecule;
