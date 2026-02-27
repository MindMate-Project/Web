import Dashboard from "./../../components/Dashboard/Dashboard";
import DashboardLayout from "./../../components/Dashboard/DashboardLayout";
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
        <DashboardLayout userName={userName} logOut={logOut}>
            <Dashboard />
        </DashboardLayout>
  );
}

export default HomePage;
