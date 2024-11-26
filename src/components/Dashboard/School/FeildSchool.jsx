import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const FieldSchool = () => {
    const { id } = useParams();

    const [schoolData, setSchoolData] = useState({
        name: "",
        chairman: "",
        description: "",
        logo: null,
        contactId: ""
    });
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [schoolOptions, setSchoolOptions] = useState([]);

    useEffect(() => {
        // Fetch school options when component mounts
        const fetchSchoolOptions = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/contact');
                const result = await response.json();
                setSchoolOptions(result.message);
            } catch (error) {
                console.error('Error fetching school options:', error);
            }
        };
        fetchSchoolOptions();

        if (id) {
            setIsUpdateMode(true);
            const fetchSchoolData = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/api/school/${id}`);
                    const result = await response.json();
                    setSchoolData(result);
                } catch (error) {
                    console.error('Error fetching school data:', error);
                }
            };
            fetchSchoolData();
        } else {
            setIsUpdateMode(false);
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setSchoolData({
            ...schoolData,
            [name]: files ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(schoolData).forEach(key => {
            data.append(key, schoolData[key]);
        });

        try {
            if (isUpdateMode) {
                // Update existing school
                const response = await axios.post(`http://127.0.0.1:8000/api/school/${id}`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('School Data Updated:', response.data);
            } else {
                console.log(data);
                // Create new school
                const response = await axios.post('http://127.0.0.1:8000/api/school', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Form Data Submitted:', response.data);
            }

            // Optionally, you can reset the form or handle successful submission
            setSchoolData({
                name: '',
                chairman: '',
                description: '',
                logo: null,
                contactId: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="container w-50 mt-5">
            <h2 className="mb-4">School Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={schoolData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="chairman" className="form-label">Chairman</label>
                    <input
                        type="text"
                        className="form-control"
                        id="chairman"
                        name="chairman"
                        value={schoolData.chairman}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={schoolData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="logo" className="form-label">Logo</label>
                    <input
                        type="file"
                        className="form-control"
                        id="logo"
                        name="logo"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="contactId" className="form-label">Contact ID</label>
                    <select
                        className="form-select"
                        id="contactId"
                        name="contactId"
                        value={schoolData.contactId}
                        onChange={handleChange}
                    >
                        <option value="">Select Contact ID</option>
                        {schoolOptions.map(option => (
                            <option key={option.id} value={option.id}>{option.id}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className={`btn ${isUpdateMode ? 'btn-warning' : 'btn-primary'}`}>
                    {isUpdateMode ? 'Update' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default FieldSchool;