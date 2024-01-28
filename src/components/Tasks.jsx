import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const [editTask, setEditTask] = useState(null);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/task/get`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        const tasksData = await response.json();
        setTasks(tasksData);
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signup");
      toast.error("Please Login First");
      return;
    } else {
      fetchData();
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleAddTask = async () => {
    if (!newTask.title || !newTask.description || !newTask.dueDate) {
      toast.error("Invalid details");
      return;
    }

    if (editTask !== null) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/task/update`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(newTask),
          }
        );

        if (response.ok) {
          toast.success("Task Updated");
          setEditTask(null);
          fetchData();
        } else {
          toast.error("An error Occorred");
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    } else {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/task/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(newTask),
          }
        );

        if (response.ok) {
          toast.success("Task Created");
          fetchData();
        } else {
          console.error("Failed to fetch tasks");
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    }

    // Clear input fields
    setNewTask({ title: "", description: "", dueDate: "" });
  };

  const handleEditTask = (index) => {
    setNewTask(tasks[index]);
    setEditTask(index);
  };

  const handleDeleteTask = async (id) => {
    console.log(id);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/task/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Tasks deleted Successfully");
        fetchData();
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav className="flex justify-end">
        <div className="ml-auto pr-4">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <div className="App bg-slate-200 mt-20">
        <h1>Task Manager</h1>
        <div>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Due Date:</label>
            <input
              type="date"
              name="dueDate"
              value={newTask.dueDate}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button onClick={handleAddTask}>
          {editTask !== null ? "Edit Task" : "Add Task"}
        </button>

        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
              <p>Due Date: {task.dueDate?.toString().slice(0, 10)}</p>
              <button onClick={() => handleEditTask(index)}>Edit</button>
              <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Tasks;
