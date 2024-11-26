import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faAnglesRight,faAward,faTimeline } from "@fortawesome/free-solid-svg-icons";
const TableCourse = () => {
    return <table className="table w-100 fs-3 table-bordered table-info table-striped text-center">
    <thead>
        <tr>
            <th className="w-50">Course</th>
            <th className="w-25">Duration</th>
            <th className="w-25">Price</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colSpan={3}>Graphic Design</td>
        </tr>
        <tr>
            <td>Photoshop, Illustrator</td>
            <td>3 months</td>
            <td>75$</td>
        </tr>
        <tr>
            <td>Video, Adobe Premium</td>
            <td>3 months</td>
            <td>75$</td>
        </tr>
        <tr>
            <td colSpan={3}>Website</td>
        </tr>
        <tr>
            <td>Web-FrontEnd</td>
            <td>5 months</td>
            <td>100$</td>
        </tr>
        <tr>
            <td>Web-BackEnd</td>
            <td>3 months</td>
            <td>90$</td>
        </tr>
        <tr>
            <td>React Js</td>
            <td>3 months</td>
            <td>90$</td>
        </tr>
        <tr>
            <td>Laravel</td>
            <td>3 months</td>
            <td>90$</td>
        </tr>
        <tr>
            <td colSpan={3}>Mobile-App</td>
        </tr>
        <tr>
            <td>Flutter</td>
            <td>4 months</td>
            <td>90$</td>
        </tr>
        <tr>
            <td>Java</td>
            <td>4 months</td>
            <td>90$</td>
        </tr>
        <tr>
            <td>Swift</td>
            <td>4 months</td>
            <td>90$</td>
        </tr>
        <tr>
            <td>Kotline</td>
            <td>4 months</td>
            <td>90$</td>
        </tr>
        <tr>
            <td colSpan={3}>Desktop-App</td>
        </tr>
        <tr>
            <td>Java</td>
            <td>3 months</td>
            <td>90$</td>
        </tr>
        <tr>
            <td>C#</td>
            <td>4 months</td>
            <td>90$</td>
        </tr>
        <tr>
            <td colSpan={3}>Basic Code</td>
        </tr>
        <tr>
            <td>C/C++/OOP</td>
            <td>3 months</td>
            <td>69$</td>
        </tr>
        <tr>
            <td>Basic IT</td>
            <td>5 months</td>
            <td>99$</td>
        </tr>
        <tr>
            <td>Python</td>
            <td>3 months</td>
            <td>69$</td>
        </tr>

    </tbody>

</table>
}

export default TableCourse;