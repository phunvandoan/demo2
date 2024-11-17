interface TodoItemProps {
  todo: string;
  isCompleted: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export default function TodoItem({
  todo,
  isCompleted,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) {
  return (
    <div className="flex justify-between items-center p-2 bg-white border-b border-gray-200">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={onToggle}
        className="h-4 w-4 rounded"
      />
      <span
        className={`text-lg ${isCompleted ? "line-through text-gray-500" : ""}`}
      >
        {todo}
      </span>
      <button onClick={onDelete} className="text-red-500 hover:text-red-700">
        X
      </button>
      <button onClick={onEdit} className="text-red-500 hover:text-red-700">
        Sửa
      </button>
    </div>
  );
}
