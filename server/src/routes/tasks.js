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

router.get("/report", authenticateToken, async (req, res) => {
    try {
        const pool = await poolPromise;

        const result = await pool.request()
            .input("CreatedBy", sql.Int, req.user.userId)
            .query(`
                SELECT
                    COUNT(*) AS TotalTasks,

                    SUM(CASE
                        WHEN Status = 'Pending' THEN 1
                        ELSE 0
                    END) AS PendingTasks,

                    SUM(CASE
                        WHEN Status = 'In Progress' THEN 1
                        ELSE 0
                    END) AS InProgressTasks,

                    SUM(CASE
                        WHEN Status = 'Completed' THEN 1
                        ELSE 0
                    END) AS CompletedTasks,

                    SUM(CASE
                    WHEN CAST(DueDate AS DATE) < CAST(GETDATE() AS DATE)
                            AND Status <> 'Completed'
                        THEN 1
                        ELSE 0
                    END) AS OverdueTasks

                FROM Tasks
                WHERE CreatedBy = @CreatedBy
            `);

        res.json(result.recordset[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to generate task report"
        });
    }
});

router.get("/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;

        const pool = await poolPromise;

        const result = await pool.request()
            .input("Id", sql.Int, id)
            .input("CreatedBy", sql.Int, req.user.userId)
            .query(`
                SELECT *
                FROM Tasks
                WHERE Id = @Id AND CreatedBy = @CreatedBy
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json(result.recordset[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch task"
        });
    }
});

router.put("/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { Title, Description, Status, DueDate } = req.body;

        if (!Title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const pool = await poolPromise;
        const result = await pool.request()
            .input("Id", sql.Int, id)
            .input("Title", sql.NVarChar(255), Title)
            .input("Description", sql.NVarChar(sql.MAX), Description || null)
            .input("Status", sql.NVarChar(50), Status || "Pending")
            .input("DueDate", sql.DateTime, DueDate || null)
            .input("CreatedBy", sql.Int, req.user.userId)
            .query(`
                UPDATE Tasks
                SET
                    Title = @Title,
                    Description = @Description,
                    Status = @Status,
                    DueDate = @DueDate,
                    UpdatedAt = GETDATE()
                OUTPUT INSERTED.*
                WHERE Id = @Id
                AND CreatedBy = @CreatedBy
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task updated successfully",
            taskId: result.recordset[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update task"
        });
    }
});

router.delete("/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;

        const pool = await poolPromise;

        const result = await pool.request()
            .input("Id", sql.Int, id)
            .input("CreatedBy", sql.Int, req.user.userId)
            .query(`
                DELETE FROM Tasks
                WHERE Id = @Id
                AND CreatedBy = @CreatedBy
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete task"
        });
    }
});


export default router;