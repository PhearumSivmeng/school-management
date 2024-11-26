import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBook, faTrophy, faComments, faUser, faCircleExclamation, faGamepad } from "@fortawesome/free-solid-svg-icons"
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";

const WebPageHeader = ({ isLoggedIn }) => {
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        // Retrieve user role from local storage
        const role = localStorage.getItem('userRole');
        setUserRole(role);
    }, []);

    const userId = localStorage.getItem('userId');

    return (
        <div className="row bg-primary px-5 border border-bottom-1 text-white">
            <div className=" col-3 ">
                <Link className="d-flex align-items-center nav-link text-white" to="/">
                    <img className="w-25 me-2" src="/assets/images/header/logo.png" alt="" />
                    <h2 className="fw-bolder">ETEC Center</h2>
                </Link>
            </div>
            <div className="col-6 d-flex align-items-center justify-content-center px-2 fs-6 fw-bold">
                <ul className="w-100 nav navbar">
                    <li className="nav-item">
                        <Link className="nav-link text-white d-flex align-items-center" to="/course">Course
                            <FontAwesomeIcon className="mx-2" icon={faBook} />
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white d-flex align-items-center" to="/acheivement">
                            Acheivement
                            <FontAwesomeIcon className="mx-2" icon={faTrophy} />
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white d-flex align-items-center" to="/community">Community
                            <FontAwesomeIcon className="mx-2" icon={faComments} />
                        </Link>
                    </li>
                    {userRole === 'Instructor' || userRole === 'Admin' ? (
                        <li className="nav-item">
                            <Link className="nav-link text-white d-flex align-items-center" to="/dashboard">Dashboard
                                <FontAwesomeIcon className="mx-2" icon={faGamepad} />
                            </Link>
                        </li>
                    ) : null}
                    <li className="nav-item">
                        {isLoggedIn ? (
                            <Link className="nav-link text-white d-flex align-items-center" to={`/account/${userId}`}>Account
                                <FontAwesomeIcon className="mx-2" icon={faUser} />
                            </Link>
                        ) : (
                            <Link className="nav-link text-white d-flex align-items-center" to="/login">Account
                                <FontAwesomeIcon className="mx-2" icon={faUser} />
                            </Link>
                        )}
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white d-flex align-items-center" to="/about">About
                            <FontAwesomeIcon className="mx-2" icon={faCircleExclamation} />
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="col-3 d-flex align-items-center justify-content-end ps-5">
                <input className="w-75 fs-2 px-2 border border-2 border-white rounded-2" type="text" />
                <FontAwesomeIcon className="fs-3 ms-4" icon={faMagnifyingGlass} />
            </div>
            <Outlet />
        </div>
    );
}

export default WebPageHeader;