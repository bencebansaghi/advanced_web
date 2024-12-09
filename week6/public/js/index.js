document.addEventListener('DOMContentLoaded', function() {
    loadOffers();
    document.getElementById('offerForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", document.getElementById("title").value);
            formData.append("price", parseFloat(document.getElementById("price").value));
            formData.append("description", document.getElementById("description").value);
            const imageFile = document.getElementById("image").files[0];
            if (imageFile) {
                formData.append("image", imageFile);
            }

            const response = await fetch("/upload", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();
            console.log(data.message);
            loadOffers();
        } catch (error) {
            console.log(error);
        }
    });
});

async function loadOffers() {
    const offersContainer = document.getElementById("offersContainer");
    offersContainer.innerHTML = '';
    try {
        const response = await fetch("/offers");
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json();
        const offers = data.message;
        console.log(offers);
        for (let i = 0; i < offers.length; i++) {
            const offerDiv = document.createElement("div");
            offerDiv.className = "col s12 m6 l4 offerDiv";
            const hoverable = document.createElement("div")
            hoverable.className = "card hoverable"
            const description = document.createElement("p");
            const price = document.createElement("p");
            description.innerHTML = offers[i].description;
            price.innerHTML = `Price: ${offers[i].price}€`
            const cardContent = document.createElement("div")
            cardContent.className = "card-content"
            if (offers[i].imagePath) {
                const imgDiv = document.createElement("div");
                imgDiv.className = "card-image"
                const image = document.createElement("img");
                image.className = "responsive-img"
                const title = document.createElement("span")
                title.className = "card-title"
                title.innerHTML = offers[i].title
                image.src = offers[i].imagePath;
                imgDiv.appendChild(image)
                imgDiv.appendChild(title)
                hoverable.appendChild(imgDiv);
            } else{
                const title = document.createElement("p");
                cardContent.appendChild(title);
                title.innerHTML = offers[i].title;
            }
            cardContent.appendChild(description);
            cardContent.appendChild(price);
            hoverable.appendChild(cardContent)
            offerDiv.appendChild(hoverable)
            offersContainer.appendChild(offerDiv);
        }
    } catch (error) {
        console.log(error);
    }
}
