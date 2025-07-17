"use client";

import { useEffect, useState } from "react";

export default function TodoSection({ userEmail }: { userEmail: string }) {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    async function fetchUserId() {
      const res = await fetch(`/api/auth/byemail?email=${userEmail}`);
      const data = await res.json();
      setUserId(data.id);
    }
    fetchUserId();
  }, [userEmail]);

  useEffect(() => {
    if (userId) loadTodos();
  }, [userId]);

  const loadTodos = async () => {
    const res = await fetch(`/api/todos/gettask?user_id=${userId}`);
    const data = await res.json();
    setTodos(data.todos);
  };

  const addTodo = async () => {
    if (!newTask.trim()) return;
    await fetch("/api/todos/addtask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTask, user_id: userId }),
    });
    setNewTask("");
    loadTodos();
  };

  const toggleComplete = async (id: number, completed: boolean) => {
    await fetch("/api/todos/edit", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, completed: !completed }),
    });
    loadTodos();
  };

  const deleteTodo = async (id: number) => {
    await fetch("/api/todos/deltask", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadTodos();
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400"
          placeholder="Add new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          onClick={addTodo}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {todos.length === 0 ? (
        <p className="text-gray-400 text-center">No tasks found.</p>
      ) : (
        <ul className="space-y-3">
          {todos.map((todo: any) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-800 px-4 py-3 rounded shadow"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={!!todo.completed}
                  onChange={() => toggleComplete(todo.id,todo.completed)}
                  className="accent-blue-500"
                />
                <span
                  className={`${
                    todo.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.title}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
