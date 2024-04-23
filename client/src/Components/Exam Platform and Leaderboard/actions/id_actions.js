export const SET_EXAM_ID = 'SET_EXAM_ID';

export const setExamId = (examId) => {
  return {
    type: SET_EXAM_ID,
    payload: examId,
  };
};