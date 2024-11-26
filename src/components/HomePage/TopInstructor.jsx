import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { Link } from 'react-router-dom';

const TopInstructor = () => {

    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/articles?category=Self-Detail');
                setInstructors(response.data.message);
            } catch (error) {
                console.error('Error fetching instructors:', error);
            }
        };

        fetchInstructors();
    }, []);

    return (<div className="w-100 h-auto pt-2 mb-5 mt-5">
         <div className="bg-primary d-flex align-items-center ps-5 mb-3 fs-2 fw-bold text-white" style={{ clipPath: 'polygon(80% 0, 100% 50%, 80% 100%, 0% 100%, 0 50%, 0% 0%)', height: '75px', width: '400px', marginLeft: '225px' }}>
                Top Instructor
                <FontAwesomeIcon className="ms-2" icon={faStar} />
        </div>
        <div className="container-fluid w-75 h-100 m-auto d-flex justify-content-evenly overflow-hidden p-0">

    {instructors.map((instructor, index) => (
        <Link to={`/article/${instructor.id}`} key={instructor.id} className="col-4">
            <div className="row text-dark w-100 my-1 p-0 me-0">
                <div className="col-12">
                    <div style={{ height: '50px' }} className="container w-100 bg-primary text-center text-white fw-bold fs-2">Top {index + 1}</div>
                    <div className="container bg-primary my-4 d-flex flex-column align-items-center text-white py-5">
                        <h4>{instructor.instructor.account.university}</h4>
                        <p>{instructor.instructor.quote}</p>
                        <h1>{instructor.firstName}</h1>
                        <h2>{instructor.secondName}</h2>
                        <img style={{ maxWidth: '100%', height: 'auto', maxHeight: '350px' }} className="rounded-1 border border-2 border-white" src={instructor.instructor.account.profileImage} alt="" />
                        <div className="container w-100 text-center">
                            <FontAwesomeIcon className="mx-1 my-3" icon={faStar} />
                            <FontAwesomeIcon className="mx-1 my-3" icon={faStar} />
                            <FontAwesomeIcon className="mx-1 my-3" icon={faStar} />
                            <FontAwesomeIcon className="mx-1 my-3" icon={faStar} />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    ))}
</div>
    </div>);

}

export default TopInstructor;