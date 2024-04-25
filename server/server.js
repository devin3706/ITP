import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import router from './router/exam/route.js';
import bodyParser from 'body-parser';
import teacherRouter from './router/teacher/teacherRoutes.js';
import { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import expressValidator from 'express-validator';
import adminRoutes from './router/admin/admin.js';
import studyMaterialRoutes from './router/study materials/routes.js';
import userRoutes from './router/student support/UserRoutes.js';
import inquiryRoutes from './router/student support/InquiryRoutes.js';
import { upload } from './middleware/study materials/multer.js';
import studentRoutes from './router/student management/routes.js';
import payerRoutes from './router/payment management/payers.js';
import workoutRoutes from './router/payment management/workouts.js';
import announcementRoutes from './router/announcement handling/announcement.js';
import classRoutes from './router/class scheduling/class.js';

// Import connection file
import connect from './database/conn.js';

// Conditional imports based on environment
let http;

if (parseInt(process.versions.node.split('.')[0]) >= 13) {
  // If using Node.js version 13 or higher, use ES modules
  import('http').then(module => {
    http = module.default;
    startServer();
  }).catch(err => {
    console.error('Error importing http module:', err);
  });
} else {
  // If using Node.js version lower than 13, use CommonJS
  const httpModule = require('http');
  http = httpModule.default || httpModule;
  startServer();
}

// Function to start the server
function startServer() {
  const app = express();

  // App middleware
  app.use(morgan('dev'));
  app.use(cors({
    origin: true,
    credentials: true
}));
  app.use(express.json());
  app.use(bodyParser.json());
  config();
  app.use("/files", express.static("files"));

  // Devin Middleware
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(expressValidator());

  //Tharushi Middleware
  app.use("/files", express.static("files"));
  app.use(router);

  // Application port
  const port = process.env.PORT || 8080;

  // Pahan routes
  app.use('/api', router); // API

  app.get('/', (req, res) => {
    try {
      res.json("Get Request");
    } catch (error) {
      res.json(error);
    }
  });

  // Chathumina Routes
  app.use('/teacher', teacherRouter);

  // Devin Routes
  app.use("/", adminRoutes);

  // Tharushi Routes
  app.use('/studyMaterial', studyMaterialRoutes);

  // Sansala Routes
  app.use('/users', userRoutes);
  app.use('/inquiry', inquiryRoutes);

  // Minesi Routes
  app.use('/student', studentRoutes);

  //Nuradha Routes
  app.use('/payers', payerRoutes);
  app.use('/workouts', workoutRoutes);

  //Jimutha Routes
  app.use('/announcements', announcementRoutes);
  app.use('/class', classRoutes);

  // Start server only when valid connection
  connect().then(() => {
    try {
      const server = http.createServer(app);
      server.listen(port, () => {
        console.log(`Server connected to http://localhost:${port}`);
      });
    } catch (error) {
      console.log("Cannot connect to the server");
    }
  }).catch(error => {
    console.log("Invalid Database Connection");
  });
}
