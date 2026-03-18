import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddMemo.css";

function AddMemory() {
    const [selectedType, setSelectedType] = useState("");
    const navigate = useNavigate();

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    return (
        <div className="memorybank">
            <div className="addmemory-container">
                <div
                    className="addmemory-back-link"
                    onClick={() => navigate("/api/dashboard/memory-bank")}
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19 12H5M5 12L12 19M5 12L12 5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span>back to memory bank</span>
                </div>

                <h2 className="addmemory-page-title">Add New Memory</h2>

                <div className="addmemory-card">
                    {/* Upload Block */}
                    <div className="addmemory-upload-container">
                        <input type="file" id="fileUpload" hidden />
                        <label
                            htmlFor="fileUpload"
                            className="addmemory-upload-box"
                        >
                            <div className="addmemory-upload-content">
                                <svg
                                    width="40"
                                    height="40"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12 4L12 16M12 4L8 8M12 4L16 8M4 16L4 17C4 18.6569 5.34315 20 7 20L17 20C18.6569 20 20 18.6569 20 17L20 16"
                                        stroke="#757575"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <span>Upload Media</span>
                            </div>
                        </label>
                    </div>

                    {/* Form Block */}
                    <div className="addmemory-form-container">
                        <div className="addmemory-form-group">
                            <label className="addmemory-label">Type</label>
                            <div className="addmemory-radio-group">
                                <label className="addmemory-radio-label">
                                    <input
                                        type="radio"
                                        name="memoryType"
                                        value="Photo"
                                        checked={selectedType === "Photo"}
                                        onChange={handleTypeChange}
                                    />
                                    <span className="addmemory-radio-custom"></span>
                                    Photo
                                </label>
                                <label className="addmemory-radio-label">
                                    <input
                                        type="radio"
                                        name="memoryType"
                                        value="Video"
                                        checked={selectedType === "Video"}
                                        onChange={handleTypeChange}
                                    />
                                    <span className="addmemory-radio-custom"></span>
                                    Video
                                </label>
                                <label className="addmemory-radio-label">
                                    <input
                                        type="radio"
                                        name="memoryType"
                                        value="Text"
                                        checked={selectedType === "Text"}
                                        onChange={handleTypeChange}
                                    />
                                    <span className="addmemory-radio-custom"></span>
                                    Text
                                </label>
                            </div>
                        </div>

                        <div className="addmemory-form-group">
                            <label className="addmemory-label">Title</label>
                            <input type="text" className="addmemory-input" />
                        </div>

                        <div className="addmemory-form-group">
                            <label className="addmemory-label">Caption</label>
                            <textarea className="addmemory-textarea"></textarea>
                        </div>

                        <div className="addmemory-tags-actions-row">
                            <div className="addmemory-form-group addmemory-tags-group">
                                <label className="addmemory-label">Tags</label>
                                <input
                                    type="text"
                                    className="addmemory-input"
                                />
                            </div>

                            <div className="addmemory-actions">
                                <button className="addmemory-btn-add">
                                    Add
                                </button>
                                <button
                                    className="addmemory-btn-cancel"
                                    onClick={() =>
                                        navigate("/api/dashboard/memory-bank")
                                    }
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddMemory;
