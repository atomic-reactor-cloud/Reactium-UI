const ENUMS = {
    ANIMATION: {
        COVER: 'cover',
        FADE: 'fade',
        FLIP: 'flip',
        SLIDE: 'slide',
        REVEAL: 'reveal',
    },
    DIRECTION: {
        UP: 'up',
        DOWN: 'down',
        LEFT: 'left',
        RIGHT: 'right',
        IN: 'in',
        OUT: 'out',
    },
    DURATION: 0.5,
    EVENT: {
        BEFORE_CHANGE: 'beforeChange',
        CHANGE: 'change',
    },
    OPPOSITE: {
        up: 'down',
        down: 'up',
        left: 'right',
        right: 'left',
        in: 'out',
        out: 'in',
        cover: 'reveal',
        reveal: 'cover',
        fade: 'fade',
        flip: 'flip',
        slide: 'slide',
    },
};

export default ENUMS;
