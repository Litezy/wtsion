import express from "express";
import { sequelize } from "../config/database.js";
import { successResponse, errorResponse } from "../error/errorResponses.js";

const healthrouter = express.Router();

healthrouter.get("/", async (req, res) => {
  try {
    // Check database connection
    await sequelize.authenticate();

    // Get database info
    const dbInfo = await sequelize.query("SELECT VERSION() as version", {
      type: sequelize.QueryTypes.SELECT,
    });

    // System uptime
    const uptime = process.uptime();
    const uptimeFormatted = Math.floor(uptime / 60) + " minutes";

    const healthData = {
      status: "OK",
      timestamp: new Date().toISOString(),
      uptime: uptimeFormatted,
      database: {
        status: "Connected",
        version: dbInfo[0].version,
      },
      memory: {
        used:
          Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + " MB",
        total:
          Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + " MB",
      },
      environment: process.env.NODE_ENV || "development",
    };

    return successResponse(res, 200, "wTSION Server is running", healthData);
  } catch (error) {
    const errorData = {
      status: "ERROR",
      timestamp: new Date().toISOString(),
      database: {
        status: "Disconnected",
        error: error.message,
      },
      environment: process.env.NODE_ENV || "development",
    };

    return errorResponse(res, 500, "Server health check failed", errorData);
  }
});

export default healthrouter;
