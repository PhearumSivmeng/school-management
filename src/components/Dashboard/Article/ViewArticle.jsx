import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const ViewArticle = () => {
    const [data, setData] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/article');
                const result = await response.json();
                if (result.status === 200) {
                    setData(result.time || []);
                } else {
                    console.error('Error fetching data:', result);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchInstructors = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/instructor');
                const result = await response.json();
                setInstructors(result.message || []);
            } catch (error) {
                console.error('Error fetching instructors:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/category');
                const result = await response.json();
                setCategories(result.message || []);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchData();
        fetchInstructors();
        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this article?");
        if (isConfirmed) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/article/${id}`, {
                    method: 'DELETE'
                });
                const result = await response.json();
                if (result.status === 200) {
                    setData(data.filter(item => item.id !== id));
                } else {
                    console.error('Error deleting article:', result);
                }
            } catch (error) {
                console.error('Error deleting article:', error);
            }
        }
    };

    const handleUpdate = (id) => {
        navigate(`/dashboard/add-article/${id}`);
    };

    // Pagination logic
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = data.slice(indexOfFirstArticle, indexOfLastArticle);

    const totalPages = Math.ceil(data.length / articlesPerPage);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Paragraph</th>
                            <th>Image</th>
                            <th>Instructor</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentArticles.length > 0 ? (
                            currentArticles.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                    <td>{item.paragraph}</td>
                                    <td>
                                        <img
                                            style={{ width: "75px", height: "75px", objectFit: "cover" }}
                                            src={item.image}
                                            alt="Article"
                                        />
                                    </td>
                                    <td>{item.instructor.account.firstName}</td>
                                    <td>{item.category.name}</td>
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
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">No articles found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                {[...Array(totalPages).keys()].map(number => (
                    <button
                        key={number + 1}
                        onClick={() => handleClick(number + 1)}
                        className={`btn ${currentPage === number + 1 ? 'btn-primary' : 'btn-secondary'} mx-1`}>
                        {number + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ViewArticle;