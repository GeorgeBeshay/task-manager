import {useEffect, useState} from "react";
import type {User} from "@/model/User.ts";
import type {Task} from "@/model/Task.ts";

export default function Dashboard() {
  // ------------------ States ------------------
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  // ------------------ Hooks ------------------
  useEffect(() => {
    setUser(null);
    setTasks([])
  }, []);

  // ------------------ JSX ------------------
  return (
    <div>
      {user?.email}
      {tasks.map((task: Task) => (<p key={task.id}>{task.title}</p>))}
      <div>Dashboard</div>
    </div>
  );
}