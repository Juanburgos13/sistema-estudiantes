
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

            const editButton = document.createElement("button");
            editButton.textContent = "Editar";

            editButton.addEventListener("click", async () => {
                const newName = prompt("Nombre:", student.name);
                if (newName === null) return;

                const newEmail = prompt("Correo:", student.email);
                if (newEmail === null) return;

                const newCourse = prompt("Carrera:", student.course);
                if (newCourse === null) return;

                try {
                    const response = await fetch(`/api/students/${student.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            name: newName.trim(),
                            email: newEmail.trim(),
                            course: newCourse.trim()
                        })
                    });

                    const result = await response.json();

                    if (!response.ok) {
                        throw new Error(result.message);
                    }

                    alert(result.message);
                    loadStudents();
                } catch (error) {
                    alert("Error: " + error.message);
                }
            });
            
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            deleteButton.style.backgroundColor = "#dc2626";

            deleteButton.addEventListener("click", async () => {
                const confirmation = confirm(
                    `¿Seguro que deseas eliminar a ${student.name}?`
                );

                if (!confirmation) return;

                try {
                    const response = await fetch(`/api/students/${student.id}`, {
                        method: "DELETE"
                    });

                    const result = await response.json();

                    if (!response.ok) {
                        throw new Error(result.message);
                    }

                    alert(result.message);
                    loadStudents();
                } catch (error) {
                    alert("Error: " + error.message);
                }
            });

            card.append(name, email, course, editButton, deleteButton);
            studentList.appendChild(card);
        });

    } catch (error) {
        studentList.textContent = error.message;
    }
}

loadStudents();
