import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import useGetMemoryById from "../../../hook/memory/get-memory-by-id-hook";
import useDeleteMemory from "../../../hook/memory/delete-memory-hook";
import { useSelector } from "react-redux";
import "./MemoryDetails.css";

export default function MemoryDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const [memoryData] = useGetMemoryById(id);
    const [handleDeleteMemory] = useDeleteMemory();
    const loading = useSelector((state) => state.memoryReducer.loading);

    const mem = memoryData;

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const isVideoUrl = (url) => {
        if (!url) return false;
        const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
        return videoExtensions.some((ext) => url.toLowerCase().includes(ext));
    };

    if (loading) {
        return (
            <div className="memorybank">
                <p style={{ textAlign: "center", padding: "2rem" }}>Loading memory...</p>
            </div>
        );
    }

    if (!mem || !mem._id) {
        return (
            <div className="memory-details-container">
                <p>Memory not found.</p>
            </div>
        );
    }

    const isMedia = mem.type === "photo" || mem.type === "video";

    const handleDeleteClick = () => {
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const confirmDelete = async () => {
        const patientId = localStorage.getItem("selectedPatientId");
        await handleDeleteMemory(id, patientId);

        setIsDeleteModalOpen(false);
        setIsSuccessModalOpen(true);
    };

    const handleCloseSuccessModal = () => {
        setIsSuccessModalOpen(false);
        navigate("/api/dashboard/memory-bank");
    };

    return (
        <div className="memorybank">
            <div className="memory-details-container">
                <div
                    className="memory-details-back-link"
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

                <h1 className="memory-details-page-title">Memory Details</h1>

                <div className="memory-details-content-wrapper">
                    {/* Media Section */}
                    {isMedia && (
                        <div className="memory-details-media-row">
                            <div className="memory-details-label-space"></div>
                            <div className="memory-details-media-box">
                                {mem.file_url ? (
                                    isVideoUrl(mem.file_url) ? (
                                        <video
                                            src={mem.file_url}
                                            controls
                                            className="memory-details-image"
                                            style={{ width: "100%", objectFit: "cover", borderRadius: "12px" }}
                                        />
                                    ) : (
                                        <img
                                            src={mem.file_url}
                                            alt={mem.title}
                                            className="memory-details-image"
                                        />
                                    )
                                ) : (
                                    <div className="memory-details-video-placeholder">
                                        <svg
                                            width="80"
                                            height="80"
                                            viewBox="0 0 60 60"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle
                                                cx="30"
                                                cy="30"
                                                r="30"
                                                fill="#666666"
                                                fillOpacity="0.8"
                                            />
                                            <polygon
                                                points="25,18 42,30 25,42"
                                                fill="white"
                                            />
                                        </svg>
                                    </div>
                                )}
                                {mem.createdAt && (
                                    <div className="memory-details-date-badge">
                                        {formatDate(mem.createdAt)}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Info Rows */}
                    <div className="memory-details-row">
                        <div className="memory-details-label">Title</div>
                        <div className="memory-details-value-box">
                            {!isMedia && mem.createdAt && (
                                <div className="memory-details-date-badge-inline">
                                    {formatDate(mem.createdAt)}
                                </div>
                            )}
                            <p>{mem.title}</p>
                        </div>
                    </div>

                    {mem.caption && (
                        <div className="memory-details-row">
                            <div className="memory-details-label">Caption</div>
                            <div className="memory-details-value-box">
                                <p>{mem.caption}</p>
                            </div>
                        </div>
                    )}

                    {mem.type === "photo" && (
                        <div className="memory-details-row">
                            <div className="memory-details-label">Relation</div>
                            <div className="memory-details-value-box">
                                <p>{mem.relation ? mem.relation : "null"}</p>
                            </div>
                        </div>
                    )}

                    {mem.type === "video" && (
                        <div className="memory-details-row">
                            <div className="memory-details-label">Date</div>
                            <div className="memory-details-value-box">
                                <p>{mem.date ? formatDate(mem.date) : "null"}</p>
                            </div>
                        </div>
                    )}

                    {mem.tags && (
                        <div className="memory-details-row">
                            <div className="memory-details-label">Tags</div>
                            <div className="memory-details-value-box">
                                <p className="memory-details-tags">
                                    {mem.tags.join(", ")}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="memory-details-actions-row">
                        <div className="memory-details-label-space"></div>
                        <div className="memory-details-buttons">
                            <button
                                className="memory-details-btn-edit"
                                onClick={() =>
                                    navigate(
                                        `/api/dashboard/memory-bank/${mem._id}/edit`,
                                    )
                                }
                            >
                                Edit
                            </button>
                            <button
                                className="memory-details-btn-delete"
                                onClick={handleDeleteClick}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onRequestClose={handleCloseDeleteModal}
                className="memorybank-delete-modal-content"
                overlayClassName="memorybank-delete-modal-overlay"
                ariaHideApp={false}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "16px",
                    }}
                >
                    <svg
                        width="80"
                        height="80"
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M40 25V20C40 17.2386 42.2386 15 45 15H55C57.7614 15 60 17.2386 60 20V25H75C76.3807 25 77.5 26.1193 77.5 27.5C77.5 28.8807 76.3807 30 75 30H25C23.6193 30 22.5 28.8807 22.5 27.5C22.5 26.1193 23.6193 25 25 25H40ZM45 20V25H55V20H45Z"
                            fill="#A8A8A8"
                        />
                        <path
                            d="M30 35H70L66.5 75C66.1 80 63 82.5 58 82.5H42C37 82.5 33.9 80 33.5 75L30 35Z"
                            fill="#A8A8A8"
                        />
                        <circle cx="70" cy="70" r="20" fill="white" />
                        <circle cx="70" cy="70" r="18" fill="#A8A8A8" />
                        <path
                            d="M64 64L76 76M76 64L64 76"
                            stroke="white"
                            strokeWidth="4"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>
                <h2>Are you sure you want to delete this memory?</h2>
                <p style={{ color: "#6c757d", marginTop: "10px" }}>
                    All data related to this Memory will be lost
                </p>
                <div className="memorybank-delete-modal-actions">
                    <button
                        className="memorybank-delete-confirm-btn"
                        onClick={confirmDelete}
                    >
                        Delete
                    </button>
                    <button
                        className="memorybank-delete-cancel-btn"
                        onClick={handleCloseDeleteModal}
                    >
                        Cancel
                    </button>
                </div>
            </Modal>

            {/* Delete Success Modal */}
            <Modal
                isOpen={isSuccessModalOpen}
                onRequestClose={handleCloseSuccessModal}
                className="memorybank-delete-modal-content success-modal"
                overlayClassName="memorybank-delete-modal-overlay"
                ariaHideApp={false}
            >
                <div className="memorybank-success-icon">
                    <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="35" cy="35" r="35" fill="#4CAF50" />
                        <path
                            d="M20 35L30 45L50 25"
                            stroke="white"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <h2>Memory Deleted!</h2>
                <p>The memory has been deleted successfully</p>
                <div className="memorybank-delete-modal-actions success-actions">
                    <button
                        className="memorybank-success-btn"
                        onClick={handleCloseSuccessModal}
                    >
                        Continue
                    </button>
                </div>
            </Modal>
        </div>
    );
}
