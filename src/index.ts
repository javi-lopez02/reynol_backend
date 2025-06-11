import express from "express";
import cors from "cors";
import morgan from "morgan";
import * as dotenv from "dotenv";
import users from "./Routes/user.routes"

dotenv.config();

const app = express();
const port = 3000;

app.use(
  cors({
    origin: [
      "http://localhost:4173",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.use("/users", users);

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
