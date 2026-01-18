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

  return (
    <div>
      <div>Todo App</div>
      <input type="text" />
    </div>
  );
}
