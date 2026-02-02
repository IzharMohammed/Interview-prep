"use client";
import { useState } from "react";

type DataType = Record<string, number>;

const initialData: DataType = {
  izhar: 21,
  umar: 23,
  salman: 32,
};

export default function App() {
  const [data, setData] = useState<DataType>(initialData);
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [editData, setEditData] = useState<boolean>(false);
  const [editKey, setEditKey] = useState<string | null>(null);

  const handleDelete = (key: string): void => {
    setData((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const handleUpdate = (key: string, value: number): void => {
    setEditData(true);
    setEditKey(key);
    setName(key);
    setAge(String(value));
  };

  const handleAdd = (): void => {
    if (!name || !age) return;

    if (!editData) {
      setData((prev) => ({
        ...prev,
        [name]: Number(age),
      }));

      setName("");
      setAge("");
    } else {
      setData((prev) => {
        const copy = { ...prev };
        delete copy[editKey!];
        copy[name] = Number(age);
        return copy;
      });
      setAge("");
      setName("");
    }
  };

  return (
    <div>
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <div>
            {key}: {value}
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => handleUpdate(key, value)}>Update</button>
            <button onClick={() => handleDelete(key)}>Delete</button>
          </div>
          <br />
        </div>
      ))}

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <button onClick={handleAdd}>{editData ? "Edit" : "Add"}</button>
    </div>
  );
}
