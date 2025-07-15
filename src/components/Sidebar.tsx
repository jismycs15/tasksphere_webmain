import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";



const SuperAdmin = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navigate =useNavigate();
  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(prev => (prev === dropdownName ? null : dropdownName));
  };
    const handleTaskList = () => {
    navigate("/tasklist" );  
  };
  const handleUserList = () => {
    navigate("/userlist");  
  };
  const handlecraeteuser = () => {
    navigate("/createuser");  
  };
  const handleassigntask =() =>{
    navigate("/assighntask")
  }

  return (
  <div className="w-64 bg-rose-800 text-white p-4 space-y-2 h-full">
      {/* User Management */}
      <div>
        <button
          onClick={() => toggleDropdown("user")}
          className="w-full text-left py-2 px-3 hover:bg-amber-700 rounded text-amber-600"
        >
          Task Management
        </button>
        {openDropdown === "user" && (
          <div className="pl-4 space-y-1">
            
            <button   onClick={handleTaskList} className="block w-full text-left hover:bg-amber-700 px-3 py-1 rounded   text-amber-600">Task List</button>
        
            <button onClick ={handleassigntask} className="block w-full text-left hover:bg-amber-700 px-3 py-1 rounded  text-amber-600">Assign Task</button>
          
          </div>
        )}
      </div>
       <div>
        <button
          onClick={() => toggleDropdown("entity")}
          className="w-full text-left py-2 px-3 hover:bg-amber-700 rounded  text-amber-600"
        >
          User Management
        </button>
        {openDropdown === "entity" && (
          <div className="pl-4 space-y-1">
            <button onClick={handleUserList} className="block w-full text-left hover:bg-amber-700 px-3 py-1 rounded  text-amber-600">User List</button>
            <button onClick= {handlecraeteuser} className="block w-full text-left hover:bg-amber-700 px-3 py-1 rounded  text-amber-600">Create User</button>
          </div>
        )}
      </div> 
    </div> 
  );
};

export default SuperAdmin 
