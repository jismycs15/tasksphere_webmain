import { zodResolver } from "@hookform/resolvers/zod";
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

const formSchema = z.object({
  fullname: z.string({ message: "Full name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  password: z.string({ message: "Password is required" }),
  role: z.string({ message: "Role is required" }),
  employeid: z.string({ message: "Employee ID is required" }),
  phonenumber: z.string({ message: "Phone number is required" }),
});

function CreateUser() {
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await Userservice.submitusercreate(values);
      console.log(response);
      alert("User created successfully!");
      form.reset();
    } catch (error) {
      console.error("User creation failed:", error);
      alert("Failed to create user. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen  p-8">
      <h2 className="text-xl font-semibold mb-6">Create User</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <label className="text-[15px] font-semibold">Full Name</label>
                  <FormControl>
                    <Input placeholder="Enter full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <label className="text-[15px] font-semibold">Email</label>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <label className="text-[15px] font-semibold">Password</label>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <FormField
              control={form.control}
              name="employeid"
              render={({ field }) => (
                <FormItem>
                  <label className="text-[15px] font-semibold">
                    Employee ID
                  </label>
                  <FormControl>
                    <Input placeholder="Enter ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <Button type="submit" className="text-black">
              Submit
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default CreateUser;
