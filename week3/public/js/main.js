document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("userForm");
    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        const unameel = document.getElementById("name");
        const emailel = document.getElementById("email");
        const uname = unameel.value;
        const email = emailel.value;
        unameel.value=''
        emailel.value=''
        try {
            const response = await fetch("http://localhost:3000/users", {
                method: "post",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({name:uname,email:email}),
            });
            if (response.ok) {
                const res = await response.json();
                console.log(res.message)
            } else {
            console.error("Error: ", response.statusText);
            }
        } catch (error) {
            console.error("Fetch error: ", error);
        }
    });

    const getUsers=document.getElementById("getUsers");
    getUsers.addEventListener('click', async function (event) {
        event.preventDefault();
        let res;
        try {
            const response = await fetch("http://localhost:3000/users");
            if (response.ok) {
                res = await response.json();
                console.log(res)
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
        for (let i=0;i<res.users.length;i++){
            let li = document.createElement("li");
            li.textContent = res.users[i].name + " - " + res.users[i].email;
            userList.appendChild(li);
            };
        
    });
});
