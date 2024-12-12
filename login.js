// Função para alternar visibilidade da senha
document.querySelector('.toggle-password').addEventListener('click', function() {
    const passwordInput = document.querySelector('#password');
    const icon = this.querySelector('i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
});

// Função para lidar com o login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const remember = document.querySelector('input[name="remember"]').checked;

    // Aqui você implementaria a validação com seu backend
    // Por enquanto, vamos usar uma validação simples
    if (email === 'admin@dodoor.com' && password === 'admin123') {
        // Salvar token no localStorage
        const token = 'dummy_token_' + Date.now();
        localStorage.setItem('authToken', token);
        
        if (remember) {
            localStorage.setItem('rememberLogin', 'true');
        }

        // Redirecionar para a dashboard usando caminho relativo
        window.location.href = 'dashboard.html';
    } else {
        showError('E-mail ou senha incorretos');
    }
}

// Função para mostrar mensagem de erro
function showError(message) {
    // Remove qualquer mensagem de erro existente
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Cria e adiciona nova mensagem de erro
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const form = document.querySelector('#loginForm');
    form.insertBefore(errorDiv, form.querySelector('.login-button'));
}

// Verificar se já está logado ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('authToken');
    const remember = localStorage.getItem('rememberLogin');
    
    if (token && remember === 'true') {
        window.location.href = 'dashboard.html';
    }
});
