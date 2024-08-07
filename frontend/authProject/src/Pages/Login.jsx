import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send a POST request to the server
            const response = await axios.post('/api/login', formData);
            console.log('response::', response)
            setMessage(response.data);
            navigate('/post');
            console.log("Login successful", response.data);

        } catch (error) {
            // Handle error response from the server
            if (error.response) {
                setMessage(error.response.data.error);
                console.error("Error:", error.response.data);
            } else {
                setMessage("An error occurred");
                console.error("Error:", error);
            }
        }
    };
    function handleregister() {
        navigate('/register');
    }

    return (
        <div>
            <h3 style={{ color: 'white', marginBottom: '10px', marginLeft: '10px' }}>Sign-in Here 👇</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit" style={{ borderRadius: '6px' }}>Login</button>
            </form>
            {message && <p style={{ marginLeft: '15px' }}>{message}</p>}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 10px' }}>
                <p style={{ margin: 0, padding: 0 }}>you can register here 😊</p>
                <button onClick={handleregister} style={{ borderRadius: '6px' }}>Register</button>
            </div>
        </div>
    );
};

export default Login;
