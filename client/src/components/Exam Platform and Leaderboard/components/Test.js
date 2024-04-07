import React, { useState, useEffect } from 'react';
import { getServerData, putServerData, deleteServerData } from '../helper/helper';
import '../styles/Test.css'

export default function EditableResultView() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getServerData('http://localhost:8081/api/result', (res) => {
            setData(res);
        });
    }, []);

    const handleInputChange = (index, field, value) => {
        // Update the data state with the modified value
        const updatedData = [...data];
        updatedData[index][field] = value;
        setData(updatedData);
    };

    const handleSaveResult = async (index) => {
        try {
            const editedResult = data[index];
            await putServerData('http://localhost:8081/api/result', editedResult);
            console.log('Result updated successfully');
        } catch (error) {
            console.error('Error updating result:', error);
        }
    };

    const handleDeleteResult = async (index) => {
        try {
            const resultToDelete = data[index];
            await deleteServerData('http://localhost:8081/api/result', { _id: resultToDelete._id });
            console.log('Result deleted successfully');
            
            // Update local state to remove the deleted result
            const updatedData = [...data];
            updatedData.splice(index, 1);
            setData(updatedData);
        } catch (error) {
            console.error('Error deleting result:', error);
        }
    };

    return (
        <div className="editable-result-view">
            <h2>Result Manager</h2>
            {data.length === 0 ? (
                <p>No results found.</p>
            ) : (
                <ul>
                    {data.map((result, index) => (
                        <li key={result._id}>
                            <strong>Username:</strong>
                            <input
                                type="text"
                                value={result.username}
                                onChange={(e) =>
                                    handleInputChange(index, 'username', e.target.value)
                                }
                            />
                            <strong>Questions Answered:</strong>
                            <input
                                type="number"
                                value={result.attempts}
                                onChange={(e) =>
                                    handleInputChange(index, 'attempts', e.target.value)
                                }
                            />
                            <strong>Marks:</strong>
                            <input
                                type="number"
                                value={result.points}
                                onChange={(e) =>
                                    handleInputChange(index, 'points', e.target.value)
                                }
                            />
                            <strong>Achieved:</strong>
                            <input
                                type="text"
                                value={result.achieved}
                                onChange={(e) =>
                                    handleInputChange(index, 'achieved', e.target.value)
                                }
                            />
                            <button onClick={() => handleSaveResult(index)}>Update</button>
                            <button1 onClick={() => handleDeleteResult(index)}>Delete</button1>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
