/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UserService from "../../services/TaskService";
import { Button } from "../../components/ui/button"; // Adjust path if needed

function UpdateTaske() {
  const { taskId } = useParams();
  const [taskData, setTaskData] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      duration: "",
      projectname: "",
    },
  });

  // Fetch the task by ID and set form values
  useEffect(() => {
    async function fetchTask() {
      try {
        const task = await UserService.loginlist(taskId);
        setTaskData(task);

        // Pre-fill form with fetched data
        reset({
          title: task.title,
          description: task.description,
          duration: String(task.duration),
          projectname: task.projectName,
        });
      } catch (err) {
        console.error("Failed to fetch task", err);
      }
    }

    fetchTask();
  }, [taskId, reset]);

  // Handle form submit
  const onSubmit = async (data: any) => {
    try {
      await UserService.loginlist(taskId); // Update API
      alert("Task updated successfully!");
      // Optional: redirect to task list
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update task");
    }
  };

  // Reset form to original values
  const onReset = () => {
    if (taskData) {
      reset({
        title: taskData.title,
        description: taskData.description,
        duration: String(taskData.duration),
        projectname: taskData.projectName,
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-6">Edit Task</h2>

      {taskData ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Row 1: Title & Description */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Title */}
            <div className="w-full">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                id="title"
                type="text"
                {...register("title", { required: "Title is required" })}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="w-full">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                rows={1}
                {...register("description", { required: "Description is required" })}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>
          </div>

          {/* Row 2: Duration & Project Name */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Duration */}
            <div className="w-full">
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                Duration (in days or hours)
              </label>
              <input
                id="duration"
                type="text"
                {...register("duration", { required: "Duration is required" })}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.duration && (
                <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
              )}
            </div>

            {/* Project Name */}
            <div className="w-full">
              <label htmlFor="projectname" className="block text-sm font-medium text-gray-700">
                Project Name
              </label>
              <input
                id="projectname"
                type="text"
                {...register("projectname", { required: "Project Name is required" })}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.projectname && (
                <p className="text-red-500 text-sm mt-1">{errors.projectname.message}</p>
              )}
            </div>
          </div>

          {/* Submit & Reset */}
          <div className="flex gap-4">
            <Button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
              Submit
            </Button>
            <Button type="button" variant="secondary" onClick={onReset}>
              Reset
            </Button>
          </div>
        </form>
      ) : (
        <p>Loading task details...</p>
      )}
    </div>
  );
}

export default UpdateTaske;
