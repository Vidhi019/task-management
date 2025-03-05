import React from "react";
import "./Tasks.css"
import { Link, useParams } from "react-router-dom";

const Tasks = (props) => {
  const { task ,link} = props;

  return (
    < >
          <div className="tasks"></div>
        {/* <h1>Task</h1> */}
    <div className="container">
      <Link className="link" to={`${link}/${task._id}`}>
        <h2 className="title">{task.title}</h2>
        <p className="des">{task.description}</p>
        <p className="assign">Assign to : {task.assignedTo?.username}</p>
        <p className="creator">Creator : {task.creator?.username}</p>
        <p className="status">{task.status}</p>
        <p className="date">{task.dueDate}</p>
        

      </Link>
    </div>
  
    </>
  );
};

export default Tasks;
