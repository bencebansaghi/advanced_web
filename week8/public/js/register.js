document.getElementById("registerForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const isAdmin = document.getElementById("isAdmin").checked;

    const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, username, password, isAdmin })
    });

    const result = await response.json();
    if (response.ok) {
        alert("Registration successful!");
        window.location.href = "/";
    } else {
        const message = Array.isArray(result.message) ? result.message[0].msg : result.message;
        alert(message);
    }
});
