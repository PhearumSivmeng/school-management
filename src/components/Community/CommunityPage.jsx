import React from "react";
import CategoryComminicate from "./CategoryCommunicate";
import QuestionDrop from "./QuestionDrop";
import ContactChat from "./ContactChat";
const CommunityPage = () => {

    return (
        <div style={{ height: 'auto' }} className="container-fluid w-100 bg-light my-5">
            <div className="row w-100 h-100">
                <CategoryComminicate/>
                <QuestionDrop/>
                <ContactChat/>
            </div>
        </div>
    );
}

export default CommunityPage;