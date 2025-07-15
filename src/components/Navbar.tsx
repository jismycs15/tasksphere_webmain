import React, { useState } from "react";
import User from "../assets/user_image.png";
import dot from "../assets/three_dot.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
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
} from "../components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

function NavBar() {
  const navigate = useNavigate();
  const [username] = useState("Jismy");

  const movetologout = () => {
    navigate("/login");
    secureLocalStorage.removeItem("accessToken");
    secureLocalStorage.removeItem("userId");
    secureLocalStorage.removeItem("role");
  };

  return (
    <nav className="bg-pink-800 w-screen h-[65px] flex items-center px-4 shadow z-10">
      <div className="flex justify-between items-center w-full">
        {/* Left side (optional - logo or title) */}
        <div></div>

        {/* Right side: user avatar + name + menu */}
        <div className="flex items-center gap-3">
          {/* Avatar initials */}
          {username ? (
            <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-red-200 text-white text-[8px] font-medium">
              <h1 className="text-blue-dark text-sm font-semibold">
                {username
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase())
                  .join("")
                  .slice(0, 2)}
              </h1>
            </div>
          ) : (
            <img src={User} alt="User image" className="w-[40px] h-[40px]" />
          )}

          {/* Username */}
          <div className="text-white font-medium">{username}</div>

          {/* Dropdown menu with logout confirmation */}
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <img
                  src={dot}
                  alt="Action"
                  className="cursor-pointer w-[20px] h-[23px]"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Change Password</DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <AlertDialogTrigger asChild>
                    <span className="cursor-pointer w-full">Log Out</span>
                  </AlertDialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to log out?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will redirect to your login
                  page.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={movetologout}
                  className="text-black"
                >
                  Log Out
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
