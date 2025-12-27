# 🧠 MindVault

**Your Second Brain, Organized** - A modern web application for organizing and managing your digital content including YouTube videos, tweets, documents, images, and notes.

![MindVault](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

- 📝 **Content Management** - Store YouTube videos, Twitter posts, documents, images, and text notes
- 📁 **Folder Organization** - Organize content with customizable colored folders
- 🔍 **Smart Filtering** - Filter content by type or folder
- 🌓 **Dark Mode** - Full dark mode support with smooth transitions
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- 🔐 **Secure Authentication** - JWT-based user authentication with bcrypt password hashing
- 🔗 **Content Sharing** - Share your entire brain with a unique link
- ✏️ **Edit & Delete** - Full CRUD operations on content and folders
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations

## 🚀 Tech Stack

### Frontend
- **React 19** with TypeScript
- **Tailwind CSS v4** for styling
- **Vite** for blazing fast development
- **React Router** for navigation
- **Axios** for API requests
- **Context API** for theme management

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcrypt** for password hashing
- **CORS** enabled for cross-origin requests

## 📁 Project Structure

```
MindVault/
├── backend/                 # Backend server
│   ├── src/
│   │   ├── app.ts          # Main application file
│   │   ├── db.ts           # Database models
│   │   ├── dbconnection.ts # MongoDB connection
│   │   ├── middleware.ts   # Authentication middleware
│   │   └── utils.ts        # Utility functions
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example        # Environment variables template
│
├── frontend/               # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React context providers
│   │   ├── icons/          # SVG icon components
│   │   ├── Pages/          # Page components
│   │   ├── App.tsx         # Main App component
│   │   └── main.tsx        # Entry point
│   ├── public/
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
├── .gitignore
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/MindVault.git
cd MindVault
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your configuration:
# MONGO_URL=mongodb://localhost:27017/mindvault
# JWT_SECRET=your-super-secret-jwt-key-change-this
# PORT=8000

# Build TypeScript
npm run build

# Start the server
npm start

# For development (with auto-reload)
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`

## 🌐 Deployment

### Deploy to Vercel (Recommended for Frontend)

#### Frontend Deployment

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Update API URL**
   - Create `frontend/.env.production`:
```env
VITE_API_URL=https://your-backend-url.vercel.app
```

3. **Deploy Frontend**
```bash
cd frontend
vercel --prod
```

4. **Or Deploy via GitHub**
   - Push code to GitHub
   - Import project on vercel.com
   - Select `frontend` as root directory
   - Add environment variables
   - Deploy

#### Backend Deployment Options

**Option 1: Vercel (Serverless)**
1. Create `backend/vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/app.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/app.ts"
    }
  ]
}
```

2. Deploy:
```bash
cd backend
vercel --prod
```

**Option 2: Railway (Recommended for Backend)**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
cd backend
railway login
railway init
railway up
```

**Option 3: Render**
1. Create account on render.com
2. New Web Service → Connect GitHub repo
3. Build Command: `cd backend && npm install && npm run build`
4. Start Command: `cd backend && npm start`
5. Add environment variables

### Environment Variables for Production

**Backend:**
- `MONGO_URL` - MongoDB connection string (use MongoDB Atlas)
- `JWT_SECRET` - Secret key for JWT
- `PORT` - Server port (default: 8000)
- `NODE_ENV` - Set to `production`

**Frontend:**
- `VITE_API_URL` - Your backend API URL

## 📝 API Endpoints

### Authentication
- `POST /api/v1/signup` - Register new user
- `POST /api/v1/signin` - Login user

### Content
- `GET /api/v1/content` - Get all content
- `POST /api/v1/content` - Create new content
- `PUT /api/v1/content/:id` - Update content
- `DELETE /api/v1/content/:id` - Delete content

### Folders
- `GET /api/v1/folders` - Get all folders
- `POST /api/v1/folders` - Create new folder
- `PUT /api/v1/folders/:id` - Update folder
- `DELETE /api/v1/folders/:id` - Delete folder

### Brain Sharing
- `POST /api/v1/brain/share` - Toggle brain sharing
- `GET /api/v1/brain/:shareLink` - View shared brain
- `GET /api/v1/brain/share/status` - Check sharing status

## 🎨 Features in Detail

### Content Types
- **YouTube** - Save and embed YouTube videos
- **Twitter** - Embed Twitter posts
- **Documents** - Store links to documents
- **Images** - Display images inline
- **Text Notes** - Rich text notes

### Folder Management
- Create custom folders with color coding
- Move content between folders
- Delete folders (content moves to root)
- Real-time folder count updates

### Dark Mode
- System-wide dark mode toggle
- Persistent theme preference
- Smooth transitions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Himanshu**

## 🙏 Acknowledgments

- Icons from Heroicons
- UI inspiration from modern web apps
- Built with ❤️ using React and Node.js

---

**Made with 🧠 and ☕ by Himanshu**

### 1. Sign Up / Sign In
- Navigate to http://localhost:3000
- You'll be redirected to signin page if not authenticated
- Create a new account or sign in with existing credentials

### 2. Add Content
- Click "Add Content" button
- Select content type (YouTube or Twitter)
- Enter a title and paste the link
- Click "Add" to save

### 3. Manage Content
- View all content in a grid layout
- Filter by content type using the sidebar
- Click the "X" button to delete content
- Click the share icon to copy link

### 4. Share Your Brain
- Click "Share Brain" to generate a shareable link
- Share the link with others
- Click "Unshare Brain" to revoke access
- Shared brains are publicly accessible

## Project Structure
```
MindVault/
├── backend/
│   ├── src/
│   │   ├── app.ts          # Main server file
│   │   ├── db.ts           # Database models
│   │   ├── dbconnection.ts # Database connection
│   │   └── utils.ts        # Utility functions
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── Pages/          # Page components
│   │   ├── icons/          # Icon components
│   │   └── main.tsx        # App entry point
│   └── package.json
└── README.md
```

## Troubleshooting

### Common Issues
1. **CORS errors**: Backend includes CORS middleware
2. **Database connection**: Ensure MongoDB is running
3. **Port conflicts**: Backend uses 8000, frontend uses 3000
4. **Token issues**: Clear localStorage and sign in again

### Development Tips
1. Use browser dev tools to debug API calls
2. Check browser console for errors
3. Monitor network tab for failed requests
4. Backend logs appear in terminal

## Next Steps / Future Enhancements
- [ ] Add tags and categories
- [ ] Implement search functionality
- [ ] Add user profiles
- [ ] Support more content types (documents, images)
- [ ] Add content folders/organization
- [ ] Implement real-time collaboration
- [ ] Add export/import features

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---
Enjoy building your second brain with MindVault! 🧠✨