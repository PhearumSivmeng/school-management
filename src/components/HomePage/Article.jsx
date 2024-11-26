import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Article = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/articles?category=Article');
                setArticles(response.data.message);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, []);

    return (
        <div className="container-fluid w-75 h-100 m-auto overflow-hidden p-0 my-5">
        <div className="row row-cols-1 row-cols-md-3 g-3">
            {articles.map(article => (
                <Link to={`/article/${article.id}`} key={article.id} className="col">
                    <div style={{height: "300px"}} className="card bg-dark text-white">
                        <img src={article.image} className="card-img" alt={article.title} />
                        <div className="card-img-overlay">
                            <div className="bg-secondary d-flex align-items-center ps-3 py-2 fs-4 fw-bold text-white" style={{ clipPath: 'polygon(80% 0, 100% 50%, 80% 100%, 0% 100%, 0 50%, 0% 0%)' }}>
                                {article.title}
                            </div>
                            <p className="card-text fs-6 py-1">{article.create_at}</p>
                            <button className="btn btn-secondary px-3 py-1 border border-3 border-white fw-bold text-white">Read More</button>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    </div>
    );
}

export default Article;