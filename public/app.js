
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

        console.log("Estudiante registrado:", result.student);

    } catch (error) {
        alert("Error: " + error.message);
    }
});
