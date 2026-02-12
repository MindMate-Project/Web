import Dashboard from "./../../components/Dashboard/Dashboard";
import { useNavigate } from "react-router";

function HomePage() {
     const navigate = useNavigate();
     const logOut = () => {
         if (localStorage.getItem("user") || localStorage.getItem("token")) {
             localStorage.removeItem("user");
             localStorage.removeItem("token");
         }
         navigate("/api/auth/login");
     };
     const storedUser = localStorage.getItem("user");
     let user = null;

     if (storedUser) {
         try {
             user = JSON.parse(storedUser);
         } catch (error) {
             user = null;
         }
     }

     const userName = user && user.name ? user.name : "Guest";
    return (
        <Dashboard userName={userName} logOut={logOut} />
    );
}

export default HomePage;
