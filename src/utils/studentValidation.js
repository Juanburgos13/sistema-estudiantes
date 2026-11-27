
function validateStudent(student) {
    const errors = {};

    if (!student.name || student.name.trim() === "") {
        errors.name = "El nombre es obligatorio";
    }

    if (!student.email || student.email.trim() === "") {
        errors.email = "El correo electrónico es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email)) {
        errors.email = "El correo electrónico no es válido";
    }

    if (!student.age || Number(student.age) <= 0) {
        errors.age = "La edad debe ser mayor que cero";
    }

    if (!student.studentId || student.studentId.trim() === "") {
        errors.studentId = "La matrícula es obligatoria";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

module.exports = { validateStudent };
