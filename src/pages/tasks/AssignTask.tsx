import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import taskService from "../../services/TaskService";
import { Button } from "../../components/ui/button";

// ✅ Zod schema matching backend fields
const assignTaskSchema = z.object({
  taskid: z.coerce.number().min(1, "Task ID is required"),
  assignedto: z.coerce.number().min(1, "Assigned To is required"),
  assignedby: z.coerce.number().min(1, "Assigned By is required"),
});

type AssignTaskFormValues = z.infer<typeof assignTaskSchema>;

const AssignTask: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AssignTaskFormValues>({
    resolver: zodResolver(assignTaskSchema),
  });

  const onSubmit = async (values: AssignTaskFormValues) => {
    try {
      const response = await taskService.postassignedtask(values);
      console.log("Task assigned successfully:", response);
      alert("Task assigned successfully!");
      reset();
    } catch (error) {
      console.error("Error assigning task:", error);
      alert("Failed to assign task");
    }
  };

  return (
    <div className="mx-auto mt-10 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Assign Task</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Task ID */}
        <div>
          <label htmlFor="taskid" className="block text-sm font-medium text-gray-700">
            Task ID
          </label>
          <input
            id="taskid"
            type="number"
            {...register("taskid")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          />
          {errors.taskid && <p className="text-red-500 text-sm mt-1">{errors.taskid.message}</p>}
        </div>

        {/* Assigned To */}
        <div>
          <label htmlFor="assignedto" className="block text-sm font-medium text-gray-700">
            Assigned To
          </label>
          <input
            id="assignedto"
            type="number"
            {...register("assignedto")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          />
          {errors.assignedto && <p className="text-red-500 text-sm mt-1">{errors.assignedto.message}</p>}
        </div>

        {/* Assigned By */}
        <div>
          <label htmlFor="assignedby" className="block text-sm font-medium text-gray-700">
            Assigned By
          </label>
          <input
            id="assignedby"
            type="number"
            {...register("assignedby")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          />
          {errors.assignedby && <p className="text-red-500 text-sm mt-1">{errors.assignedby.message}</p>}
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <Button type="submit" className="text-black">Submit</Button>
          <Button type="button" variant="secondary" onClick={() => reset()}>Reset</Button>
        </div>
      </form>
    </div>
  );
};

export default AssignTask;
