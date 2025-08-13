const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { CompareController } = require('./CompareController');
const path = require('path');
const app = express();
const upload = multer({ dest: 'uploads/' });
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});
// Health check endpoint
app.get('/', (req, res) => {
  res.send('Hello, server is alive!');
});

// XML compare endpoint
app.post('/compare', (req, res, next) => {
  upload.array('xmlfile', 10)(req, res, function (err) {
    if (err) {
      console.error('Multer error:', err);
      return res.status(500).json({ error: 'Multer error', details: err.message });
    }
    CompareController(req, res, next);
  });
});

// Global error handler for Multer/Express
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
