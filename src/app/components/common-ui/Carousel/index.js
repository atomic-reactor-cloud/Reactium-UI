import cn from 'classnames';
import op from 'object-path';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TimelineMax, TweenMax, Power2 } from 'gsap/umd/TweenMax';
import ReactTouchEvents from 'react-touch-events';
import Slide from './Slide';

/**
 * -----------------------------------------------------------------------------
 * React Component: Carousel
 * -----------------------------------------------------------------------------
 */
class Carousel extends Component {
    static propTypes = {
        active: PropTypes.number,
        autoplay: PropTypes.bool,
        className: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        duration: PropTypes.number,
        loop: PropTypes.bool,
        namespace: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        next: PropTypes.number,
        onChange: PropTypes.func,
        onComplete: PropTypes.func,
        onNext: PropTypes.func,
        onPause: PropTypes.func,
        onPlay: PropTypes.func,
        onPrev: PropTypes.func,
        onResume: PropTypes.func,
        onStop: PropTypes.func,
        pauseOnHover: PropTypes.bool,
        previous: PropTypes.number,
        speed: PropTypes.number,
        startIndex: PropTypes.number,
        style: PropTypes.object,
        swipeable: PropTypes.bool,
    };

    static defaultProps = {
        active: 0,
        autoplay: false,
        duration: 10,
        loop: false,
        namespace: 'ar-carousel',
        next: null,
        onChange: null,
        onComplete: null,
        onPause: null,
        onPlay: null,
        onPrev: null,
        onResume: null,
        onStop: null,
        onNext: null,
        pauseOnHover: true,
        previous: null,
        speed: 0.5,
        startIndex: 0,
        style: {},
        swipeable: true,
    };

    static defaultStyle = {
        display: 'flex',
        flexWrap: 'no-wrap',
    };

    constructor(props) {
        super(props);

        const { active, next, previous, startIndex, style } = props;

        this.slides = {};

        this.state = {
            active: startIndex || active,
            next,
            previous,
            style,
        };

        this.animating = false;
        this.container = null;
        this.index = startIndex || active;
        this.paused = false;
        this.timer = null;

        this.onChange = this.onChange.bind(this);
        this.onComplete = this.onComplete.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onSwipe = this.onSwipe.bind(this);
        this.next = this.next.bind(this);
        this.pause = this.pause.bind(this);
        this.play = this.play.bind(this);
        this.prev = this.prev.bind(this);
        this.resume = this.resume.bind(this);
        this.stop = this.stop.bind(this);
        this.jumpTo = this.jumpTo.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { autoplay: prevautoplay } = prevProps;
        const { autoplay } = this.props;

        if (prevautoplay !== autoplay) {
            if (autoplay === true) {
                this.play();
            } else {
                this.stop();
            }
        }
    }

    componentDidMount() {
        if (typeof window !== 'undefined') {
            this.container.addEventListener('mouseenter', this.pause);
            this.container.addEventListener('mouseleave', this.resume);
            this.play();
        }
    }

    componentWillUnmount() {
        if (typeof window !== 'undefined') {
            this.stop();
            this.container.removeEventListener('mouseenter', this.pause);
            this.container.removeEventListener('mouseleave', this.resume);
        }
    }

    jumpTo(index) {
        const { active } = this.state;

        if (index === active) {
            return;
        }

        if (index < active) {
            this.prev(index);
        }

        if (index >= active) {
            this.next(index);
        }
    }

    next(next) {
        if (this.animating === true) {
            return;
        }

        const { loop, speed } = this.props;
        const max = Object.keys(this.slides).length - 1;
        const { active = 0 } = this.state;

        next = next || active + 1;
        next = loop === true && next > max ? 0 : next;

        if (next > max && !loop) {
            return;
        }

        const currentSlide = op.get(
            this.slides,
            `slide-${active}.slide.current`,
        );
        const nextSlide = op.get(this.slides, `slide-${next}.slide.current`);

        this.animating = true;
        TweenMax.set(currentSlide, { display: '' });
        TweenMax.set(nextSlide, { display: '' });

        const evt = { active, next, currentSlide, nextSlide };

        this.onNext(evt);

        const params = {
            onComplete: () => {
                this.onComplete(evt);
            },
        };

        const tl = new TimelineMax(params);
        if (next === 0) {
            tl.fromTo(
                currentSlide,
                speed,
                { xPercent: -100 },
                { xPercent: -200, ease: Power2.easeInOut },
                0,
            );
            tl.fromTo(
                nextSlide,
                speed,
                { xPercent: 100 },
                { xPercent: 0, ease: Power2.easeInOut },
                0,
            );
        } else {
            tl.fromTo(
                currentSlide,
                speed,
                { xPercent: 0 },
                { xPercent: -100, ease: Power2.easeInOut },
                0,
            );
            tl.fromTo(
                nextSlide,
                speed,
                { xPercent: 0 },
                { xPercent: -100, ease: Power2.easeInOut },
                0,
            );
        }
    }

