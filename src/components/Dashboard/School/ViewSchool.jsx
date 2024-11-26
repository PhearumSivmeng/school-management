import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const ViewSchool = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/school');
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
        const isConfirmed = window.confirm("Are you sure you want to delete this school?");
        if (isConfirmed) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/school/${id}`, {
                    method: 'DELETE'
                });
                const result = await response.json();
                if (result.status === 200) {
                    setData(data.filter(item => item.id !== id));
                } else {
                    console.error('Error deleting school:', result);
                }
            } catch (error) {
                console.error('Error deleting school:', error);
            }
        }
    };

    const handleUpdate = (id) => {
        navigate(`/dashboard/add-school/${id}`);
    };

    return (
        <div className="table-responsive">
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Chairman</th>
                        <th>Description</th>
                        <th>Logo</th>
                        <th>Contact ID</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.chairman}</td>
                            <td>{item.description}</td>
                            <td>
                                <img
                                    style={{ width: "75px", height: "75px", objectFit: "cover" }}
                                    src={item.logo}
                                    alt="Logo"
                                />
                            </td>
                            <td>{item.contactId}</td>
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

export default ViewSchool;