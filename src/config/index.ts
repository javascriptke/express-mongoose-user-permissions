import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT!;
const DB_URL = process.env.DB_URL!;

export default Object.freeze({ PORT, DB_URL });
export { PORT, DB_URL };
