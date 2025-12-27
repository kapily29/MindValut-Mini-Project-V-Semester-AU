import { useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import axios from "axios";

interface CreateFolderModalProps {
  open: boolean;
  onClose: () => void;
  onFolderCreated?: () => void;
  onNotification?: (message: string, type: 'success' | 'error' | 'warning' | 'info') => void;
}

const FOLDER_COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Yellow
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#84CC16', // Lime
  '#F97316', // Orange
  '#6B7280', // Gray
];

export function CreateFolderModal({ open, onClose, onFolderCreated, onNotification }: CreateFolderModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState(FOLDER_COLORS[0]);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    if (!name.trim()) {
      onNotification?.("Folder name is required", "warning");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        onNotification?.("Please sign in to create folder", "error");
        return;
      }

      await axios.post(
        `${API_URL}/api/v1/folders`,
        {
          name: name.trim(),
          description: description.trim(),
          color: selectedColor
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Reset form
      setName("");
      setDescription("");
      setSelectedColor(FOLDER_COLORS[0]);
      
      // Notify parent component
      if (onFolderCreated) {
        onFolderCreated();
      }

      onNotification?.("Folder created successfully!", "success");
      onClose();

    } catch (err: any) {
      onNotification?.(err.response?.data?.message || "Failed to create folder", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-500 opacity-60"
        onClick={onClose}
      />

      <div className="relative bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Create New Folder</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center">
            <CrossIcon />
          </button>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {/* Folder Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Folder Name *
            </label>
            <input
              type="text"
              placeholder="e.g., My Projects"
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description (Optional)
            </label>
            <textarea
              placeholder="Brief description of this folder's content..."
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={200}
            />
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Folder Color
            </label>
            <div className="grid grid-cols-5 gap-2">
              {FOLDER_COLORS.map((color) => (
                <button
                  key={color}
                  className={`w-10 h-10 sm:w-8 sm:h-8 rounded-full border-2 transition-all min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 ${
                    selectedColor === color 
                      ? 'border-gray-800 dark:border-white scale-110' 
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Preview:</div>
            <div className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded"
                style={{ backgroundColor: selectedColor }}
              />
              <span className="font-medium text-gray-900 dark:text-white">
                {name || "Folder Name"}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-4 sm:mt-6">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition min-h-[44px] order-2 sm:order-1"
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50 min-h-[44px] order-1 sm:order-2"
            disabled={loading || !name.trim()}
          >
            {loading ? "Creating..." : "Create Folder"}
          </button>
        </div>
      </div>
    </div>
  );
}