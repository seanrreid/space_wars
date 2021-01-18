const API_BASE = 'https://swapi.dev/api/';

getCharacters = () => {
    const characterList = _torch.getEl('#characterList'),
        characterUL = _torch.addEl('ul');

    _torch.appendTo(characterList, characterUL);
    _torch
        .ajax(`${API_BASE}people/`)
        .then((characters) => {
            generateLinks(characterUL, characters.results);
        })
        .then(() => {
            activateLinks();
        });
};

generateLinks = (element, items) => {
    loader = _torch.getEl('#loader');
    loader.classList.toggle('visible');

    return items.map((character) => {
        const listItems = _torch.addEl('li');
        listItems.classList.add('menu-list');
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
    const characterDetails = _torch.getEl('#characterDetails');

    const content = `<h2 class="title is-2">${character.name}</h2>
        <hr/>`;

    _torch.empty(characterDetails);
    characterDetails.innerHTML = content;
    getFilms(character.films);
};

const getFilms = (filmUrls) => {
    Promise.all(
        filmUrls.map((filmUrl) => {
            return _torch.ajax(filmUrl).then((film) => {
                return film;
            });
        })
    ).then((filmList) => {
        buildFilmList(filmList);
    });
};

const buildFilmList = (filmList) => {
    const characterDetails = _torch.getEl('#characterDetails'),
        filmListEl = _torch.addEl('ul');
    _torch.addClass(filmListEl, 'filmList');

    const orderedFilms = filmList.sort((a, b) => a.episode_id - b.episode_id);
    orderedFilms.map((film) => {
        const listItem = _torch.addEl('li');
        listItem.innerHTML = `<span class='filmList__episode'>${film.episode_id}</span>${film.title}`;
        _torch.appendTo(filmListEl, listItem);
    });

    _torch.appendTo(characterDetails, filmListEl);
};

getCharacters();
