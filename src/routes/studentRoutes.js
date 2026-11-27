
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { validateStudent } = require("../utils/studentValidation");

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

router.put("/:id", (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, course } = req.body;

        const students = getStudents();
        const studentIndex = students.findIndex(
            student => student.id === id
        );

        if (studentIndex === -1) {
            return res.status(404).json({
                message: "Estudiante no encontrado"
            });
        }

        if (!name || !email || !course) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios"
            });
        }

        students[studentIndex] = {
            ...students[studentIndex],
            name,
            email,
            course,
            updatedAt: new Date().toISOString()
        };

        saveStudents(students);

        res.status(200).json({
            message: "Estudiante actualizado correctamente",
            student: students[studentIndex]
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el estudiante"
        });
    }
});

router.delete("/:id", (req, res) => {
    try {
        const { id } = req.params;
        const students = getStudents();

        const studentIndex = students.findIndex(
            student => student.id === id
        );

        if (studentIndex === -1) {
            return res.status(404).json({
                message: "Estudiante no encontrado"
            });
        }

        const deletedStudent = students.splice(studentIndex, 1)[0];

        saveStudents(students);

        res.status(200).json({
            message: "Estudiante eliminado correctamente",
            student: deletedStudent
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el estudiante"
        });
    }
});

// Registrar un estudiante
router.post("/", (req, res) => {
    const { name, email, course } = req.body;

    const { isValid, errors } = validateStudent({ name, email, course });

    if (!isValid) {
        return res.status(400).json({
            message: "Datos inválidos",
            errors
        });
    }

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
