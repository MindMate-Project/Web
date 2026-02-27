import "./Dashboard.css";
import DashboardPerson from "./../../images/DashbordPerson.jpg";
import father from "./../../images/father.jpg";
import mother from "./../../images/mother.jpg";
import son from "./../../images/son.jpg";
import daughter from "./../../images/daughter.jpg";
import grandchild from "./../../images/grandchild.jpg";
import logo from "./../../images/logo.png";
import dashboard from "./../../images/dashboard.svg";
import patients from "./../../images/patients.svg";
import location from "./../../images/location.svg";
import reminder from "./../../images/reminder.svg";
import memoryBank from "./../../images/memory bank.svg";
import doctor from "./../../images/doctor.jpg";

function Dashboard({userName,logOut}) {

    return (
        <div className="dashboard">
            <div className="dashboard__main">


                <div className="dashboard__title-row">
                    <h3 className="dashboard__title">Dashboard</h3>
                </div>

                <div className="dashboard__content">
                    <div className="dashboard__top-grid">
                        {/* Patients */}
                        <section className="dashboard__card">
                            <div className="dashboard__card-header">
                                <h3>Patients</h3>
                                <button>Edit</button>
                            </div>

                            <div className="dashboard__patients">
                                <div className="dashboard__patient">
                                    <img src={father} alt="" />
                                    <h4>Ahmed Ali</h4>
                                    <span>Age: 75</span>
                                    <small>Relation: Father</small>
                                </div>

                                <div className="dashboard__patient">
                                    <img src={mother} alt="" />
                                    <h4>Mona Adel</h4>
                                    <span>Age: 68</span>
                                    <small>Relation: Mother</small>
                                </div>
                            </div>
                        </section>

                        {/* Memory Bank */}
                        <section className="dashboard__card">
                            <div className="dashboard__card-header">
                                <h3>Memory Bank</h3>
                                <div>
                                    <button>Edit</button>
                                    <button className="secondary">
                                        View All
                                    </button>
                                </div>
                            </div>

                            <div className="dashboard__memory">
                                <div className="dashboard__memory-item" key={0}>
                                    <img src={son} alt="" />
                                    <h4>{"Ahmed"}</h4>
                                    <span>Relation: Son</span>
                                </div>
                                <div className="dashboard__memory-item" key={1}>
                                    <img src={daughter} alt="" />
                                    <h4>{"Sara"}</h4>
                                    <span>Relation: Daughter</span>
                                </div>
                                <div className="dashboard__memory-item" key={2}>
                                    <img src={grandchild} alt="" />
                                    <h4>{"Omar"}</h4>
                                    <span>Relation: Son</span>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Bottom Grid */}
                    <div className="dashboard__bottom">
                        <section className="dashboard__card">
                            <div className="dashboard__card-header">
                                <h3>Live Location</h3>
                                <button className="secondary">View Map</button>
                            </div>
                            <div className="dashboard__map"></div>
                        </section>

                        <section className="dashboard__card">
                            <div className="dashboard__card-header">
                                <h3>Reminders</h3>
                                <button className="secondary">View ALL</button>
                            </div>

                            <div className="dashboard__reminder-item reminder--success">
                                <div className="dashboard__reminder-top">
                                    <img
                                        className="dashboard__reminder-avatar"
                                        src={doctor}
                                        alt="Dr. Khaled Ali"
                                    />
                                    <div>
                                        <p className="dashboard__reminder-name">
                                            Dr. Khaled Ali
                                        </p>
                                        <span className="dashboard__reminder-role">
                                            Cardiologist
                                        </span>
                                    </div>
                                </div>
                                <div className="dashboard__reminder-meta">
                                    <div className="dashboard__reminder-chip">
                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M7 2v2M17 2v2M4 9h16M6 6h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <span>07-02-2026</span>
                                    </div>
                                    <div className="dashboard__reminder-chip">
                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M12 6v6l4 2M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10z"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <span>09:00 AM</span>
                                    </div>
                                </div>
                            </div>

                            <div className="dashboard__reminder-item reminder--danger">
                                <div className="dashboard__reminder-top">
                                    <img
                                        className="dashboard__reminder-avatar"
                                        src={doctor}
                                        alt="Dr. Khaled Ali"
                                    />
                                    <div>
                                        <p className="dashboard__reminder-name">
                                            Dr. Khaled Ali
                                        </p>
                                        <span className="dashboard__reminder-role">
                                            Cardiologist
                                        </span>
                                    </div>
                                </div>
                                <div className="dashboard__reminder-meta">
                                    <div className="dashboard__reminder-chip">
                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M7 2v2M17 2v2M4 9h16M6 6h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <span>07-02-2026</span>
                                    </div>
                                    <div className="dashboard__reminder-chip">
                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M12 6v6l4 2M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10z"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <span>09:00 AM</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="dashboard__card">
                            <div className="dashboard__card-header">
                                <h3>Reminders Status</h3>
                            </div>
                            <div className="dashboard__chart"></div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;
