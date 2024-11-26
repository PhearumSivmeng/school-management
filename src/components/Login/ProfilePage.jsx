import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { faCircleUser, faIdCard, faEnvelope, faVenusMars, faPaintRoller, faBuildingColumns, faUserTie, faBook } from "@fortawesome/free-solid-svg-icons";

const ProfilePage = ({ onLogout }) => {
    const { id: routeId } = useParams();

    // Retrieve userId from local storage or use routeId
    const storedId = localStorage.getItem('userId');
    const id = routeId || storedId;

    if (!id) {
        navigate('/login'); // Redirect to login if no ID is found
    }
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        secondName: '',
        username: '',
        gender: '',
        role: '',
        email: '',
        university: '',
        skill: '',
        knowledge: '',
        profileImage: ''
    });

    const [showVerifyIdInput, setShowVerifyIdInput] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/account/${id}`);
                const userData = res.data;

                // Update the formData state with fetched user data
                setFormData({
                    firstName: userData.firstName || '',
                    secondName: userData.secondName || '',
                    username: userData.username || '',
                    gender: userData.gender || '',
                    role: userData.role || '',
                    email: userData.email || '',
                    university: userData.university || '',
                    skill: userData.skill || '',
                    knowledge: userData.knowledge || '',
                    profileImage: userData.profileImage || '' // Assuming you don't fetch profile image data here
                });
                if (formData.profileImage) {

                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData(); // Fetch user data when component mounts
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // If the selected role is "Admin" or "Instructor", show the verify ID input
        if (name === "role" && (value === "admin" || value === "instructor")) {
            setShowVerifyIdInput(true);
        } else {
            setShowVerifyIdInput(false);
        }
    };

    const [selectedImage, setSelectedImage] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log("Selected file:", file); // Add this line to check the selected file
        setSelectedImage(file);
        setFormData(prevState => ({
            ...prevState,
            profileImage: file
        }));
    };
    const handleLogoutClick = () => {
        localStorage.clear();
        onLogout();
        navigate('/login');
        window.location.reload(); // Refresh the webpage
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            if (formData.profileImage) {
                const formDataToSend = {
                    firstName: formData.firstName,
                    secondName: formData.secondName,
                    username: formData.username,
                    gender: formData.gender,
                    role: formData.role,
                    email: formData.email,
                    university: formData.university,
                    skill: formData.skill,
                    knowledge: formData.knowledge,
                    profileImage: selectedImage
                };
                const res1 = await axios.post(`http://127.0.0.1:8000/api/account/${id}`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data' // Ensure proper content type for sending files
                    }
                });

                if (res1.data.status === 200) {
                    Swal.fire({
                        position: "center-center",
                        icon: "success",
                        title: "Data Saved Successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    Swal.fire({
                        position: "center-center",
                        icon: "error",
                        title: "Failed to Save Data!",
                        showConfirmButton: true,
                    });
                }
            }
        } catch (error) {

            if (error.response) {
                console.error('Error response:', error.response.data);
                Swal.fire({
                    position: "center-center",
                    icon: "error",
                    title: "Failed to update profile!",
                    text: error.response.data.message || "Validation error",
                    showConfirmButton: true,
                });
            } else {
                console.error('Error updating profile:', error);
                Swal.fire({
                    position: "center-center",
                    icon: "error",
                    title: "Failed to update profile!",
                    showConfirmButton: true,
                });
            }
        }
    };

    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div style={{ height: '90vh' }} className="container my-5 d-flex flex-column align-items-center justify-content-center">
            <form onSubmit={handleSubmit} className="container mt-5 d-flex align-items-center">
                <div className="w-75 h-100 d-flex align-items-center justify-content-center ps-3">
                    <div className="w-50">
                        <div className="fs-2 w-100">
                            <h1 className="mb-2">Personal Information <FontAwesomeIcon className="ms-3" icon={faIdCard} /></h1>
                            <label htmlFor="firstName">First Name:</label>
                            <input name="firstName" value={formData.firstName} onChange={handleInputChange} className="form-control w-75 my-3 fs-3 px-3 py-2 border border-2 border-dark" type="text" required />
                            <label htmlFor="secondName">Last Name:</label>
                            <input name="secondName" value={formData.secondName} onChange={handleInputChange} className="form-control w-75 my-3 fs-3 px-3 py-2 border border-2 border-dark" type="text" required />
                            <label htmlFor="username"><FontAwesomeIcon className="me-3" icon={faCircleUser} /> Username:</label>
                            <input name="username" value={formData.username} onChange={handleInputChange} className="form-control w-75 my-3 fs-3 px-3 py-2 border border-2 border-dark" type="text" required />
                            <label htmlFor="gender"><FontAwesomeIcon className="me-2" icon={faVenusMars} /> Gender:</label>
                            <select name="gender" value={formData.gender} onChange={handleInputChange} className="form-control w-75 my-3 fs-3 px-3 py-2 border border-2 border-dark" required>
                                <option value="" disabled>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <label htmlFor="role"><FontAwesomeIcon className="me-2" icon={faPaintRoller} /> Role:</label>
                            <select disabled name="role" value={formData.role} onChange={handleInputChange} className="form-control w-75 my-3 fs-3 px-3 py-2 border border-2 border-dark" required>
                                <option value="" disabled>Select Role</option>
                                <option value="Student">Student</option>
                                <option value="Admin">Admin</option>
                                <option value="Instructor">Instructor</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-50 pt-4">
                        <div className="fs-2 w-100 pt-5">
                            <label htmlFor="email"><FontAwesomeIcon className="me-3" icon={faEnvelope} /> Email:</label>
                            <input name="email" value={formData.email} onChange={handleInputChange} className="form-control w-75 my-3 fs-3 px-3 py-2 border border-2 border-dark" type="email" required />
                            <label htmlFor="university"><FontAwesomeIcon className="me-3" icon={faBuildingColumns} /> University:</label>
                            <input name="university" value={formData.university} onChange={handleInputChange} className="form-control w-75 my-3 fs-3 px-3 py-2 border border-2 border-dark" type="text" required />
                            <label htmlFor="skill"><FontAwesomeIcon className="me-3" icon={faUserTie} />Skill :</label>
                            <input name="skill" value={formData.skill} onChange={handleInputChange} className="form-control w-75 my-3 fs-3 px-3 py-2 border border-2 border-dark" type="text" required />
                            <label htmlFor="knowledge"><FontAwesomeIcon className="me-3" icon={faBook} />Knowledge :</label>
                            <input name="knowledge" value={formData.knowledge} onChange={handleInputChange} className="form-control w-75 my-3 fs-3 px-3 py-2 border border-2 border-dark" type="text" required />
                            <div className="container-fluid w-100">
                                <button type="submit" className="btn btn-primary fs-2 my-5 me-3 w-25 fw-bold">Save</button>
                                <button type="button" onClick={handleLogoutClick} className="btn btn-danger px-4 fs-2 ms-3 my-5 fw-bold">Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-25 h-auto d-flex flex-column align-items-center justify-content-center">
                    {selectedImage ? (
                        <img className="bg-light rounded rounded-5 mb-0 w-100" src={URL.createObjectURL(selectedImage)} alt="Selected" />
                    ) : (
                        formData.profileImage && (
                            <img className="bg-light rounded rounded-5 mb-0 w-100" src={formData.profileImage} alt="Profile" />
                        )
                    )}
                    <br />
                    <input
                        ref={fileInputRef}
                        name="profileImage"
                        className="d-none"
                        type="file"
                        onChange={handleFileChange}
                    />
                    <button className="btn btn-light fs-5 fw-bold w-100" type="button" onClick={handleClick}>
                        Choose File
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProfilePage;