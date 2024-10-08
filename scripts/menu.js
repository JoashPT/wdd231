//hamburger menu
const menu = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

menu.addEventListener('click', () => {
    menu.classList.toggle('show');
    navigation.classList.toggle('show');
})