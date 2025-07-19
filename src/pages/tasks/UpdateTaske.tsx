/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TaskService from "../../services/TaskService";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../../components/ui/button";
import secureLocalStorage from "react-secure-storage";

// Zod validation schema
const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  duration: z.string().min(1, "Duration is required"),
  projectname: z.string().min(1, "Project Name is required"),
});

type CreateTaskFormValues = z.infer<typeof createTaskSchema>;

function UpdateTaske() {
  const { id } = useParams(); // 👈 this will be 'id' based on your routing
  const [taskData, setTaskData] = useState<any>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTaskFormValues>({
    resolver: zodResolver(createTaskSchema),
  });

  // 🔄 Fetch task and set form values
  useEffect(() => {
    async function fetchTask() {
      try {
        const task = await TaskService.gettaskdetail(id);
        setTaskData(task);

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

    if (id) {
      fetchTask();
    }
  }, [id, reset]);

  // ✅ Submit form
  const onSubmit = async (values: CreateTaskFormValues) => {
    const userid = secureLocalStorage.getItem("userId")
    const payload = {
      taskId: Number(id),
      Taskname: values.title,
      description: values.description,
      createdby:Number(userid),
      duration: parseInt(values.duration),
      projectname: values.projectname,
    };

    try {
      await TaskService.edittask(payload);
      alert("Task updated successfully!");
      navigate("/tasklist");
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update task");
    }
  };

  // 🔁 Reset to original values
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
    <div className="max-w-3xl mx-auto mt-10 p-4 rounded">
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
                {...register("title")}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
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
                {...register("description")}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
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
                {...register("duration")}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
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
                {...register("projectname")}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
              />
              {errors.projectname && (
                <p className="text-red-500 text-sm mt-1">{errors.projectname.message}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <Button type="submit" className="bg-indigo-600 text-black px-4 py-2 rounded">
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
