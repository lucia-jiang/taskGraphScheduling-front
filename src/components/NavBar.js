import React from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light ml-4">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"> <FontAwesomeIcon icon={faHome}/> Home</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/algorithms">Algorithms</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/users-solve-problem">Users Solve Problem</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/create-customised-graph">Create Customised Graph</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/games">Games</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
