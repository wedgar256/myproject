    // Theme Handling
    const themeToggle = document.getElementById('theme-toggle');
    const settingsBtn = document.getElementById('settings-btn');
    const modal = document.getElementById('settings-modal');
    const closeModal = document.getElementById('close-modal');

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update icon
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    // Load saved theme or respect system preference
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
    });

    // Modal Controls
    settingsBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        updateAccountUI();
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    // Theme buttons inside modal
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const newTheme = btn.getAttribute('data-theme');
            setTheme(newTheme);
            
            // Update active state
            document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Simple Account Simulation (for learning)
    let currentUser = null;   // null = not logged in

    function updateAccountUI() {
        const accountDiv = document.getElementById('account-status');
        const loginBtn = document.getElementById('login-btn');
        const signupBtn = document.getElementById('signup-btn');
        const logoutBtn = document.getElementById('logout-btn');

        if (currentUser) {
            accountDiv.innerHTML = `<p>Logged in as: <strong>${currentUser}</strong></p>`;
            loginBtn.style.display = 'none';
            signupBtn.style.display = 'none';
            logoutBtn.style.display = 'block';
        } else {
            accountDiv.innerHTML = `<p>You are not logged in</p>`;
            loginBtn.style.display = 'block';
            signupBtn.style.display = 'block';
            logoutBtn.style.display = 'none';
        }
    }

    document.getElementById('logout-btn').addEventListener('click', () => {
        if (confirm('Logout?')) {
            currentUser = null;
            updateAccountUI();
        }
    });

    // Fake Login / Signup (for demo)
    document.getElementById('login-btn').addEventListener('click', () => {
        const username = prompt("Enter username (demo):", "player123");
        if (username) {
            currentUser = username;
            updateAccountUI();
            alert(`Welcome back, ${username}!`);
        }
    });

    document.getElementById('signup-btn').addEventListener('click', () => {
        const username = prompt("Choose a username (demo):", "gamerX");
        if (username) {
            currentUser = username;
            updateAccountUI();
            alert(`Account created successfully! Welcome, ${username}`);
        }
    });

    // Initialize everything
    initTheme();
