import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const FieldArticle = () => {
    const { id } = useParams();

    const [articleData, setArticleData] = useState({
        title: "",
        description: "",
        paragraph: "",
        image: null,
        instructorId: "",
        categoryId: ""
    });
    const [instructors, setInstructors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isUpdateMode, setIsUpdateMode] = useState(false);

    useEffect(() => {
        if (id) {
            setIsUpdateMode(true);
            const fetchArticleData = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/api/article/${id}`);
                    const result = await response.json();
                    setArticleData(result);
                } catch (error) {
                    console.error('Error fetching article data:', error);
                }
            };
            fetchArticleData();
        } else {
            setIsUpdateMode(false);
        }
    }, [id]);

    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/instructors_with_accounts');
                const result = await response.json();
                setInstructors(result.message);
            } catch (error) {
                console.error('Error fetching instructors:', error);
            }
        };
        fetchInstructors();

        const fetchCategories = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/category');
                const result = await response.json();
                setCategories(result.time);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setArticleData({
            ...articleData,
            [name]: files ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(articleData).forEach(key => {
            data.append(key, articleData[key]);
        });

        try {
            if (isUpdateMode) {
                // Update existing article
                const response = await axios.post(`http://127.0.0.1:8000/api/article/${id}`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Article Data Updated:', response.data);
            } else {
                // Create new article
                const response = await axios.post('http://127.0.0.1:8000/api/article', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Form Data Submitted:', response.data);
            }

            // Optionally, you can reset the form or handle successful submission
            setArticleData({
                title: '',
                description: '',
                paragraph: '',
                image: null,
                instructorId: '',
                categoryId: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="container w-50 mt-5">
            <h2 className="mb-4">Article Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={articleData.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={articleData.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="paragraph" className="form-label">Paragraph</label>
                    <textarea
                        className="form-control"
                        id="paragraph"
                        name="paragraph"
                        value={articleData.paragraph}
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
                    <label htmlFor="instructorId" className="form-label">Instructor</label>
                    <select
                        className="form-control"
                        id="instructorId"
                        name="instructorId"
                        value={articleData.instructorId}
                        onChange={handleChange}
                    >
                        <option value="">Select Instructor</option>
                        {instructors.map(instructor => (
                            <option key={instructor.id} value={instructor.id}>
                                {instructor.account.firstName} {instructor.account.secondName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="categoryId" className="form-label">Category</label>
                    <select
                        className="form-control"
                        id="categoryId"
                        name="categoryId"
                        value={articleData.categoryId}
                        onChange={handleChange}
                    >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
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

export default FieldArticle;