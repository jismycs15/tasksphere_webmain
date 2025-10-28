import React, { useContext, useEffect, useState,useRef} from "react";
import UserService from "../../services/TaskService";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";
import { useForm } from "react-hook-form";
import usercontext from "./usecontext";

interface User {
  id: number;
  fullname: string;
  email: string;
  role: string;
  isactive: boolean;
  createdate: string;
  phonenumber: string;
  employeeid: string;
}

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [usersBackup, setUsersBackup] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { register, handleSubmit, reset,watch } = useForm();
  const uservalue = useContext(usercontext);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await UserService.getUserList();
        setUsers(data);
        setUsersBackup(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const handleUserEdit = (id: number) => {
    navigate(`/EditUser/${id}`);
  };

  const handleUserDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete user?");
    if (confirmDelete) {
      try {
        await UserService.deleteuser(id);
        setUsers((prev) => prev.filter((u) => u.id !== id));
        setUsersBackup((prev) => prev.filter((u) => u.id !== id));
        alert("User deleted successfully");
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete user");
      }
    }
  };

  const handleAssignTask = (id: number) => {
    navigate(`/assigntask/${id}`);
  };

  const onSubmit = (data: any) => {
    const filtered = usersBackup.filter((user) => {
      return (
        (!data.username || user.fullname.toLowerCase().includes(data.username.toLowerCase())) &&
        (!data.role || user.role.toLowerCase().includes(data.role.toLowerCase())) &&
        (!data.employeeid || user.employeeid.includes(data.employeeid)) &&
        (!data.email || user.email.toLowerCase().includes(data.email.toLowerCase())) &&
        (!data.status ||
          (data.status.toLowerCase() === "active"
            ? user.isactive
            : !user.isactive)) &&
        (!data.phonenumber || user.phonenumber.includes(data.phonenumber))
      );
    });
    setUsers(filtered);
  };

  const handleReset = () => {
    reset();
    setUsers(usersBackup);
  };
  const emailref = useRef<HTMLInputElement>(null);

 const handlefunction = () => {
  console.log(watch("email"), "watched email value");
  
  if (emailref.current) {
    if (!watch("email")) {
      emailref.current.focus();
    }
  }
};


  return (
    <div className="p-7 pt-1 ">
      <><h2 className="text-4xl font-semibold mb-10">User List</h2> {uservalue}</>
      <div className="bg-gray-100 p-6 mt-1 rounded-md shadow mb-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <input
              type="text"
              placeholder="User name"
              {...register("username")}
              className="w-full md:w-1/3 p-2 border rounded shadow-sm"
            />
            <input
              type="text"
              placeholder="Role"
              {...register("role")}
              className="w-full md:w-1/3 p-2 border rounded shadow-sm"
            />
            <input
              type="text"
              placeholder="Employee ID"
              {...register("employeeid")}
              className="w-full md:w-1/3 p-2 border rounded shadow-sm"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-end gap-4 mt-4">
            <input
              type="text"
              placeholder="Email ID"
              {...register("email")
              }
              ref={(e)=>{
                register("email").ref(e);
                 emailref.current = e;
              }}
              className="w-full md:w-1/3 p-2 border rounded shadow-sm"/>
            <input
              type="text"
              placeholder="User Status"
              {...register("status")}
              className="w-full md:w-1/3 p-2 border rounded shadow-sm"
            />
            <input
              type="text"
              placeholder="Phone Number"
              {...register("phonenumber")}
              className="w-full md:w-1/3 p-2 border rounded shadow-sm"
            />
            </div>
            <div className="pt-3 flex justify-end">
            <Button type="submit" className="text-white !bg-rose-800" onClick={handlefunction}>
              Search
            </Button>
            </div>
        </form>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
      <div className="overflow-x-auto max-h-[500px] overflow-y-auto ">
       <table className="w-full text-sm bg-white border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="px-3 py-3">SL</th>
              <th className="px-3 py-3">Name</th>
              <th className="px-3 py-3">Email</th>
              <th className="px-3 py-3">Role</th>
              <th className="px-3 py-3">User Status</th>
              <th className="px-3 py-3">Createdate</th>
              <th className="px-3 py-3">Phone</th>
              <th className="px-3 py-3">Emp ID</th>
              <th className="px-3 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={10} className="text-center py-4">
                  Loading user list...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-4">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user.id} className="text-sm hover:bg-gray-100">
                  <td className="px-3 py-3">{index + 1}</td>
                  <td className="px-3 py-3">{user.fullname}</td>
                  <td className="px-3 py-3">{user.email}</td>
                  <td className="px-3 py-3">{user.role}</td>
                  <td className="px-3 py-3">
                    {user.isactive ? "Active" : "Inactive"}
                  </td>
                  <td className="px-3 py-3">
                    {new Date(user.createdate).toLocaleString()}
                  </td>
                  <td className="px-3 py-3">{user.phonenumber}</td>
                  <td className="px-3 py-3">{user.employeeid}</td>
                  <td className="px-3 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button aria-label="Open user actions menu" className="p-1">
                          <div className="flex flex-col items-center justify-center gap-[3px]">
                            <span className="w-[2px] h-[2px] bg-black rounded-full"></span>
                            <span className="w-[2px] h-[2px] bg-black rounded-full"></span>
                            <span className="w-[2px] h-[2px] bg-black rounded-full"></span>
                          </div>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleUserEdit(user.id)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleUserDelete(user.id)}>
                          Delete
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleAssignTask(user.id)}>
                          Assign Task
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
    </div>
  );
}

export default UserList;