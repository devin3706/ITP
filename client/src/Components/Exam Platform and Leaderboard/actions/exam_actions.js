export const SET_EXAM_NAME = "SET_EXAM_NAME"

export const setExamName = (examName) => {
    return {
        type: SET_EXAM_NAME,
        payload: examName,
    };
};