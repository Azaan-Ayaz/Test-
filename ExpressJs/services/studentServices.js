const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv").config();

const uri = process.env.CONNECTION_STRING;

class StudentService {
  // Connect to the database
  async connect() {
    const client = new MongoClient(uri);
    await client.connect();
    return client;
  }

  // Create a new student
  async createStudent(studentData) {
    let client;
    try {
      client = await this.connect();
      const studentCollection = client.db("studentDB").collection("students");

      // Insert the student data directly into the database
      const result = await studentCollection.insertOne(studentData);
      return result;
    } catch (error) {
      throw new Error("Failed to create student: " + error.message);
    } finally {
      if (client) {
        client.close();
      }
    }
  }

  // Get all students
  async getAllStudents() {
    let client;
    try {
      client = await this.connect();
      const studentCollection = client.db("studentDB").collection("students");

      const students = await studentCollection.find().toArray();
      return students;
    } catch (error) {
      throw new Error("Failed to retrieve students: " + error.message);
    } finally {
      if (client) {
        client.close();
      }
    }
  }

  // Get a student by ID
  async getStudentById(id) {
    let client;
    try {
      client = await this.connect();
      const studentCollection = client.db("studentDB").collection("students");

      const student = await studentCollection.findOne({ _id: new ObjectId(id) });
      return student;
    } catch (error) {
      throw new Error("Failed to retrieve student: " + error.message);
    } finally {
      if (client) {
        client.close();
      }
    }
  }

  // Delete a student by ID
  async deleteStudentById(id) {
    let client;
    try {
      client = await this.connect();
      const studentCollection = client.db("studentDB").collection("students");

      const result = await studentCollection.findOneAndDelete({ _id: new ObjectId(id) });
      return result;
    } catch (error) {
      throw new Error("Failed to delete student: " + error.message);
    } finally {
      if (client) {
        client.close();
      }
    }
  }

  // Update a student
  async updateStudent(id, studentData) {
    let client;
    try {
      client = await this.connect();
      const studentCollection = client.db("studentDB").collection("students");

      const result = await studentCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: studentData }
      );
      return result;
    } catch (error) {
      throw new Error("Failed to update student: " + error.message);
    } finally {
      if (client) {
        client.close();
      }
    }
  }
}

module.exports = new StudentService();
