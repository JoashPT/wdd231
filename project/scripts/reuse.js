//general behavior for the webpages
//hamburger menu
const menu = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

menu.addEventListener('click', () => {
    menu.classList.toggle('show');
    navigation.classList.toggle('show');
})

//for footer
// select the DOM element for output
const year = document.querySelector("#currentYear");
const lstModif = document.querySelector('#lastModified');

// use the date object
const today = new Date();

year.innerHTML = `<span id="currentyear">${today.getFullYear()}</span>`;
lstModif.innerHTML = new Date(document.lastModified).toUTCString();
