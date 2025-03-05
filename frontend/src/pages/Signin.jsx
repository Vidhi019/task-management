import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signin.css";
import axios from "axios";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sign In Data: ", formData);

    axios
      .post(
        "http://localhost:3000/api/user/signin",
        formData, 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log("Sign In Response:", response.data);

        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          navigate("/");
        } else {
          alert("Wrong password");
        }
      })
      .catch((error) => {
        console.error(
          "Error signing in:",
          error.response?.data?.message || error.message
        );
      });
  };

  return (
    <div>
      <div className="auth-form">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Sign In</button>
          <Link to="/signup" className="lnk">
            {" "}
            <button className="btn">Sign up </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signin;
