import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import Userservice from "../../services/TaskService";
import { useNavigate, useParams } from "react-router-dom";

const formSchema = z.object({
  fullname: z.string(),
  email: z.string().email(),
  password: z.string({ message: "Password is required" }),
  role: z.string({ message: "Role is required" }),
  employeid: z.string(),
  phonenumber: z.string({ message: "Phone number is required" }),
});

function EditUser() {
  const { id } = useParams(); // get user id from route
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      role: "",
      employeid: "",
      phonenumber: "",
    },
  });

  // ✅ Fetch user data on load
  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await Userservice.getuserbyid(id); // you should have this API
        form.reset({
          fullname: userData.fullname || "",
          email: userData.email || "",
          password: "", // keep blank; user can change if needed
          role: userData.role || "",
          employeid: userData.employeid || "",
          phonenumber: userData.phonenumber || "",
        });
      } catch (error) {
        console.error("Error fetching user:", error);
        alert("Failed to load user details");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchUser();
  }, [id, form]);

  // ✅ Submit update request
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const payload = {...values ,id:Number(id)};
      const response = await Userservice.edituser( payload); // backend API call
      console.log(response);
      alert("User updated successfully!");
      navigate("/UserList");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update user");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-lg font-semibold text-gray-600">Loading user...</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen w-full p-7 pt-2">
      <h2 className="text-4xl font-semibold mb-6">Edit User</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Full Name - ReadOnly */}
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <label className="text-[15px] font-semibold">Full Name</label>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email - ReadOnly */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <label className="text-[15px] font-semibold">Email</label>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password - Editable */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <label className="text-[15px] font-semibold">Password</label>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter new password (optional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Role - Editable */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <label className="text-[15px] font-semibold">Role</label>
                  <select
                    {...field}
                    className="w-full border px-3 py-2 rounded-md text-sm"
                  >
                    <option value="">-- Select Role --</option>
                    <option value="Admin">Admin</option>
                    <option value="Employee">Employee</option>
                  </select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Employee ID - ReadOnly */}
            <FormField
              control={form.control}
              name="employeid"
              render={({ field }) => (
                <FormItem>
                  <label className="text-[15px] font-semibold">
                    Employee ID
                  </label>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone - Editable */}
            <FormField
              control={form.control}
              name="phonenumber"
              render={({ field }) => (
                <FormItem>
                  <label className="text-[15px] font-semibold">
                    Phone Number
                  </label>
                  <FormControl>
                    <Input placeholder="Enter number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4 mt-4">
            <Button type="submit" className="text-white !bg-rose-800">
              Update
            </Button>
            <Button
              type="button"
              className="text-white !bg-gray-600"
              onClick={() => navigate("/UserList")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default EditUser;
