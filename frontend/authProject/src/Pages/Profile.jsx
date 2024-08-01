import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Profile = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token')
        if (!token) {
            navigate("/login")
        }
    })



    const handleLogout = async () => {
        try {
            // Call the logout API
            const response = await axios.get('/api/logout');
            console.log(response); // Optional: Log success message
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div>
            <h1>Shera you are logged in</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Profile;
