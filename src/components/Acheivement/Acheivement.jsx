import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEye } from "@fortawesome/free-regular-svg-icons";
import HeaderAcheivement from "./HeaderAcheivement";
import StudentAcheivement from "./StudentAcheivement";
import StaffOutstand from "./StaffOutstand";
import SchoolEvents from "./SchoolEvents";

const Acheivement = () => {
    return <div className="my-5 text-center" >
        <HeaderAcheivement/>
        <StudentAcheivement/>
        <StaffOutstand/>
        <SchoolEvents/>
    </div>;
}

export default Acheivement;