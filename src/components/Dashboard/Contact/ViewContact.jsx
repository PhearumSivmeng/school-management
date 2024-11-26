import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const ViewContact = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/contact');
                const result = await response.json();
                if (result.status === 200) {
                    setData(result.message);
                } else {
                    console.error('Error fetching data:', result);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this account?");
        if (isConfirmed) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/contact/${id}`, {
                    method: 'DELETE'
                });
                const result = await response.json();
                if (result.status === 200) {
                    setData(data.filter(item => item.id !== id));
                } else {
                    console.error('Error deleting account:', result);
                }
            } catch (error) {
                console.error('Error deleting account:', error);
            }
        }
    };

    const handleUpdate = (id) => {
        navigate(`/dashboard/add-account/${id}`);
    };

    return (
        <div className="table-responsive">
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Map</th>
                        <th>Social</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>
                                <a href={`mailto:${item.email}`}>{item.email}</a>
                            </td>
                            <td>{item.phoneNumber}</td>
                            <td><a href={item.map}>{item.map}</a></td>
                            <td><a href={item.social}>{item.social}</a></td>
                            <td>
                                <button
                                    id='update-btn'
                                    className="btn btn-warning text-white me-1"
                                    onClick={() => handleUpdate(item.id)}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                                <button
                                    className="btn btn-danger text-white ms-1"
                                    onClick={() => handleDelete(item.id)} >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewContact;