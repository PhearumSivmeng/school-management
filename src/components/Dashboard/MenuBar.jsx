import React, { useState,useEffect } from "react";
import { Link,Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser, faLayerGroup, faPlus, faEye, faNewspaper, faMapLocationDot, faBriefcase, faInbox,
    faEnvelope, faClipboardQuestion, faStar, faSchool, faCloudSun, faChalkboardTeacher
} from "@fortawesome/free-solid-svg-icons"
import { faCommentDots, faAddressBook, faCalendarAlt } from "@fortawesome/free-regular-svg-icons"
import ViewAccount from "./Account/ViewAccount";
import FeildAccount from "./Account/FeildAccount";

const MenuBar = () => {
    // State to manage active link
    const [role, setRole] = useState(null);
    const [activeLink, setActiveLink] = useState("/");

    // Function to handle link click and set active link
    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        setRole(userRole);
        console.log(userRole);
      }, []);


    const data = [
        {
            firstName: "John",
            lastName: "Doe",
            username: "johndoe",
            gender: "Male",
            role: "Admin",
            email: "john@example.com",
            password: "********",
            university: "Harvard",
            skill: "Programming",
            profileImage: "http://127.0.0.1:8000/images/MV5BNjg5YmFiMDQtNDJlMS00Njg4LWE0YzQtNjEwN2NjZmYyMzY3XkEyXkFqcGdeQXVyMzQ0NTk5NzU@._V1_.jpg",
            knowledge: "Expert",
        },
        // Add more data objects as needed
    ];

    return (
        <div className="container-fluid mt-5 border border-2 border-primary">
            <div className="row">
                {/* Sidebar */}
                <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-primary sidebar">
                    <div className="position-sticky pt-3">
                        <ul className="nav flex-column">
                        {role === 'Admin' && ( <li className="nav-item border border-1 border-white py-2 px-5 rounded-5 my-1">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-headingAccount">
                                        <button className="accordion-button collapsed text-white py-1 fs-4" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseAccount" aria-expanded="false" aria-controls="flush-collapseAccount">
                                            <FontAwesomeIcon className="me-4" icon={faUser} /> Account
                                        </button>
                                    </h2>
                                    <div id="flush-collapseAccount" className="accordion-collapse collapse" aria-labelledby="flush-headingAccount" data-bs-parent="#accordionFlushExample">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <Link to="/dashboard/add-account" className={activeLink === "/addstaff" ? "nav-link active text-white" : "nav-link text-white"} onClick={() => handleLinkClick("/addstaff")}>
                                                    <FontAwesomeIcon className="me-3" icon={faPlus} /> Add Account
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="/dashboard/view-account" className={activeLink === "/viewstaff" ? "nav-link active text-white" : "nav-link text-white"} onClick={() => handleLinkClick("/viewstaff")}>
                                                    <FontAwesomeIcon className="me-2" icon={faEye} /> View Accounts
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                             )}

{role === 'Admin' && (<li className="nav-item border border-1 border-white py-2 px-5 rounded-5 my-1">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-headingAddress">
                                        <button
                                            className="accordion-button collapsed text-white py-1 fs-4"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseAddress"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseAddress"
                                        >
                                            <FontAwesomeIcon className="me-3" icon={faMapLocationDot} /> Address
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseAddress"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="flush-headingAddress"
                                        data-bs-parent="#accordionAddress"
                                    >
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <Link
                                                    to="/addstaff"
                                                    className={activeLink === "/addstaff" ? "nav-link active text-white" : "nav-link text-white"}
                                                    onClick={() => handleLinkClick("/addstaff")}
                                                >
                                                    <FontAwesomeIcon className="me-3" icon={faPlus} /> Add Staff
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link
                                                    to="/viewstaff"
                                                    className={activeLink === "/viewstaff" ? "nav-link active text-white" : "nav-link text-white"}
                                                    onClick={() => handleLinkClick("/viewstaff")}
                                                >
                                                    <FontAwesomeIcon className="me-2" icon={faEye} /> View Staff
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>)}

                            <li className="nav-item border border-1 border-white py-2 px-5 rounded-5 my-1">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-headingAnswer">
                                        <button
                                            className="accordion-button collapsed text-white py-1 fs-4"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseAnswer"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseAnswer"
                                        >
                                            <FontAwesomeIcon className="me-3" icon={faCommentDots} /> Answer
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseAnswer"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="flush-headingAnswer"
                                        data-bs-parent="#accordionFlushExample1"
                                    >
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <Link
                                                    to="/addstaff"
                                                    className={activeLink === "/addstaff" ? "nav-link active text-white" : "nav-link text-white"}
                                                    onClick={() => handleLinkClick("/addstaff")}
                                                >
                                                    <FontAwesomeIcon className="me-3" icon={faPlus} /> Add Answer
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link
                                                    to="/viewstaff"
                                                    className={activeLink === "/viewstaff" ? "nav-link active text-white" : "nav-link text-white"}
                                                    onClick={() => handleLinkClick("/viewstaff")}
                                                >
                                                    <FontAwesomeIcon className="me-2" icon={faEye} /> View Answer
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>

                            <li className="nav-item border border-1 border-white py-2 px-5 rounded-5 my-1">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-headingArticle">
                                        <button
                                            className="accordion-button collapsed text-white py-1 fs-4"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseArticle"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseArticle"
                                        >
                                            <FontAwesomeIcon className="me-3" icon={faNewspaper} /> Article
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseArticle"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="flush-headingArticle"
                                        data-bs-parent="#accordionFlushExample2"
                                    >
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <Link
                                                    to="/dashboard/add-article"
                                                    className={activeLink === "/dashboard/add-article" ? "nav-link active text-white" : "nav-link text-white"}
                                                    onClick={() => handleLinkClick("/dashboard/add-article")}
                                                >
                                                    <FontAwesomeIcon className="me-3" icon={faPlus} /> Add Article
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link
                                                    to="/dashboard/view-article"
                                                    className={activeLink === "/view-article" ? "nav-link active text-white" : "nav-link text-white"}
                                                    onClick={() => handleLinkClick("/view-article")}
                                                >
                                                    <FontAwesomeIcon className="me-2" icon={faEye} /> View Article
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>

                            {role === 'Admin' && (<li className="nav-item border border-1 border-white py-2 px-5 rounded-5 my-1">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-headingCategory">
                                        <button
                                            className="accordion-button collapsed text-white py-1 fs-4"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseCategory"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseCategory"
                                        >
                                            <FontAwesomeIcon className="me-3" icon={faLayerGroup} /> Category
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseCategory"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="flush-headingCategory"
                                        data-bs-parent="#accordionFlushExample3"
                                    >
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <Link
                                                    to="/addstaff"
                                                    className={activeLink === "/addstaff" ? "nav-link active text-white" : "nav-link text-white"}
                                                    onClick={() => handleLinkClick("/addstaff")}
                                                >
                                                    <FontAwesomeIcon className="me-3" icon={faPlus} /> Add Category
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link
                                                    to="/viewstaff"
                                                    className={activeLink === "/viewstaff" ? "nav-link active text-white" : "nav-link text-white"}
                                                    onClick={() => handleLinkClick("/viewstaff")}
                                                >
                                                    <FontAwesomeIcon className="me-2" icon={faEye} /> View Categorys
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>)}

                            {role === 'Admin' && (<li className="nav-item border border-1 border-white py-2 px-5 rounded-5 my-1">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-headingContact">
                                        <button
                                            className="accordion-button collapsed text-white py-1 fs-4"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseContact"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseContact"
                                        >
                                            <FontAwesomeIcon className="me-3" icon={faAddressBook} /> Contact
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseContact"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="flush-headingContact"
                                        data-bs-parent="#accordionFlushExample4"
                                    >
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <Link
                                                    to="/dashboard/add-contact"
                                                    className={activeLink === "/addstaff" ? "nav-link active text-white" : "nav-link text-white"}
                                                    onClick={() => handleLinkClick("/addstaff")}
                                                >
                                                    <FontAwesomeIcon className="me-3" icon={faPlus} /> Add Contact
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link
                                                    to="/dashboard/view-contact"
                                                    className={activeLink === "/viewstaff" ? "nav-link active text-white" : "nav-link text-white"}
                                                    onClick={() => handleLinkClick("/viewstaff")}
                                                >
                                                    <FontAwesomeIcon className="me-2" icon={faEye} /> View Contact
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>)}

                            {role === 'Admin' && (<li className="nav-item border border-1 border-white py-2 px-5 rounded-5 my-1">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-headingCourse">
                                        <button className="accordion-button collapsed text-white py-1 fs-4" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseCourse" aria-expanded="false" aria-controls="flush-collapseCourse">
                                            <FontAwesomeIcon className="me-3" icon={faBriefcase} /> Course
                                        </button>
                                    </h2>
                                    <div id="flush-collapseCourse" className="accordion-collapse collapse" aria-labelledby="flush-headingCourse" data-bs-parent="#accordionFlushExample">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <Link to="/addcourse" className={activeLink === "/addcourse" ? "nav-link active text-white" : "nav-link text-white"} onClick={() => handleLinkClick("/addcourse")}>
                                                    <FontAwesomeIcon className="me-3" icon={faPlus} /> Add Course
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="/viewcourses" className={activeLink === "/viewcourses" ? "nav-link active text-white" : "nav-link text-white"} onClick={() => handleLinkClick("/viewcourses")}>
                                                    <FontAwesomeIcon className="me-2" icon={faEye} /> View Courses
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>)}

                             {role === 'Admin' && (<li className="nav-item border border-1 border-white py-2 px-5 rounded-5 my-1">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingFeedback">
                                        <button class="accordion-button collapsed text-white py-1 fs-4" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFeedback" aria-expanded="false" aria-controls="flush-collapseFeedback">
                                            <FontAwesomeIcon className="me-3" icon={faInbox} /> Feedback
                                        </button>
                                    </h2>
                                    <div id="flush-collapseFeedback" class="accordion-collapse collapse" aria-labelledby="flush-headingFeedback" data-bs-parent="#accordionFlushExample">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <Link
                                                    to="/addfeedback"
                                                    className={activeLink === "/addfeedback" ? "nav-link active text-white" : "nav-link text-white"}
                                                    onClick={() => handleLinkClick("/addfeedback")}>
                                                    <FontAwesomeIcon className="me-3" icon={faPlus} /> Add Feedback
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link
                                                    to="/viewfeedback"
                                                    className={activeLink === "/viewfeedback" ? "nav-link active text-white" : "nav-link text-white"}
                                                    onClick={() => handleLinkClick("/viewfeedback")}>
                                                    <FontAwesomeIcon className="me-2" icon={faEye} /> View Feedback
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>)}
                            <li className="nav-item border border-1 border-white py-2 px-5 rounded-5 my-1">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingMessage">
                                        <button class="accordion-button collapsed text-white py-1 fs-4" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseMessage" aria-expanded="false" aria-controls="flush-collapseMessage">
                                            <FontAwesomeIcon className="me-3" icon={faEnvelope} /> Message
                                        </button>
                                    </h2>
                                    <div id="flush-collapseMessage" class="accordion-collapse collapse" aria-labelledby="flush-headingMessage" data-bs-parent="#accordionFlushExample">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <Link
                                                    to="/addmessage"
                                                    className={activeLink === "/addmessage" ? "nav-link active text-white" : "nav-link text-white"}
                                                    onClick={() => handleLinkClick("/addmessage")}>
                                                    <FontAwesomeIcon className="me-3" icon={faPlus} /> Add Message
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link
                                                    to="/viewmessages"
                                                    className={activeLink === "/viewmessages" ? "nav-link active text-white" : "nav-link text-white"}
                                                    onClick={() => handleLinkClick("/viewmessages")}>
                                                    <FontAwesomeIcon className="me-2" icon={faEye} /> View Messages
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item border border-1 border-white py-2 px-5 rounded-5 my-1">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingQuestion">
                                        <button class="accordion-button collapsed text-white py-1 fs-4" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseQuestion" aria-expanded="false" aria-controls="flush-collapseQuestion">
                                            <FontAwesomeIcon className="me-4" icon={faClipboardQuestion} /> Question
                                        </button>
                                    </h2>
                                    <div id="flush-collapseQuestion" class="accordion-collapse collapse" aria-labelledby="flush-headingQuestion" data-bs-parent="#accordionFlushExample">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <Link
                                                    to="/addquestion"
                                                    className={activeLink === "/addquestion" ? "nav-link active text-white" : "nav-link text-white"}
                                                    onClick={() => handleLinkClick("/addquestion")}>
                                                    <FontAwesomeIcon className="me-3" icon={faPlus} /> Add Question
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link
                                                    to="/viewquestions"
                                                    className={activeLink === "/viewquestions" ? "nav-link active text-white" : "nav-link text-white"}
                                                    onClick={() => handleLinkClick("/viewquestions")}>
                                                    <FontAwesomeIcon className="me-2" icon={faEye} /> View Questions
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item border border-1 border-white py-2 px-5 rounded-5 my-1">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingRate">
                                        <button class="accordion-button collapsed text-white py-1 fs-4" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseRate" aria-expanded="false" aria-controls="flush-collapseRate">
                                            <FontAwesomeIcon className="me-3" icon={faStar} /> Rate
                                        </button>
                                    </h2>
                                    <div id="flush-collapseRate" class="accordion-collapse collapse" aria-labelledby="flush-headingRate" data-bs-parent="#accordionFlushExample">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <Link
                                                    to="/addrating"
                                                    className={activeLink === "/addrating" ? "nav-link active text-white" : "nav-link text-white"}
                                                    onClick={() => handleLinkClick("/addrating")}>
                                                    <FontAwesomeIcon className="me-3" icon={faPlus} /> Add Rating
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link
                                                    to="/viewratings"
                                                    className={activeLink === "/viewratings" ? "nav-link active text-white" : "nav-link text-white"}
                                                    onClick={() => handleLinkClick("/viewratings")}>
                                                    <FontAwesomeIcon className="me-2" icon={faEye} /> View Ratings
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            {role === 'Admin' && (<li className="nav-item border border-1 border-white py-2 px-5 rounded-5 my-1">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingSchool">
                                        <button class="accordion-button collapsed text-white py-1 fs-4" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSchool" aria-expanded="false" aria-controls="flush-collapseSchool">
                                            <FontAwesomeIcon className="me-3" icon={faSchool} /> School
                                        </button>
                                    </h2>
                                    <div id="flush-collapseSchool" class="accordion-collapse collapse" aria-labelledby="flush-headingSchool" data-bs-parent="#accordionFlushExample">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <Link
                                                    to="/dashboard/add-school"
                                                    className={activeLink === "/addschool" ? "nav-link active text-white" : "nav-link text-white"}
                                                    onClick={() => handleLinkClick("/addschool")}>
                                                    <FontAwesomeIcon className="me-3" icon={faPlus} /> Add School
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link
                                                    to="/dashboard/view-school"
                                                    className={activeLink === "/viewschools" ? "nav-link active text-white" : "nav-link text-white"}
                                                    onClick={() => handleLinkClick("/viewschools")}>
                                                    <FontAwesomeIcon className="me-2" icon={faEye} /> View Schools
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>)}

                             {role === 'Admin' && (<li className="nav-item border border-1 border-white py-2 px-5 rounded-5 my-1">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingTerm">
                                        <button class="accordion-button collapsed text-white py-1 fs-4" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTerm" aria-expanded="false" aria-controls="flush-collapseTerm">
                                            <FontAwesomeIcon className="me-3" icon={faCloudSun} /> Term
                                        </button>
                                    </h2>
                                    <div id="flush-collapseTerm" class="accordion-collapse collapse" aria-labelledby="flush-headingTerm" data-bs-parent="#accordionFlushExample">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <Link
                                                    to="/addterm"
                                                    className={activeLink === "/addterm" ? "nav-link active text-white" : "nav-link text-white"}
                                                    onClick={() => handleLinkClick("/addterm")}>
                                                    <FontAwesomeIcon className="me-3" icon={faPlus} /> Add Term
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link
                                                    to="/viewterms"
                                                    className={activeLink === "/viewterms" ? "nav-link active text-white" : "nav-link text-white"}
                                                    onClick={() => handleLinkClick("/viewterms")}>
                                                    <FontAwesomeIcon className="me-2" icon={faEye} /> View Terms
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>)}
                            {role === 'Admin' && (<li className="nav-item border border-1 border-white py-2 px-5 rounded-5 my-1">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingRole">
                                        <button class="accordion-button collapsed text-white py-1 fs-4" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseRole" aria-expanded="false" aria-controls="flush-collapseRole">
                                            <FontAwesomeIcon className="me-4" icon={faChalkboardTeacher} /> Role
                                        </button>
                                    </h2>
                                    <div id="flush-collapseRole" class="accordion-collapse collapse" aria-labelledby="flush-headingRole" data-bs-parent="#accordionFlushExample">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <Link
                                                    to="/dashboard/add-role"
                                                    className={activeLink === "/addteacher" ? "nav-link active text-white" : "nav-link text-white"}
                                                    onClick={() => handleLinkClick("/addteacher")}>
                                                    <FontAwesomeIcon className="me-3" icon={faPlus} /> Add Role
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link
                                                    to="/dashboard/view-role"
                                                    className={activeLink === "/viewteachers" ? "nav-link active text-white" : "nav-link text-white"}
                                                    onClick={() => handleLinkClick("/viewteachers")}>
                                                    <FontAwesomeIcon className="me-2" icon={faEye} /> View Roles
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>)}
                            {role === 'Admin' && (<li className="nav-item border border-1 border-white py-2 px-5 rounded-5 my-1">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingTime">
                                        <button class="accordion-button collapsed text-white py-1 fs-4" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTime" aria-expanded="false" aria-controls="flush-collapseTime">
                                            <FontAwesomeIcon className="me-3" icon={faCalendarAlt} /> Time
                                        </button>
                                    </h2>
                                    <div id="flush-collapseTime" class="accordion-collapse collapse" aria-labelledby="flush-headingTime" data-bs-parent="#accordionFlushExample">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <Link
                                                    to="/addschedule"
                                                    className={activeLink === "/addschedule" ? "nav-link active text-white" : "nav-link text-white"}
                                                    onClick={() => handleLinkClick("/addschedule")}>
                                                    <FontAwesomeIcon className="me-3" icon={faPlus} /> Add Time
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link
                                                    to="/viewschedules"
                                                    className={activeLink === "/viewschedules" ? "nav-link active text-white" : "nav-link text-white"}
                                                    onClick={() => handleLinkClick("/viewschedules")}>
                                                    <FontAwesomeIcon className="me-2" icon={faEye} /> View Times
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>)}
                        </ul>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Dashboard</h1>
                    </div>
                    {/* Add your dashboard content here */}
                    <div className="row pb-5">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MenuBar;