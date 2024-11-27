const StudentService = require("../services/studentServices");

class StudentController {
  // Create a new student
 static async createStudent(req, res) {
    try {
      const student = req.body;
      const result = await StudentService.createStudent(student);
      res.status(201).send({ message: "Student Created Successfully", StudentId: result.insertedId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get all students
 static async getAllStudent(req, res) {
    try {
      const students = await StudentService.getAllStudents();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get a student by ID
  static async getStudentById(req, res) {
    try {
      const student = await StudentService.getStudentById(req.params.id);
      if (!student) {
        return res.status(404).json({ success: false, error: "Student not found" });
      }
      res.status(200).json({ success: true, student });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete a student by ID
  static async deleteStudentById(req, res) {
    try {
      const result = await StudentService.deleteStudentById(req.params.id);
      if (result.deletedCount === 0) {
        return res.status(404).json({ success: false, message: "Student not found" });
      }
      res.status(200).json({ success: true, message: "Student deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // Update a student
  static async updateStudent(req, res) {
    try {
      const result = await StudentService.updateStudent(req.params.id, req.body);
      if (result.matchedCount === 0) {
        return res.status(404).json({ success: false, message: "Student not found" });
      }
      res.status(200).json({ success: true, message: "Student updated successfully", result });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = StudentController;
