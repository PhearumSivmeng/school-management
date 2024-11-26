import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const FieldAddress = () => {
    const { id } = useParams();

    const [accountData, setAccountData] = useState({
        homeNo: "",
        street: "",
        village: "",
        commune: "",
        district: "",
        province: "",
        country: "",
        map: "",
        image: null,
        schoolId: ""
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
                homeNo: '',
                street: '',
                village: '',
                commune: '',
                district: '',
                province: '',
                country: '',
                map: '',
                image: null,
                schoolId: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="container w-50 mt-5">
            <h2 className="mb-4">Address Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="homeNo" className="form-label">Home No</label>
                    <input
                        type="text"
                        className="form-control"
                        id="homeNo"
                        name="homeNo"
                        value={accountData.homeNo}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="street" className="form-label">Street</label>
                    <input
                        type="text"
                        className="form-control"
                        id="street"
                        name="street"
                        value={accountData.street}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="village" className="form-label">Village</label>
                    <input
                        type="text"
                        className="form-control"
                        id="village"
                        name="village"
                        value={accountData.village}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="commune" className="form-label">Commune</label>
                    <input
                        type="text"
                        className="form-control"
                        id="commune"
                        name="commune"
                        value={accountData.commune}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="district" className="form-label">District</label>
                    <input
                        type="text"
                        className="form-control"
                        id="district"
                        name="district"
                        value={accountData.district}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="province" className="form-label">Province</label>
                    <input
                        type="text"
                        className="form-control"
                        id="province"
                        name="province"
                        value={accountData.province}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="country" className="form-label">Country</label>
                    <input
                        type="text"
                        className="form-control"
                        id="country"
                        name="country"
                        value={accountData.country}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="map" className="form-label">Map</label>
                    <input
                        type="text"
                        className="form-control"
                        id="map"
                        name="map"
                        value={accountData.map}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="schoolId" className="form-label">School ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="schoolId"
                        name="schoolId"
                        value={accountData.schoolId}
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

export default FieldAddress;