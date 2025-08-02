require('dotenv').config();
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());


const app = express();
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/tickets', require('./routes/tickets'));
app.use('/api/tickets', require('./routes/tickets'));



// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch((err) => {
  console.error('❌ MongoDB connection failed:', err);
});

// Basic route
app.get('/', (req, res) => {
  res.send('QuickDesk Backend is Running 🚀');
});

app.get('/', (req, res) => {
  res.send('✅ QuickDesk backend is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
const auth = require('./middleware/auth'); // at top

app.get('/api/protected', auth, (req, res) => {
  res.send(`Hello ${req.user.role}, your ID is ${req.user.id}`);
});
