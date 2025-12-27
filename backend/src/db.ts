import mongoose, { model, Schema } from 'mongoose';



const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: String,
});

export const UserModel = model("User", UserSchema);

const FolderSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    color: { type: String, default: '#3B82F6' }, // Default blue color
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: { type: Date, default: Date.now },
});

export const FolderModel = model('Folder', FolderSchema);

const ContentSchema = new Schema({
    title: String,
    link: String,
    type : String,
    text: String, // New field for text content
    folderId: {
        type: mongoose.Types.ObjectId,
        ref: 'Folder',
        default: null // null means not in any folder (root level)
    },
    tags: [{
        type: mongoose.Types.ObjectId,
        ref: 'Tag'
    }],
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: { type: Date, default: Date.now },
});

export const ContentModel = model('Content', ContentSchema);

const LinkSchema = new Schema({
    hash: String,
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    }
});

export const LinkModel = model('Links', LinkSchema);
