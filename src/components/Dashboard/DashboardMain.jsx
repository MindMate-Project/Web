import "./DashboardMain.css";

function DashboardPage() {
    return (
        <div className="dashboard">

            {/* Grid */}
            <div className="dashboard-grid">
                <div className="card span-3">
                    <h3>Patients</h3>
                </div>

                <div className="card span-3">
                    <h3>Memory Bank</h3>
                </div>

                <div className="card span-2">
                    <h3>Live Location</h3>
                </div>

                <div className="card span-2">
                    <h3>Reminders</h3>
                </div>

                <div className="card span-2">
                    <h3>Reminders Status</h3>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
