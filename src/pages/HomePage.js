import { useNavigate } from 'react-router';
function HomePage() {
    const navigate = useNavigate();
    
    return (
        <div>
            <button className = "hbtn" onClick={() => navigate('/api/auth/login')}>Go to Login</button>
            <button className = "hbtn" onClick={() => navigate('/api/auth/signup')}>Go to Signup</button>
        </div>
    )
}
export default HomePage;