    pause() {
        const { onPause, pauseOnHover } = this.props;
        if (pauseOnHover !== true) {
            return;
        }

        this.paused = true;

        if (typeof onPause === 'function') {
            onPause({ index: this.index });
        }
    }

    play(index) {
        let { autoplay = false, duration, onPlay } = this.props;

        if (autoplay !== true) {
            return;
        }

        this.stop(true);

        if (index) {
            this.next(index);
        }

        this.timer = setInterval(() => {
            if (this.paused !== true) {
                this.next();
            }
        }, duration * 1000);

        if (typeof onPlay === 'function') {
            onPlay({ index: this.index });
        }
    }

    prev(next) {
        if (this.animating === true) {
            return;
        }

        const { loop, speed } = this.props;
        const max = Object.keys(this.slides).length - 1;
        const { active = 0 } = this.state;

        next = next || active - 1;
        next = loop === true && next < 0 ? max : next;

        if (next < 0) {
            return;
        }

        this.animating = true;

        const currentSlide = op.get(
            this.slides,
            `slide-${active}.slide.current`,
        );
        const nextSlide = op.get(this.slides, `slide-${next}.slide.current`);

        TweenMax.set(currentSlide, { display: '', xPercent: -100 });
        TweenMax.set(nextSlide, { display: '' });

        const evt = { active, next, currentSlide, nextSlide };

        this.onPrev(evt);

        const params = {
            onComplete: () => {
                this.onComplete(evt);
            },
        };

        const tl = new TimelineMax(params);
        if (next === max) {
            tl.fromTo(
                currentSlide,
                speed,
                { xPercent: 0 },
                { xPercent: 100, ease: Power2.easeInOut },
                0,
            );
            tl.fromTo(
                nextSlide,
                speed,
                { xPercent: -200 },
                { xPercent: -100, ease: Power2.easeInOut },
                0,
            );
        } else {
            tl.fromTo(
                currentSlide,
                speed,
                { xPercent: -100 },
                { xPercent: 0, ease: Power2.easeInOut },
                0,
            );
            tl.fromTo(
                nextSlide,
                speed,
                { xPercent: -100 },
                { xPercent: 0, ease: Power2.easeInOut },
                0,
            );
        }
    }

    resume() {
        const { onResume } = this.props;

        this.paused = false;

        if (typeof onResume === 'function') {
            onResume({ index: this.index });
        }
    }

    stop(silent) {
        const { onStop } = this.props;

        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }

        if (!silent && typeof onStop === 'function') {
            onStop({ index: this.index });
        }
    }

    onChange(evt) {
        const { active, next, currentSlide, nextSlide } = evt;
        const { onChange } = this.props;

        this.index = next;

        if (typeof onChange === 'function') {
            onChange({
                previous: active,
                active: next,
                previousSlide: currentSlide,
                currentSlide: nextSlide,
            });
        }
    }

    onComplete(evt) {
        this.play();
        const { active, next, currentSlide, nextSlide } = evt;
        const { onComplete } = this.props;

        TweenMax.set(nextSlide, { xPercent: 0, display: '' });

        this.animating = false;

        if (typeof onComplete === 'function') {
            onComplete({
                previous: active,
                active: next,
                previousSlide: currentSlide,
                currentSlide: nextSlide,
            });
        }

        this.setState({ active: next, next: null });

        setTimeout(() => {
            this.onChange(evt);
        }, 100);
    }

    onNext(evt) {
        this.stop();
        const { onNext } = this.props;
        if (typeof onNext === 'function') {
            onNext(evt);
        }
    }

    onPrev(evt) {
        this.stop();
        const { onPrev } = this.props;
        if (typeof onPrev === 'function') {
            onPrev(evt);
        }
    }

    onSwipe(dir) {
        const { swipeable } = this.props;

        if (swipeable !== true) {
            return;
        }

        switch (dir) {
            case 'left':
                this.next();
                break;

            case 'right':
                this.prev();
                break;
        }
    }

    render() {
        let { active, next, style } = this.state;
        const { children, className, namespace } = this.props;

        style = {
            ...Carousel.defaultStyle,
            ...style,
        };

        const cname = cn({
            [namespace]: !!namespace,
            [className]: !!className,
        });

        return (
            <ReactTouchEvents onSwipe={this.onSwipe} onTap={this.pause}>
                <div
                    style={style}
                    className={cname}
                    ref={elm => (this.container = elm)}>
                    {React.Children.map(children, (child, index) =>
                        React.cloneElement(child, {
                            active,
                            index,
                            next,
                            onComplete: this.onComplete,
                            ref: slide => {
                                this.slides[`slide-${index}`] = slide;
                            },
                        }),
                    )}
                </div>
            </ReactTouchEvents>
        );
    }
}

export { Carousel as default, Slide };
