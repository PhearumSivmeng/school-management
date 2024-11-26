import React from "react";

const CenterNews=()=>{
    return <div className="m-0 p-0">
        <div className="container-fluid bg-white d-flex justify-content-center align-content-center h-auto mt-5">
            <div className="w-25 h-auto">
                <img className="w-100" src="/assets/images/about/profile.png" alt="" />
            </div>
            <div className="w-50 d-flex align-items-center">
                <h1 style={{ fontSize: '70px' }} className="text-center">Welcome to where possibilities begin</h1>
            </div>

        </div>
        <div className="bg-primary container-fluid w-100 py-3 m-0 mb-5 text-center">
            <a className="fs-3 text-white text-decoration-none" href="">Check out our latest company news!</a>
        </div>
    </div>
}

export default CenterNews;