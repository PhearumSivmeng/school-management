import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faEye, faComment, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const ArticleRead = () => {
    const [comment, setComment] = useState('');
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [ratesId, setRatesId] = useState([]);
    const [error, setError] = useState(null);
    const [numLikes, setNumLikes] = useState(0);
    const [allData,setAllData]= useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const articleResponse = await axios.get(`http://127.0.0.1:8000/api/article/${id}`);
                setArticle(articleResponse.data.message);

                // Fetch related articles based on the current article's category or any other criteria
                const relatedResponse = await axios.get(`http://127.0.0.1:8000/api/related-articles/${articleResponse.data.message.category.name}`);
                setRelatedArticles(relatedResponse.data.message);
                console.log(relatedResponse.data.message);

                // Capture the logged-in user's ID from local storage
                const accountId = localStorage.getItem('userId');

                const likesResponse = await axios.get(`http://127.0.0.1:8000/api/rate/likes/${id}`);
                if (likesResponse && likesResponse.data) {
                    setNumLikes(likesResponse.data.message);
                    console.log(likesResponse.data.message);
                }
                // Update the view count in the rate API
                const res = await axios.post(`http://127.0.0.1:8000/api/rate`, {
                    rate: 0, // Assuming rate is for counting views
                    like: 0,
                    comment: '',
                    view: 1, // Increment view count
                    accountId: accountId,
                    articleId: id
                });
                setRatesId(res.data.id);
                console.log(res.data.id)

                const res1 = await axios.get(`http://127.0.0.1:8000/api/rateAll/${id}`);
                setAllData(res1.data.message);
                console.log(res1.data.message)

            } catch (error) {
                if (error.response && error.response.status === 429) {
                    console.log('Rate limited. Waiting before retrying...');
                    setTimeout(fetchData, 5000); // Retry after 5 seconds
                } else {
                    setError(error);
                }
            }
        };

        fetchData();
    }, [id]); // Only fetch data when ID changes

    const handleLike = async () => {
        try {
            // Capture the logged-in user's ID from local storage
            const accountId = localStorage.getItem('userId');

            // Update the like count in the rate API
            await axios.put(`http://127.0.0.1:8000/api/rate/${ratesId}`, {
                rate: 0, // Assuming rate is for counting views
                like: 1, // Increment like count
                comment: '',
                view: 0,
                accountId: accountId,
                articleId: id
            });

            // Update the number of likes displayed
            setNumLikes(numLikes + 1);
            window.location.reload();
        } catch (error) {
            console.error('Error updating like count:', error);
        }
    };
    const handleCommentPost = async () => {
        try {
            // Capture the logged-in user's ID from local storage
            const accountId = localStorage.getItem('userId');

            // Send a POST request to the API to post the comment
            await axios.put(`http://127.0.0.1:8000/api/rate/${ratesId}`, {
                rate: 0, // Assuming rate is for counting views
                like: 0, // Increment like count
                comment: comment,
                view: 0,
                accountId: accountId,
                articleId: id
            });

            // Clear the comment input field after posting
            setComment('');
            window.location.reload();




        } catch (error) {
            console.error('Error posting comment:', error);
            // Handle error
        }
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!article) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container-fluid w-100 h-auto">
            <div className="row w-100 h-auto">
                <div className="col-9 ps-5 py-3">
                    <div className="container-fluid p-5 fs-5">
                        <div className="card p-3 mb-5 border-0">
                            <h1>{article.title}</h1>
                            <hr /><br />
                            <p>Detail Post: </p>
                            <ul>
                                <li>Post-Date: <b>{article.created_at}</b></li>
                                <li>Author-Name: <b>{article.instructor.account.firstName + " " + article.instructor.account.secondName}</b></li>
                                <li>Category: <b>{article.category.name}</b></li>
                            </ul>
                        </div>
                        <div className="container-fluid pe-5">
                            <h3>{article.description}</h3><br />
                            <p>{article.paragraph}</p>
                            <img className="w-100 my-5" src={article.image} alt={article.title} />
                        </div>
                    </div>
                    <div className="container-fluid w-100">
                        <h1 className="mb-5">Related Article</h1>
                        <div style={{ height: '350px' }} className="container-fluid w-100 mx-0 mb-2 mt-1 p-0 d-flex overflow-x-scroll">
                            {relatedArticles.map(related => (
                                <Link key={related.id} style={{ minWidth: '300px', width: '300px', position: 'relative' }} to={`/article/${related.id}`} className="card h-100 bg-primary text-white rounded rounded-3 overflow-hidden border-3 border-dark me-4">
                                    <img src={related.image} className="card-img" alt={related.title} style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', height: '100%', objectFit: 'cover' }} />
                                    <div className="card-img-overlay bg-dark" style={{ opacity: '0.9', marginTop: '20%', height: '65%' }}></div>
                                    <div className="card-img-overlay d-flex flex-column justify-content-center">
                                        <h5 className="card-title fs-4 fw-bold text-decoration-underline">{related.title}</h5>
                                        <p className="card-text fs-6">{related.description}</p>
                                        <hr className="bg-white text-white" />
                                        <p className="card-text fs-6">Available from now on!!!</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div style={{ height: "200vh" }} className="col-3 pe-5 py-3 overflow-scroll">
                    <div className="container-fluid p-5 fs-5">
                        <p onClick={handleLike} ><FontAwesomeIcon className="me-2" icon={faHeart} /> {numLikes.like} Likes</p>
                        <p><FontAwesomeIcon className="me-2" icon={faEye} /> {numLikes.view} Views</p>
                        <p><FontAwesomeIcon className="me-2" icon={faComment} />  {numLikes.comment} Comments</p>
                    </div>
                    <div className="container-fluid pb-5 fs-5">
                        <h1>Comment</h1>
                        <div className="container d-flex btn-group my-5">
                            <input
                                className="form-control"
                                type="text"
                                name="comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Comment..."
                            />
                            <button
                                className="form-control btn btn-primary w-25"
                                onClick={handleCommentPost}
                            >
                                Post
                            </button>
                        </div>
                        <div className="container-fluid w-100 m-0 p-0 d-flex flex-column ">
                            {allData.map(datas => (
                                datas.comment?
                                <div key={datas.id} className="row w-100 d-flex align-items-center border border-1 p-2 m-0 fs-6 mb-2">
                                    <div className="">
                                        <h3>{datas.account.firstName}</h3>
                                        <p>{datas.comment}</p>
                                    </div>
                                    <div className="">
                                        <FontAwesomeIcon icon={faCircleCheck} />
                                    </div>
                                </div>:null
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleRead;