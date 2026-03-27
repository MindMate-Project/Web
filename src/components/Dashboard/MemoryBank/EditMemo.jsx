import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGetMemoryById from "../../../hook/memory/get-memory-by-id-hook";
import useUpdateMemory from "../../../hook/memory/update-memory-hook";
import "./EditMemo.css";

function EditMemo() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");
    const [relation, setRelation] = useState("");
    const [date, setDate] = useState("");
    const [tags, setTags] = useState("");
    const [mediaPreview, setMediaPreview] = useState(null);
    const [isVideo, setIsVideo] = useState(false);

    const [memoryData] = useGetMemoryById(id);
    const [handleUpdateMemory, updateLoading] = useUpdateMemory();

    const isVideoUrl = (url) => {
        if (!url) return false;
        const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
        return videoExtensions.some((ext) => url.toLowerCase().includes(ext));
    };

    useEffect(() => {
        if (memoryData && memoryData._id) {
            setTitle(memoryData.title || "");
            setCaption(memoryData.caption || "");
            setRelation(memoryData.relation || "");
            setDate(memoryData.date ? new Date(memoryData.date).toISOString().split('T')[0] : "");
            setTags(memoryData.tags ? memoryData.tags.join(", ") : "");
            setMediaPreview(memoryData.file_url || null);
            setIsVideo(isVideoUrl(memoryData.file_url));
        }
    }, [memoryData]);

    const handleSave = async () => {
        const body = {
            title,
            caption,
            tags: tags.split(",").map((t) => t.trim()).filter((t) => t),
        };

        if (memoryData?.type === "photo") {
            body.relation = relation;
        }

        if (memoryData?.type === "video") {
            body.date = date || null;
        }

        const result = await handleUpdateMemory(id, body);

        if (result.success) {
            navigate(`/api/dashboard/memory-bank/${id}`);
        } else {
            console.error("Failed to update memory:", result.error);
            alert("Failed to save changes. Please try again.");
        }
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
                    {/* Upload Block (hidden for text type) */}
                    {memoryData?.type !== "text" && (
                        <div className="editmemory-upload-container">
                            <input type="file" id="fileUpload" hidden />
                            <label
                                htmlFor="fileUpload"
                                className="editmemory-upload-box"
                                style={
                                    mediaPreview
                                        ? {
                                              padding: 0,
                                              overflow: "hidden",
                                              border: "none",
                                              background: "transparent",
                                          }
                                        : {}
                                }
                            >
                                {mediaPreview ? (
                                    isVideo ? (
                                        <video
                                            src={mediaPreview}
                                            muted
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "contain",
                                                borderRadius: "12px",
                                            }}
                                        />
                                    ) : (
                                        <img
                                            src={mediaPreview}
                                            alt="Preview"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "contain",
                                                borderRadius: "12px",
                                            }}
                                        />
                                    )
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
                    )}

                    {/* Form Block */}
                    <div className="editmemory-form-container">
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

                        {memoryData?.type === "photo" && (
                            <div className="editmemory-form-group">
                                <label className="editmemory-label">Relation</label>
                                <input
                                    type="text"
                                    className="editmemory-input"
                                    value={relation}
                                    onChange={(e) => setRelation(e.target.value)}
                                />
                            </div>
                        )}

                        {memoryData?.type === "video" && (
                            <div className="editmemory-form-group">
                                <label className="editmemory-label">Date</label>
                                <input
                                    type="date"
                                    className="editmemory-input"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                        )}

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
                                    disabled={updateLoading}
                                >
                                    {updateLoading ? "Saving..." : "Save"}
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
