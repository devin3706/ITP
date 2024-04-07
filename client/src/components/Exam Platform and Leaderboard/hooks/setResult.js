import { postServerData, putServerData, deleteServerData } from '../helper/helper'
import * as Action from '../redux/result_reducer'

export const PushAnswer = (result) => async (dispatch) => {
    try{ 
        await dispatch(Action.pushResultAction(result))
    } catch (error) {
        console.log(error)
    }
}

export const updateResult = (index) => async (dispatch) => {
    try {
        dispatch(Action.updateResultAction(index))
    } catch (error) {
        console.log(error)
    }
}

//insert user data
export const usePublishResult = (resultData) => {
    const {result, username} = resultData;
    (async () => { 
        try{
            if(result.length === 0 && !username) throw new Error("Couldn't get result");
            await postServerData('http://localhost:8081/api/result', resultData, data => data)
        } catch (error) {
            console.log(error)
        }
    })();
}

//update user data
export const useUpdateResult = async (resultData) => {
    try {
        const { _id } = resultData;
        if (!_id) {
            throw new Error("Invalid data provided: _id is missing");
        }

        // Update the result on the server
        await putServerData('http://localhost:8081/api/result', resultData);
        console.log('Result updated successfully');
    } catch (error) {
        console.error('Error updating result:', error);
    }
};

//delete user data
export const useDropResult = async (resultData) => {
    try {
        const { _id } = resultData;
        if (!_id) {
            throw new Error("Invalid data provided: _id is missing");
        }

        // Delete the result on the server
        await deleteServerData('http://localhost:8081/api/result', resultData);
        console.log('Result deleted successfully');
    } catch (error) {
        console.error('Error deleting result:', error);
    }
};