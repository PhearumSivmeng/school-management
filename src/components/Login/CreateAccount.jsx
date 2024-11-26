import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faKey, faIdCard, faEnvelope, faVenusMars, faPaintRoller } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import Swal from 'sweetalert2';

import { useNavigate } from 'react-router-dom';




const CreateAccount = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        secondName: '',
        username: '',
        email: '',
        password: '',
    });

    const [usernameExists, setUsernameExists] = useState(false);
    const [emailExists, setEmailExists] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email } = formData;
        try {
            const res1 = await axios.post(`http://127.0.0.1:8000/api/account/check-username/${username}`);
            const res2 = await axios.post(`http://127.0.0.1:8000/api/account/check-email/${email}`);

            setUsernameExists(res1.data.exists);
            setEmailExists(res2.data.exists);

            if (res1.data.exists || res2.data.exists) {
                let errorMessage = '';
                if (res1.data.exists && res2.data.exists) {
                    errorMessage = "Username and Email already exist!";
                } else if (res1.data.exists) {
                    errorMessage = "Username already exists!";
                } else if (res2.data.exists) {
                    errorMessage = "Email already exists!";
                }
                Swal.fire({
                    position: "center-center",
                    icon: "error",
                    title: errorMessage,
                    showConfirmButton: false,
                    timer: 1500
                });
                return;
            }

            const response = await axios.post('http://127.0.0.1:8000/api/account', formData);
            const userId = response.data.Account.id;
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your account has been created!",
                showConfirmButton: false,
                timer: 1500
            });

            onLogin(userId);
            navigate(`/account/${userId}`);

        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                position: "center-center",
                icon: "error",
                title: "Failed to create account!",
                showConfirmButton: true,
            });
        }
    };

    return <div style={{ height: '90vh' }} className="container my-5 d-flex flex-column align-items-center justify-content-center">
        <div className="container d-flex">
            <form onSubmit={handleSubmit} className="w-75 h-100 d-flex align-items-center justify-content-center ps-3" method="post">
                <div className="w-50">
                    <div className="fs-2 w-100" >
                        <h1 className="mb-5">Create An Account <FontAwesomeIcon className="ms-3" icon={faIdCard} /></h1>
                        <label htmlFor=""> First-Name:</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter FirstName" className="form-control w-75 my-3 fs-3 px-3 py-2 border border-2 border-dark" />
                        <label htmlFor=""> Last-Name:</label>
                        <input type="text" name="secondName" value={formData.secondName} onChange={handleChange} placeholder="Enter SecondName" className="form-control w-75 my-3 fs-3 px-3 py-2 border border-2 border-dark" />
                        <label htmlFor=""><FontAwesomeIcon className="me-3" icon={faCircleUser} /> Username:</label>
                        {usernameExists ? <input type="text" name="username" value={formData.username} onChange={handleChange}  placeholder="Already exists." className="form-control w-75 my-3 fs-3 px-3 py-2 border border-2 border-danger" />
                        : <input type="text" name="username" value={formData.username} onChange={handleChange}  placeholder="Enter Username" className="form-control w-75 my-3 fs-3 px-3 py-2 border border-2 border-dark" /> }


                    </div>
                </div>
                <div className="w-50 pt-5">
                    <div className="fs-2 w-100 pt-5" >
                        <label className="mt-5" htmlFor=""><FontAwesomeIcon className="me-3" icon={faEnvelope} /> Email:</label>
                        {emailExists ? <input type="email" name="email" value={formData.email} onChange={handleChange}  placeholder="Already exists." className="form-control w-75 my-3 fs-3 px-3 py-2 border border-2 border-danger" />
                        : <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" className="form-control w-75 my-3 fs-3 px-3 py-2 border border-2 border-dark" />}

                        <label htmlFor=""><FontAwesomeIcon className="me-3" icon={faKey} />Password :</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter Password" className="form-control w-75 my-3 fs-3 px-3 py-2 border border-2 border-dark" />
                        <div className="w-auto h-auto d-flex align-items-center">
                            <input style={{ transform: 'scale(1.5))' }} type="checkbox" className="fs-5 ms-2 me-4" /><label htmlFor="" className="fs-5 text-dark">Show Password</label>
                        </div>
                        <button type="submit" className="btn btn-primary fs-2 my-5 px-5 fw-bold ">Sign Up</button>
                    </div>
                </div>
            </form>

            <div className="w-25 h-100 d-flex align-items-center justify-content-center">
                <img src="/assets/images/header/logo.png" alt="" />
            </div>
        </div>

    </div>
}

export default CreateAccount;
