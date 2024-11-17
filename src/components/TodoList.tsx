"use client";
import { useState } from "react";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState<{ text: string; isCompleted: boolean }[]>(
    []
  );
  const [newTodo, setNewTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // Lưu chỉ mục công việc đang sửa
  const [editedTodo, setEditedTodo] = useState(""); // Lưu nội dung công việc sửa
  const [searchQuery, setSearchQuery] = useState(""); // Lưu giá trị tìm kiếm

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, { text: newTodo, isCompleted: false }]);
    setNewTodo("");
  };

  const toggleTodo = (index: number) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditedTodo(todos[index].text); // Khi bắt đầu sửa, lấy nội dung công việc vào ô nhập
  };

  const saveEdit = () => {
    if (editedTodo.trim() === "") return; // Kiểm tra xem nội dung sửa có trống không
    const updatedTodos = todos.map((todo, i) =>
      i === editingIndex ? { ...todo, text: editedTodo } : todo
    );
    setTodos(updatedTodos);
    setEditingIndex(null); // Kết thúc chỉnh sửa
    setEditedTodo(""); // Xóa nội dung sửa
  };

  const cancelEdit = () => {
    setEditingIndex(null); // Hủy chỉnh sửa
    setEditedTodo(""); // Xóa nội dung sửa
  };

  // Lọc danh sách todo theo giá trị tìm kiếm
  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Todo List</h1>

      {/* Input tìm kiếm */}
      <div className="mb-4 flex">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
          placeholder="Search todos"
        />
      </div>

      <div className="mb-4 flex">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
          placeholder="Add a new todo"
        />
        <button
          onClick={addTodo}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Form chỉnh sửa todo */}
      {editingIndex !== null && (
        <div className="mb-4">
          <input
            type="text"
            value={editedTodo}
            onChange={(e) => setEditedTodo(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            placeholder="Edit todo"
          />
          <div className="mt-2 flex space-x-2">
            <button
              onClick={saveEdit}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={cancelEdit}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div>
        {/* Hiển thị các todo đã lọc */}
        {filteredTodos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo.text}
            isCompleted={todo.isCompleted}
            onToggle={() => toggleTodo(index)}
            onDelete={() => deleteTodo(index)}
            onEdit={() => startEditing(index)} // Khi nhấn vào nút "Edit", sẽ bắt đầu sửa
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
