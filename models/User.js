import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            maxlength: 30,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            maxlength: 50,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        fullName: {
            type: String,
            required: true,
            maxlength: 50,
        },
        address: {
            type: String,
            maxlength: 100,
        },
        phoneNumber: {
            type: String,
            maxlength: 15,
        },
        profileImage: {
            type: String,
            default: 'default-avatar.jpg',
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);