import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { sql, poolPromise } from "../config/db.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        //Validation
        if (!username || !password) {
            return res.status(400).json({
                message: "Please provide username and password"
            });
        }

        if (username.length > 50) {
            return res.status(400).json({
                message: "Username must be less than 50 characters"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long"
            });
        }

        const pool = await poolPromise;

        //Check if user already exists
        const existingUser = await pool
            .request()
            .input("username", sql.VarChar(50), username)
            .query(`
                SELECT Id 
                FROM Users 
                WHERE username = @username
            `);

        if (existingUser.recordset.length > 0) {
            return res.status(400).json({
                message: "Username already exists"
            });
        }

        //Hash password
        const passwordHash = await bcrypt.hash(password, 10);
        
        //Create user
        await pool
        .request()
        .input("username", sql.VarChar(50), username)
        .input("passwordHash", sql.VarChar(255), passwordHash)
        .query(`
            INSERT INTO Users (username, passwordHash)
            VALUES (@username, @passwordHash)
        `);

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({
            message: "Registration Failed."
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        //Validation
        if (!username || !password) {
            return res.status(400).json({
                message: "Please provide username and password"
            });
        }

        const pool = await poolPromise;

        //Check if user exists
        const result = await pool
            .request()
            .input("username", sql.VarChar(50), username)
            .query(`
                SELECT Id, username, passwordHash
                FROM Users
                WHERE username = @username
            `);

        if (result.recordset.length === 0) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        const user = result.recordset[0];

        //Verify password
        const passwordMatch = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        //Generate JWT
        const token = jwt.sign(
            {
                userId: user.Id,
                username: user.username
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login successful",
            token
        });
        
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
            message: "Login Failed."
        });
    }
});

export default router;