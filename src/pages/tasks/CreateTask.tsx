// src/pages/tasks/CreateTask.tsx

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import createtask from "../../services/TaskService"
import { Button } from "../../components/ui/button";
import secureLocalStorage from "react-secure-storage";

const createTaskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  duration: z.string().min(1, "Duration is required"),
  projectname: z.string().min(1, "project name is required"), 
});

type CreateTaskFormValues = z.infer<typeof createTaskSchema>;

const CreateTask: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTaskFormValues>({
    resolver: zodResolver(createTaskSchema),
  });
  const onSubmit = async (values: CreateTaskFormValues) => {
  const userid = secureLocalStorage.getItem("userId")
  const payload = {
    Taskname: values.title,
    description: values.description,
    duration: parseInt(values.duration), // ensure it's number
    createdby: userid,
    projectname: values.projectname,
  };
  console.log(payload,"lll") 
  try {
    console.log("Sending payload:", payload); // helpful log
    const response = await createtask.CreateTask(payload);
    console.log(response, "Res");
    alert("Task created successfully!");
    reset();
  } catch (error) {
    console.error("Error creating task:", error);
    alert("Failed to create task");
  }
};


  const onReset = () => {
     reset();
  };
  return (
    <div className="mx-auto mt-10  p-6 rounded-lg  ">
      <h2 className="text-2xl font-bold mb-6">Create Task</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Row 1: Title & Description */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Title */}
          <div className="w-full">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              {...register("title")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="w-full">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={1}
              {...register("description")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Duration & Assigned By */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Duration */}
          <div className="w-full">
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-gray-700"
            >
              Duration (in days or hours)
            </label>
            <input
              id="duration"
              type="text"
              {...register("duration")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
            />
            {errors.duration && (
              <p className="text-red-500 text-sm mt-1">
                {errors.duration.message}
              </p>
            )}
          </div>

          {/* Assigned By */}
          <div className="w-full">
            <label
              htmlFor="projectname"
              className="block text-sm font-medium text-gray-700"
            >
              Project Name
            </label>
            <input
              id="projectname"
              type="text"
              {...register("projectname")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
            />
            {errors.projectname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.projectname.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <Button type="submit" className="text-black">Submit</Button>
          <Button type="button" variant="secondary" onClick={onReset}>
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};
export default CreateTask;
