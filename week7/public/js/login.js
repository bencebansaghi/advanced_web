document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault()
    const email=document.getElementById("email").value
    const password = document.getElementById("password").value

    try{
        const response = await fetch("/api/user/login", {
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
            console.log("Error while trying to login: ", errorData.message);
        } else {
            const data = await response.json();
            if (data.success!=true) throw new Error("Loggin in wasn't successful.");
            localStorage.setItem("token",data.token)
            console.log("Logged in")
            window.location.href = "/";
        }
    } catch (error) {
        console.log("Error while logging in: " +error)
    }
});