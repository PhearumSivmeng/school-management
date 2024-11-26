import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCakeCandles } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Events = () => {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async (retryCount = 0) => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/articles?category=Events');
                setArticles(response.data.message);
            } catch (error) {
                // Check if the error is due to rate limiting (status code 429)
                if (error.response && error.response.status === 429) {
                    // Implement exponential backoff and retry
                    const retryDelay = Math.pow(2, retryCount) * 1000; // Exponential backoff
                    console.log(`Rate limited. Retrying in ${retryDelay / 1000} seconds...`);
                    setTimeout(() => {
                        fetchArticles(retryCount + 1); // Retry with incremented retry count
                    }, retryDelay);
                } else {
                    setError(error); // Set error state for other types of errors
                }
            }
        };

        fetchArticles();
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    
    return (
        <div className="w-100 h-auto pt-2">
            <div className="container-fluid w-75 h-100 m-auto overflow-hidden p-0">
                <div className="bg-primary d-flex align-items-center ps-5 mb-3 fs-2 fw-bold text-white" style={{ clipPath: 'polygon(80% 0, 100% 50%, 80% 100%, 0% 100%, 0 50%, 0% 0%)', height: '75px', width: '300px' }}>
                    Events
                    <FontAwesomeIcon className="ms-2" icon={faCakeCandles} />
                </div>
                <div style={{ height: '350px' }} className="container-fluid w-100 mx-0 mb-2 mt-1 p-0 d-flex overflow-x-scroll">
                    {articles.map(article => (
                        <Link key={article.id} style={{ minWidth: '300px', width: '300px', position: 'relative' }} to={`/article/${article.id}`} className="card h-100 bg-primary text-white rounded rounded-3 overflow-hidden border-3 border-primary me-4">
                             <img src={article.image} className="card-img" alt={article.title} style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', height: '100%', objectFit: 'cover' }} />
                            <div className="card-img-overlay bg-dark" style={{ opacity: '0.9', marginTop: '20%', height: '65%' }}></div>
                            <div className="card-img-overlay d-flex flex-column justify-content-center">
                                <h5 className="card-title fs-4 fw-bold text-decoration-underline">{article.title}</h5>
                                <p className="card-text fs-6">{article.description}</p>
                                <hr className="bg-white text-white" />
                                <p className="card-text fs-6">Available from now on!!!</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Events;