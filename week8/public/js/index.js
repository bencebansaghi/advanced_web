document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const topicForm = document.getElementById("topicForm");
    const topicsDiv = document.getElementById("topics");

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const response = await fetch("/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        if (response.ok) {
            localStorage.setItem("token", result.token);
            topicForm.style.display = "block";
            fetchTopics();
        } else {
            const message = Array.isArray(result.message) ? result.message[0].msg : result.message;
            alert(message);
        }
    });

    document.getElementById("postTopic").addEventListener("click", async function () {
        const title = document.getElementById("topicTitle").value;
        const content = document.getElementById("topicText").value;
        const token = localStorage.getItem("token");

        const response = await fetch("/api/topic", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ title, content })
        });

        const result = await response.json();
        if (response.ok) {
            fetchTopics();
        } else {
            const message = Array.isArray(result.message) ? result.message[0].msg : result.message;
            alert(message);
        }
    });

    async function fetchTopics() {
        const response = await fetch("/api/topics");
        const result = await response.json();

        topicsDiv.innerHTML = "";
        result.topics.forEach(topic => {
            const topicDiv = document.createElement("div");
            topicDiv.className = "card z-depth-2 hoverable grey lighten-2";

            const cardContent = document.createElement("div");
            cardContent.className = "card-content";

            const titleSpan = document.createElement("span");
            titleSpan.className = "card-title";
            titleSpan.textContent = topic.title;

            const contentP = document.createElement("p");
            contentP.textContent = topic.content;

            const userP = document.createElement("p");
            userP.className = "grey-text text-darken-2";
            userP.textContent = `Posted by ${topic.username} on ${new Date(topic.createdAt).toLocaleString()}`;

            const cardAction = document.createElement("div");
            cardAction.className = "card-action";

            const deleteButton = document.createElement("button");
            deleteButton.className = "btn waves-effect waves-light";
            deleteButton.textContent = "Delete";
            deleteButton.id = "deleteTopic";
            deleteButton.addEventListener("click", async function () {
                const token = localStorage.getItem("token");
                const response = await fetch(`/api/topic/${topic._id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                const result = await response.json();
                if (response.ok) {
                    fetchTopics();
                } else {
                    const message = Array.isArray(result.message) ? result.message[0].msg : result.message;
                    alert(message);
                }
            });

            cardContent.appendChild(titleSpan);
            cardContent.appendChild(contentP);
            cardContent.appendChild(userP);
            cardAction.appendChild(deleteButton);
            topicDiv.appendChild(cardContent);
            topicDiv.appendChild(cardAction);
            topicsDiv.appendChild(topicDiv);
        });
    }

    if (localStorage.getItem("token")) {
        topicForm.style.display = "block";
        fetchTopics();
    }
});
