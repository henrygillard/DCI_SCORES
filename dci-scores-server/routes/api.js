const express = require("express");
const router = express.Router();

// Define your API routes here
router.get("/api/data", (req, res) => {
  // Handle the request and send back the response
  res.json({ message: "API data response" });
});

module.exports = router;
