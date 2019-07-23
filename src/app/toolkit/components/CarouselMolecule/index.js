/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */

import Events from './Events';
import Methods from './Methods';
import Code from 'toolkit/Code';
import Properties from './Properties';
import React, { Component } from 'react';
import { Button, Carousel, Icon, Slide, Toggle } from 'components/common-ui';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: CarouselMolecule
 * -----------------------------------------------------------------------------
 */

class CarouselMolecule extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    carousel = null;

    state = {
        autoplay: true,
        duration: 5,
        loop: true,
        speed: 0.25,
        startIndex: 0,
        swipeable: true,
    };

    toggleAutoPlay() {
        const { autoplay } = this.state;
        this.setState({ autoplay: !autoplay });
    }

    toggleLoop() {
        const { loop } = this.state;
        this.setState({ loop: !loop });
    }

    toggleSwipeable() {
        const { swipeable } = this.state;
        this.setState({ swipeable: !swipeable });
    }

    render() {
        const {
            autoplay,
            duration,
            loop,
            speed,
            startIndex,
            swipeable,
        } = this.state;

        return (
            <>
                <p className='pb-xs-20'>
                    The Carousel component linearly cycles through{' '}
                    <kbd>{'<Slide />'}</kbd> components. The children of the{' '}
                    <kbd>{'<Slide />'}</kbd> components can be any renderable
                    node.
                </p>
                <div className='flex-xs-center'>
                    <div className='col-xs-12 col-sm-3 col-lg-2 mb-xs-24'>
                        <Toggle
                            label='Autoplay'
                            checked={autoplay}
                            className='mb-xs-10'
                            onChange={() => this.toggleAutoPlay()}
                        />
                        <Toggle
                            label='Loop'
                            checked={loop}
                            className='mb-xs-10'
                            onChange={() => this.toggleLoop()}
                        />
                        <Toggle
                            label='Swipeable'
                            checked={swipeable}
                            className='mb-xs-10'
                            onChange={() => this.toggleSwipeable()}
                        />
                    </div>
                </div>

                <div style={{ height: 200 }}>
                    <Carousel
                        animationSpeed={speed}
                        autoplay={autoplay}
                        duration={duration}
                        loop={loop}
                        startIndex={startIndex}
                        swipeable={swipeable}
                        ref={elm => (this.carousel = elm)}>
                        <Slide>
                            <div className='bg-blue white p-xs-24 p-md-40 fullheight'>
                                SLIDE - 0
                            </div>
                        </Slide>
                        <Slide>
                            <div className='bg-red white p-xs-24 p-md-40 fullheight'>
                                SLIDE - 1
                            </div>
                        </Slide>
                        <Slide>
                            <div className='bg-green white p-xs-24 p-md-40 fullheight'>
                                SLIDE - 2
                            </div>
                        </Slide>
                        <Slide>
                            <div className='bg-grey white p-xs-24 p-md-40 fullheight'>
                                SLIDE - 3
                                <p>
                                    Try tabbing to the next slide which has an
                                    input in it..
                                </p>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        placeholder='Do something...'
                                    />
                                </div>
                            </div>
                        </Slide>
                        <Slide>
                            <div className='bg-purple white p-xs-24 p-md-40 fullheight'>
                                SLIDE - 4<p>You can't SUCKA!!</p>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        placeholder='Say something...'
                                    />
                                </div>
                            </div>
                        </Slide>
                        <Slide>
                            <div className='bg-green-light white p-xs-24 p-md-40 fullheight'>
                                SLIDE - 5
                            </div>
                        </Slide>
                    </Carousel>
                </div>
                <div className='flex-center mt-xs-20'>
                    <div className='btn-group'>
                        <Button
                            onClick={() => this.carousel.prev()}
                            size={Button.ENUMS.SIZE.XS}>
                            <Icon.Feather.ChevronLeft />
                        </Button>
                        <Button
                            onClick={() => this.carousel.jumpTo(3)}
                            size={Button.ENUMS.SIZE.SM}>
                            Slide - 3
                        </Button>
                        <Button
                            onClick={() => this.carousel.next()}
                            size={Button.ENUMS.SIZE.XS}>
                            <Icon.Feather.ChevronRight />
                        </Button>
                    </div>
                </div>

                <div className='hr mx--32' />

                <h3 className='my-xs-20'>Import</h3>
                <div className='ht' style={{ margin: '0 -25px' }}>
                    <Code>
                        {
                            "import { Carousel, Slide } from '@atomic-reactor/reactium-ui';"
                        }
                    </Code>
                </div>

                <h3 className='my-xs-20'>Usage</h3>
                <div className='ht' style={{ margin: '0 -25px' }}>
                    <Code>
                        {`<Carousel>
                            <Slide>
                                SLIDE - 0
                            </Slide>
                            <Slide>
                                SLIDE - 1
                            </Slide>
                            <Slide>
                                SLIDE - 2
                            </Slide>
                            <Slide>
                                SLIDE - 3
                            </Slide>
                        </Carousel>`}
                    </Code>
                </div>

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
            </>
        );
    }
}

// Default properties
CarouselMolecule.defaultProps = {};

export default CarouselMolecule;
