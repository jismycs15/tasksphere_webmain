import React, { useEffect, useState } from "react";
import UserService from "../../services/TaskService";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await UserService.getUserList();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading user list...</p>;
  return (
    <div className="p-15">
      <h2 className="text-2xl font-semibold mb-10">User List</h2>
      <button>Assign Task</button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white  shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-2 border">SL</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">User Satus</th>
              <th className="px-4 py-2 border">Createdate</th>
              <th className="px-4 py-2 border">Phonenumber</th>
              <th className="px-4 py-2 border">Emp ID</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-4">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user.id} className="text-sm hover:bg-gray-100">
                  <th className="px-4 py-2 border">{index + 1}</th>
                  <td className="px-4 py-2 border">{user.fullname}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border">{user.role}</td>
                  <td className="px-4 py-2 border">
                    {user.isactive ? "Active" : "Inactive"}
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(user.createdate).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border">{user.phonenumber}</td>
                  <td className="px-4 py-2 border">{user.employeeid}</td>
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
                        <DropdownMenuLabel >Edit</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem >Delete</DropdownMenuItem>
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

export default UserList;
