const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Store the keys in memory for now (use a database in production)
const keys = {};

app.use(express.json());

// Endpoint to store the key
app.post('/store-key', (req, res) => {
  const { key, expiration, userId } = req.body;
  keys[userId] = { key, expiration };
  res.status(200).send('Key stored successfully');
});

// Endpoint to validate the key
app.get('/validate-key/:userId/:key', (req, res) => {
  const { userId, key } = req.params;
  const storedKey = keys[userId];
  if (storedKey && storedKey.key === key && Date.now() < storedKey.expiration) {
    res.status(200).send('Key is valid');
  } else {
    res.status(400).send('Invalid or expired key');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
