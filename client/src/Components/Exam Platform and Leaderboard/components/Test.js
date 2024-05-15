import React, { useState, useEffect } from 'react';
import { getServerData, putServerData, deleteServerData } from '../helper/helper';
import '../../../styles.css';
import Footer from './Footer';
import Header from './Header';

export default function EditableResultView() {
    const [data, setData] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);

    useEffect(() => {
        getServerData('http://localhost:8081/api/result', (res) => {
            setData(res);
        });
    }, []);

    const handleInputChange = (index, field, value) => {
        // Update the data state with the modified value
        const updatedData = [...data];
        updatedData[index][field] = value;
        
        // Perform validation dynamically
        const errors = [];
        if (field === 'attempts') {
            const attempts = parseInt(value);
            if (attempts < 0 || attempts > 5) {
                errors.push('Questions Answered must be a number from 0 to 5.');
            }
        }
        setData(updatedData);
        setErrorMessages(errors);
    };

    const handleSaveResult = async (index) => {
        const result = data[index];
        const errors = [];
    
        // Validate input fields
        if (!result.username || !result.examName || !result.attempts || !result.points || !result.achieved) {
            errors.push('All fields are required.');
        }
        if (result.attempts < 0 || result.attempts > 5) {
            errors.push('Questions Answered must be a number from 0 to 5.');
        }
        if (![0, 10, 20, 30, 40, 50].includes(parseInt(result.points))) { // Parse result.points to an integer
            errors.push('Marks must be one of: 0, 10, 20, 30, 40, 50.');
        }
        if (!['Passed', 'Failed'].includes(result.achieved)) {
            errors.push('Result Achieved must be either "Passed" or "Failed".');
        }
    
        // Dynamic validation based on marks
        const marks = parseInt(result.points);
        const attempts = parseInt(result.attempts);
        if (marks > attempts * 10) {
            errors.push('Marks cannot be greater than Questions Answered * 10.');
        }
        if ((result.achieved === 'Failed' && marks >= 30) || (result.achieved === 'Passed' && marks < 30)) {
            errors.push('Invalid combination: Marks do not match result achieved.');
        }
    
        // Display error messages
        if (errors.length > 0) {
            setErrorMessages(errors);
            return;
        }
    
        try {
            await putServerData('http://localhost:8081/api/result', result);
            console.log('Result updated successfully');
        } catch (error) {
            console.error('Error updating result:', error);
        }
    };

    const handleDeleteResult = async (index) => {
        const resultToDelete = data[index];
        const confirmDelete = window.confirm('Are you sure you want to delete this result?');

        if (confirmDelete) {
            try {
                await deleteServerData('http://localhost:8081/api/result', { _id: resultToDelete._id });
                console.log('Result deleted successfully');
                
                // Update local state to remove the deleted result
                const updatedData = [...data];
                updatedData.splice(index, 1);
                setData(updatedData);
            } catch (error) {
                console.error('Error deleting result:', error);
            }
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
                                    readOnly // Username cannot be changed
                                />
                                <strong className='w-auto'>Exam Name:</strong>
                                <input
                                    type="text"
                                    className='w-5'
                                    value={result.examName}
                                    readOnly
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
                                <button type="button" className="btn btn-sm btn-info w-8 ml-4" onClick={() => handleSaveResult(index)}>Update</button>
                                <button type="button" className="btn btn-sm btn-danger w-8 ml-1" onClick={() => handleDeleteResult(index)}>Delete</button>
                            </li>
                        ))}
                    </div>
                )}
                {errorMessages.length > 0 && (
                    <div className="alert alert-danger mt-3">
                        <ul>
                            {errorMessages.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    );
}