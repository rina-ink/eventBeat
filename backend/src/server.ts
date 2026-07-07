import express from "express";
import cors from "cors";

import connectDB from "./dbinit.ts";

import eventRoutes from "./routes/eventRoutes.ts";

const app = express();

const port = process.env.PORT || 3001;

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/events", eventRoutes);

app.get("/", (req, res) => {
    res.send("EventBeat API is running");
});

app.listen(port, () => {
    console.log(`EventBeat API listening on port ${port}`);
});