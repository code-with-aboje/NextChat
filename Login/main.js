const form = document.getElementById('loginForm');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const submitBtn = document.getElementById('submitBtn');
        const errorBanner = document.getElementById('errorBanner');
        const successMessage = document.getElementById('successMessage');
        const forgotPasswordLink = document.getElementById('forgotPasswordLink');
        const googleBtn = document.getElementById('googleBtn');
        const appleBtn = document.getElementById('appleBtn');

        // Email validation
        function validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        // Show error banner
        function showError(message) {
            errorBanner.textContent = message;
            errorBanner.classList.add('show');
            setTimeout(() => errorBanner.classList.remove('show'), 4000);
        }

        // Show success message
        function showSuccess(message) {
            successMessage.textContent = message;
            successMessage.classList.add('show');
            setTimeout(() => successMessage.classList.remove('show'), 4000);
        }

        // Input validation feedback
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
            if (passwordInput.value.length > 0) {
                passwordInput.classList.add('valid');
                passwordInput.classList.remove('invalid');
                document.getElementById('passwordError').classList.remove('show');
            }
        });

        // Form submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = emailInput.value.trim();
            const password = passwordInput.value;

            // Validation
            if (!email || !validateEmail(email)) {
                showError('Please enter a valid email address');
                emailInput.classList.add('invalid');
                return;
            }

            if (!password) {
                showError('Please enter your password');
                passwordInput.classList.add('invalid');
                return;
            }

            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                showSuccess('Login successful! Redirecting...');
               
                
                // Simulate redirect after 1.5 seconds
                setTimeout(() => {
                    // window.location.href = '/dashboard';
                    console.log('Redirecting to dashboard...');
                }, 1500);
            }, 2000);
        });

        // Forgot password handler
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            showSuccess('Password reset link will be sent to your email');
        });

        // Social login handlers
        googleBtn.addEventListener('click', () => {
            showSuccess('Google login coming soon!');
        });

        appleBtn.addEventListener('click', () => {
            showSuccess('Apple login coming soon!');
        });