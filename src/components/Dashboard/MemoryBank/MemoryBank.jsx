import React, { useState } from "react";
import "./MemoryBank.css";
import { useNavigate } from "react-router-dom";

export const memoryData = [
    {
        id: 1,
        type: "photo",
        title: "Youssef",
        description: "Relation: Grandchild",
        caption:
            "This photo was taken during Youssef's graduation. We all gathered at the house, having a wonderful time together as a family.",
        tags: ["#family", "#graduation", "#grandchild"],
        image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80",
        date: "25 July 2025",
    },
    {
        id: 2,
        type: "video",
        title: "Birthday",
        description: "Date: 24/4/2025",
        caption:
            "A lovely evening blowing out the candles surrounded by the kids singing the birthday song.",
        tags: ["#birthday", "#celebration"],
        image: null,
        date: "24/4/2025",
    },
    {
        id: 3,
        type: "text",
        title: "Your Home",
        description:
            "Our House in Nasr City. You have lived here for 15 years. The pharmacy is near the corner. The balcony has your favorite chair.",
        caption:
            "A beautiful memory of the house we lived in for over a decade. All the small moments on the balcony over morning coffee.",
        tags: ["#home", "#nasrcity", "#memories"],
        date: "24/4/2025",
    },
    {
        id: 4,
        type: "photo",
        title: "Omar",
        description: "Relation: son",
        caption:
            "Omar visiting us during the Eid holidays. We had a great feast and the children were playing in the garden all afternoon.",
        tags: ["#son", "#eid", "#family"],
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
        date: "15 March 2024",
    },
    {
        id: 5,
        type: "photo",
        title: "Sara",
        description: "Relation: Daughter",
        caption:
            "Sara taking a stroll with us in the park. The weather was lovely and we sat by the lake recalling old stories.",
        tags: ["#daughter", "#park", "#walk"],
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
        date: "10 Feb 2025",
    },
    {
        id: 6,
        type: "video",
        title: "Birthday",
        description: "Date: 24/4/2025",
        caption:
            "Opening the gifts and reading the lovely cards from the grandkids.",
        tags: ["#birthday", "#gifts", "#grandkids"],
        image: null,
        date: "24/4/2025",
    },
    {
        id: 7,
        type: "text",
        title: "Wedding Day",
        description:
            "15 July 1995. You married Amina in Alexandria. It was a small wedding with family and close friends.",
        caption:
            "The most beautiful day. Standing by the Mediterranean sea celebrating our eternal love with those who mattered most.",
        tags: ["#wedding", "#alexandria", "#love"],
        date: "24/4/2025",
    },
    {
        id: 8,
        type: "photo",
        title: "Salma",
        description: "Relation: sister",
        caption:
            "Salma's unexpected visit last weekend. We spent the evening looking through old photo albums and laughing over tea.",
        tags: ["#sister", "#visit", "#tea"],
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
        date: "3 Sep 2023",
    },
];

export default function MemoryBank() {
    const [filter, setFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const filteredMemory = memoryData.filter((mem) => {
        const matchesType = filter === "all" || mem.type === filter;

        const matchesSearch =
            mem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (mem.description?.toLowerCase() || "").includes(
                searchQuery.toLowerCase(),
            );

        return matchesType && matchesSearch;
    });

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

                        <svg
                            className="memorybank-search-icon"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                            <path
                                d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <button
                        className="memorybank-add-btn"
                        onClick={() =>
                            navigate("/api/dashboard/memory-bank/add-new-memo")
                        }
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
                    {filteredMemory.length > 0 ? (
                        filteredMemory.map((mem) => (
                            <div
                                key={mem.id}
                                className={`memorybank-card ${mem.type === "text" ? "text-card-layout" : "media-card-layout"}`}
                                onClick={() =>
                                    navigate(
                                        `/api/dashboard/memory-bank/${mem.id}`,
                                    )
                                }
                                style={{ cursor: "pointer" }}
                            >
                                {mem.type === "text" ? (
                                    <div className="memorybank-text-full">
                                        {mem.date && (
                                            <p className="memorybank-date-top">
                                                {mem.date}
                                            </p>
                                        )}
                                        <h3>{mem.title}</h3>
                                        <p className="memorybank-desc">
                                            {mem.description}
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        {mem.type === "photo" && (
                                            <img
                                                src={mem.image}
                                                alt={mem.title}
                                            />
                                        )}

                                        {mem.type === "video" && (
                                            <div className="memorybank-video-placeholder">
                                                <svg
                                                    width="60"
                                                    height="60"
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

                                        <div className="memorybank-info">
                                            <h4>{mem.title}</h4>
                                            {mem.description && (
                                                <p>{mem.description}</p>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        ))
                    ) : (
                        <p style={{ textAlign: "center", gridColumn: "1/-1" }}>
                            No memories found
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
