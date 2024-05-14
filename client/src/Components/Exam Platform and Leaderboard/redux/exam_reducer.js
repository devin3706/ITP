import { SET_EXAM_NAME } from "../actions/exam_actions";

const initialState = {
    examName: '',
};

const examNameReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EXAM_NAME:
        return {
            ...state,
            examName: action.payload
        };
        default:
            return state;
    }
};

export default examNameReducer;