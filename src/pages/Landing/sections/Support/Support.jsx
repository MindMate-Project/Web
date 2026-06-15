import React from "react";
import "./Support.css";
import caregiverImage from "../../../../images/landing/support-caregiver.webp";

const Support = () => {
    const supportPoints = [
        "Caregivers can monitor the patient's live location anytime through an interactive map and receive alerts if the patient moves outside a safe zone.",
        "More than one caregiver can be assigned to a single patient to ensure continuous monitoring and shared responsibility",
        "From daily monitoring to emergency response, MindMate helps caregivers stay connected and informed without overwhelming them.",
        "Caregivers are the bridge between independence and safety. MindMate is designed to reduce their stress while improving the quality of care for patients.",
    ];

    return (
        <div className="support-section" id="support">
            <h2 className="support-title">
                Supporting Those Who Need Care the Most
            </h2>
            <div className="support-container">
                <div className="support-content">
                    <p className="support-subtitle">
                        A caregiver plays a vital role in supporting Alzheimer's patients by monitoring their safety, managing daily routines, and ensuring their well-being through MindMate's intelligent tools.
                    </p>

                    <h3 className="support-link">
                        What a Caregiver Can Do?
                    </h3>

                    <div className="support-points-list">
                        {supportPoints.map((point, index) => (
                            <div key={index} className="support-point-capsule">
                                {point}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="support-image-container">
                    <img
                        src={caregiverImage}
                        alt="Caregiver showing tablet to elder in bed"
                        className="caregiver-img"
                    />
                </div>
            </div>
        </div>
    );
};

export default Support;
