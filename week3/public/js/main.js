document.addEventListener("DOMContentLoaded", function () {
    const submit = document.getElementById("submit");
    submit.addEventListener("click", async function (event) {
        event.preventDefault();
        const uname = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        try {
            const response = await fetch("http://localhost:3000/users", {
                method: "post",
                headers: { "Content-type": "application/json" },
                body: '{ "name": "' + uname + '", "email": "' +email+ '" }',
            });
            if (response.ok) {
                const res = await response.json();
            } else {
            console.error("Error: ", response.statusText);
            }
        } catch (error) {
            console.error("Fetch error: ", error);
        }
    });

    const getUsers=document.getElementById("getUser");
    getUsers.addEventListener('click', async function (event) {
        event.preventDefault();
        let res;
        try {
            const response = await fetch("http://localhost:3000/users");
            if (response.ok) {
                res = await response.json();
            } else {
            console.error("Error: ", response.statusText);
            return
            }
        } catch (error) {
            console.error("Fetch error: ", error);
            return
        }
        let userList=document.getElementById("userList");
        userList.innerHTML = '';
        res.forEach(element => {
            let li = document.createElement("li");
            li.textContent = element.name + " - " + element.email;
            userList.appendChild(li);
            });
        
    });
});
