
// Firebase import
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDV2h_nFbUPJpXtijdHHKfFVnzl8SEUybE",
    authDomain: "hackathon-daddd.firebaseapp.com",
    projectId: "hackathon-daddd",
    storageBucket: "hackathon-daddd.firebasestorage.app",
    messagingSenderId: "955202379800",
    appId: "1:955202379800:web:439abebce70496ef28e36d",
    measurementId: "G-2KEEMX3V7T"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM references
const authContainer = document.getElementById('auth-container');
const appContainer = document.getElementById('app-container');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const showSignupLink = document.getElementById('showSignup');
const showLoginLink = document.getElementById('showLogin');
const logoutBtn = document.getElementById('logoutBtn');
const userAvatar = document.getElementById('userAvatar');

// Auth UI toggle
showSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('d-none');
    signupForm.classList.remove('d-none');
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.classList.add('d-none');
    loginForm.classList.remove('d-none');
});

// Sign up
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        alert(error.message);
    }
});

// Login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        alert(error.message);
    }
});

// Logout
logoutBtn.addEventListener('click', async () => {
    try {
        await signOut(auth);
    } catch (error) {
        alert(error.message);
    }
});

// Auth state change
onAuthStateChanged(auth, (user) => {
    if (user) {
        authContainer.classList.add('d-none');
        appContainer.classList.remove('d-none');
        userAvatar.textContent = user.email[0].toUpperCase();
    } else {
        appContainer.classList.add('d-none');
        authContainer.classList.remove('d-none');
        loginForm.classList.remove('d-none');
        signupForm.classList.add('d-none');
    }
});


// ===================
// Trello Card Logic
// ===================

// Create card with delete button
function createCardElement(title) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('draggable', 'true');

    card.innerHTML = `
        <div class="card-labels">
            <span class="label bg-primary"></span>
        </div>
        <p class="card-title">${title}</p>
        <div class="card-footer d-flex justify-content-between align-items-center">
            <i class="bi bi-text-left text-muted"></i>
            <i class="bi bi-trash text-danger delete-card" style="cursor:pointer;" title="Delete Card"></i>
        </div>
    `;

    // Drag events
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragend', handleDragEnd);

    // Delete card logic
    card.querySelector('.delete-card').addEventListener('click', () => {
        if (confirm("Are you sure you want to delete this card?")) {
            card.remove();
        }
    });

    return card;
}

// Add card events
document.getElementById('addTodoCard').addEventListener('click', () => {
    const title = prompt("Enter card title:");
    if (title) {
        const card = createCardElement(title);
        document.getElementById('todoCards').appendChild(card);
    }
});

document.getElementById('addInProgressCard').addEventListener('click', () => {
    const title = prompt("Enter card title:");
    if (title) {
        const card = createCardElement(title);
        document.getElementById('inProgressCards').appendChild(card);
    }
});

document.getElementById('addDoneCard').addEventListener('click', () => {
    const title = prompt("Enter card title:");
    if (title) {
        const card = createCardElement(title);
        document.getElementById('doneCards').appendChild(card);
    }
});

// Drag & Drop functionality
let draggedCard = null;

function handleDragStart(e) {
    draggedCard = this;
    setTimeout(() => this.classList.add('invisible'), 0);
}

function handleDragEnd(e) {
    draggedCard.classList.remove('invisible');
    draggedCard = null;
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    if (draggedCard) {
        this.appendChild(draggedCard);
    }
}

// Setup drop targets
document.querySelectorAll('.list-cards').forEach(list => {
    list.addEventListener('dragover', handleDragOver);
    list.addEventListener('drop', handleDrop);
});









