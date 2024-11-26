import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { faAnglesRight, faAward, faTimeline } from "@fortawesome/free-solid-svg-icons";
import TableCourse from "./TableCourse";
import AvailableCourse from "./AvailableCourse";
import PromotionCourse from "./PromotionClass";
import AvailableTable from "./AvaibleTable";
const Course = () => {
    return <div>
        <h1 className="ms-5 mt-5 text-primary"
        >Currently Course available at ETEC:</h1>
        <p className="ms-5"
        >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias, nisi illum quas omnis sequi minima?</p>
        <div className="row my-5">
            <div className="col-8 h-100 px-5">
                <h1 className="my-5">Course Detail:</h1>
                <TableCourse />
                <h1 className="my-5">Course Schedule:</h1>
                <AvailableTable />
            </div>
            <div className="col-4 h-100">
                <AvailableCourse />
                <PromotionCourse />
            </div>
        </div>
    </div>;
}

export default Course;