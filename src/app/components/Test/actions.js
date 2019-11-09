import deps from 'dependencies';

export default {
    load: data => dispatch => {
        return dispatch({
            type: deps().actionTypes.TEST_LOAD,
            data,
        });
    },
};
