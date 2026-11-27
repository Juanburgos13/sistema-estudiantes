
const studentForm = document.getElementById("studentForm");

studentForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const student = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        course: document.getElementById("course").value.trim()
    };

    try {
        const response = await fetch("/api/students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Error al registrar");
        }

        alert(result.message);
        studentForm.reset();
        loadStudents();
        console.log("Estudiante registrado:", result.student);

    } catch (error) {
        alert("Error: " + error.message);
    }
});

async function loadStudents() {
    const studentList = document.getElementById("studentList");

    try {
        const response = await fetch("/api/students");

        if (!response.ok) {
            throw new Error("No se pudieron cargar los estudiantes");
        }

        const data = await response.json();

        studentList.innerHTML = "";

        if (data.students.length === 0) {
            studentList.textContent = "No hay estudiantes registrados.";
            return;
        }

        data.students.forEach(student => {
            const card = document.createElement("div");
            card.classList.add("student-card");

            const name = document.createElement("h3");
            name.textContent = student.name;

            const email = document.createElement("p");
            email.textContent = student.email;

            const course = document.createElement("p");
            course.textContent = student.course;

            card.append(name, email, course);
            studentList.appendChild(card);
        });

    } catch (error) {
        studentList.textContent = error.message;
    }
}

loadStudents();
