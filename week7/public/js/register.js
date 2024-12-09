document.getElementById("registerForm").addEventListener("submit", async (event) => {
    event.preventDefault()
    const email=document.getElementById("email").value
    const password = document.getElementById("password").value

    try{
        const response = await fetch("/api/user/register", {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {email:email,
                password:password}
            )
        })
        if (!response.ok) {
            const errorData = await response.json();
            console.log("Error while trying to register: ", errorData.message);
        } else {
            window.location.href = "/login.html";
        }
    } catch (error) {
        console.log("Error while registering: " +error)
    }
});