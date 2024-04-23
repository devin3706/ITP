import { SET_EXAM_ID } from '../actions/id_actions.js';

const initialState = {
  examId: null,
};

const idReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EXAM_ID:
      return {
        ...state,
        examId: action.payload,
      };
    default:
      return state;
  }
};

export default idReducer;