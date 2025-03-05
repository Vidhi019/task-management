import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Tasks from "./Tasks";
const Home = () => {
  const [tasks, setTasks] = useState([]);
  

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");

    

      try {
        const response = await axios.get("http://localhost:3000/api/task/tasks", {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
      } catch (err) {
        
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, []); 

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "50px" }}>Welcome to the Task List App!</h1>
     <div >
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
