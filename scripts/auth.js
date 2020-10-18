import { auth, db } from "./firebase";
import { setupAuction, auctionDomList } from "./AuctionList";
const signupForm = document.querySelector('#signup-form');
const loginForm = document.querySelector('#login-form');
// USER BIO INFORMATION MODAL
const accBio = document.querySelector('#user-bio')

// hide/show links menu depend of logged
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');


const menuUI = user => {
    if (user) {
        console.log(user.email);
        loggedInLinks.forEach(link => link.style.display = 'block')
        loggedOutLinks.forEach(link => link.style.display = 'none')
    } else if (!user) {
        loggedInLinks.forEach(link => link.style.display = 'none')
        loggedOutLinks.forEach(link => link.style.display = 'block')
    }
}


// HANDLE CLOSE MODAL
function closeModal(modalName, form) {
    const modal = document.querySelector(`#modal-${modalName}`);
    M.Modal.getInstance(modal).close();
    form.reset()
}

// listen for auth status
auth.onAuthStateChanged(user => {
    if (user) {
        db.collection('auctions').onSnapshot(snapshot => {
            setupAuction(snapshot.docs)
        });
        db.collection('users').doc(user.uid).get().then((doc) => {

            const liEmail = document.createElement("li");
            liEmail.textContent = user.email;
            const liName = document.createElement("li");
            liName.textContent = doc.data() ? doc.data().name : "no added name";


            accBio.appendChild(liEmail);
            accBio.appendChild(liName)
        }, err => console.log(err.message))
        menuUI(user);
    } else if (!user) {
        menuUI(user);
        setupAuction([]);
    }
})


// register new user

signupForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const email = signupForm['email'].value;
    const password = signupForm['password'].value;
    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
        return db.collection('users').doc(cred.user.uid).set({
            name: signupForm['full-name'].value
        });
    }).then(() => {
        closeModal("signup", signupForm);
    })
});

// login existing user
loginForm.addEventListener('submit', (ev) => {
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




// Auction managment

// add new auction

const createForm = document.querySelector('#create-form');

createForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    auctionDomList.innerHTML = '';
    db.collection('auctions').add({
        title: createForm['title'].value,
        price: createForm['price'].value,
        description: createForm['description'].value,
        offerType: createForm["private_offer"].checked,
        itemState: createForm["item_state"].checked
    }
    ).then(() => {

        closeModal('create', createForm)
    }).catch(err => console.log(err, err.message))
});


