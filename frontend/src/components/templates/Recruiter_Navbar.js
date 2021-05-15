import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

export default class NavBar extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>                
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to="/" className="navbar-brand">Adept-Recruiter</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            {/* <li className="navbar-item">
                                <Link to="/users" className="nav-link">Users</Link>
                            </li> */}
                            <li className="navbar-item">
                                <Link to="/rprofile" className="nav-link">My Profile</Link>
                            </li> 
                            <li className="navbar-item">
                                <Link to="/add" className="nav-link">Add Job</Link>
                            </li> 
                            <li className="navbar-item">
                                <Link to="/rlistings" className="nav-link">View Jobs</Link>
                            </li>
                            <li className="navbar-item">
                                <Link className="nav-link" to="/" onClick={() => {
                                localStorage.clear();
                                window.location.href = "/"; }}>Logout</Link>
                            </li>
                            {/* <li className="navbar-item"> */}
                                {/* <Link to="/profile" className="nav-link">My Profile</Link> */}
                            {/* </li>                             */}
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}