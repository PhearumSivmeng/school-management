import React from "react";
import HeroSection from "./HeroSection";
import Events from "./Events";
import CourseMarquee from "./CourseMarquee";
import TopInstructor from "./TopInstructor";
import TopStudent from "./TopStudent";
import VideoYoutube from "./VideoYoutube";
import Article from "./Article";

const Homepage = () => {
    return <div>

        <HeroSection />
        <Events />
        <CourseMarquee />
        <TopInstructor />
        <TopStudent />
        <CourseMarquee />
        <Article />
        <VideoYoutube />

    </div>;
}

export default Homepage;