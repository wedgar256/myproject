// ====================== GAME FLEX HUB - JavaScript ======================

document.addEventListener('DOMContentLoaded', () => {
    
    // Get all necessary elements
    const themeToggle = document.getElementById('theme-toggle');
    const settingsBtn = document.getElementById('settings-btn');
    const modal = document.getElementById('settings-modal');
    const closeModal = document.getElementById('close-modal');
    
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const accountStatus = document.getElementById('account-status');

    let currentUser = null;   // null = guest

    // ====================== THEME FUNCTIONS ======================
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update header toggle icon
        if (themeToggle) {
            themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            setTheme(savedTheme);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    // ====================== MODAL FUNCTIONS ======================
    function openModal() {
        if (modal) {
            modal.style.display = 'flex';
            updateAccountUI();
        }
    }

    function closeModalFunc() {
        if (modal) modal.style.display = 'none';
    }

    // ====================== ACCOUNT FUNCTIONS ======================
    function updateAccountUI() {
        if (!accountStatus) return;

        if (currentUser) {
            accountStatus.innerHTML = `<p>Logged in as: <strong>${currentUser}</strong></p>`;
            loginBtn.style.display = 'none';
            signupBtn.style.display = 'none';
            logoutBtn.style.display = 'block';
        } else {
            accountStatus.innerHTML = `<p>You are not logged in</p>`;
            loginBtn.style.display = 'block';
            signupBtn.style.display = 'block';
            logoutBtn.style.display = 'none';
        }
    }

    // ====================== EVENT LISTENERS ======================

    // Theme Toggle (Header)
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    // Open Settings Modal
    if (settingsBtn) {
        settingsBtn.addEventListener('click', openModal);
    }

    // Close Modal (X button)
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunc);
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModalFunc();
            }
        });
    }

    // Theme buttons inside the modal
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const newTheme = btn.getAttribute('data-theme');
            setTheme(newTheme);

            // Update active class
            document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Login Button
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            const username = prompt("Enter your username (demo):", "player123");
            if (username && username.trim() !== "") {
                currentUser = username.trim();
                updateAccountUI();
                alert(`Welcome back, ${currentUser}!`);
                closeModalFunc();
            }
        });
    }

    // Signup Button
    if (signupBtn) {
        signupBtn.addEventListener('click', () => {
            const username = prompt("Choose a username for your new account:", "gamerX");
            if (username && username.trim() !== "") {
                currentUser = username.trim();
                updateAccountUI();
                alert(`Account created successfully!\nWelcome, ${currentUser}`);
                closeModalFunc();
            }
        });
    }

    // Logout Button
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm("Are you sure you want to logout?")) {
                currentUser = null;
                updateAccountUI();
                alert("You have been logged out.");
            }
        });
    }

    // ====================== INITIALIZE ======================
    initTheme();
    updateAccountUI();   // Initial account status

    console.log("✅ Game Flex Hub JavaScript loaded successfully!");
});