import {useEffect, useState} from "react";
import type {Task} from "@/model/Task.ts";
import {createTask, deleteTask, fetchTasks, updateTask} from "@/services/tasks.service.ts";
import {toast} from "react-hot-toast";

export default function Dashboard() {
  // ------------------ States ------------------
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Buy groceries", description: "Milk, eggs, bread, and coffee. Don't forget the fruits.", completed: false },
    { id: 2, title: "Finish project", description: "Complete the API integration and write tests.", completed: true },
  ]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  // ------------------ Functions ------------------
  const toggleCompletion =  (id: number) => {
    const isCompleted = tasks.find((task) => task.id === id)?.completed;
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !isCompleted } : task
    ));

    const task = tasks.find(t => t.id === id);
    if (!task) {
      toast.error("Task not found. Can't be updated.");
      return;
    }
    task.completed = !isCompleted;
    console.log(task)
    void updateTask(id, task);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      toast.error("Failed to delete task");
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }

    setTasks(await fetchTasks());
  };

  const handleEdit = async () => {
    if (!selectedTask) return;
    try {
      const updated = await updateTask(selectedTask.id, {
        title: selectedTask.title,
        description: selectedTask.description,
        completed: selectedTask.completed,
      });
      setTasks((prev) =>
        prev.map((task) =>
          task.id === updated.id ? updated : task
        )
      );
      setSelectedTask(null);
      toast.success("Task updated!");
    } catch (err) {
      toast.error("Failed to update task");
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  }

  const handleCreate = async () => {
    console.log(!newTask.title.trim() || !newTask.description.trim())
    if (!newTask.title.trim() || !newTask.description.trim()) {
      toast.error("Title and description cannot be empty");
      return;
    }

    try {
      const created = await createTask(newTask.title, newTask.description);
      setTasks((prev) => [...prev, created]);
      setNewTask({ title: "", description: "" });
    } catch (err) {
      toast.error("Failed to create task");
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  // ------------------ Hooks ------------------
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    void loadTasks();
  }, []);

  // ------------------ JSX ------------------
  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-6 space-x-18">
        <h1 className="text-3xl font-bold">Tasks Dashboard</h1>

        <div className="flex flex-col space-y-2">
          <input
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Task Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="border rounded px-3 py-2"
          />
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={() => void handleCreate()}
          >
            Create New Task
          </button>
        </div>

      </div>

      {tasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[200px]">
          {tasks.map(task => (
            <div
              key={task.id}
              className="bg-stone-400 rounded-xl shadow-md hover:shadow-lg transition p-4"
            >
              <div className="flex justify-between items-start">
                <h2
                  className={`text-lg font-semibold text-black ${
                    task.completed ? "line-through" : ""
                  }`}
                >
                  {task.title}
                </h2>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={e => {
                    e.stopPropagation();
                    void toggleCompletion(task.id);
                  }}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>

              <p className="text-black mt-2">
                {task.description.length > 80
                  ? task.description.slice(0, 80) + "..."
                  : task.description}
              </p>

              <div className="flex justify-end space-x-2 mt-3">
                <button
                  type="button"
                  className="px-3 py-1 border rounded-md hover:bg-gray-100"
                  onClick={() => {setSelectedTask(task)}}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="px-3 py-1 border border-red-500 text-red-500 rounded-md hover:bg-red-50"
                  onClick={() => void handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center text-gray-500 min-h-[200px]">
          <p className="text-lg font-medium">No tasks yet</p>
          <p className="text-sm">Click "Create New Task" to get started</p>
        </div>
      )}

      {selectedTask && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-lg">
            <h2 className="text-xl font-bold text-black">Edit Task</h2>

            <input
              type="text"
              value={selectedTask.title}
              onChange={(e) =>
                setSelectedTask({ ...selectedTask, title: e.target.value })
              }
              className="w-full border rounded px-3 py-2 text-black"
            />

            <textarea
              value={selectedTask.description}
              onChange={(e) =>
                setSelectedTask({ ...selectedTask, description: e.target.value })
              }
              className="w-full border rounded px-3 py-2 text-black"
            />

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedTask.completed}
                onChange={(e) =>
                  setSelectedTask({ ...selectedTask, completed: e.target.checked })
                }
                className="w-5 h-5 cursor-pointer"
              />
              <p className="text-black">Completed</p>
            </label>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="mt-4 w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition"
                onClick={() => void handleEdit()}
              >
                Save
              </button>
              <button
                type="button"
                className="mt-4 w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition"
                onClick={() => setSelectedTask(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}