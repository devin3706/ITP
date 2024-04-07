import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { AdminContext } from "../../../AdminContext.js";
import { useNavigate } from "react-router-dom";

//api functions
import { logout } from "../api/admin.js";

const Header = () => {
    const navigate = useNavigate();
    const {admin, setAdmin} = useContext(AdminContext);

    const handleAdminLogout = async(e) => {
        e.preventDefault();

        logout()
            .then((res) => {
                alert(res.message);

                //setAdmin to null
                setAdmin(null);
                
                //redirect to login page
                navigate("/adminLogin");

        }).catch(err => console.error(err));
    }

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <Link className="navbar-brand" style={{marginLeft: "3px"}} to="/adminHome">Admin Dashboard</Link>
            <h4 style={{marginLeft: "10%"}}>{admin && <span className="text-light">Welcome {admin}!</span>}</h4>
            <button 
                className="navbar-toggler" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarNav" 
                aria-controls="navbarNav" 
                aria-expanded="false" 
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav" style={{marginRight: "3px"}}>
                {!admin ? (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/adminLogin">Log in</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/adminCreate">Create new Admin</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/adminDetails">Admin Catalog</Link>
                        </li>
                        <li className="nav-item">
                            <span 
                                className="nav-link" 
                                style={{cursor: "pointer"}}
                                onClick={handleAdminLogout}
                            >
                                Log out
                            </span>
                        </li>
                    </>
                )}
            </ul>
            </div>
        </div>
        </nav>
    );
};

export default Header;