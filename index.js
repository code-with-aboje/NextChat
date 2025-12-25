document.getElementById('getStartedBtn').addEventListener('click', function() {
            // Add blur to body content
            document.body.classList.add('loading-active');
            
            // Show loading overlay
            const overlay = document.getElementById('loadingOverlay');
            overlay.classList.add('active');
            
            // Redirect after 3 seconds
            setTimeout(() => {
                window.location.href = './SignUp/index.html';
            }, 3000);
        });
