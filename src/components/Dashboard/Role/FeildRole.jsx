import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const FieldRole = () => {
    const { id } = useParams();
    const [accountData, setAccountData] = useState({
        firstName: "",
        secondName: "",
        staffId: "",
        university: "",
        quote: "",
        accountId: "",
        schoolId: "",
        studentId: "", // Added studentId field
        role: "" // Added role field
    });
    const [accounts, setAccounts] = useState([]);
    const [schools, setSchools] = useState([]); // State to store schools
    const [isUpdateMode, setIsUpdateMode] = useState(false);

    useEffect(() => {
        if (id) {
            setIsUpdateMode(true);
            const fetchAccountData = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/api/instructor/${id}`);
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

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/account');
                const result = await response.json();
                setAccounts(result.message);
            } catch (error) {
                console.error('Error fetching accounts:', error);
            }
        };
        fetchAccounts();

        const fetchSchools = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/school');
                const result = await response.json();
                setSchools(result.message);
            } catch (error) {
                console.error('Error fetching schools:', error);
            }
        };
        fetchSchools();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "accountId" && value) {
            const selectedAccount = accounts.find(account => account.id === parseInt(value, 10));
            if (selectedAccount) {
                setAccountData({
                    ...accountData,
                    accountId: selectedAccount.id,
                    firstName: selectedAccount.firstName,
                    secondName: selectedAccount.secondName,
                    university: selectedAccount.university,
                    staffId: accountData.staffId,
                    quote: accountData.quote,
                    schoolId: accountData.schoolId,
                    role: accountData.role,
                    studentId: accountData.studentId
                });
                return;
            }
        }
        setAccountData({
            ...accountData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isUpdateMode) {
                const response = await axios.put(`http://127.0.0.1:8000/api/instructor/${id}`, accountData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Account Data Updated:', response.data);
            } else {
                console.log(accountData);
                const response = await axios.post('http://127.0.0.1:8000/api/instructor', accountData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const response1 = await axios.post(`http://127.0.0.1:8000/api/account/role/${accountData.accountId}`, {'role':'Instructor'});
                console.log('Form Data Submitted:', response1.data);
            }

            setAccountData({
                firstName: '',
                secondName: '',
                staffId: '',
                university: '',
                quote: '',
                accountId: '',
                schoolId: '',
                studentId: '',
                role: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="container w-50 mt-5">
            <h2 className="mb-4">{isUpdateMode ? 'Update Instructor' : 'Instructor Form'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role</label>
                    <select
                        className="form-control"
                        id="role"
                        name="role"
                        value={accountData.role}
                        onChange={handleChange}>
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="instructor">Instructor</option>
                        <option value="student">Student</option>
                    </select>
                </div>
                {accountData.role !== 'student' && (
                    <>
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
                            <label htmlFor="staffId" className="form-label">Staff ID</label>
                            <input
                                type="text"
                                className="form-control"
                                id="staffId"
                                name="staffId"
                                value={accountData.staffId}
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
                            <label htmlFor="quote" className="form-label">Quote</label>
                            <input
                                type="text"
                                className="form-control"
                                id="quote"
                                name="quote"
                                value={accountData.quote}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="accountId" className="form-label">Account ID</label>
                            <select
                                className="form-control"
                                id="accountId"
                                name="accountId"
                                value={accountData.accountId}
                                onChange={handleChange}>
                                <option value="">Select Account ID</option>
                                {accounts.map((account) => (
                                    <option key={account.id} value={account.id}>
                                        {account.id} - {account.username}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="schoolId" className="form-label">School ID</label>
                            <select
                                className="form-control"
                                id="schoolId"
                                name="schoolId"
                                value={accountData.schoolId}
                                onChange={handleChange}>
                                <option value="">Select School</option>
                                {schools.map((school) => (
                                    <option key={school.id} value={school.id}>
                                        {school.id} - {school.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </>
                )}
                {accountData.role === 'student' && (
                    <>
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
                            <label htmlFor="studentId" className="form-label">Student ID</label>
                            <input
                                type="text"
                                className="form-control"
                                id="studentId"
                                name="studentId"
                                value={accountData.studentId}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="quote" className="form-label">Quote</label>
                            <input
                                type="text"
                                className="form-control"
                                id="quote"
                                name="quote"
                                value={accountData.quote}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="accountId" className="form-label">Account ID</label>
                            <select
                                className="form-control"
                                id="accountId"
                                name="accountId"
                                value={accountData.accountId}
                                onChange={handleChange}>
                                <option value="">Select Account ID</option>
                                {accounts.map((account) => (
                                    <option key={account.id} value={account.id}>
                                        {account.id} - {account.username}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </>
                )}
                <button type="submit" className={`btn ${isUpdateMode ? 'btn-warning' : 'btn-primary'}`}>
                    {isUpdateMode ? 'Update' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default FieldRole;