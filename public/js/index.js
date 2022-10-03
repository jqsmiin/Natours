import '@babel/polyfill'
import { login, logout } from './login'
import { displayMap } from './mapbox'
import { updateSettings } from './updateSettings'
import { bookTour } from './stripe'

// Dom elements
const mapBox = document.getElementById('map')
const loginForm = document.querySelector('.form--login')
const logOutBtn = document.querySelector('.nav__el--logout')
const userDataForm = document.querySelector('.form-user-data')
const userPswForm = document.querySelector('.form-user-settings')
const bookBtn = document.getElementById('book-tour')

// Delegation
if (mapBox) {
    const locations = JSON.parse(mapBox.dataset.locations)
    displayMap(locations)
}
if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault()
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email, password)
    })
}
if (userDataForm) {
    userDataForm.addEventListener('submit', async function (e) {
        if (!e.target.classList.contains('form-user-data')) {
            return;
        }
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const photo = document.getElementById('photo').files[0];
        await updateSettings('data', { name, email, photo });
        location.reload(true);
    });
}

if (userPswForm) {
    userPswForm.addEventListener('submit', async function (e) {
        // guard to check if different form submitted
        if (!e.target.classList.contains('form-user-settings')) {
            return;
        }
        e.preventDefault();
        const oldPassword = document.getElementById('password-current').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('password-confirm').value;
        await updateSettings('password', {
            oldPassword,
            password,
            passwordConfirm,
        });
        document.getElementById('password-current').value = '';
        document.getElementById('password').value = '';
        document.getElementById('password-confirm').value = '';
    });
}
if (logOutBtn) {
    logOutBtn.addEventListener('click', () => {
        logout()
    })
}
if (bookBtn) {
    bookBtn.addEventListener('click', e => {
        e.target.textContent = 'Processing...'
        const { tourId } = e.target.dataset
        bookTour(tourId)
    })
}
