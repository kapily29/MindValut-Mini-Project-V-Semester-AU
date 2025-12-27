import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from '../config/api';

interface Folder {
    id: string;
    name: string;
    color: string;
}

interface InputBoxProps {
    onContentAdded?: () => void;
    onNotification?: (message: string, type: 'success' | 'error' | 'warning' | 'info') => void;
    selectedFolderId?: string;
}

export function InputBox({ onContentAdded, onNotification, selectedFolderId }: InputBoxProps) {
    const [type, setType] = useState("youtube");
    const [link, setLink] = useState("");
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [folderId, setFolderId] = useState(selectedFolderId || "");
    const [folders, setFolders] = useState<Folder[]>([]);
    const [loading, setLoading] = useState(false);

    // Fetch folders on component mount
    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const response = await axios.get(`${API_URL}/api/v1/folders`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setFolders(response.data.folders || []);
            } catch (err) {
                console.error("Error fetching folders:", err);
            }
        };

        fetchFolders();
    }, []);

    // Update folderId when selectedFolderId prop changes
    useEffect(() => {
        if (selectedFolderId) {
            setFolderId(selectedFolderId);
        }
    }, [selectedFolderId]);

    const handleSubmit = async () => {
        if (!title.trim()) {
            onNotification?.("Title is required", "warning");
            return;
        }

        if (type === 'text') {
            if (!text.trim()) {
                onNotification?.("Text content is required", "warning");
                return;
            }
        } else {
            if (!link.trim()) {
                onNotification?.("Link is required", "warning");
                return;
            }
        }

        setLoading(true);

        try {
            const token = localStorage.getItem("token");
            
            if (!token) {
                onNotification?.("Please sign in to add content", "error");
                return;
            }

            const payload: any = {
                type,
                title: title.trim()
            };

            if (type === 'text') {
                payload.text = text.trim();
            } else {
                payload.link = link.trim();
            }

            // Add folderId if selected
            if (folderId) {
                payload.folderId = folderId;
            }

            await axios.post(
                `${API_URL}/api/v1/content`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Reset form
            setLink("");
            setTitle("");
            setText("");
            setFolderId(selectedFolderId || "");
            setType("youtube");
            
            // Notify parent component
            if (onContentAdded) {
                onContentAdded();
            }

            onNotification?.("Content added successfully!", "success");

        } catch (err: any) {
            onNotification?.(err.response?.data?.message || "Failed to add content", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-3 sm:space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Content Type
                </label>
                <select 
                    className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="youtube">YouTube</option>
                    <option value="twitter">Twitter</option>
                    <option value="text">Text Note</option>
                    <option value="document">Document</option>
                    <option value="image">Image</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title
                </label>
                <input
                    type="text"
                    placeholder="Enter a title for this content"
                    className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            {/* Folder Selection */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Folder (Optional)
                </label>
                <select 
                    className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"
                    value={folderId}
                    onChange={(e) => setFolderId(e.target.value)}
                >
                    <option value="">📁 No Folder (Root)</option>
                    {folders.map((folder) => (
                        <option key={folder.id} value={folder.id}>
                            📁 {folder.name}
                        </option>
                    ))}
                </select>
            </div>

            {type === 'text' ? (
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Text Content
                    </label>
                    <textarea
                        placeholder="Enter your text content here..."
                        className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-vertical"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
            ) : (
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Link
                    </label>
                    <input
                        type="text"
                        placeholder={`Paste ${type === 'youtube' ? 'YouTube' : type === 'twitter' ? 'Twitter' : type === 'document' ? 'document' : 'image'} link`}
                        className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                </div>
            )}

            <button 
                className="w-full bg-blue-600 text-white py-2.5 rounded hover:bg-blue-700 transition cursor-pointer disabled:opacity-50 min-h-[44px]"
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? "Adding..." : "Add"}
            </button>
        </div>
    );
}
