import express from "express";
import cors from "cors";
import morgan from "morgan";
import * as dotenv from "dotenv";
import users from "./Routes/user.routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      "http://localhost:4173",
      "http://localhost:5173",
      "http://localhost:5174",
      "https://reynol-frontend-m7adbx3v4-mjlopezs-projects.vercel.app",
      "http://reynol-frontend-m7adbx3v4-mjlopezs-projects.vercel.app",
      "https://reynol-frontend.vercel.app",
      "http://reynol-frontend.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));

app.use("/users", users);

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
