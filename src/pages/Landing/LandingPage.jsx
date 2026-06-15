import React, { useState, useEffect } from "react";
import { IoArrowUpOutline } from "react-icons/io5";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "./sections/Hero/Hero";
import Features from "./sections/Features/Features";
import Story from "./sections/Story/Story";
import AboutAlzheimer from "./sections/AboutAlzheimer/AboutAlzheimer";
import Support from "./sections/Support/Support";
import PeaceOfMind from "./sections/PeaceOfMind/PeaceOfMind";
import FAQ from "./sections/FAQ/FAQ";
import DownloadFooter from "./sections/DownloadFooter/DownloadFooter";
import "./LandingPage.css";

const LandingPage = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <>
            <div className="landing-page-container">
                <Navbar />
                <Hero />
                <Features />
                <Story />
                <AboutAlzheimer />
                <Support />
                <PeaceOfMind />
                <FAQ />
            </div>
            <DownloadFooter />
            
            {/* Scroll to Top Button */}
            <button 
                className={`scroll-to-top-btn ${showScrollTop ? 'visible' : ''}`}
                onClick={scrollToTop}
                aria-label="Scroll to top"
            >
                <IoArrowUpOutline />
            </button>
        </>
    );
};

export default LandingPage;
