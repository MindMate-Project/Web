import React, { useState } from "react";
import "./FAQ.css";
import { IoChevronDownOutline, IoChevronForwardOutline } from "react-icons/io5";

const FAQ = () => {
    const [activeTab, setActiveTab] = useState("General");
    const [openFaqId, setOpenFaqId] = useState(1);

    const categories = ["General", "Account", "GPS", "Privacy", "Alzheimer"];

    const faqData = {
        General: [
            {
                id: 1,
                question: "What is MindMate and how does it help Alzheimer's patients?",
                answer: "MindMate is a support application designed to assist Alzheimer's patients and their caregivers through features like GPS tracking, medication reminders, fall detection, and real-time health monitoring."
            },
            {
                id: 2,
                question: "Can I track the patient's location in real time?",
                answer: "Yes, the GPS feature allows authorized caregivers to see the patient's live location on a map and set up safe zones to receive alerts if they wander."
            },
            {
                id: 3,
                question: "How does the medication reminder system work?",
                answer: "Caregivers can schedule daily medication times. The app will send visual and audio alerts to the patient's device, and notify the caregiver once the medication is confirmed as taken."
            },
            {
                id: 4,
                question: "Is the patient's data safe and private?",
                answer: "Absolutely. All health and location data is encrypted. Only authorized caregivers linked to the patient's account can access this sensitive information."
            }
        ],
        Account: [
            {
                id: 5,
                question: "How do I pair a caregiver account with a patient?",
                answer: "During signup, generate a unique pairing code on the patient's device and enter it into the caregiver app to securely link the accounts."
            },
            {
                id: 6,
                question: "Can multiple caregivers monitor one patient?",
                answer: "Yes, you can invite family members or professional nurses to join the care circle so everyone receives alerts and updates."
            }
        ],
        GPS: [
            {
                id: 7,
                question: "What happens if the patient leaves a Safe Zone?",
                answer: "If the patient crosses the geofence boundary, all linked caregivers immediately receive a high-priority push notification with the live location."
            },
            {
                id: 8,
                question: "Does GPS tracking drain the battery?",
                answer: "MindMate uses optimized location tracking that balances accuracy with battery life, ensuring the device stays powered throughout the day."
            }
        ],
        Privacy: [
            {
                id: 9,
                question: "Who has access to the health reports?",
                answer: "Only the primary caregiver and explicitly invited family members or doctors have access to historical health and location reports."
            }
        ],
        Alzheimer: [
            {
                id: 10,
                question: "Are the cognitive games scientifically backed?",
                answer: "Our memory bank and cognitive exercises are designed based on established reminiscence therapy techniques to help stimulate the patient's mind."
            }
        ]
    };

    const toggleFaq = (id) => {
        if (openFaqId === id) {
            setOpenFaqId(null);
        } else {
            setOpenFaqId(id);
        }
    };

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
        // Automatically open the first FAQ of the new category
        if (faqData[tabName] && faqData[tabName].length > 0) {
            setOpenFaqId(faqData[tabName][0].id);
        } else {
            setOpenFaqId(null);
        }
    };

    return (
        <div className="faq-section" id="faq">
            <div className="faq-header">
                <h2 className="faq-title">Need Help?</h2>
                <h3 className="faq-subtitle">Find answers quickly</h3>
                <p className="faq-description">
                    Search, browse, and get instant answers to help you use MindMate with ease.
                </p>
            </div>

            <div className="faq-tabs-container">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`faq-tab-btn ${activeTab === cat ? "active" : ""}`}
                        onClick={() => handleTabChange(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="faq-accordion-container">
                {faqData[activeTab].map((faq) => {
                    const isOpen = openFaqId === faq.id;
                    return (
                        <div key={faq.id} className={`faq-item ${isOpen ? "open" : ""}`}>
                            <button className="faq-question-btn" onClick={() => toggleFaq(faq.id)}>
                                <span className="faq-question-text">{faq.question}</span>
                                <span className="faq-toggle-icon">
                                    {isOpen ? <IoChevronDownOutline /> : <IoChevronForwardOutline />}
                                </span>
                            </button>
                            <div className="faq-answer-wrapper">
                                <div className="faq-answer-content">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FAQ;
