import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/api/users/login', form);

    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    alert('✅ Login successful!');

    const user = res.data.user; // ✅ Define user from response

    if (user.role === 'organizer') {
      navigate('/admin');
    } else {
      navigate('/volunteer-dashboard');
    }

  } catch (err) {
    alert('❌ Invalid credentials');
    console.error(err.response?.data || err.message);
  }
};


  return (
    <div className="page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          onChange={handleChange}
          required
          placeholder="Email"
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          required
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
