// Import the Express Library
const express = require("express");
// Create the Express App
const app = express();
// Designate the port we want our server to listen on.
const PORT = 3000;

// In order to get information from request body we need to Parse it with body parsing hardware.
app.use(express.json());

// Simple logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Greeting statement for client UI on app's initial route/endpoint /
app.get("/", (req, res) => {
  res.send("Hello employees!");
});

// Employee Router imported. All routes start with /employees
app.use("/employees", require("./api/employees"));

// Default 404 catch-all middleware
app.use((req, res, next) => {
  next({ status: 404, message: "Endpoint not found." });
});

// Defualt Error handler middleware.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500);
  res.json(err.message ?? "Sorry, something went wrong!");
});

// This callback tells the app to start listening for requests. Should always be at the end of file.
app.listen(PORT, () => {
  `Listening on port ${PORT}...`;
});
