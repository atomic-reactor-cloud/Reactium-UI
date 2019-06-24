import React, { useEffect } from 'react';

const noop = () => {};

const ENUMS = {
    EVENT: {
        CHANGE: 'change',
        INIT: 'init',
    },
};

export default function useUpdated(state = {}, prevState = {}) {
    const { init = false, onChange = noop, onInit = noop } = state;
    const prev = { ...JSON.parse(JSON.stringify(state)) };

    if (init === true && state.updated !== prevState.updated) {
        onChange({
            ...state,
            type: ENUMS.EVENT.CHANGE,
            prevState: prevState,
        });
    }

    if (init === false) {
        state.init = true;
        onInit({ type: ENUMS.EVENT.INIT, ...state });
    }

    return prev;
}
