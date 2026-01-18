"use client";
import { useState } from "react";
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

  const handleCreate = () => {};
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
        <option value="high">Low</option>
      </select>
      <button onClick={handleCreate}>Add Todo</button>
    </div>
  );
}
