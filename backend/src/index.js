import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./Db/db.js";

dotenv.config();
const port = process.env.PORT || 4000;

connectDB();

app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`);
});
