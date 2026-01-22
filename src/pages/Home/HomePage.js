import { useNavigate } from 'react-router';
function HomePage() {
    const navigate = useNavigate();
    
    return (
      <div className="home-page">
        <h1 style={{ color: "white" }} >Welcome to MindMate</h1>
        {localStorage.getItem("token") ? (
          <div>
            <h2 style={{ color: "white" }}>
              welcome {JSON.parse(localStorage.getItem("user")).name}!
            </h2>
          </div>
        ) : (
          <div>
            <h2>Please log in or sign up to continue</h2>
            <button
              className="hbtn"
              onClick={() => navigate("/api/auth/login")}
            >
              Go to Login
            </button>
            <button
              className="hbtn"
              onClick={() => navigate("/api/auth/signup")}
            >
              Go to Signup
            </button>
          </div>
        )}
      </div>
    );
}
export default HomePage;