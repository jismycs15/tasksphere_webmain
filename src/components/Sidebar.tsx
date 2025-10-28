import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog"; // Adjust the import path if needed
import User from "../assets/user_image.png";

const SuperAdmin = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navigate = useNavigate();
  const [username] = useState("Jismy CS");

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  const handleTaskList = () => navigate("/tasklist");
  const handleUserList = () => navigate("/userlist");
  const handleCreateUser = () => navigate("/createuser");
  const handleAssignTask = () => navigate("/assignlist");

  const handleLogout = () => {
    secureLocalStorage.removeItem("accessToken");
    secureLocalStorage.removeItem("userId");
    secureLocalStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="w-60 bg-rose-800 text-white p-4 flex flex-col justify-between min-h-screen">
      <div className="space-y-4">
        {/* Title */}
        <h2 className="text-2xl font-bold text-yellow-400 text-center mb-4">
          Tasksphere
        </h2>

        {/* User Info */}
        <div className="flex items-center justify-center gap-2 px-2">
          {/* Avatar with initials */}
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-300 text-white font-semibold">
            {username
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase())
              .join("")
              .slice(0, 3)}
          </div>

          {/* Username */}
          <div className="text-white font-medium text-sm">{username}</div>
        </div>

        {/* Task Management */}
        <div>
          <button
            onClick={() => toggleDropdown("user")}
            className="w-full text-left py-2 px-3 hover:bg-amber-700 rounded text-amber-600"
          >
            Task Management
          </button>
          {openDropdown === "user" && (
            <div className="pl-4 mt-2 space-y-1">
              <button
                onClick={handleTaskList}
                className="block w-full text-left hover:bg-amber-700 px-3 py-1 rounded text-amber-600"
              >
                Task List
              </button>
              <button
                onClick={handleAssignTask}
                className="block w-full text-left hover:bg-amber-700 px-3 py-1 rounded text-amber-600"
              >
                Assign Task
              </button>
            </div>
          )}
        </div>

        {/* User Management */}
        <div>
          <button
            onClick={() => toggleDropdown("entity")}
            className="w-full text-left py-2 px-3 hover:bg-amber-700 rounded text-amber-600"
          >
            User Management
          </button>
          {openDropdown === "entity" && (
            <div className="pl-4 space-y-1 mt-2">
              <button
                onClick={handleUserList}
                className="block w-full text-left hover:bg-amber-700 px-3 py-1 rounded text-amber-600"
              >
                User List
              </button>
              <button
                onClick={handleCreateUser}
                className="block w-full text-left hover:bg-amber-700 px-3 py-1 rounded text-amber-600"
              >
                Create User
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Logout section at bottom */}
      <div className="pt-4 border-t border-amber-600 mt-10">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="w-full text-center py-2 px-3 hover:bg-amber-600 rounded text-amber-600 ">
              Log Out
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to log out?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action will log you out and redirect to the login page.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout} className="text-black">
                Log Out
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default SuperAdmin;
