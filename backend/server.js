const express = require("express"); // imports Express framework for Node.js
const cors = require("cors"); // imports CORS middleware

const app = express(); // creates Express application
const PORT = 5001; // sets the port server will run on

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ message: "memii backend is running ♡" });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});