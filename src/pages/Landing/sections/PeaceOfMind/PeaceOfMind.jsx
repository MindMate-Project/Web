import React, { useRef, useEffect, useCallback } from "react";
import "./PeaceOfMind.css";
import { 
    IoChevronForwardOutline,
    IoChevronBackOutline
} from "react-icons/io5";

import AppointmentsImg from "../../../../images/landing/Peace/peace-appointments.webp";
import GPSImg from "../../../../images/landing/Peace/peace-gps.webp";
import HomeDashboardImg from "../../../../images/landing/Peace/peace-dashboard.webp";
import MemoryBankImg from "../../../../images/landing/Peace/peace-memory.webp";
import MedicationImg from "../../../../images/landing/Peace/peace-medication.webp";
import NotificationImg from "../../../../images/landing/Peace/peace-notification.webp";
import FaceRecImg from "../../../../images/landing/Peace/peace-face-recognition.webp";

const PeaceOfMind = () => {
    const scrollContainerRef = useRef(null);
    const autoScrollRef = useRef(null);

    const cards = [
        {
            id: 1,
            number: "1",
            title: "Memory Loss & Confusion",
            description: "Patients may forget familiar people or important moments, leading to fear, frustration, and loss of independence.",
            image: FaceRecImg
        },
        {
            id: 2,
            number: "2",
            title: "Wandering & Getting Lost",
            description: "Disorientation can cause patients to leave safe areas, putting them at serious risk and creating constant anxiety for families.",
            image: GPSImg
        },
        {
            id: 3,
            number: "3",
            title: "Missed Medication",
            description: "Forgetting medications or experiencing falls without immediate help can directly impact patient health and safety.",
            image: MedicationImg
        },
        {
            id: 4,
            number: "4",
            title: "Fading Personal History",
            description: "The gradual loss of personal history and emotional connections can deeply affect both patients and their loved ones.",
            image: MemoryBankImg
        },
        {
            id: 5,
            number: "5",
            title: "Missed Appointments",
            description: "Keeping track of doctor visits and daily tasks is difficult. Automated schedules ensure they remain organized and on time.",
            image: AppointmentsImg
        },
        {
            id: 6,
            number: "6",
            title: "Unnoticed Emergencies",
            description: "Lack of immediate contact during an incident is dangerous. Smart notifications ensure caregivers are instantly alerted.",
            image: NotificationImg
        },
        {
            id: 7,
            number: "7",
            title: "Scattered Care Management",
            description: "Managing schedules, alerts, and medical info across different platforms is exhausting. A unified dashboard brings everything together seamlessly.",
            image: HomeDashboardImg
        }
    ];

    const scrollNext = useCallback(() => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const cardWidth = container.querySelector(".peace-card").offsetWidth;
            const gap = 30;
            const { scrollLeft, scrollWidth, clientWidth } = container;

            if (Math.ceil(scrollLeft) >= scrollWidth - clientWidth - 10) {
                container.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                container.scrollBy({ left: cardWidth + gap, behavior: "smooth" });
            }
        }
    }, []);

    const stopAutoScroll = useCallback(() => {
        if (autoScrollRef.current) {
            clearInterval(autoScrollRef.current);
            autoScrollRef.current = null;
        }
    }, []);

    // Auto-scroll every 4 seconds
    const startAutoScroll = useCallback(() => {
        stopAutoScroll();
        autoScrollRef.current = setInterval(scrollNext, 4000);
    }, [scrollNext, stopAutoScroll]);

    useEffect(() => {
        startAutoScroll();
        return () => stopAutoScroll();
    }, [startAutoScroll, stopAutoScroll]);

    // Pause auto-scroll on touch, resume 5s after touch ends
    const handleTouchStart = () => stopAutoScroll();
    const handleTouchEnd = () => {
        setTimeout(startAutoScroll, 5000);
    };

    const handleScroll = (direction) => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const cardWidth = container.querySelector(".peace-card").offsetWidth;
            const gap = 30;
            const { scrollLeft, scrollWidth, clientWidth } = container;

            if (direction === 'right') {
                if (Math.ceil(scrollLeft) >= scrollWidth - clientWidth - 10) {
                    container.scrollTo({ left: 0, behavior: "smooth" });
                } else {
                    container.scrollBy({ left: cardWidth + gap, behavior: "smooth" });
                }
            } else {
                if (scrollLeft <= 0) {
                    container.scrollTo({ left: scrollWidth, behavior: "smooth" });
                } else {
                    container.scrollBy({ left: -(cardWidth + gap), behavior: "smooth" });
                }
            }
            // Reset auto-scroll timer after manual click
            startAutoScroll();
        }
    };

    return (
        <div className="peace-section" id="peace">
            <div className="peace-header">
                <h2 className="peace-title">How MindMate Brings Peace of Mind</h2>
                <p className="peace-subtitle">
                    These are the most important Alzheimer's challenges that MindMate clearly solves:
                </p>
            </div>

            <div className="peace-slider-wrapper">
                <button 
                    className="peace-arrow-btn left" 
                    onClick={() => handleScroll('left')} 
                    aria-label="Previous slide"
                >
                    <IoChevronBackOutline />
                </button>

                <div 
                    className="peace-cards-container" 
                    ref={scrollContainerRef}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onMouseEnter={stopAutoScroll}
                    onMouseLeave={startAutoScroll}
                >
                    {cards.map((card) => (
                        <div key={card.id} className="peace-card">
                            <div className="peace-card-content">
                                <div className="peace-card-number">
                                    {card.number}
                                </div>
                                <h3 className="peace-card-title">{card.title}</h3>
                                <p className="peace-card-desc">{card.description}</p>
                            </div>
                            <div className="peace-card-image-box">
                                <div 
                                    className="iphone-mockup-wrapper"
                                    style={{ animationDelay: `${card.id * 0.4}s` }}
                                >
                                    <div className="iphone-mockup">
                                        <div className="iphone-dynamic-island"></div>
                                        <img src={card.image} alt={card.title} className="peace-card-phone-img" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button 
                    className="peace-arrow-btn right" 
                    onClick={() => handleScroll('right')} 
                    aria-label="Next slide"
                >
                    <IoChevronForwardOutline />
                </button>
            </div>
        </div>
    );
};

export default PeaceOfMind;
