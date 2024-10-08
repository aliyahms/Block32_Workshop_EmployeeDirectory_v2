// Import express library
const express = require("express");
// Define express Router
const router = express.Router();
// Export employees router
module.exports = router;

// Emplolyees database
const employees = require("../data/employees");

// All routes/endpoints

router.get("/", (req, res) => {
  res.json(employees);
});

router.get("/random", (req, res) => {
  const i = Math.floor(Math.random() * employees.length);
  res.json(employees[i]);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).send(`There is no employee with id ${id}.`);
  }
});

router.post("/new", (req, res) => {
  const { name } = req.body;

  // Validate that the name is provided and is a non-empty string
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Invalid or missing name" });
  }

  // Create a new employee object with a unique ID
  const newEmployee = {
    id: uuidv4(), // Generate a unique ID
    name: name.trim(),
  };

  // Add the new employee to the array
  employees.push(newEmployee);

  // Return the created employee object
  res.status(201).json(newEmployee);
});
