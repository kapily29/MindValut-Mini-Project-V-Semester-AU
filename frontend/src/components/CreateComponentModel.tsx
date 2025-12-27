import { InputBox } from "./InputBox";
import { CrossIcon } from "../icons/CrossIcon";

interface CreateContentModelProps {
  open: boolean;
  onClose: () => void;
  onContentAdded?: () => void;
  onNotification?: (message: string, type: 'success' | 'error' | 'warning' | 'info') => void;
  selectedFolderId?: string;
}

export function CreateContentModel({ open, onClose, onContentAdded, onNotification, selectedFolderId }: CreateContentModelProps) {
  if (!open) return null;

  const handleContentAdded = () => {
    if (onContentAdded) {
      onContentAdded();
    }
    onClose(); // Close modal after successful creation
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      <div
        className="absolute inset-0 bg-slate-500 opacity-60"
        onClick={onClose}
      />

      <div className="relative bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-end mb-4">
          <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center">
            <CrossIcon />
          </button>
        </div>

        {/* Input Box */}
        <InputBox 
          onContentAdded={handleContentAdded}
          onNotification={onNotification}
          selectedFolderId={selectedFolderId}
        />
      </div>
    </div>
  );
}
