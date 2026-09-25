import express from "express";
import { sql, poolPromise } from "../config/db.js";
import {authenticateToken} from "../middleware/authMiddleware.js";

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

export default router;