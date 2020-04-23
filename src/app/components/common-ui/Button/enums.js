import React from 'react';

export default {
    APPEARANCE: {
        CIRCLE: 'circle',
        PILL: 'pill',
    },
    COLOR: {
        CLEAR: 'clear',
        DANGER: 'danger',
        DEFAULT: 'default',
        ERROR: 'error',
        INFO: 'info',
        PRIMARY: 'primary',
        SECONDARY: 'secondary',
        SUCCESS: 'success',
        TERTIARY: 'tertiary',
        WARNING: 'warning',
    },
    ELEMENT: {
        BUTTON: props => <button {...props} type='button' />,
        LABEL: props => <label {...props} />,
        LINK: props => <a {...props} />,
        SUBMIT: props => <button {...props} type='submit' />,
    },
    SIZE: {
        XS: 'xs',
        SM: 'sm',
        MD: 'md',
        LG: 'lg',
    },
    TYPE: {
        BUTTON: 'BUTTON',
        LABEL: 'LABEL',
        LINK: 'LINK',
        SUBMIT: 'SUBMIT',
    },
};
