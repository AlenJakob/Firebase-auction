const signupForm = document.querySelector('#signup-form');
const loginForm = document.querySelector('#login-form');
const createForm = document.querySelector('#create-form');

// hide/show links menu depend of logged
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const menuUI = user => {
    if (user) {
        loggedInLinks.forEach(link => link.style.display = 'block')
        loggedOutLinks.forEach(link => link.style.display = 'none')
    } else if (!user) {
        loggedInLinks.forEach(link => link.style.display = 'none')
        loggedOutLinks.forEach(link => link.style.display = 'block')
    }
}

function closeModal(modalName, form) {
    const modal = document.querySelector(`#modal-${modalName}`);
    M.Modal.getInstance(modal).close();
    form.reset()
}

// lsiten for auth status
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user is logged in');
        menuUI(user)
    } else if (!user) {
        menuUI(user)
        console.log('user is not longer logged');

    }
})


// register new user

signupForm.addEventListener('submit', (ev) => {
    ev.preventDefault();

    // db.collections('users')

    const email = signupForm['email'].value;
    const password = signupForm['password'].value;
    closeModal("signup", signupForm)
    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
        // console.log(cred.user);

    })
});

// login existing user
loginForm.addEventListener('click', (ev) => {
    ev.preventDefault();
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        console.log(cred.user)
        closeModal("login", loginForm)
    })
});

// logout user
const logOut = document.querySelector('#logout')
logOut.addEventListener('click', (ev) => {
    ev.preventDefault();
    auth.signOut().then(() => {
        console.log("user has been logged out")
    }).catch(function (error) {
        console.log('there went something wrong', error, error.message)
    });
});

