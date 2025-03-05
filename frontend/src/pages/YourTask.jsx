import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Tasks from "../pages/tasks";

const YourTask = () => {
  const token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(false);
  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLogin(!!token);
  }, [token]);

  useEffect(() => {
    if (isLogin) {
      setLoading(true);

      
      axios
        .get('http://localhost:3000/api/task/getUserTasks', {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data); 
          setTaskData(response.data); 
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching tasks:", error);
          setError('Failed to load tasks. Please try again later.');
          setLoading(false);
        });
    }
  }, [isLogin, token]);

  return (
    <div>
      <div className="home-container">
        <h2 style={{ textAlign: "center", margin: "50px" }}>Welcome to your Task Page</h2>
        {isLogin ? (
          loading ? (
            <div className="loading-message">Loading tasks...</div> 
          ) : error ? (
            <div className="error-message">{error}</div> 
          ) : (
            taskData.length > 0 ? (
              taskData.map((task) => (
                <Tasks key={task._id} task={task} link={"/yourTask/task"} />
              ))
            ) : (
              <p>No tasks available.</p> 
            )
          )
        ) : (
          <p className="login-message">Please log in to view tasks.</p>
        )}
      </div>
    </div>
  );
};

export default YourTask;
