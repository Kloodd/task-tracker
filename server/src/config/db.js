import sql from "mssql/msnodesqlv8.js";
import dotenv from "dotenv";

dotenv.config();

const config = {
    connectionString:
        `Driver={ODBC Driver 17 for SQL Server};` +
        `Server=${process.env.DB_SERVER};` +
        `Database=${process.env.DB_DATABASE};` +
        `Trusted_Connection=Yes;` +
        `TrustServerCertificate=Yes;`
};

const poolPromise = sql.connect(config)
    .then((pool) => {
        console.log("Connected to SQL Server");
        return pool;
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
        throw error;
    });

export { sql, poolPromise };