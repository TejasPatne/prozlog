// library imports
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

// file imports
import router from "./routes/index.js";
import { PORT } from "./config/env.js";
import { connectToDB } from "./config/db.js";

const app = express();

// database connection
connectToDB();

// middlewares
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/v1", router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})