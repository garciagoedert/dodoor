document.addEventListener('DOMContentLoaded', function() {
    // Verifica se já está autenticado
    if (localStorage.getItem('authToken')) {
        window.location.href = 'dashboard.html';
        return;
    }

    // Toggle password visibility
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.querySelector('#password');

    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.textContent = type === 'password' ? 'visibility' : 'visibility_off';
    });

    // Handle form submission
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simula autenticação bem-sucedida
        localStorage.setItem('authToken', 'temp_token_123');
        
        // Se checkbox "Lembrar-me" estiver marcado
        if (document.getElementById('remember').checked) {
            localStorage.setItem('rememberLogin', 'true');
        }

        // Redireciona para o dashboard
        window.location.href = 'dashboard.html';
    });

    // Handle register link click
    const registerLink = document.querySelector('.signup-link a');
    if (registerLink) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Redirecionando para página de registro...');
            window.location.href = 'register.html';
        });
    }
});
