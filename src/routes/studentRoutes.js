
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/students.json");

// Obtener los estudiantes almacenados
function getStudents() {
    const data = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(data || "[]");
}

// Guardar estudiantes
function saveStudents(students) {
    fs.writeFileSync(
        dataPath,
        JSON.stringify(students, null, 2)
    );
}

// Consultar todos los estudiantes
router.get("/", (req, res) => {
    const students = getStudents();

    res.status(200).json({
        total: students.length,
        students
    });
});

// Registrar un estudiante
router.post("/", (req, res) => {
    const { name, email, course } = req.body;

    const students = getStudents();

    const newStudent = {
        id: Date.now().toString(),
        name,
        email,
        course,
        createdAt: new Date().toISOString()
    };

    students.push(newStudent);
    saveStudents(students);

    res.status(201).json({
        message: "Estudiante registrado correctamente",
        student: newStudent
    });
});

module.exports = router;
