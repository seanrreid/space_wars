const API_BASE = 'https://swapi.dev/api/';

getCharacters = () => {
    const characterList = _torch.getEl('#characterList'),
        characterUL = _torch.addEl('ul');

    _torch.appendTo(characterList, characterUL);
    _torch
        .ajax(`${API_BASE}people`)
        .then((characters) => {
            generateLinks(characterUL, characters.results);
        })
        .then(() => {
            activateLinks();
        });
};

generateLinks = (element, items) => {
    return items.map((character) => {
        const listItems = _torch.addEl('li');
        listItems.innerHTML = `<a href="${character.url}">${character.name}</a>`;
        _torch.appendTo(element, listItems);
    });
};

activateLinks = () => {
    const characterLinks = _torch.getAll('#characterList a');
    characterLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            getCharacterDetails(e.target.href);
        });
    });
};

const getCharacterDetails = (characterUrl) => {
    _torch.ajax(characterUrl).then((details) => {
        buildProfile(details);
    });
};

const buildProfile = (character) => {
    const characterDetails = _torch.getEl('#characterDetails'),
        bioElement = _torch.addEl('div'),
        filmList = _torch.addEl('ul');

    console.log(character);

    const content = `<h2 class="title is-2">${character.name}</h2>
        <p>Character Details will go here.</p>`;

    bioElement.innerHTML = content;

    _torch.appendTo(bioElement, filmList);
    _torch.appendTo(characterDetails, bioElement);
};

getCharacters();
