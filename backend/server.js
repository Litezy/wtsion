import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import fileUpload from 'express-fileupload';
import { sequelize } from './config/database.js';
import UserRouter from './routes/userRoutes.js';
import healthrouter from './routes/healthcheck.js';

dotenv.config();

const app = express();

// Initialize database connection
const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('🗄️  MySQL Connected successfully');

    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: false });
      console.log('📊 Database synced');
    } else {
      await sequelize.sync();
    }
  } catch (error) {
    console.error('❌ MySQL connection error:', error.message);
    process.exit(1);
  }
};

initDatabase();

// Security middleware
app.use(helmet());
app.use(compression());

// CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://wtsion.com', 'www.wtsion.com']
    : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  credentials: true
}));

// File upload middleware
app.use(fileUpload({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  abortOnLimit: true,
  responseOnLimit: 'File too large',
  parseNested: true, // Parse nested objects
  useTempFiles: false, // Keep files in memory
  debug: process.env.NODE_ENV === 'development', 
}));

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('combined'));

// Routes
app.use('/api/health', healthrouter);
app.use('/api/users', UserRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'wTSION API Server',
    version: '1.0.0',
    status: 'running'
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5003;

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('👋 Received SIGINT, closing database connection...');
  await sequelize.close();
  console.log('🔒 Database connection closed');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('👋 Received SIGTERM, closing database connection...');
  await sequelize.close();
  console.log('🔒 Database connection closed');
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Environment: ${process.env.NODE_ENV}`);
  console.log(`🌐 API Base URL: http://localhost:${PORT}/api`);
});