import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const isToken = localStorage.getItem('token');
  useEffect(() => {
    if (isToken) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
 }, [isToken]);

const logout = () => {
    localStorage.removeItem('token');
    setShowButton(false);
    navigate("/signin")

  }

const arr = [
  ...(!showButton ? 
    [
      {name: 'Sign up', path: '/signup'},
      {name: 'Sign in', path: '/signin'}
    ] : 
    [
    {name: 'Home', path: '/'},
    {name: 'Create Task', path: '/addTask'},
    {name: 'Your Task', path: '/yourTask'},  

    {name: 'Log out', onClick: logout }
  ])
]

  return (
    <div>
      <ul>
      {arr.map((item, index) => (
            <li key={index}>
              {item.onClick ? (
                <button className="btn" onClick={item.onClick}>{item.name}</button>
              ) : (
                <Link to={item.path}>
                  <button className="btn">{item.name}</button>
                </Link>
              )}
            </li>
          ))}
</ul>
    </div>
  )
}

export default Navbar
