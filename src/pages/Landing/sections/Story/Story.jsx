import React from "react";
import "./Story.css";
import storyImage from "../../../../images/landing/story-phone.webp";

const Story = () => {
    return (
        <div className="story-section" id="story">
            <div className="story-container">
                <h2 className="story-title">
                    The Story Behind{" "}
                    <span className="highlight-text">MindMate</span>
                </h2>

                <div className="story-grid">
                    <div className="story-content">
                        <p className="story-paragraph">
                            Every 3 seconds, someone in the world develops
                            dementia. Behind each diagnosis is a person who may
                            forget faces, wander from home, or struggle with
                            daily tasks, and a family that worries constantly.
                        </p>
                        <p className="story-paragraph">
                            <span className="story-bold-underline">
                                MindMate
                            </span>{" "}
                            was born from a simple belief that technology should
                            comfort, not complicate. It's designed to give
                            patients independence and caregivers peace of mind,
                            all through one gentle, intuitive companion.
                        </p>
                    </div>
                    <div className="story-image-container">
                        <img
                            src={storyImage}
                            alt="An elder holding head with puzzle pieces around"
                            className="story-img"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Story;
