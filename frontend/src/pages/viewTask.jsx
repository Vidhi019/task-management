import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ViewTask = (props) => {
  const { userTask } = props;
  const navigate = useNavigate();
  const { id } = useParams();
  const [taskData, setTaskData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/api/task/tasks/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);

        setTaskData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching task data:", error);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedStatus =
      taskData.status === "pending" ? "in-progress" : "completed";

    axios
      .put(
        `http://localhost:3000/api/task/update/${id}`,
        { status: updatedStatus },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        alert("status updated");
        navigate("/yourTask");
      })
      .catch((error) => {
        alert("Failed to update task. Please try again.");
      });
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3000/api/task/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        alert(response.data.message);
        navigate("/");
      })
      .catch((error) => {
        alert("Failed to update task. Please try again.");
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="container">
      <h2>{taskData.title}</h2><br />
      <p>description : {taskData.description}</p>
      <p className="status">Status: {taskData?.status}</p>
      <h4 className="assigned-to">
        Assigned To: {taskData.assignedTo?.username}
      </h4><br />
      <h3 className="creator">Creator: {taskData.creator?.username}</h3>
      <p className="date">{taskData.dueDate}</p>
      {userTask ? (
        <button style={{background: "#007bff",
          color: "white",padding:"10px", borderRadius:"10px" , border:"none ", margin:"5px"}} onClick={handleSubmit}>
          {taskData?.status === "pending"
            ? "Mark as In Progress"
            : "Mark as Completed"}
        </button> 
      ) : (
        <>
          <Link to={`/update/${id}`}>
            <button style={{background: "#007bff",
    color: "white",padding:"10px", borderRadius:"10px" , border:"none ", margin:"5px"}}>Update Task</button>
          </Link>
          <button style={{background: "red",
    color: "white",padding:"10px", borderRadius:"10px" , border:"none " , margin:"5px"}} onClick={handleDelete}>Delete Task</button>
        </>
      )}
    </div>
    </>
  );
};

export default ViewTask;
