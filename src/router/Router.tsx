import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/login/Login";
import Layout from "../Layout";
import CreateTask from "../pages/tasks/CreateTask";
import TaskList from "../pages/tasks/TaskList";
import UserList from "../pages/users/UserList";
import CreateUser from "../pages/users/CreateUser";
import AssignTask from "../pages/tasks/AssignTask";
import UpdateTask from "../pages/tasks/UpdateTaske"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 👇 Redirect base path "/" to "/login" */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login page without layout */}
        <Route path="/login" element={<Login />} />

        {/* Pages with common layout */}
        <Route element={<Layout />}>
          <Route path="/createtask" element={<CreateTask />} />
          <Route path="/tasklist" element={<TaskList />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/createuser" element={<CreateUser />} />
          <Route path="/assighntask" element={<AssignTask />} />
          <Route path="/updatetask/:id" element={<UpdateTask />} />

          {/* Add other protected routes here */}
        </Route>
      </Routes> 
    </BrowserRouter>
  );
}
