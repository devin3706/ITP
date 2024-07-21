import { SET_USERNAME } from '../actions/username_actions.js';

const initialState = {
    name: '',
};

const usernameReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERNAME:
        return {
            ...state,
            name: action.payload
        };
        default:
            return state;
    }
};

export default usernameReducer;