import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <div style={{ height: '600px' }} className="container-fluid w-100 mx-0 my-5 p-0">
            <div className="container-fluid w-75 h-100 m-auto bg-light rounded rounded-5 overflow-hidden border border-1 p-0">
                <div id="carouselExampleInterval" class="carousel slide w-100 h-100" data-bs-ride="carousel">
                    <div class="carousel-inner w-100 h-100">
                        <div class="carousel-item active w-100 h-100" data-bs-interval="10000">
                            <Link className="d-flex align-items-center nav-link text-white w-100 h-100" to="/article">
                                <img src="/assets/images/heroSection/slide1.jpg" class="d-block w-100 h-100" alt="..." />
                            </Link>
                        </div>
                        <div class="carousel-item w-100 h-100" data-bs-interval="2000">
                            <Link className="d-flex align-items-center nav-link text-white w-100 h-100" to="/article">
                                <img src="/assets/images/heroSection/slide2.webp" class="d-block w-100 h-100" alt="..." />
                            </Link>
                        </div>
                        <div class="carousel-item w-100 h-100">
                            <Link className="d-flex align-items-center nav-link text-white w-100 h-100" to="/article">
                                <img src="/assets/images/heroSection/slide3.webp" class="d-block w-100 h-100" alt="..." />
                            </Link>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    );

}

export default HeroSection;