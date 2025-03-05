import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const AddUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [loading, setLoading] = useState(false);

  const [addTask, setAddTask] = useState({
    title: "",
    description: "",
    assignedTo : "",
    dueDate: "",
  });

  const [updateTask, setUpdateTask] = useState({
    title: "",
    description: "",
    assignedTo : "",
    dueDate: "",
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/api/user", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUsers(response.data);
        // console.log("users",response.data);
        
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
  
    if (id) {
      axios
        .get(`http://localhost:3000/api/task/tasks/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setUpdateTask(response.data);
        })
        .catch((error) => {
          console.error("Error fetching task:", error.response?.data?.message || error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddTask({ ...addTask, [name]: value });
  };

  const updateHandleChange = (e) => {
    const { name, value } = e.target;
    setUpdateTask({ ...updateTask, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
    .post(
      "http://localhost:3000/api/task",
      addTask, 
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      alert("Done");
      navigate("/");
    })
    .catch((error) => {
      console.error("Error adding task:", error.response?.data?.message || error.message);
    });
  };

  const updateHandleSubmit = async (e) => {
    e.preventDefault();
    axios
  .put(
    `http://localhost:3000/api/task/update/${id}`,
    updateTask, 
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    }
  )
  .then((response) => {
    alert("Updated");
    navigate("/");
  })
  .catch((error) => {
    console.error("Error updating task:", error.response?.data?.message || error.message);
  });
  };

  
  return (
    <div className="auth-form">
      <h2>{id ? "Update Task" : "Add Task"}</h2>
      {loading ? (

      <div className="loading-message">Loading users...</div>
      ) : (

      <form onSubmit={id ? updateHandleSubmit : handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={id ? updateTask.title : addTask.title}
            onChange={id ? updateHandleChange : handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={id ? updateTask.description : addTask.description}
            onChange={id ? updateHandleChange : handleChange}
            required
          />
        </div>
        <div>
          <label>Assigned To </label>
          <select
              name="assignedTo"
              value={addTask.assignedTo || ""}
              onChange={handleChange}
              required
            >
              <option value="">Select a user</option>
              {users?.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.username}
                </option>
              ))}
            </select>
          
        </div>
        <div>
          <label>Date</label>
          <input
            type="Date"
            name="dueDate"
            value={id ? updateTask.dueDate : addTask.dueDate}
            onChange={id ? updateHandleChange : handleChange}
            required
          />

        </div>
        <button type="submit">{id ? "Update Task" : "Add Task"}</button>
       
       
      </form>
      )}
    </div>
  );
};

export default AddUpdate;
