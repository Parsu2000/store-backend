// DNS override to prevent querySrv ECONNREFUSED issues on Windows
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Health Check Route
app.get('/api/status', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Store API is running',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});