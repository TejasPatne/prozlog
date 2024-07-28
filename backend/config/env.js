import dotenv from "dotenv";
import path from "path"

const __dirname = path.resolve();

dotenv.config({ path: path.resolve(__dirname, 'config/.env') })

export const PORT = process.env.PORT
export const MONGO = process.env.MONGO
export const JWT_SECRET = process.env.JWT_SECRET