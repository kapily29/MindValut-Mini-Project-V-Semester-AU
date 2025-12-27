import type { ReactElement } from "react";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { XIcon } from "../icons/XIcon";
import { TextIcon } from "../icons/TextIcon";
import { ImageIcon } from "../icons/ImageIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { FolderIcon } from "../icons/FolderIcon";
import { EditIcon } from "../icons/EditIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "../contexts/ThemeContext";

interface Folder {
  id: string;
  name: string;
  color: string;
  contentCount: number;
}

interface SideBarProps {
  onTabChange: (tab: "youtube" | "twitter" | "text" | "document" | "image" | "all" | "folder", folderId?: string) => void;
  activeTab: "youtube" | "twitter" | "text" | "document" | "image" | "all" | "folder";
  activeFolderId?: string;
  onCreateFolder: () => void;
  onEditFolder?: (folderId: string, data: any) => void;
  onDeleteFolder?: (folderId: string) => void;
  foldersUpdateTrigger?: number;
  isOpen?: boolean;
  onClose?: () => void;
}

export function SideBar({ onTabChange, activeTab, activeFolderId, onCreateFolder, onEditFolder, onDeleteFolder, foldersUpdateTrigger, isOpen = true, onClose }: SideBarProps) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [foldersExpanded, setFoldersExpanded] = useState(true);
  const { isDark, toggleTheme } = useTheme();

  const buttons: { label: string; value: "youtube" | "twitter" | "text" | "document" | "image" | "all"; icon?: ReactElement }[] = [
    { label: "All Posts", value: "all", icon: <XIcon /> },
    { label: "YouTube", value: "youtube", icon: <YoutubeIcon /> },
    { label: "Twitter", value: "twitter", icon: <XIcon /> },
    { label: "Text Notes", value: "text", icon: <TextIcon /> },
    { label: "Documents", value: "document", icon: <DocumentIcon /> },
    { label: "Images", value: "image", icon: <ImageIcon /> },
  ];

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

  useEffect(() => {
    fetchFolders();
  }, []);

  useEffect(() => {
    if (foldersUpdateTrigger !== undefined) {
      fetchFolders();
    }
  }, [foldersUpdateTrigger]);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
        } scrollbar-thin overflow-y-auto`}>
        {/* Sidebar Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">MindVault</h1>

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Theme Toggle */}
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </span>
            <div className="relative w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full">
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${isDark ? 'translate-x-6' : 'translate-x-0'
                }`}></div>
            </div>
          </button>
        </div>

        {/* Content Type Buttons */}
        <div className="flex flex-col p-3 sm:p-4 gap-2 border-b border-gray-200 dark:border-gray-700">
          {buttons.map((btn) => (
            <button
              key={btn.value}
              className={`py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-left font-medium flex items-center transition-all duration-300 text-sm sm:text-base ${activeTab === btn.value
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-600"
                }`}
              onClick={() => {
                onTabChange(btn.value);
                onClose?.();
              }}
            >
              {btn.icon && (
                <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                  {btn.icon}
                </div>
              )}
              <span className="truncate">{btn.label}</span>
            </button>
          ))}
        </div>

        {/* Folders Section */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-3 sm:p-4">
            {/* Folders Header */}
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => setFoldersExpanded(!foldersExpanded)}
                className="flex items-center text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white min-h-[44px]"
              >
                <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center mr-2 flex-shrink-0">
                  <FolderIcon />
                </div>
                <span>Folders ({folders.length})</span>
                <svg
                  className={`ml-1 w-4 h-4 transition-transform ${foldersExpanded ? 'transform rotate-90' : ''
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={onCreateFolder}
                className="p-2 sm:p-2.5 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 rounded transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                title="Create new folder"
              >
                <PlusIcon />
              </button>
            </div>

            {/* Folders List */}
            {foldersExpanded && (
              <div className="space-y-1">
                {folders.length === 0 ? (
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 italic px-2 py-1">
                    No folders yet
                  </p>
                ) : (
                  folders.map((folder) => (
                    <div
                      key={folder.id}
                      className={`w-full rounded-lg transition-all duration-200 ${activeTab === "folder" && activeFolderId === folder.id
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                    >
                      <div className="flex items-center">
                        <button
                          className="flex-1 py-2.5 sm:py-2 px-3 text-left text-xs sm:text-sm flex items-center min-w-0 min-h-[44px]"
                          onClick={() => {
                            onTabChange("folder", folder.id);
                            onClose?.();
                          }}
                        >
                          <div className="flex items-center min-w-0 flex-1">
                            <div
                              className="w-3 h-3 rounded-sm mr-2 flex-shrink-0"
                              style={{ backgroundColor: folder.color }}
                            />
                            <span className="truncate">{folder.name}</span>
                          </div>
                          {folder.contentCount > 0 && (
                            <span className="ml-2 text-xs bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded-full">
                              {folder.contentCount}
                            </span>
                          )}
                        </button>
                        {(onEditFolder || onDeleteFolder) && (
                          <div className="flex items-center gap-1 mr-1 sm:mr-2">
                            {onEditFolder && (
                              <button
                                onClick={e => { e.stopPropagation(); onEditFolder(folder.id, folder); }}
                                className="p-2 text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900 hover:text-green-700 dark:hover:text-green-300 hover:bg-green-200 dark:hover:bg-green-800 rounded transition-colors border border-green-300 dark:border-green-700 min-w-[44px] min-h-[44px] flex items-center justify-center"
                                title="Edit folder"
                              >
                                <EditIcon />
                              </button>
                            )}
                            {onDeleteFolder && (
                              <button
                                onClick={e => { e.stopPropagation(); onDeleteFolder(folder.id); }}
                                className="p-2 text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 rounded transition-colors border border-red-300 dark:border-red-700 min-w-[44px] min-h-[44px] flex items-center justify-center"
                                title="Delete folder"
                              >
                                <XIcon />
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
