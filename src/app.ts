import express from "express";
import logger from "morgan";
import { DB_URL, PORT } from "./config";
import db from "./db";
import RoleRoutes from "./routes/Role";
import UserRoutes from "./routes/User";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("combined"));

db({ DB_URL });

app.use("/roles", RoleRoutes);
app.use("/user", UserRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `);
});
