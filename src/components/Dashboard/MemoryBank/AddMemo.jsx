import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCreateMemory from "../../../hook/memory/create-memory-hook";
import "./AddMemo.css";

function AddMemory() {
    const navigate = useNavigate();

    const [selectedType, setSelectedType] = useState("Photo");
    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");
    const [tags, setTags] = useState("");
    const [relation, setRelation] = useState("");
    const [date, setDate] = useState("");
    
    // Media states
    const [file, setFile] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);
    const [isVideo, setIsVideo] = useState(false);

    const [handleCreateMemory, loading] = useCreateMemory();

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
        if (e.target.value === "Text") {
            setFile(null);
            setMediaPreview(null);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setMediaPreview(URL.createObjectURL(selectedFile));
            
            // Check if it's a video based on type
            setIsVideo(selectedFile.type.startsWith("video/"));
            
            // Auto-select Video type if video is uploaded
            if (selectedFile.type.startsWith("video/")) {
                setSelectedType("Video");
            } else if (selectedFile.type.startsWith("image/")) {
                setSelectedType("Photo");
            }
        }
    };

    const handleAdd = async () => {
        const patientId = localStorage.getItem("selectedPatientId");
        
        const formData = new FormData();
        formData.append("type", selectedType.toLowerCase());
        formData.append("title", title);
        formData.append("caption", caption);
        if (selectedType === "Photo" && relation) formData.append("relation", relation);
        if (selectedType === "Video" && date) formData.append("date", date);
        formData.append("patient_id", patientId);
        
        // Split tags and append
        const tagsArray = tags.split(",").map(t => t.trim()).filter(t => t);
        tagsArray.forEach(tag => {
            formData.append("tags[]", tag);
        });

        if (file) {
            formData.append("file", file);
        }

        const result = await handleCreateMemory(formData, patientId);
        if (result.success) {
            navigate("/api/dashboard/memory-bank");
        }
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
                    {selectedType !== "Text" && (
                        <div className="addmemory-upload-container">
                            <input 
                                type="file" 
                                id="fileUpload" 
                                hidden 
                                accept="image/*,video/*"
                                onChange={handleFileChange} 
                            />
                            <label
                                htmlFor="fileUpload"
                                className="addmemory-upload-box"
                                style={
                                    mediaPreview
                                        ? {
                                              padding: 0,
                                              overflow: "hidden",
                                              border: "none",
                                              background: "transparent",
                                              height: "350px",
                                              width: "100%",
                                          }
                                        : {
                                              height: "350px",
                                              width: "100%",
                                          }
                                }
                            >
                                {mediaPreview ? (
                                    isVideo ? (
                                        <video
                                            src={mediaPreview}
                                            muted
                                            style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "12px" }}
                                        />
                                    ) : (
                                        <img
                                            src={mediaPreview}
                                            alt="Preview"
                                            style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "12px" }}
                                        />
                                    )
                                ) : (
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
                                )}
                            </label>
                        </div>
                    )}

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
                            <input 
                                type="text" 
                                className="addmemory-input" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="addmemory-form-group">
                            <label className="addmemory-label">Caption</label>
                            <textarea 
                                className="addmemory-textarea"
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                            ></textarea>
                        </div>
                        
                        {selectedType === "Photo" && (
                            <div className="addmemory-form-group">
                                <label className="addmemory-label">Relation</label>
                                <input 
                                    type="text" 
                                    className="addmemory-input" 
                                    value={relation}
                                    onChange={(e) => setRelation(e.target.value)}
                                    placeholder="E.g., Son, Daughter, Friend..."
                                />
                            </div>
                        )}

                        {selectedType === "Video" && (
                            <div className="addmemory-form-group">
                                <label className="addmemory-label">Date</label>
                                <input 
                                    type="date" 
                                    className="addmemory-input" 
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                        )}

                        <div className="addmemory-tags-actions-row">
                            <div className="addmemory-form-group addmemory-tags-group">
                                <label className="addmemory-label">Tags</label>
                                <input
                                    type="text"
                                    className="addmemory-input"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                    placeholder="family, vacation, 2024"
                                />
                            </div>

                            <div className="addmemory-actions">
                                <button 
                                    className="addmemory-btn-add" 
                                    onClick={handleAdd}
                                    disabled={loading}
                                >
                                    {loading ? "Adding..." : "Add"}
                                </button>
                                <button
                                    className="addmemory-btn-cancel"
                                    onClick={() => navigate("/api/dashboard/memory-bank")}
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
