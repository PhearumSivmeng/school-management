import React, { useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from 'sweetalert2';
import { faCircleUser, faKey } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res1 = await axios.post('http://127.0.0.1:8000/api/account/login', { emailOrUsername: email, password: password });

            if (res1.data.exists) {
                const userId = res1.data.data.id + "";
                localStorage.setItem('userId', userId); // Store user ID in local storage
                localStorage.setItem('userRole', res1.data.data.role); // Store user role in local storage
                onLogin(userId);
                navigate(`/account/${userId}`); // Redirect to profile page
                window.location.reload();
                Swal.fire({
                    position: "center-center",
                    icon: "success",
                    title: "Login Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    position: "center-center",
                    icon: "error",
                    title: "Wrong Username or Password!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        } catch (error) {
            console.error('Error during login:', error);
            Swal.fire({
                position: "center-center",
                icon: "error",
                title: "Failed to login!",
                showConfirmButton: true,
            });
        }
    };

    return (
        <div style={{ height: '80vh' }} className="container my-5 d-flex flex-column align-items-center justify-content-center">
            <div className="container mt-5 d-flex">
                <div className="w-50 h-100 d-flex align-items-center justify-content-center">
                    <img src="/assets/images/header/logo.png" alt="" />
                </div>
                <div className="w-50 h-100 d-flex align-items-center justify-content-center ps-3 ">
                    <form onSubmit={handleLogin} className="fs-2 w-100" action="">
                        <label htmlFor=""><FontAwesomeIcon className="me-3" icon={faCircleUser} /> Username or Email :</label>
                        <input name="username" className="form-control w-75 my-3 fs-3 px-3 py-2 border border-2 border-dark" onChange={(e) => setEmail(e.target.value)}  type="text" />
                        <label htmlFor=""><FontAwesomeIcon className="me-3" icon={faKey} />Password :</label>
                        <input name="password" className="form-control w-75 my-3 fs-3 px-3 py-2 border border-2 border-dark" onChange={(e) => setPassword(e.target.value)} type="password" />
                        <div className="w-auto h-auto d-flex align-items-center">
                            <input style={{ transform: 'scale(1.5))' }} type="checkbox" className="fs-5 ms-2 me-4" /><label htmlFor="" className="fs-5 text-dark">Show Password</label>
                        </div>
                        <button className="btn btn-primary fs-2 my-5 px-5 fw-bold ">Login</button>
                    </form>
                </div>
            </div>
            <div className="container d-flex flex-column align-items-center fs-5 mt-0 mb-5">
                <label htmlFor="">Don't you remember your password</label><br />
                <a htmlFor="" className="text-danger text-decoration-none">Recovery?</a>
                <label htmlFor="">Or</label>
                <Link htmlFor="" to="/create" className="text-primary text-decoration-none">Create an Account?</Link>
            </div>
        </div>
    );
}

export default LoginPage;