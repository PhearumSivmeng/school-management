import React from "react";

const VisionCenter = () => {
    return <div className="container-fluid w-100 bg-light d-flex justify-content-center py-5 mb-5">
        <div style={{ clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)', width: '800px' }} className="container-fluid m-0 px-0 border border-2 border-secondary py-1">
            <img className="w-100 h-100" src="/assets/images/about/vision.jpg" alt="" />
        </div>
        <div className="container-fluid w-50 m-0 py-5 px-5 fs-4 d-flex flex-column justify-content-center">
            <h1>Our Vision</h1><br />
            <p>2U believes in the power of high-quality online education to create a better future for all. Through edX, our online learning platform, we see a world where learners everywhere have access to…</p>
            <ul>
                <li>Expert-led educational experiences.</li>
                <li>Flexible pathways to personal and professional achievement.</li>
                <li>Educational opportunities at every investment level.</li>
            </ul>
        </div>
    </div>
}

export default VisionCenter;