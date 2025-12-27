// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  // Auth
  SIGNUP: `${API_URL}/api/v1/signup`,
  SIGNIN: `${API_URL}/api/v1/signin`,
  
  // Content
  CONTENT: `${API_URL}/api/v1/content`,
  
  // Folders
  FOLDERS: `${API_URL}/api/v1/folders`,
  
  // Brain Sharing
  BRAIN_SHARE: `${API_URL}/api/v1/brain/share`,
  BRAIN_SHARE_STATUS: `${API_URL}/api/v1/brain/share/status`,
  BRAIN: `${API_URL}/api/v1/brain`,
};
