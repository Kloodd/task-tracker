import express from "express";
import { sql, poolPromise } from "../config/db.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
    try {
        const pool = await poolPromise;

        const result = await pool.request()
            .input("CreatedBy", sql.Int, req.user.userId)
            .query(`
                SELECT *
                FROM Tasks
                WHERE CreatedBy = @CreatedBy
                ORDER BY CreatedAt DESC
            `);

        res.json(result.recordset);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch tasks"
        });
    }
});

router.post("/", authenticateToken, async (req, res) => {
    try {
        const { Title, Description, Status, DueDate } = req.body;

        if (!Title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const pool = await poolPromise;
        const result = await pool.request()
            .input("Title", sql.NVarChar(255), Title)
            .input("Description", sql.NVarChar(sql.MAX), Description || null)
            .input("Status", sql.NVarChar(50), Status || "Pending")
            .input("DueDate", sql.DateTime, DueDate || null)
            .input("CreatedBy", sql.Int, req.user.userId)
            .query(`
                INSERT INTO Tasks
                    (Title, Description, Status, DueDate, CreatedBy, CreatedAt, UpdatedAt)
                OUTPUT INSERTED.*
                VALUES
                    (@Title, @Description, @Status, @DueDate, @CreatedBy, GETDATE(), GETDATE());
            `);

        res.status(201).json({
            message: "Task created successfully",
            taskId: result.recordset[0].Id
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create task"
        });
    }
});

export default router;