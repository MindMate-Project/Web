import React, { useState, useMemo, useCallback } from "react";
import "./MemoryBank.css";
import { useNavigate } from "react-router-dom";
import useGetAllMemories from "../../../hook/memory/get-all-memories-hook";
import { useSelector } from "react-redux";

// Memoized Card Component for performance
const MemoryCard = React.memo(({ mem, onClick, formatDate }) => {
    const isVideoUrl = (url) => {
        if (!url) return false;
        const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
        return videoExtensions.some((ext) => url.toLowerCase().includes(ext));
    };

    return (
        <div
            className={`memorybank-card ${mem.type === "text" ? "text-card-layout" : "media-card-layout"}`}
            onClick={() => onClick(mem._id)}
            style={{ cursor: "pointer" }}
        >
            {mem.type === "text" ? (
                <div className="memorybank-text-full">
                    {mem.createdAt && (
                        <p className="memorybank-date-top">
                            {formatDate(mem.createdAt)}
                        </p>
                    )}
                    <h3>{mem.title}</h3>
                    <p className="memorybank-desc">
                        {mem.caption}
                    </p>
                </div>
            ) : (
                <>
                    {mem.type === "photo" &&
                        (isVideoUrl(mem.file_url) ? (
                            <div
                                style={{
                                    position: "relative",
                                    width: "100%",
                                    height: "160px",
                                }}
                            >
                                <video
                                    src={mem.file_url}
                                    muted
                                    preload="metadata"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius:
                                            "12px 12px 0 0",
                                    }}
                                />
                                <div className="memorybank-video-indicator">
                                    <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        ) : (
                            <img
                                src={mem.file_url}
                                alt={mem.title}
                                loading="lazy"
                            />
                        ))}

                    {mem.type === "video" &&
                        (mem.file_url ? (
                            <div
                                style={{
                                    position: "relative",
                                    width: "100%",
                                    height: "160px",
                                }}
                            >
                                <video
                                    src={mem.file_url}
                                    muted
                                    preload="metadata"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius:
                                            "12px 12px 0 0",
                                    }}
                                />
                                <div className="memorybank-video-indicator">
                                    <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        ) : (
                            <div className="memorybank-video-placeholder">
                                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                    <circle cx="30" cy="30" r="30" fill="#666666" fillOpacity="0.8" />
                                    <polygon points="25,18 42,30 25,42" fill="white" />
                                </svg>
                            </div>
                        ))}

                    <div className="memorybank-info">
                        <h4>{mem.title}</h4>
                        {mem.type === "photo" && (
                            <p>Relation: {mem.relation ? mem.relation : "null"}</p>
                        )}
                        {mem.type === "video" && (
                            <p>Date: {mem.date ? formatDate(mem.date) : "null"}</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
});

export default function MemoryBank() {
    const [filter, setFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [visibleCount, setVisibleCount] = useState(12);
    const navigate = useNavigate();

    const patientId = localStorage.getItem("selectedPatientId");
    const allMemories = useGetAllMemories(patientId);
    const loading = useSelector((state) => state.memoryReducer.loading);



    const formatDate = useCallback((dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    }, []);

    const handleCardClick = useCallback((id) => {
        navigate(`/api/dashboard/memory-bank/${id}`);
    }, [navigate]);

    const filteredMemory = useMemo(() => {
        const memoriesArray = Array.isArray(allMemories) ? allMemories : [];
        return memoriesArray.filter((mem) => {
            const matchesType = filter === "all" || mem.type === filter;
            const matchesSearch =
                (mem.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
                (mem.caption?.toLowerCase() || "").includes(searchQuery.toLowerCase());

            return matchesType && matchesSearch;
        });
    }, [allMemories, filter, searchQuery]);

    const visibleMemories = filteredMemory.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 12);
    };

    React.useEffect(() => {
        setVisibleCount(12);
    }, [filter, searchQuery]);

    if (loading) {
        return (
            <div className="memorybank">
                <p style={{ textAlign: "center", padding: "2rem" }}>Loading memories...</p>
            </div>
        );
    }

    return (
        <div className="memorybank">
            <div className="memorybank-header">
                <h1>Memory Bank</h1>

                <div className="memorybank-search-add">
                    <div className="memorybank-search-box">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        <svg className="memorybank-search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    <button
                        className="memorybank-add-btn"
                        onClick={() => navigate("/api/dashboard/memory-bank/add-new-memo")}
                    >
                        Add New Memo
                    </button>
                </div>
            </div>

            <div className="memorybank-filter-grid-container">
                <div className="memorybank-filter-buttons">
                    {["all", "photo", "video", "text"].map((type) => (
                        <button
                            key={type}
                            className={filter === type ? "active" : ""}
                            onClick={() => setFilter(type)}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="memorybank-memory-grid">
                    {visibleMemories.length > 0 ? (
                        visibleMemories.map((mem) => (
                            <MemoryCard 
                                key={mem._id} 
                                mem={mem} 
                                onClick={handleCardClick} 
                                formatDate={formatDate} 
                            />
                        ))
                    ) : (
                        <p style={{ textAlign: "center", gridColumn: "1/-1" }}>
                            No memories found
                        </p>
                    )}
                </div>
                
                {visibleCount < filteredMemory.length && (
                    <div className="memorybank-load-more">
                        <button 
                            onClick={handleLoadMore}
                            className="memorybank-add-btn"
                            style={{ margin: "30px auto", display: "block" }}
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
