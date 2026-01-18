"use client";
import { useEffect, useState } from "react";
import { createTodo, deleteTodo, getTodos } from "./actions/todo";
interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchTodos = async () => {
    const res = await getTodos();
    setTodos(res.result);
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCreate = async () => {
    setLoading(true);
    await createTodo({ title, description, priority });
    fetchTodos();
    setTitle("");
    setDescription("");
    setPriority("medium");
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    fetchTodos();
  };

  return (
    <div>
      <div>Todo App</div>
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        onKeyPress={(e) => e.key === "Enter" && handleCreate}
        type="text"
        placeholder="What needs to be done?"
      />
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        onKeyPress={(e) => e.key === "Enter" && handleCreate}
        type="text"
        placeholder="Description (optional)"
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button disabled={loading} onClick={handleCreate}>
        {loading ? "Adding Todo..." : "Add Todo"}
      </button>
      <div>
        {todos &&
          todos.map((todo) => (
            <div>
              <div>{todo.title}</div>
              <div>{todo.description}</div>
              <div>{todo.priority}</div>
              <div>{todo.completed}</div>
              <div className="flex gap-4">
                <button>Edit</button>
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </div>
              <br />
            </div>
          ))}
      </div>
    </div>
  );
}
