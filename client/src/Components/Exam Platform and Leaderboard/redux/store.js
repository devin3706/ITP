import { combineReducers, configureStore } from '@reduxjs/toolkit'

//call reducers
import questionReducer from './question_reducer'
import resultReducer from './result_reducer'
import idReducer from './id_reducer'
import usernameReducer from './username_reducer'
import examNameReducer from './exam_reducer'

const rootReducer = combineReducers({
    questions : questionReducer,
    result : resultReducer,
    examId : idReducer,
    name : usernameReducer,
    examName : examNameReducer,
})

// create store with reducer
export default configureStore({reducer : rootReducer});