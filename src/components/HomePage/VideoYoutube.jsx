import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

const VideoYoutube = () => {
    return (<div className="w-100 h-auto pt-2">
        <div className="container-fluid w-75 h-100 m-auto overflow-hidden p-0">
            <div className="bg-danger d-flex align-items-center ps-5 mb-3 fs-2 fw-bold text-white" style={{ clipPath: 'polygon(80% 0, 100% 50%, 80% 100%, 0% 100%, 0 50%, 0% 0%)', height: '75px', width: '300px' }}>
                Video
                <FontAwesomeIcon className="ms-2" icon={faVideo} />
            </div>
            <div style={{ height: '350px' }} className="container-fluid w-100 mx-0 mb-2 mt-1 p-0 d-flex overflow-x-scroll">
                <div style={{minWidth:'450px'}} className="card rounded-5 overflow-hidden border border-4 border-danger me-2">
                    <embed className="w-100 h-100" src="https://www.youtube.com/embed/C9fN0sfKrj8?si=Lfu6Sh3qVSE0470b" type="" />
                </div>
                <div style={{minWidth:'450px'}} className="card rounded-5 overflow-hidden border border-4 border-danger me-2">
                    <embed className="w-100 h-100" src="https://www.youtube.com/embed/npHwy-nWNCU?si=qNe7rjhkv9GDcTcw" type="" />
                </div>
                
            </div>
        </div>
    </div>)
}

export default VideoYoutube;