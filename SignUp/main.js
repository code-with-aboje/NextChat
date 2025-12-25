// Firebase configuration
        import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
        import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
        import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

        const firebaseConfig = {
            apiKey: "AIzaSyABngGinYTPXuOuWiFw1qtLXn9oswxnWDM",
            authDomain: "talkio-acd79.firebaseapp.com",
            databaseURL: "https://talkio-acd79-default-rtdb.firebaseio.com",
            projectId: "talkio-acd79",
            storageBucket: "talkio-acd79.firebasestorage.app",
            messagingSenderId: "374288564174",
            appId: "1:374288564174:web:dd5ade31bd76637a63759f"
        };

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const database = getDatabase(app);

        const form = document.getElementById('signupForm');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const submitBtn = document.getElementById('submitBtn');
        const errorBanner = document.getElementById('errorBanner');
        const successMessage = document.getElementById('successMessage');
        const loadingOverlay = document.getElementById('loadingOverlay');

        function generateUniquePhoneNumber() {
            // Generate a 9-digit number (100000000 to 999999999)
            return Math.floor(100000000 + Math.random() * 900000000).toString();
        }

        function validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        function validatePassword(password) {
            return password.length >= 8;
        }

        function showError(message) {
            errorBanner.textContent = message;
            errorBanner.classList.add('show');
            setTimeout(() => errorBanner.classList.remove('show'), 4000);
        }

        function showSuccess(message) {
            successMessage.textContent = message;
            successMessage.classList.add('show');
            setTimeout(() => successMessage.classList.remove('show'), 4000);
        }

        nameInput.addEventListener('blur', () => {
            if (nameInput.value.trim().length > 0) {
                nameInput.classList.add('valid');
                nameInput.classList.remove('invalid');
                document.getElementById('nameError').classList.remove('show');
            }
        });

        emailInput.addEventListener('blur', () => {
            if (emailInput.value && !validateEmail(emailInput.value)) {
                emailInput.classList.add('invalid');
                emailInput.classList.remove('valid');
                document.getElementById('emailError').classList.add('show');
            } else if (emailInput.value) {
                emailInput.classList.add('valid');
                emailInput.classList.remove('invalid');
                document.getElementById('emailError').classList.remove('show');
            }
        });

        passwordInput.addEventListener('input', () => {
            if (validatePassword(passwordInput.value)) {
                passwordInput.classList.add('valid');
                passwordInput.classList.remove('invalid');
                document.getElementById('passwordError').classList.remove('show');
            } else if (passwordInput.value.length > 0) {
                passwordInput.classList.add('invalid');
                passwordInput.classList.remove('valid');
                document.getElementById('passwordError').classList.add('show');
            }
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value;

            if (!name) {
                showError('Please enter your full name');
                nameInput.classList.add('invalid');
                return;
            }

            if (!email || !validateEmail(email)) {
                showError('Please enter a valid email address');
                emailInput.classList.add('invalid');
                return;
            }

            if (!validatePassword(password)) {
                showError('Password must be at least 8 characters');
                passwordInput.classList.add('invalid');
                return;
            }

            // Show loading animation
            document.body.classList.add('loading-active');
            loadingOverlay.classList.add('active');
            submitBtn.disabled = true;

            try {
                // Create user account
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Generate unique phone number
                const appPhoneNumber = generateUniquePhoneNumber();

                // Update user profile with display name
                await updateProfile(user, {
                    displayName: name
                });

                // Store user data in Realtime Database
                await set(ref(database, 'users/' + user.uid), {
                    name: name,
                    email: email,
                    appPhoneNumber: appPhoneNumber,
                    createdAt: new Date().toISOString(),
                    uid: user.uid
                });

                // Wait for animation to complete (3 seconds minimum)
                await new Promise(resolve => setTimeout(resolve, 3000));

                showSuccess('Account created successfully! Your app number: ' + appPhoneNumber);

                // Redirect after showing success
                setTimeout(() => {
                    window.location.href = "../Home/index.html";
                }, 1500);

            } catch (error) {
                // Hide loading animation
                document.body.classList.remove('loading-active');
                loadingOverlay.classList.remove('active');
                submitBtn.disabled = false;

                let errorMessage = 'An error occurred. Please try again.';
                
                if (error.code === 'auth/email-already-in-use') {
                    errorMessage = 'This email is already registered. Please sign in instead.';
                } else if (error.code === 'auth/weak-password') {
                    errorMessage = 'Password is too weak. Please use a stronger password.';
                } else if (error.code === 'auth/invalid-email') {
                    errorMessage = 'Invalid email address format.';
                } else if (error.code === 'auth/network-request-failed') {
                    errorMessage = 'Network error. Please check your connection.';
                }

                showError(errorMessage);
                console.error('Signup error:', error);
            }
        });