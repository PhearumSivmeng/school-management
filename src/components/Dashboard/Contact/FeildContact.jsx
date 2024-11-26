import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert

const FieldContact = () => {
    const { id } = useParams();

    const [contactData, setContactData] = useState({
        email: '',
        phoneNumber: '',
        map: '',
        social: ''
    });
    const [isUpdateMode, setIsUpdateMode] = useState(false);

    useEffect(() => {
        if (id) {
            setIsUpdateMode(true);
            const fetchContactData = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/api/contact/${id}`);
                    const result = await response.json();
                    setContactData(result);
                } catch (error) {
                    console.error('Error fetching contact data:', error);
                }
            };
            fetchContactData();
        } else {
            setIsUpdateMode(false);
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactData({
            ...contactData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(contactData).forEach(key => {
            data.append(key, contactData[key]);
        });

        try {
            if (isUpdateMode) {
                // Update existing contact
                const response = await axios.post(`http://127.0.0.1:8000/api/contact/${id}`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Contact Data Updated:', response.data);
                Swal.fire('Success', 'Contact data updated successfully!', 'success');
            } else {
                // Create new contact
                const response = await axios.post('http://127.0.0.1:8000/api/contact', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Form Data Submitted:', response.data);
                Swal.fire('Success', 'Form data submitted successfully!', 'success');
            }

            // Optionally, you can reset the form or handle successful submission
            setContactData({
                email: '',
                phoneNumber: '',
                map: '',
                social: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            Swal.fire('Error', 'There was an error submitting the form. Please try again.', 'error');
        }
    };

    return (
        <div className="container w-50 mt-5">
            <h2 className="mb-4">Contact Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={contactData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={contactData.phoneNumber}
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
                        value={contactData.map}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="social" className="form-label">Social</label>
                    <input
                        type="text"
                        className="form-control"
                        id="social"
                        name="social"
                        value={contactData.social}
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

export default FieldContact;
