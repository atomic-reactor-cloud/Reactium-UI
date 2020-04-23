/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */

import React, { useEffect, useRef, useState } from 'react';
import { useDerivedState, useHookComponent } from 'reactium-core/sdk';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: CarouselMolecule
 * -----------------------------------------------------------------------------
 */

const CarouselMolecule = () => {
    const carouselRef = useRef();

    const { Button, Carousel, Icon, Slide, Toggle } = useHookComponent(
        'ReactiumUI',
    );

    const [carousel, setCarousel] = useState(carouselRef.current);

    const [state, setState] = useDerivedState({
        autoplay: true,
        duration: 5,
        loop: true,
        speed: 0.25,
        startIndex: 0,
        swipeable: true,
    });

    const toggleAutoPlay = () => {
        const { autoplay } = state;
        setState({ autoplay: !autoplay });
    };

    const toggleLoop = () => {
        const { loop } = state;
        setState({ loop: !loop });
    };

    const toggleSwipeable = () => {
        const { swipeable } = state;
        setState({ swipeable: !swipeable });
    };

    useEffect(() => {
        setCarousel(carouselRef.current);
    }, [carouselRef.current]);

    const render = () => {
        const {
            autoplay,
            duration,
            loop,
            speed,
            startIndex,
            swipeable,
        } = state;

        return (
            <>
                <div className='flex-xs-center'>
                    <div className='col-xs-12 col-sm-3 col-lg-2 mb-xs-24'>
                        <Toggle
                            label='Autoplay'
                            checked={autoplay}
                            className='mb-xs-10'
                            onChange={() => toggleAutoPlay()}
                        />
                        <Toggle
                            label='Loop'
                            checked={loop}
                            className='mb-xs-10'
                            onChange={() => toggleLoop()}
                        />
                        <Toggle
                            label='Swipeable'
                            checked={swipeable}
                            className='mb-xs-10'
                            onChange={() => toggleSwipeable()}
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
                        ref={carouselRef}>
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
                            onClick={() => carousel.prev()}
                            size={Button.ENUMS.SIZE.XS}>
                            <Icon.Feather.ChevronLeft />
                        </Button>
                        <Button
                            onClick={() => carousel.jumpTo(3)}
                            size={Button.ENUMS.SIZE.SM}>
                            Slide - 3
                        </Button>
                        <Button
                            onClick={() => carousel.next()}
                            size={Button.ENUMS.SIZE.XS}>
                            <Icon.Feather.ChevronRight />
                        </Button>
                    </div>
                </div>
            </>
        );
    };

    return render();
};

// Default properties
CarouselMolecule.defaultProps = {};

export default CarouselMolecule;
