import React, { useEffect, useState } from "react";
import TaskService from "../../services/TaskService";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";
import { useForm } from "react-hook-form";
import  { useRef } from "react";


interface Task {
  id: number;
  title: string;
  description: string;
  createdBy: number;
  createDate: string;
  duration: string;
  projectName: string;
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

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    async function fetchData() {
      try {
        const [userResponse, taskResponse] = await Promise.all([
          TaskService.getUserList(),
          TaskService.TaskList(),
        ]);
        setUsers(userResponse);
        setTasks(taskResponse.trackMasterList || []);
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
    console.log(taskId, "ppp");
    if (confirmDelete) {
      try {
        await TaskService.deletetask(taskId);
        setTasks((prev) => prev.filter((task) => task.id !== taskId));
        alert("Task deleted successfully");
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete task");
      }
    }
  };

  // ✅ Updated search to send filters
const onSubmit = async (data: any) => {
  setLoading(true);
  try {
    const filteredTasks = await TaskService.TaskList(
      data.taskname || undefined,   // was data.title
      data.description || undefined,
      data.projectname || undefined
    );
    setTasks(filteredTasks.trackMasterList || []);
  } catch (error) {
    console.error("Error during search:", error);
  } finally {
    setLoading(false);
  }
};

  const [counter,setcounter]=useState(0);
  const handlecounterfunction =()=>{
    setcounter(counter+1);
  }
  if (loading) return <p className="text-center mt-10">Loading task list...</p>;

  return (
    <div className="p-7  pt-2">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-10 text-4xl">Task List</h2>
        <Button size="sm" onClick={ceatetask} className="!bg-rose-800 ">
          Create Task
        </Button>
      </div>
      <div className="bg-gray-100 p-6 rounded-md shadow mb-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <input
              type="text"
              placeholder="Task Name"
              {...register("taskname")}
              className="w-full md:w-1/3 p-2 border rounded shadow-sm"
            />

            <input
              type="text"
              placeholder="Description"
              {...register("description")}
              className="w-full md:w-1/3 p-2 border rounded shadow-sm"
            />

            <input
              type="text"
              placeholder="Project Name"
              {...register("projectname")}
              className="w-full md:w-1/3 p-2 border rounded shadow-sm"
            />

            <Button
              type="submit"
              className="text-white !bg-rose-800 mt-2 md:mt-0 md:ml-auto"
            >
              Search
            </Button>
          </div>
        </form>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white overflow-y-auto shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="px-3 py-1 ">SL</th>
              <th className="px-3 py-1 ">Task</th>
              <th className="px-3 py-1 ">Description</th>
              <th className="px-3 py-1 ">Created on</th>
              <th className="px-3 py-1 ">Duration</th>
              <th className="px-3 py-1 ">Project Name</th>
              <th className="px-3 py-1 ">Created by</th>
              <th className="px-3 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  No tasks found.
                </td>
              </tr>
            ) : (
              tasks.map((task, index) => (
                <tr key={task.id} className="text-sm hover:bg-gray-100">
                  <td className="px-3 py-1">{index + 1}</td>
                  <td className="px-3 py-1">{task.title}</td>
                  <td className="px-3 py-1 ">{task.description}</td>
                  <td className="px-3 py-1 ">{task.createDate}</td>
                  <td className="px-3 py-1">{task.duration}</td>
                  <td className="px-3 py-1">{task.projectName}</td>
                  <td className="px-3 py-1">
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
                        <DropdownMenuLabel onClick={() => handleEdit(task.id)}>
                          Edit
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDelete(task.id)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskList;
