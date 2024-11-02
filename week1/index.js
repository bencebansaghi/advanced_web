document.addEventListener('DOMContentLoaded', () => {
    const wikiItemsContainer = document.getElementsByClassName('container')[0];

    const breeds = ['Borzoi', 'Komondor', 'Rottweiler', 'Golden Retriever', 'Shetland Sheepdog'];
    insertWikiItems(breeds, wikiItemsContainer);

    addWikiSummariesFromApi(breeds);

    addPicturesFromApi(breeds);


});

function insertWikiItems(breeds, wikiItemsContainer) {
    for (let i = 0; i < breeds.length; i++) {
        const wikiItem = document.createElement('div');
        wikiItem.className = 'wiki-item';
        wikiItem.innerHTML =`
            <h1 class="wiki-header">${breeds[i]}</h1>
            <div class="wiki-content">
                <p class="wiki-text">
                Some text about this breed.
                </p>
                <div class="img-container">
                <img class="wiki-img" src="">
                </div>
            </div>
        `;

        wikiItemsContainer.append(wikiItem);
    }
}

function addWikiSummariesFromApi(breeds) {
    const wikiItems = document.getElementsByClassName('wiki-item');
    for (let i = 0; i < breeds.length; i++) {
        const breed = breeds[i].replace(' ', '_');
        const wikiText = wikiItems[i].querySelector('.wiki-text');
        fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${breed}`, {
            headers: {
                'User-Agent': 'bence.bansaghi@student.lut.fi'
            }
        })
            .then(response => response.json())
            .then(data => {
                wikiText.innerHTML = data.extract;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

function addPicturesFromApi(breeds) {
    const wikiItems = document.getElementsByClassName('wiki-item');
    for (let i = 0; i < breeds.length; i++) {
        let breed = breeds[i].toLowerCase();
        if (breed.includes(' ')) {
            breed = breed.split(' ')[1]+ '/' + breed.split(' ')[0];
        }
        // I refuse to hardcode :P i am not sure tho if this works for all or i just got lucky with my list
        const wikiImg = wikiItems[i].querySelector('.wiki-img');
        fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
            .then(response => response.json())
            .then(data => {
                wikiImg.src = data.message;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}