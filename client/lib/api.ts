import { TaskCreateDto, TaskUpdateDto } from "@/types/dto/task.dto"
import { UserLoginDto, UserRegistrationDto } from "@/types/dto/user.dto"
import axios from "axios"

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
})

class Api {
  constructor() {}

  async register(user: UserRegistrationDto) {
    try {
      const response = await instance.post("/auth/register", user)
      return response.data
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    }
  }

  async login(user: UserLoginDto) {
    try {
      const response = await instance.post("/auth/login", user)
      return response.data
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    }
  }

  async getTasks(token: string) {
    try {
      const response = await instance.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      console.error("Failed to fetch tasks:", error)
      throw error
    }
  }

  async createTask(task: TaskCreateDto, token: string) {
    try {
      const response = await instance.post("/tasks", task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      console.error("Failed to create task:", error)
      throw error
    }
  }

  async updateTask(task: TaskUpdateDto, token: string) {
    try {
      const response = await instance.patch(`/tasks/${task.id}`, task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      console.error("Failed to update task:", error)
      throw error
    }
  }

  async deleteTask(taskId: number, token: string) {
    try {
      const response = await instance.delete(`/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      console.error("Failed to delete task:", error)
      throw error
    }
  }
}


export const api = new Api()
