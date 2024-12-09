document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("token");
    console.log("Logged out");
    window.location.href = "/login.html";
});

async function fetchProtectedData() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "/login.html";
        return;
    }

    try {
        const response = await fetch("/api/private", {
            method: "GET",
            headers: {
                "authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log("Error fetching protected data: ", errorData.message);
        } else {
            const data = await response.json();
            console.log("Protected data: ", data);
        }
    } catch (error) {
        console.log("Error while fetching protected data: " + error);
    }
}

fetchProtectedData();