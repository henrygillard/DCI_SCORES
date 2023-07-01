const express = require("express");
const app = express();
const port = 3000;

// Add your routes and middleware here
const apiRoutes = require("./routes/api");

app.use("/", apiRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
