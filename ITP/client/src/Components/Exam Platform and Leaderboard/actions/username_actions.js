export const SET_USERNAME = 'SET_USERNAME'

export const setUsername = (name) => {
    return {
        type: SET_USERNAME,
        payload: name,
    };
};