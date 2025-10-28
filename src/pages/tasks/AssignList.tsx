import React, { useEffect, useState } from "react";
import TaskService from "../../services/TaskService";
import { Button } from "../../components/ui/button";
import { useForm } from "react-hook-form";

interface Task {
  id: number;
  taskname: string;
  assignedby: string;
  assignedto: string;
  projectname: string;
  assigndate: string;
  status?: string;
}

type FormData = {
  taskname?: string;
  username?: string;
  projectname?: string;
};

function AssignList() {
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm<FormData>();

  // ✅ Define fetchData outside so it can be reused
  const fetchData = async (
    taskname?: string,
    username?: string,
    projectname?: string
  ) => {
    try {
      setLoading(true);
      const response = await TaskService.getassignedlist(
        taskname,
        username,
        projectname
      );
      console.log(response, "Fetched Tasks");
      setAssignedTasks(response?.tasklists || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all data initially
  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Search form submit
  const onSubmit = async (data: FormData) => {
    await fetchData(data.taskname, data.username, data.projectname);
  };

  if (loading)
    return <p className="text-center mt-10">Loading task list...</p>;

  return (
    <div className="p-7 pt-2">
      <div className="flex justify-between">
        <h2 className="text-4xl font-semibold mb-10">Assigned Tasks</h2>
      </div>

      {/* 🔍 Search Filter */}
      <div className="bg-gray-100 p-6 rounded-md shadow mb-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            {/* Task Name */}
            <input
              type="text"
              placeholder="Task Name"
              {...register("taskname")}
              className="w-full md:w-1/3 p-2 border rounded shadow-sm"
            />

            {/* Username */}
            <input
              type="text"
              placeholder="User"
              {...register("username")}
              className="w-full md:w-1/3 p-2 border rounded shadow-sm"
            />

            {/* Project Name */}
            <input
              type="text"
              placeholder="Project Name"
              {...register("projectname")}
              className="w-full md:w-1/3 p-2 border rounded shadow-sm"
            />

            {/* Search Button */}
            <Button
              type="submit"
              className="text-white !bg-rose-800 mt-2 md:mt-0 md:ml-auto"
            >
              Search
            </Button>
          </div>
        </form>
      </div>

      {/* 🧾 Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-2">SL</th>
              <th className="px-4 py-2">Task</th>
              <th className="px-4 py-2">Assigned To</th>
              <th className="px-4 py-2">Assigned By</th>
              <th className="px-4 py-2">Assigned Date</th>
              <th className="px-4 py-2">Project Name</th>
            </tr>
          </thead>
          <tbody>
            {assignedTasks.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No Assigned Tasks
                </td>
              </tr>
            ) : (
              assignedTasks.map((task, index) => (
                <tr key={index} className="text-sm hover:bg-gray-100">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{task.taskname}</td>
                  <td className="px-4 py-2">{task.assignedto}</td>
                  <td className="px-4 py-2">{task.assignedby}</td>
                  <td className="px-4 py-2">{task.assigndate}</td>
                  <td className="px-4 py-2">{task.projectname}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AssignList;
