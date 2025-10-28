import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import taskService from "../../services/TaskService";
import { Button } from "../../components/ui/button";
import secureLocalStorage from "react-secure-storage";
import { useParams } from "react-router-dom";


// Zod Schema
const assignTaskSchema = z.object({
  taskname: z.string({ message: "Task is required" }),
});

// Task item interface
interface TaskListItem {
  id: number;
  taskname: string;
}

// Infer form values type from schema
type AssignTaskFormValues = z.infer<typeof assignTaskSchema>;

// Component
const AssignTask: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AssignTaskFormValues>({
    resolver: zodResolver(assignTaskSchema),
  });

  const [taskList, setTaskList] = useState<TaskListItem[]>([]);

  const { id } = useParams<{ id: string }>(); // extract employee id from URL

  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        const response = await taskService.gettaskdetails();
        console.log("Fetched tasks:", response);
        setTaskList(response.taslists || []); // use correct property based on backend
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTaskList();
  }, []);

  const onSubmit = async (values: AssignTaskFormValues) => {
    try {
      const userid = secureLocalStorage.getItem("userId");
      const taskId = parseInt(values.taskname); // convert string to number

      const payload = {
        taskid: taskId,
        assignedto: id,
        assignedby: userid,
      };

      const response = await taskService.postassignedtask(payload);
      console.log("Task assigned successfully:", response);
      alert("Task assigned successfully!");
      reset();
    } catch (error) {
      console.error("Error assigning task:", error);
      alert("Failed to assign task");
    }
  };
  console.log("AssignTask loaded!");
  return (
    <div className="mx-auto mt-10 p-6 rounded-lg max-w-xl border">
      <h2 className="text-2xl font-bold mb-6">Assign Task</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Task Dropdown */}
        <div>
          <label className="block text-[15px] font-semibold mb-1">Task</label>
          <select
            {...register("taskname")}
            className="w-full border px-3 py-2 rounded-md text-sm"
          >
            <option value="">-- Select Task --</option>
            {taskList.map((task) => (
              <option key={task.id} value={task.id.toString()}>
                {task.taskname}
              </option>
            ))}
          </select>
          {errors.taskname && (
            <p className="text-red-500 text-sm mt-1">{errors.taskname.message}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <Button type="submit" className="text-black">
            Assign
          </Button>
          <Button type="button" variant="secondary" onClick={() => reset()}>
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AssignTask;
