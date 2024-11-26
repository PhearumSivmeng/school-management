import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faPlus, faEye, faCircleExclamation } from "@fortawesome/free-solid-svg-icons"

const ViewAccount = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Number of items to display per page
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

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

    // Logic to paginate the data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="table-responsive">
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Gender</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>University</th>
                        <th>Skill</th>
                        <th>Profile Image</th>
                        <th>Knowledge</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={index}>
                            <td>{`${item.firstName} ${item.secondName}`}</td>
                            <td>{item.username}</td>
                            <td>{item.gender}</td>
                            <td>{item.role}</td>
                            <td>{item.email}</td>
                            <td>{item.university}</td>
                            <td>{item.skill}</td>
                            <td>
                                <img
                                    style={{ width: "75px", height: "75px", objectFit: "cover" }}
                                    src={item.profileImage}
                                    alt="Profile"
                                />
                            </td>
                            <td>{item.knowledge}</td>
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
            {/* Pagination buttons */}
            <div className="d-flex justify-content-center">
                <button
                    className="btn btn-primary mx-1"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}>
                    Previous
                </button>
                <button
                    className="btn btn-primary mx-1"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={indexOfLastItem >= data.length}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default ViewAccount;