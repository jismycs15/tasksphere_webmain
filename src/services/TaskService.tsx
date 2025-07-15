/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "../services/Interceptor";
import secureLocalStorage from "react-secure-storage";

class Trackmanagementapi {
  async loginlist(data: any): Promise<any> {
    try {
      const response = await axios.post(
        "https://localhost:7286/api/Login/Login",
        data
      );

      console.log("Login successful:", response.data);

      // Save token if present
      if (response.data && response.data.token) {
        secureLocalStorage.setItem("accessToken", response.data.token);
        secureLocalStorage.setItem("userId", response.data.userid);
        secureLocalStorage.setItem("role", response.data.role);
      }

      return response.data;
    } catch (error: any) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error;
    }
  }

  async CreateTask(data: any): Promise<any> {
    try {
      const response = await axios.post(
        "https://localhost:7286/api/TrackManagement/Createtask",
        data
      );

      console.log("Task created:", response.data);

      return response.data;
    } catch (error: any) {
      console.error(
        "Task creation failed:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
  async TaskList(): Promise<any> {
    try {
      const response = await axios.get(
        "https://localhost:7286/api/TrackManagement/GetTaskList"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user list:", error);
      throw error;
    }
  }
  async submitusercreate(data: any): Promise<any> {
    try {
      const response = await axios.post(
        "https://localhost:7286/api/TrackManagement/Createuser",
        data
      );
      console.log("User created successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async getUserList(): Promise<any> {
    try {
      const response = await axios.get(
        "https://localhost:7286/api/TrackManagement/GetUserList"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user list:", error);
      throw error;
    }
  }

  async getassignedlist(): Promise<any> {
    try {
      const response = await axios.get(
        "https://localhost:7286/api/TrackManagement/GetTaskassignedList"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user list:", error);
      throw error;
    }
  }

  async postassignedtask(data: any): Promise<any> {
    try {
      const response = await axios.post(
        "https://localhost:7286/api/TrackManagement/AssignTask",
        data
      );
      console.log("User created successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
}

export default new Trackmanagementapi();
