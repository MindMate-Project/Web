import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./FAQPage.css";
import faqHeroImage from "../../images/landing/Support/faq-hero.webp";
import { IoChevronBack, IoChevronDown } from "react-icons/io5";

const faqData = [
    {
        id: 1,
        question: "What is MindMate and how does it help Alzheimer's patients?",
        answer: "MindMate is a support application designed to assist Alzheimer's patients and their caregivers through features like GPS tracking, medication reminders, fall detection, and real-time health monitoring."
    },
    {
        id: 2,
        question: "Can I track the patient's location in real time?",
        answer: "Yes, authorized caregivers can view the patient's live location on the dashboard map, provided location services are enabled on the patient's device."
    },
    {
        id: 3,
        question: "How does the medication reminder system work?",
        answer: "Caregivers can set up custom schedules with specific dosages. The app sends push notifications and audio alerts to the patient's device when it's time to take their medication."
    },
    {
        id: 4,
        question: "Is the patient's data safe and private?",
        answer: "Absolutely. All personal and medical data is end-to-end encrypted and stored securely in compliance with healthcare privacy regulations. We never share data without consent."
    },
    {
        id: 5,
        question: "Who can use the application?",
        answer: "The application is designed for a dual-user experience: it provides simplified interfaces and reminders for patients, while offering comprehensive monitoring tools for family members and professional caregivers."
    },
    {
        id: 6,
        question: "How does the emergency (SOS) feature work?",
        answer: "Patients can trigger an SOS alert with a single button press. This instantly notifies all linked caregivers with the patient's exact location and opens a direct communication channel."
    },
    {
        id: 7,
        question: "Can multiple caregivers monitor the same patient?",
        answer: "Yes, a primary caregiver can invite multiple family members or healthcare professionals to join the patient's care network with customizable access permissions."
    },
    {
        id: 8,
        question: "What happens if the patient leaves the safe zone?",
        answer: "Caregivers can set up geofenced \"safe zones\" (like a house or neighborhood). If the patient crosses these boundaries, all authorized caregivers receive an immediate push notification alert."
    },
    {
        id: 9,
        question: "Can caregivers communicate through the application?",
        answer: "Yes, there is a built-in secure messaging system that allows caregivers to coordinate care, share updates, and communicate directly with the patient."
    },
    {
        id: 10,
        question: "Does the application require an internet connection?",
        answer: "While core tracking and syncing require an active internet connection (Wi-Fi or cellular data), pre-set medication reminders will still trigger offline."
    },
    {
        id: 11,
        question: "Can I access the application from both mobile and web?",
        answer: "Yes, MindMate is available as a mobile application for iOS and Android, as well as a fully-featured web dashboard for desktop monitoring."
    },
    {
        id: 12,
        question: "How do I add a new caregiver?",
        answer: "Go to Settings > Manage Caregivers and tap \"Add New\". You can invite them via email or share a secure invite code that they can use when signing up."
    },
    {
        id: 13,
        question: "Who should I contact if I need technical support?",
        answer: "You can reach our dedicated support team via the Contact Email or Phone Number listed in our Help Center, or submit a ticket directly through the app."
    },
    {
        id: 14,
        question: "Can I customize medication schedules and reminders?",
        answer: "Yes, you can fully customize the schedule, including the name of the medicine, dosage, specific times, and even upload a photo of the pill to help the patient identify it."
    }
];

const FAQPage = () => {
    const [openId, setOpenId] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const toggleAccordion = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="faq-page-layout">
            <Navbar />
            
            <div className="faq-page-container">
                <div className="faq-back-link-wrapper">
                    <Link to="/" className="faq-back-link">
                        <IoChevronBack /> Back
                    </Link>
                </div>

                <div className="faq-hero-section">
                    <img src={faqHeroImage} alt="FAQ Illustration" className="faq-hero-image" />
                    <h1 className="faq-main-title">Need Help?</h1>
                    <h2 className="faq-sub-title">Find answers quickly</h2>
                    <p className="faq-hero-desc">
                        Search, browse, and get instant answers to help you use <span>MindMate</span> with ease.
                    </p>
                </div>

                <div className="faq-accordion-container">
                    {faqData.map((faq) => {
                        const isOpen = openId === faq.id;
                        return (
                            <div 
                                key={faq.id} 
                                className={`faq-accordion-item ${isOpen ? 'open' : ''}`}
                            >
                                <button 
                                    className="faq-accordion-header" 
                                    onClick={() => toggleAccordion(faq.id)}
                                >
                                    <span className="faq-question">{faq.question}</span>
                                    <div className="faq-icon-wrapper">
                                        <IoChevronDown className="faq-chevron" />
                                    </div>
                                </button>
                                <div className="faq-accordion-body">
                                    <div className="faq-answer">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FAQPage;
