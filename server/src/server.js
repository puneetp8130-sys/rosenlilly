import mongoose from 'mongoose';
import app from './app.js';
import { config } from './config/env.js';
import connectDatabase from './config/database.js';

/**
 * Startup flow:
 * 1. Load environment (done via config/env.js import)
 * 2. Connect to MongoDB
 * 3. Start Express server
 */
const startServer = async () => {
  try {
    // Connect to MongoDB before accepting HTTP requests
    await connectDatabase();

    const server = app.listen(config.port, () => {
      console.log(
        `Rosenlilly API running in ${config.nodeEnv} mode on port ${config.port}`
      );
    });

    // Graceful server shutdown
    const gracefulShutdown = (signal) => {
      console.log(
        `Received ${signal}. Gracefully shutting down Rosenlilly API server...`
      );
      server.close(async () => {
        console.log('Rosenlilly API HTTP server closed successfully.');
        try {
          await mongoose.connection.close();
          console.log('MongoDB connection closed.');
        } catch (err) {
          console.error('Error closing MongoDB connection:', err.message);
        }
        process.exit(0);
      });

      // Force shutdown after timeout if pending connections hang
      setTimeout(() => {
        console.error('Forced shutdown due to timeout.');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
