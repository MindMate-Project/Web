import React from "react";
import "./AboutAlzheimer.css";
import personImage from "../../../../images/landing/alzheimer-person.webp";
import brainImage from "../../../../images/landing/alzheimer-brain.webp";

const AboutAlzheimer = () => {
    return (
        <div className="about-alz-section" id="about-alz">
            <h2 className="about-alz-title">About Alzheimer's Disease</h2>

            <div className="about-alz-content-wrapper">
                <img
                    src={personImage}
                    alt="Person thinking with puzzle piece"
                    className="person-img"
                />

                <div className="info-cards-stack">
                    <div className="info-card">
                        Alzheimer's disease is a progressive neurological
                        disorder that affects memory, thinking, and behavior. It
                        is the most common cause of dementia among older adults.
                    </div>
                    <div className="info-card">
                        As the condition develops, it gradually damages brain
                        cells, leading to a decline in cognitive abilities such
                        as reasoning, communication, and decision-making.
                    </div>
                    <div className="info-card">
                        Patients may experience increasing difficulty with daily
                        tasks and often require continuous support from
                        caregivers or family members.
                    </div>
                </div>

                <img
                    src={brainImage}
                    alt="Brain illustration"
                    className="brain-img"
                />
            </div>
        </div>
    );
};

export default AboutAlzheimer;
