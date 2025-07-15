// ✅ Correct Home.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginapi from "../../services/TaskService";
import secureLocalStorage from "react-secure-storage";

export default function Home() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginapi.loginlist(formData); // Directly pass formData

      if (response.message === "Login successful") {
        secureLocalStorage.setItem("user", JSON.stringify(response.user));
        alert("Login successful!");
        navigate("/tasklist");
      } else {
        alert("Login failed: " + response.message);
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Failed to login. Please check your credentials or server status.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email" // ✅ should match `formData.email`
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password" // ✅ should match `formData.password`
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full text-black"
        >
          Login
        </button>
      </form>
    </div>
  );
}
