import React, { useState, useEffect } from 'react';
import '../../../styles.css';
import sriLankaImage from '../images/sriLanka.png';
import Footer from '../../Exam Platform and Leaderboard/components/Footer';
import Header from '../../Exam Platform and Leaderboard/components/Header';
import { Pie } from 'react-chartjs-2';
import { Link, useNavigate } from 'react-router-dom';

// API functions
import { getTeachersByDistrict, logout } from '../api/admin';
import { PiUserCircle } from 'react-icons/pi';

const Geography = () => {
    const [teachers, setTeachers] = useState([]);
    const [countText, setCountText] = useState();
    const [district, setDistrict] = useState();

    //teachers by district
    const handleHover = async (district) => {
        try {
            const teachersByDistrict = await getTeachersByDistrict();
            const teacherDistrictData = teachersByDistrict.find(item => item._id === district);
    
            if (teacherDistrictData) {
                const { tCount } = teacherDistrictData;
                setCountText(`Teachers from ${district}: ${tCount}`);
            } else {
                setCountText(`No Teachers from ${district}`);
            }
        } catch (error) {
            console.error('Error fetching teacher count:', error);
            setCountText('Error fetching teacher count');
        }
    };

    // const handleHover = async (district) => {
    //     try {
    //         const teachersByDistrict = await getTeachersByDistrict();
    //         const teacherDistrictData = teachersByDistrict.find(item => item._id === district);
    
    //         if (teacherDistrictData) {
    //             const { tCount, teachers } = teacherDistrictData;
    //             setCountText(`Teachers from ${district}: ${tCount}`);
    //             setTeachers(teachers);
    //         } else {
    //             setCountText(`No Teachers from ${district}`);
    //             setTeachers([]);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching teacher count:', error);
    //         setCountText('Error fetching teacher count');
    //         setTeachers([]);
    //     }
    // };

    //teacher details
    const handleClick = async (district) => {
        try {
            setDistrict(district)
            const teachersByDistrict = await getTeachersByDistrict();
            const teacherDistrictData = teachersByDistrict.find(item => item._id === district);
    
            if (teacherDistrictData) {
                const { teachers } = teacherDistrictData;
                setTeachers(teachers);
            } else {
                setTeachers([]);
            }
        } catch (error) {
            console.error('Error fetching teacher details:', error);
            setTeachers([]);
        }
    };
    

    //pop-up window    
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        function handleMouseMove(event) {
        setCursorPosition({ x: event.clientX, y: event.clientY });
        }

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    //pie chart
    const [teachersByDistrict, setTeachersByDistrict] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTeachersByDistrict();
                setTeachersByDistrict(data);
            } catch (error) {
                console.error('Error fetching teachers by district:', error);
            }
        };

        fetchData();
    }, []);

    const districtLabels = teachersByDistrict.map(({ _id }) => _id);
    const teacherCounts = teachersByDistrict.map(({ tCount }) => tCount);

    const data = {
        labels: districtLabels,
        datasets: [
            {
                label: 'Number of Teachers',
                data: teacherCounts,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                ],
                borderWidth: 1,
            },
        ],
    };

    //logout
    const navigate = useNavigate();

    const handleAdminLogout = async(e) => {
        e.preventDefault();

        logout()
            .then((res) => {
                alert(res.message);

                document.cookie = 'adminUsername=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                
                //redirect to login page
                navigate("/adminLogin");

        }).catch(err => console.error(err));
    }


    return (
        <div style={{ backgroundColor: '#ECF0F5' }}>
            <Header />
            <div className="headerBtns">
                <button className="btn btn-grey fs-6" onClick={handleAdminLogout}>Log out</button>
                <Link to="/adminProfile">
                    <PiUserCircle className="text-white ml-3" style={{fontSize: '70px'}}/>
                </Link>
            </div>
            <div className="d-flex mt-5 mb-5 justify-content-center align-items-center col-9">
                <div className="geography-container bg-white shadow rounded-4 border border-dark p-3" onMouseEnter={(e) => setCountText()}>
                    <h1 className='text-center text-dark alert alert-info border border-info rounded-4'>Geography</h1>

                    <img src={sriLankaImage} alt="Sri Lanka" className="map-image" onMouseEnter={(e) => setCountText()} onClick={(e) => setDistrict()}/>

                    <button className="district-button Jaffna rounded-5 btn-primary btn-sm" onMouseEnter={() => handleHover("Jaffna")} onMouseLeave={(e) => setCountText()} onClick={() => handleClick("Jaffna")}>
                        Jaffna
                    </button>
                    <button className="district-button Ampara rounded-5 btn-primary btn-sm" onMouseOver={() => handleHover("Ampara")} onMouseLeave={(e) => setCountText()} onClick={() => handleClick("Ampara")}>
                        Ampara
                    </button>
                    <button className="district-button Kandy rounded-5 btn-primary btn-sm" onMouseOver={() => handleHover("Kandy")} onMouseLeave={(e) => setCountText()} onClick={() => handleClick("Kandy")}>
                        Kandy
                    </button>
                    <button className="district-button Kilinochchi rounded-5 btn-primary btn-sm" onMouseOver={() => handleHover("Kilinochchi")} onMouseLeave={(e) => setCountText()} onClick={() => handleClick("Kilinochchi")}>
                        Kilinochchi
                    </button>
                    <button className="district-button Mannar rounded-5 btn-primary btn-sm" onMouseOver={() => handleHover("Mannar")} onMouseLeave={(e) => setCountText()} onClick={() => handleClick("Mannar")}>
                        Mannar
                    </button>
                    <button className="district-button Mullaitivu rounded-5 btn-primary btn-sm" onMouseOver={() => handleHover("Mullaitivu")} onMouseLeave={(e) => setCountText()} onClick={() => handleClick("Mullaitivu")}>
                        Mullaitivu
                    </button>
                    <button className="district-button Nuwara-Eliya rounded-5 btn-primary btn-sm" onMouseOver={() => handleHover("Nuwara Eliya")} onMouseLeave={(e) => setCountText()} onClick={() => handleClick("Nuwara Eliya")}>
                        Nuwara Eliya
                    </button>
                    <button className="district-button Anuradhapura rounded-5 btn-primary btn-sm" onMouseOver={() => handleHover("Anuradhapura")} onMouseLeave={(e) => setCountText()} onClick={() => handleClick("Anuradhapura")}>
                        Anuradhapura
                    </button>
                    <button className="district-button Batticaloa rounded-5 btn-primary btn-sm" onMouseOver={() => handleHover("Batticaloa")} onMouseLeave={(e) => setCountText()} onClick={() => handleClick("Batticaloa")}>
                        Batticaloa
                    </button>
                    <button className="district-button Hambantota rounded-5 btn-primary btn-sm" onMouseOver={() => handleHover("Hambantota")} onMouseLeave={(e) => setCountText()} onClick={() => handleClick("Hambantota")}>
                        Hambantota
                    </button>
                    <button className="district-button Matale rounded-5 btn-primary btn-sm" onMouseOver={() => handleHover("Matale")} onMouseLeave={(e) => setCountText()} onClick={() => handleClick("Matale")}>
                        Matale
                    </button>
                    <button className="district-button colombo rounded-5 btn-primary btn-sm" onMouseOver={() => handleHover("Colombo")} onMouseLeave={(e) => setCountText()} onClick={() => handleClick("Colombo")}>
                        Colombo
                    </button>
                    <button className="district-button Galle rounded-5 btn-primary btn-sm" onMouseOver={() => handleHover("Galle")} onMouseLeave={(e) => setCountText()} onClick={() => handleClick("Galle")}>
                        Galle
                    </button>
                    <button className="district-button Kalutara rounded-5 btn-primary btn-sm" onMouseOver={() => handleHover("Kalutara")} onMouseLeave={(e) => setCountText()} onClick={() => handleClick("Kalutara")}>
                        Kalutara
                    </button>
                    <button className="district-button Matara rounded-5 btn-primary btn-sm" onMouseOver={() => handleHover("Matara")} onMouseLeave={(e) => setCountText()} onClick={() => handleClick("Matara")}>
                        Matara
                    </button>
                    <button className="district-button Kurunegala rounded-5 btn-primary btn-sm" onMouseOver={() => handleHover("Kurunegala")} onMouseLeave={(e) => setCountText()} onClick={() => handleClick("Kurunegala")}>
                        Kurunegala
                    </button>
                    <button className="district-button Badulla rounded-5 btn-primary btn-sm" onMouseOver={() => handleHover("Badulla")} onMouseLeave={(e) => setCountText()} onClick={() => handleClick("Badulla")}>
                        Badulla
                    </button>
                    <button className="district-button Gampaha rounded-5 btn-primary btn-sm" onMouseOver={() => handleHover("Gampaha")} onMouseLeave={(e) => setCountText()} onClick={() => handleClick("Gampaha")}>
                        Gampaha
                    </button>
                    <button className="district-button Monaragala rounded-5 btn-primary btn-sm" onMouseOver={() => handleHover("Monaragala")} onMouseLeave={(e) => setCountText()} onClick={() => handleClick("Monaragala")}>
                        Monaragala
                    </button>
                    <button className="district-button Polonnaruwa rounded-5 btn-primary btn-sm" onMouseOver={() => handleHover("Polonnaruwa")} onMouseLeave={(e) => setCountText()} onClick={() => handleClick("Polonnaruwa")}>
                        Polonnaruwa
                    </button>
                    <button className="district-button Trincomalee rounded-5 btn-primary btn-sm" onMouseOver={() => handleHover("Trincomalee")} onMouseLeave={(e) => setCountText()} onClick={() => handleClick("Trincomalee")}>
                        Trincomalee
                    </button>
                    <button className="district-button Ratnapura rounded-5 btn-primary btn-sm" onMouseOver={() => handleHover("Ratnapura")} onMouseLeave={(e) => setCountText()} onClick={() => handleClick("Ratnapura")}>
                        Ratnapura
                    </button>
                    <button className="district-button Vavuniya rounded-5 btn-primary btn-sm" onMouseOver={() => handleHover("Vavuniya")} onMouseLeave={(e) => setCountText()} onClick={() => handleClick("Vavuniya")}>
                        Vavuniya
                    </button>
                    <button className="district-button Kegalle rounded-5 btn-primary btn-sm" onMouseOver={() => handleHover("Kegalle")} onMouseLeave={(e) => setCountText()} onClick={() => handleClick("Kegalle")}>
                        Kegalle
                    </button>
                    <button className="district-button Puttalam rounded-5 btn-primary btn-sm" onMouseOver={() => handleHover("Puttalam")} onMouseLeave={(e) => setCountText()} onClick={() => handleClick("Puttalam")}>
                        Puttalam
                    </button>

                    <div className='border border-dark rounded-4 shadow p-3 col-3' style={{position: 'absolute', left: '-170px', top: '0px'}}>
                        <Link to="/adminHome">                                
                            <button className="col btn btn-primary rounded-5 mt-1">dashboard</button>
                        </Link>
                        <Link to="/tDetails">
                            <button className="col btn btn-info rounded-5 mt-4">view Teachers</button>
                        </Link>
                        <Link to="/tCreate">                                
                            <button className="col btn btn-info rounded-5 mt-1 mb-1">add Teacher</button>
                        </Link>
                    </div>
                </div>
                

                <div className='border border-dark rounded-4 shadow bg-white p-3' style={{position: 'absolute', left: '950px', top: '0px'}}>
                    <h2>Number of Teachers by District</h2>
                    <Pie data={data} />
                </div>

                {district && (
                    <div className='border border-dark rounded-4 shadow bg-white p-3' style={{position: 'absolute', left: '950px', top: '520px', width: '400px'}}>
                        <h2>Teachers From {district}</h2>
                        <div className="scrollable-table">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th></th>
                                        <th>Subject</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teachers.map((teacher, index) => (
                                        <tr key={index}>
                                            <td>{teacher.firstName}</td>
                                            <td>{teacher.lastName}</td>
                                            <td>{teacher.subject}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}



                {countText && (
                    <div className='w-20 border border-dark rounded-3 p-3 shadow alert alert-info' style={{position: 'fixed', left: cursorPosition.x, top: cursorPosition.y}}>
                        <h6 className='text-primary'>{countText}</h6>
                        
                    </div>
                )}                
                
            </div>
            <Footer />
        </div>
    );
};

export default Geography;