import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { memoryData } from "./MemoryBank";
import "./EditMemo.css";

function EditMemo() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [selectedType, setSelectedType] = useState("");
    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");
    const [tags, setTags] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (id) {
            const mem = memoryData.find((m) => m.id.toString() === id);
            if (mem) {
                const mapType = {
                    photo: "Photo",
                    video: "Video",
                    text: "Text",
                };
                setSelectedType(mapType[mem.type] || "Photo");
                setTitle(mem.title || "");
                setCaption(mem.caption || mem.description || "");
                setTags(mem.tags ? mem.tags.join(", ") : "");
                setImagePreview(mem.image || null);
            }
        }
    }, [id]);

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    const handleSave = () => {
        // Mock save -> redirect
        navigate("/api/dashboard/memory-bank");
    };

    return (
        <div className="memorybank">
            <div className="editmemory-container">
                <div
                    className="editmemory-back-link"
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

                <h2 className="editmemory-page-title">Edit Memory</h2>

                <div className="editmemory-card">
                    {/* Upload Block */}
                    <div className="editmemory-upload-container">
                        <input type="file" id="fileUpload" hidden />
                        <label
                            htmlFor="fileUpload"
                            className="editmemory-upload-box"
                            style={
                                imagePreview
                                    ? {
                                          padding: 0,
                                          overflow: "hidden",
                                          border: "none",
                                          background: "transparent",
                                      }
                                    : {}
                            }
                        >
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                        borderRadius: "12px",
                                    }}
                                />
                            ) : (
                                <div className="editmemory-upload-content">
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

                    {/* Form Block */}
                    <div className="editmemory-form-container">
                        <div className="editmemory-form-group">
                            <label className="editmemory-label">Type</label>
                            <div className="editmemory-radio-group">
                                <label className="editmemory-radio-label">
                                    <input
                                        type="radio"
                                        name="memoryType"
                                        value="Photo"
                                        checked={selectedType === "Photo"}
                                        onChange={handleTypeChange}
                                    />
                                    <span className="editmemory-radio-custom"></span>
                                    Photo
                                </label>
                                <label className="editmemory-radio-label">
                                    <input
                                        type="radio"
                                        name="memoryType"
                                        value="Video"
                                        checked={selectedType === "Video"}
                                        onChange={handleTypeChange}
                                    />
                                    <span className="editmemory-radio-custom"></span>
                                    Video
                                </label>
                                <label className="editmemory-radio-label">
                                    <input
                                        type="radio"
                                        name="memoryType"
                                        value="Text"
                                        checked={selectedType === "Text"}
                                        onChange={handleTypeChange}
                                    />
                                    <span className="editmemory-radio-custom"></span>
                                    Text
                                </label>
                            </div>
                        </div>

                        <div className="editmemory-form-group">
                            <label className="editmemory-label">Title</label>
                            <input
                                type="text"
                                className="editmemory-input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="editmemory-form-group">
                            <label className="editmemory-label">Caption</label>
                            <textarea
                                className="editmemory-textarea"
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="editmemory-tags-actions-row">
                            <div className="editmemory-form-group editmemory-tags-group">
                                <label className="editmemory-label">Tags</label>
                                <input
                                    type="text"
                                    className="editmemory-input"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                />
                            </div>

                            <div className="editmemory-actions">
                                <button
                                    className="editmemory-btn-add"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>
                                <button
                                    className="editmemory-btn-cancel"
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

export default EditMemo;
