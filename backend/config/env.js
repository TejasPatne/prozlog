import dotenv from "dotenv";
import path from "path"

const __dirname = path.resolve();

dotenv.config({ path: path.resolve(__dirname, 'config/.env') })

export const PORT = process.env.PORT
export const MONGO = process.env.MONGO
export const JWT_SECRET = process.env.JWT_SECRET

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export const DEFAULT_PROFILE_PIC = process.env.DEFAULT_PROFILE_PIC;