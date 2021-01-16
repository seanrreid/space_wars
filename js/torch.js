// Thought I'd see if I could build my own mini-library, like jQuery lite.

const _torch = {
    getEl: (element) => document.querySelector(element),
    getAll: (elements) => document.querySelectorAll(elements),
    addEl: (element) => document.createElement(element),
    appendTo: (parent, child) => parent.appendChild(child),
    ajax: (url) => {
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                return data;
            })
            .catch(function (error) {
                console.error('ERROR:', error);
                return error;
            });
    },
};
