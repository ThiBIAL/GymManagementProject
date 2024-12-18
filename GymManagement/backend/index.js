import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import cors from 'cors';
import bodyParser from 'body-parser';
import { sequelize } from './models/index.js';
import authRoutes from './routes/auth.js';
import memberRoutes from './routes/members.js';
import courseRoutes from './routes/courses.js';
import subscriptionTypeRoutes from './routes/subscriptionTypes.js';
import userSubscriptionRoutes from './routes/userSubscriptions.js';
import foodMonitoringRoutes from './routes/FoodMonitoring.js';
import './models/associations.js';
import './models/association.js';


// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Img path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/src/assets', express.static(path.join(__dirname, 'src/assets')));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test DB connection
sequelize
    .authenticate()
    .then(() => console.log('Database connected...'))
    .catch((err) => console.log('Error: ' + err));

// Synchronize models with the database
sequelize
    .sync({ alter: true }) // Change to { force: true } only if you want to reset the DB
    .then(() => console.log('Database synced!'))
    .catch((err) => console.log('Database sync error:', err));

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/subscription-types', subscriptionTypeRoutes);
app.use('/api/user-subscriptions', userSubscriptionRoutes);
app.use('/api/food-monitoring', foodMonitoringRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
        const errors = err.errors.map((error) => error.message);
        return res.status(400).json({ error: errors });
    }
    return res.status(500).json({ error: 'An unexpected error occurred', details: err.message });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
