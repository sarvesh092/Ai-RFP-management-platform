import express from "express";
import cors from "cors";
import rfpRoutes from "./routes/rfp.routes.js";
import vendorRoutes from "./routes/vendor.routes.js";
import proposalRoutes from "./routes/proposal.route.js";
import emailRoutes from "./routes/email.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/rfp", rfpRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/proposal", proposalRoutes);
app.use("/api/email", emailRoutes);

export default app;