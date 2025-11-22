import { useNavigate } from 'react-router';
function HomePage() {
    const navigate = useNavigate();
    
    return (
        <div>
            <button className = "hbtn" onClick={() => navigate('/api/auth/login')}>Go to Login</button>
            <button className = "hbtn" onClick={() => navigate('/api/auth/signup')}>Go to Signup</button>
            <button className = "hbtn" onClick={() => navigate('/api/auth/forgot-password')}>Forget password</button>
            <button className = "hbtn" onClick={() => navigate('/api/auth/set-new-password')}>Set New Password</button>
        </div>
    )
}
export default HomePage;