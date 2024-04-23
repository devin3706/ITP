import React, { useState, useEffect } from 'react';
import { getServerData, putServerData, deleteServerData } from '../helper/helper';
import '../../../styles.css';
import Footer from './Footer';
import Header from './Header';

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
        <div style={{backgroundColor: '#ECF0F5'}}>
        <Header/>
        <div className='container'>
            <h2 className='alert alert-info mt-5 text-center text-primary border border-primary'>Result Manager</h2>
            {data.length === 0 ? (
                <p>No results found.</p>
            ) : (
                <div>
                    {data.map((result, index) => (
                        <li key={result._id} className='row align-items-center border border-dark-subtle p-1'>
                            <strong className='w-auto'>Username:</strong>
                            <input
                                type="text"
                                className='w-10'
                                value={result.username}
                                onChange={(e) =>
                                    handleInputChange(index, 'username', e.target.value)
                                }
                            />
                            <strong className='w-auto ml-4'>Questions Answered:</strong>
                            <input
                                type="number"
                                className='w-5'
                                value={result.attempts}
                                onChange={(e) =>
                                    handleInputChange(index, 'attempts', e.target.value)
                                }
                            />
                            <strong className='w-auto ml-4'>Marks:</strong>
                            <input
                                type="number"
                                className='w-6 ml-2'
                                value={result.points}
                                onChange={(e) =>
                                    handleInputChange(index, 'points', e.target.value)
                                }
                            />
                            <strong className='w-auto ml-4'>Achieved:</strong>
                            <input
                                type="text"
                                className='w-8 mr-3'
                                value={result.achieved}
                                onChange={(e) =>
                                    handleInputChange(index, 'achieved', e.target.value)
                                }
                            />
                            <button type="button" class="btn btn-sm btn-info w-8 ml-4" onClick={() => handleSaveResult(index)}>Update</button>
                            <button type="button" class="btn btn-sm btn-danger w-8 ml-1" onClick={() => handleDeleteResult(index)}>Delete</button>
                        </li>
                    ))}
                </div>
            )}
        </div>
        <Footer/>
        </div>
    );
}
