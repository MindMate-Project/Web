import React, { useState } from "react";
import "./MemoryBank.css";
import { useNavigate } from "react-router-dom";

const memoryData = [
  {
    id: 1,
    type: "photo",
    title: "Youssef",
    description: "Relation: Grandchild",
    image: "https://i.pravatar.cc/150?img=1",
    date: null,
  },
  {
    id: 2,
    type: "video",
    title: "Birthday",
    description: "Date: 24/4/2025",
    image: null,
    date: "24/4/2025",
  },
  {
    id: 3,
    type: "text",
    title: "Your Home",
    description:
      "Our House in Nasr City. You have lived here for 15 years. The pharmacy is near the corner. The balcony has your favorite chair.",
    date: "24/4/2025",
  },
  {
    id: 4,
    type: "photo",
    title: "Omar",
    description: "Relation: son",
    image: "https://i.pravatar.cc/150?img=2",
    date: null,
  },
  {
    id: 5,
    type: "photo",
    title: "Sara",
    description: "Relation: Daughter",
    image: "https://i.pravatar.cc/150?img=3",
    date: null,
  },
  {
    id: 6,
    type: "video",
    title: "Birthday",
    description: "Date: 24/4/2025",
    image: null,
    date: "24/4/2025",
  },
  {
    id: 7,
    type: "text",
    title: "Wedding Day",
    description:
      "15 July 1995. You married Amina in Alexandria. It was a small wedding with family and close friends.",
    date: "24/4/2025",
  },
  {
    id: 8,
    type: "photo",
    title: "Salma",
    description: "Relation: sister",
    image: "https://i.pravatar.cc/150?img=4",
    date: null,
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
      mem.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesSearch;
  });

  return (
    <div className="memory-bank">
      <div className="memory-header">
        <h1>Memory Bank</h1>

        <div className="search-add">

          <div className="search-box">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <svg
              className="search-icon"
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

          <button className="add-btn" 
          onClick={() => navigate("/api/dashboard/memory-bank/add-new-memo")}
          >Add New Memo</button>

        </div>
      </div>

      <div className="filter-grid-container">

        <div className="filter-buttons">
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

        <div className="memory-grid">
          {filteredMemory.length > 0 ? (
            filteredMemory.map((mem) => (
              <div key={mem.id} className="memory-card">

                {mem.type === "photo" && (
                  <img src={mem.image} alt={mem.title} />
                )}

                {mem.type === "video" && (
                  <div className="video-placeholder">
                    <span>▶</span>
                  </div>
                )}

                {mem.type === "text" && (
                  <div className="text-card">
                    <h3>{mem.title}</h3>
                    <p>{mem.description}</p>
                  </div>
                )}

                <div className="memory-info">
                  <h4>{mem.title}</h4>

                  {mem.description && mem.type !== "text" && (
                    <p>{mem.description}</p>
                  )}

                  {mem.date && <p className="date">{mem.date}</p>}
                </div>

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