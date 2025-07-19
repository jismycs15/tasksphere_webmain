import React, { useEffect, useState } from "react";
import TaskService from "../../services/TaskService";
import { useNavigate } from "react-router-dom";
import dot from "../../assets/three_dot.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

interface Task {
  id: number;
  title: string;
  description: string;
  createdBy: number;
  createDate: string;
  duration: string;
  projectName: string;
  // This is user ID
}

interface User {
  id: number;
  fullname: string;
}

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const [userResponse, taskResponse] = await Promise.all([
          TaskService.getUserList(),
          TaskService.TaskList(),
        ]);
        console.log(taskResponse, "kkk");
        setUsers(userResponse); // Assumes response is an array of users
        setTasks(taskResponse); // Assumes response is an array of tasks
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const ceatetask = () => {
    navigate("/createtask");
  };

  const getCreatorName = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.fullname : "Unknown";
  };

  const handleEdit = (taskId: number) => {
    navigate(`/updatetask/${taskId}`);
  };

  const handleDelete = async (taskId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    console.log(taskId, "ppp")
    if (confirmDelete) {
      try {
        await TaskService.deletetask(taskId); // Call your API
        setTasks((prev) => prev.filter((task) => task.id !== taskId)); // Remove from UI
        alert("Task deleted successfully");
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete task");
      }
    }
  };

  if (loading) return <p className="text-center mt-10">Loading task list...</p>;

  return (
    <div className="p-15  pt-10">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-10">Task List</h2>
        <button className="size-6x h-5" onClick={ceatetask}>
          Create Task
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white  shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-2 ">SL</th>
              <th className="px-4 py-2 ">Task</th>
              <th className="px-4 py-2 ">Description</th>
              <th className="px-4 py-2 ">Created on</th>
              <th className="px-4 py-2 ">Duration</th>
              <th className="px-4 py-2 ">Project Name</th>
              <th className="px-4 py-2 ">Created by</th>
              <th className="px-4 py-2">Actions</th> {/* New column */}
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No tasks found.
                </td>
              </tr>
            ) : (
              tasks.map((task, index) => (
                <tr key={task.id} className="text-sm hover:bg-gray-100">
                  <td className="px-4 py-2 ">{index + 1}</td>
                  <td className="px-4 py-2 ">{task.title}</td>
                  <td className="px-4 py-2 ">{task.description}</td>
                  <td className="px-4 py-2 ">{task.createDate}</td>
                  <td className="px-4 py-2 ">{task.duration}</td>
                  <td className="px-4 py-2 ">{task.projectName}</td>
                  <td className="px-4 py-2 ">
                    {getCreatorName(task.createdBy)}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="flex flex-col items-center justify-center gap-[3px] cursor-pointer">
                          <span className="w-[4px] h-[4px] bg-black rounded-full"></span>
                          <span className="w-[4px] h-[4px] bg-black rounded-full"></span>
                          <span className="w-[4px] h-[4px] bg-black rounded-full"></span>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel onClick={() => handleEdit(task.id)}>Edit</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDelete(task.id)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div >
  );
}

export default TaskList;
