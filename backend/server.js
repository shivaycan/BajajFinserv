const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Helper function to check if the input is a number
const isNumber = (val) => !isNaN(val);

// Helper function to validate Base64 file input
const isValidBase64 = (str) => {
  try {
    return Buffer.from(str, 'base64').toString('base64') === str;
  } catch (error) {
    return false;
  }
};

// Route: Root Route ("/")
app.get('/', (req, res) => {
  res.send('Welcome to the BFHL API. Use /bfhl for GET/POST requests.');
});

// POST Route: /bfhl
app.post('/bfhl', (req, res) => {
  const { data = [], file_b64 = "" } = req.body;

  // Extract numbers and alphabets from the input array
  const numbers = data.filter(isNumber);
  const alphabets = data.filter(val => /^[a-zA-Z]$/.test(val));

  // Extract the highest lowercase alphabet
  const lowercaseAlphabets = alphabets.filter(val => val === val.toLowerCase());
  const highestLowercaseAlphabet = lowercaseAlphabets.length ? [lowercaseAlphabets.sort().pop()] : [];

  // File handling logic
  let file_valid = false;
  let file_mime_type = '';
  let file_size_kb = 0;

  if (file_b64) {
    file_valid = isValidBase64(file_b64);
    if (file_valid) {
      const fileBuffer = Buffer.from(file_b64, 'base64');
      file_mime_type = 'application/octet-stream'; // Replace with the appropriate file MIME type if necessary
      file_size_kb = (fileBuffer.length / 1024).toFixed(2); // Convert bytes to KB
    }
  }

  // Response payload
  const response = {
    is_success: true,
    user_id: "shivay_garg_14062002", // Format: fullname_dob
    email: "shivaygarg65@gmail.com",
    roll_number: "RA2111026030110", // Replace with your actual roll number
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
    file_valid,
    file_mime_type,
    file_size_kb
  };

  // Send the response
  res.json(response);
});

// GET Route: /bfhl
app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
