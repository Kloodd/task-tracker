import express from "express";
import cors from "cors";
import dotenv from "dotenv";


import { poolPromise } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";
import {authenticateToken} from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Task Tracker API is running"
    });
});

app.get("/api/test-db", async (req, res) => {
    try {
        const pool = await poolPromise;

        const result = await pool
            .request()
            .query(`
                SELECT TABLE_NAME
                FROM INFORMATION_SCHEMA.TABLES
                WHERE TABLE_NAME IN ('Users', 'Tasks')
            `);

        res.json(result.recordset);
    } catch (error) {
        console.error("Database query failed:", error);
        res.status(500).json({
            error: "Database query failed"
        });
    }
});

app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({
        message: "You have accessed a protected route",
        user: req.user
    });
});

app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);

    try {
        await poolPromise;
    } catch (error) {
        console.error("Could not connect to database.");
    }
});