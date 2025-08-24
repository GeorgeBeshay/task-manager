import type {Task} from "@/model/Task.ts";
import {getItemWithExpiry} from "@/utils/storage.ts";

const API_URL = "http://localhost:3000/tasks";

function getAuthHeaders() {
  const token = getItemWithExpiry<string>('access_token');
  if (!token) throw new Error("No access token found");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch(API_URL, { headers: getAuthHeaders() });
  if (!response.ok) throw new Error("Failed to fetch tasks");
  return await response.json() as Promise<Task[]>;
}

export async function createTask(title: string, description: string): Promise<Task> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ title, description }),
  });
  if (!response.ok) throw new Error("Failed to create task");
  return await response.json() as Promise<Task>;
}

export async function deleteTask(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete task");
}

export async function updateTask(id: number, updates: Partial<Task>): Promise<Task> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error("Failed to update task");
  return await response.json() as Promise<Task>;
}