const express = require("express");
const StudentController = require("../controllers/studentController");

const router = express.Router();

// Create a student (POST request to create new student)
router.post("/students", StudentController.createStudent);

// Get all students (GET request)
router.get("/students", StudentController.getAllStudent);

// Get a student by ID (GET request with ID as a parameter)
router.get("/students/:id", StudentController.getStudentById);

// Delete a student by ID (DELETE request with ID as a parameter)
router.delete("/students/:id", StudentController.deleteStudentById);

// Update a student (PUT or PATCH request with ID as a parameter)
router.put("/students/:id", StudentController.updateStudent); // Or use PATCH for partial updates

module.exports = router;
