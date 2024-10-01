const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

const cards = document.querySelector('#cards');

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        let prophetSection = document.createElement("section");
        let fullName = document.createElement("h2");
        let portrait = document.createElement("img");

        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of prophet ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        prophetSection.appendChild(fullName);
        prophetSection.appendChild(portrait);

        cards.appendChild(prophetSection);
    })
}

async function getProphetData(){
    const response = await fetch(url);
    const data = await response.json();
    displayProphets(data.prophets);
}

getProphetData();