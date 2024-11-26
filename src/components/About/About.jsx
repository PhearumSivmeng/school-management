import React from "react";
import CenterNews from "./CenterNews";
import EventJoining from "./EventJoining";
import SummarizeDetail from "./SummarizeDetail";
import VisionCenter from "./VisionCenter";

const About = () => {
    return (<div className="my-5 py-5">
        <CenterNews/>
        <EventJoining/>
        <SummarizeDetail/>
        <VisionCenter/>
    </div>
    );

}

export default About;