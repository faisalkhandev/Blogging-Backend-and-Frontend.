import { useState } from 'react';
import axios from 'axios';
import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    age: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post('/api/register', formData);
      console.log('User created successfully:', response.data);
      navigate("/profile")
      if (response.status === 422) {
        alert("Please fill all the fields");
      }
    } catch (error) {
      console.error('There was an error creating the user!', error.response?.data || error);
    }
  };



  return (
    <div className='form'>
      <h3 style={{ color: 'white', marginBottom: '10px', marginLeft: '10px' }}>Create Account</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter your username' name='username' value={formData.username} onChange={handleChange} />
        <input type="text" placeholder='Enter your name' name='name' value={formData.name} onChange={handleChange} />
        <input type="email" placeholder='Enter your email' name='email' value={formData.email} onChange={handleChange} />
        <input type="password" placeholder='Enter your password' name='password' value={formData.password} onChange={handleChange} />
        <input type="number" placeholder='Enter your age' name='age' value={formData.age} onChange={handleChange} />
        <button type='submit' style={{ borderRadius: '6px' }}>Register 😊</button>
      </form>

    </div>
  );
}

export default App;
