import React, { useEffect, useState } from 'react'
import { getServerData } from '../helper/helper'

export default function ResultTable(){

    const [data, setData] = useState([])

    useEffect(() => {
        getServerData('http://localhost:8081/api/result', (res) => {
            setData(res)
        });
    }, []);

    return(
        <div> 
            <table>
                <thead className='table-header'>
                    <tr className='table-row'>
                        <td>Name</td>
                        <td>Questions Answered</td>
                        <td>Marks</td>
                        <td>Result</td>
                    </tr>
                </thead>
                <tbody>
                    { !data ?? <div> No Data Found </div>}
                    {
                        data.map((v, i) => (
                         <tr className='table-body' key={i}>
                            <td>{v?.username || ''}</td>
                            <td>{v?.attempts || 0}</td>
                            <td>{v?.points || 0}</td>
                            <td>{v?.achieved || ""}</td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}