import { useNavigate } from "react-router";

import Dashboard from "./../../components/Dashboard/Dashboard";

function HomePage() {
    const navigate = useNavigate();
    const logOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/api/auth/login");
    };

    return (
        <Dashboard logOut={logOut} />
    );
}

export default HomePage;
