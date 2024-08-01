import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        min: 8,
        max: 20,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, { 
    timestamps: true, 
    toJSON: {
        versionKey: false,
        transform(doc, ret) {
            delete ret.__v;
            delete ret.password;
            delete ret.updatedAt;
        }
    }
 });

const User = mongoose.model("User", userSchema);
export default User;