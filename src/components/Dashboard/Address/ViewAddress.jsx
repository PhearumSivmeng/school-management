import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const ViewAccount = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/account');
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
                const response = await fetch(`http://127.0.0.1:8000/api/account/${id}`, {
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
                        <th>Home No</th>
                        <th>Street</th>
                        <th>Village</th>
                        <th>Commune</th>
                        <th>District</th>
                        <th>Province</th>
                        <th>Country</th>
                        <th>Map</th>
                        <th>Image</th>
                        <th>School ID</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.homeNo}</td>
                            <td>{item.street}</td>
                            <td>{item.village}</td>
                            <td>{item.commune}</td>
                            <td>{item.district}</td>
                            <td>{item.province}</td>
                            <td>{item.country}</td>
                            <td>{item.map}</td>
                            <td>
                                <img
                                    style={{ width: "75px", height: "75px", objectFit: "cover" }}
                                    src={item.image}
                                    alt="Profile"
                                />
                            </td>
                            <td>{item.schoolId}</td>
                            <td>
                                <button
                                    id='update-btn'
                                    className="btn btn-warning text-white me-1"
                                    onClick={() => handleUpdate(item.id)}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                                <button
                                    className="btn btn-danger text-white ms-1"
                                    onClick={() => handleDelete(item.id)}>
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

export default ViewAccount;