import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faAnglesRight, faAward, faTimeline } from "@fortawesome/free-solid-svg-icons";
const PromotionCourse = () => {
    return <div className="col-12 h-auto py-5 fs-4 border rounded border-2 border-black my-5">
    <h3 className="text-center">
        <FontAwesomeIcon icon={faAward} /> Events: </h3>
    <ul className="nav navbar flex-column align-items-start ps-5">
        <li className="nav-item">
            <FontAwesomeIcon icon={faAnglesRight} /> C/C++/OOP</li>
        <li className="nav-item">
            <FontAwesomeIcon icon={faAnglesRight} /> Preparation for IT</li>
        <li className="nav-item">
            <FontAwesomeIcon icon={faAnglesRight} /> JAVA</li>
        <li className="nav-item">
            <FontAwesomeIcon icon={faAnglesRight} /> C#</li>
        <li className="nav-item">
            <FontAwesomeIcon icon={faAnglesRight} /> Web-Design</li>
        <li className="nav-item">
            <FontAwesomeIcon icon={faAnglesRight} /> C/C++/OOP</li>
        <li className="nav-item">
            <FontAwesomeIcon icon={faAnglesRight} /> Preparation for IT</li>
        <li className="nav-item">
            <FontAwesomeIcon icon={faAnglesRight} /> JAVA</li>
        <li className="nav-item">
            <FontAwesomeIcon icon={faAnglesRight} /> C#</li>
        <li className="nav-item">
            <FontAwesomeIcon icon={faAnglesRight} /> Web-Design</li>
    </ul>
</div>;
}
export default PromotionCourse;