import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
      });


    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      const handleSubmit = async(e) => {
        e.preventDefault();
        console.log('Sign Up Data: ', formData);
        axios
        .post(
          "http://localhost:3000/api/user/signup",
          formData, 
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          if (response.data.message) {
            navigate("/signin");
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log("Sign Up Error:", error.response?.data?.message || error.message);
        });
    }

  return (
    <div>
      <div className="auth-form">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Sign Up</button>
            <Link to="/signin" className='lnk'><button className='btn'>Sign in</button></Link>
          </form>
        </div>
    </div>
  )
}

export default Signup
