import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Notification, useNotification } from '../components/Notification';

interface SharedContent {
  id: string;
  link?: string;
  text?: string;
  title: string;
  type: "youtube" | "twitter" | "text" | "document" | "image";
  folderId?: string;
  folder?: {
    id: string;
    name: string;
    color: string;
  } | null;
}

interface SharedFolder {
  id: string;
  name: string;
  color: string;
  description?: string;
}

export function SharedBrainPage() {
  const { sharelink } = useParams<{ sharelink: string }>();
  const [contents, setContents] = useState<SharedContent[]>([]);
  const [folders, setFolders] = useState<SharedFolder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [owner, setOwner] = useState<string>("");
  const { notification, showNotification, hideNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSharedBrain = async () => {
      try {
        if (!sharelink) {
          setError("Invalid share link");
          setLoading(false);
          return;
        }

        console.log("Fetching shared brain for link:", sharelink);
        const res = await axios.get(`http://localhost:8000/api/v1/brain/${sharelink}`);
        console.log("Shared brain response:", res.data);
        
        setContents(res.data.contents || []);
        setFolders(res.data.folders || []);
        setOwner(res.data.owner || "Unknown User");
        setError(null);
      } catch (err: any) {
        console.error("Error fetching shared brain:", err);
        if (err.response?.status === 404) {
          setError("This shared brain doesn't exist or has been unshared.");
        } else {
          setError(err.response?.data?.message || "Failed to fetch shared brain");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSharedBrain();
  }, [sharelink]);

  // Filter contents based on selected folder
  const filteredContents = useMemo(() => {
    console.log('Filtering contents:', {
      selectedFolder,
      totalContents: contents.length,
      contents: contents.map(c => ({ 
        id: c.id, 
        folderId: c.folderId, 
        title: c.title, 
        folderIdType: typeof c.folderId 
      }))
    });
    
    if (selectedFolder === null) {
      // Root level content - no folder assigned
      const rootContents = contents.filter(content => 
        !content.folderId || 
        content.folderId === null || 
        content.folderId === '' ||
        content.folderId === undefined ||
        content.folderId === 'null'
      );
      console.log('Root contents:', rootContents.length, rootContents.map(c => c.title));
      return rootContents;
    } else {
      // Content in specific folder - match folder ID as string
      const folderContents = contents.filter(content => 
        content.folderId && 
        content.folderId.toString() === selectedFolder.toString()
      );
      console.log(`Folder ${selectedFolder} contents:`, folderContents.length, folderContents.map(c => c.title));
      return folderContents;
    }
  }, [contents, selectedFolder]);

  // Get current folder info
  const currentFolder = selectedFolder ? folders.find(f => f.id === selectedFolder) : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-lg font-medium">Loading shared brain...</div>
          <div className="text-gray-500 mt-2">Please wait while we fetch the content</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-lg font-medium mb-2">
            {error}
          </div>
          <p className="text-gray-600 mb-4">
            The link you're trying to access might be invalid or the brain might have been unshared.
          </p>
          <Button
            onClick={() => navigate("/")}
            variant="primary"
            text="Go to Dashboard"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {owner}'s Shared Brain
              </h1>
              <p className="text-gray-600 mt-1">
                {contents.length} items {folders.length > 0 && `• ${folders.length} folders`}
              </p>
            </div>
            <Button
              onClick={() => navigate("/")}
              variant="secondary"
              text="Go to My Dashboard"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Folders Navigation */}
        {folders.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setSelectedFolder(null)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedFolder === null
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                📁 Root ({contents.filter(c => !c.folderId).length})
              </button>
              {folders.map((folder) => {
                const folderContentCount = contents.filter(c => c.folderId === folder.id).length;
                return (
                  <button
                    key={folder.id}
                    onClick={() => setSelectedFolder(folder.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
                      selectedFolder === folder.id
                        ? 'text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={{
                      backgroundColor: selectedFolder === folder.id ? folder.color : undefined
                    }}
                  >
                    <div 
                      className="w-3 h-3 rounded-sm mr-2"
                      style={{ backgroundColor: folder.color }}
                    />
                    {folder.name} ({folderContentCount})
                  </button>
                );
              })}
            </div>
            
            {/* Current Folder Info */}
            {currentFolder && (
              <div className="bg-white p-4 rounded-lg shadow-sm border mb-4">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded mr-3"
                    style={{ backgroundColor: currentFolder.color }}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{currentFolder.name}</h3>
                    {currentFolder.description && (
                      <p className="text-sm text-gray-600">{currentFolder.description}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      {filteredContents.length} items in this folder
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {filteredContents.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {selectedFolder === null ? "No content at root level" : "No content in this folder"}
            </h3>
            <p className="text-gray-500">
              {selectedFolder === null 
                ? "This brain doesn't have any content at the root level." 
                : "This folder is empty."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredContents.map((content) => (
              <Card
                key={content.id}
                type={content.type}
                link={content.link}
                text={content.text}
                title={content.title}
                canDelete={false}
                onNotification={showNotification}
                folder={content.folder}
              />
            ))}
          </div>
        )}
      </div>
      
      <Notification
        message={notification.message}
        type={notification.type}
        show={notification.show}
        onClose={hideNotification}
      />
    </div>
  );
}
