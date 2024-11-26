import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const FieldAccount = () => {
    const { id } = useParams();

    const [accountData, setAccountData] = useState({
        firstName: "",
        secondName: "",
        username: "",
        gender: "",
        role: "Student",
        email: "",
        university: "",
        skill: "",
        profileImage: "",
        knowledge: ""
    });
    const [isUpdateMode, setIsUpdateMode] = useState(false);

    useEffect(() => {
        if (id) {
            setIsUpdateMode(true);
            const fetchAccountData = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/api/account/${id}`);
                    const result = await response.json();
                    setAccountData(result);
                } catch (error) {
                    console.error('Error fetching account data:', error);
                }
            };
            fetchAccountData();
        } else {
            setIsUpdateMode(false);
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setAccountData({
            ...accountData,
            [name]: files ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(accountData).forEach(key => {
            data.append(key, accountData[key]);
        });

        try {
            if (isUpdateMode) {
                // Update existing account
                const response = await axios.post(`http://127.0.0.1:8000/api/account/${id}`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Account Data Updated:', response.data);
            } else {
                // Create new account
                const response = await axios.post('http://127.0.0.1:8000/api/account/create', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Form Data Submitted:', response.data);
            }

            // Optionally, you can reset the form or handle successful submission
            setAccountData({
                firstName: '',
                secondName: '',
                username: '',
                gender: '',
                role: 'Student',
                email: '',
                password: '',
                university: '',
                skill: '',
                profileImage: null,
                knowledge: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="container w-50 mt-5">
            <h2 className="mb-4">Account Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={accountData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="secondName" className="form-label">Second Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="secondName"
                        name="secondName"
                        value={accountData.secondName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={accountData.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <select
                        className="form-control"
                        id="gender"
                        name="gender"
                        value={accountData.gender}
                        onChange={handleChange}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role</label>
                    <input
                        readOnly
                        type="text"
                        className="form-control"
                        id="role"
                        name="role"
                        value={accountData.role}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={accountData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={accountData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="university" className="form-label">University</label>
                    <input
                        type="text"
                        className="form-control"
                        id="university"
                        name="university"
                        value={accountData.university}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="skill" className="form-label">Skill</label>
                    <input
                        type="text"
                        className="form-control"
                        id="skill"
                        name="skill"
                        value={accountData.skill}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="profileImage" className="form-label">Profile Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="profileImage"
                        name="profileImage"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="knowledge" className="form-label">Knowledge</label>
                    <input
                        type="text"
                        className="form-control"
                        id="knowledge"
                        name="knowledge"
                        value={accountData.knowledge}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className={`btn ${isUpdateMode ? 'btn-warning' : 'btn-primary'}`}>
                    {isUpdateMode ? 'Update' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default FieldAccount;