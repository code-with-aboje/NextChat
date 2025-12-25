const getStartedBtn = document.getElementById("getStartedBtn");

        getStartedBtn.addEventListener("click", () => {
            getStartedBtn.classList.add('loading');
            getStartedBtn.textContent = 'Loading...';
            
            setTimeout(() => {
                window.location.href = "../SignUp/index.html";
            }, 2000);
        });