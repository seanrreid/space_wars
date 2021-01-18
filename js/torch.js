// Thought I'd see if I could build my own mini-library.
// Borrowed heavily from:
// https://gomakethings.com/creating-your-own-vanilla-js-helper-library-like-lodash-and-underscore.js/
// @TODO - Needs to be more robust, definitely add in some error handling. Right now it's 100% Best Case Scenario

const _torch = (() => {
    const methods = {};

    methods.getEl = (element) => document.querySelector(element);
    methods.getAll = (elements) => document.querySelectorAll(elements);
    methods.addEl = (element) => document.createElement(element);
    methods.appendTo = (parent, child) => parent.appendChild(child);
    methods.empty = (element) => element.innerHTML = '';
    methods.addClass = (element, className) => element.classList.add(className);
    methods.ajax = (url) => {
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
    };
    return methods;
})();
