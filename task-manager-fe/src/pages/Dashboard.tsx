import {useState} from "react";
import type {Task} from "@/model/Task.ts";

export default function Dashboard() {
  // ------------------ States ------------------
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Buy groceries", description: "Milk, eggs, bread, and coffee. Don't forget the fruits.", completed: false },
    { id: 2, title: "Finish project", description: "Complete the API integration and write tests.", completed: true },
  ]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // ------------------ Functions ------------------
  const toggleCompletion = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEdit = (id: number) => {
    console.log("Edit task:", id);
    // Add your navigation or modal logic here
  };

  const handleCreate = () => {
    console.log("Create new task");
    // Add your modal or page navigation logic here
  };

  // ------------------ Hooks ------------------

  // ------------------ JSX ------------------
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-6 space-x-18">
        <h1 className="text-3xl font-bold">Tasks Dashboard</h1>
        <button
          type="button"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={handleCreate}
        >
          Create New Task
        </button>
      </div>

      {tasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[200px]">
          {tasks.map(task => (
            <div
              key={task.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4"
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
                    toggleCompletion(task.id);
                  }}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>

              <p className="text-gray-600 mt-2">
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
                  onClick={() => {handleDelete(task.id);}}
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
            <h2 className="text-xl font-bold text-black">{selectedTask.title}</h2>
            <p className="text-gray-700">{selectedTask.description}</p>
            <p className="text-sm text-gray-700">
              Status: {selectedTask.completed ? "Completed" : "Incomplete"}
            </p>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="mt-4 w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition"
                onClick={() => handleEdit(selectedTask.id)}
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