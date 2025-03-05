import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Tasks from "./tasks"; // Ensure this component exists

const Home = () => {
  const [tasks, setTasks] = useState([]);
  // const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");

      // if (!token) {
      //   setError("Unauthorized! Please log in.");
      //   return;
      // }

      try {
        const response = await axios.get("http://localhost:3000/api/task/tasks", {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
      } catch (err) {
        // setError(err.response?.data?.message || "Failed to fetch tasks");
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, []); 

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "50px" }}>Welcome to the Task List App!</h1>
      {/* {error ? (
        <p style={{
          backgroundColor: "#ffe6e6",
          color: "#d8000c",
          padding: "15px",
          borderRadius: "8px",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "18px",
          margin: "20px auto",
          width: "fit-content",
        }}>
          {error}
        </p> */}
     {/* : )   */}
     <div className="tasks">
    { tasks.length > 0 ? (
        tasks.map((task) => <Tasks key={task._id} task={task} link={`/task`} />)
      ) : (
        <p>No tasks available.</p>
      )}
      </div>
    </div>
  );
};

export default Home;
