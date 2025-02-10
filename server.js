const express = require('express');
const http = require('http');

const {initSocket} = require('./utils/socket');

const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

dotenv.config();
connectDB();

const app = express();

const server = http.createServer(app);


// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

initSocket(server);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', eventRoutes);


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
