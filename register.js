document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility para ambos os campos de senha
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.textContent = type === 'password' ? 'visibility' : 'visibility_off';
        });
    });

    // Validação de telefone
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            value = value.match(new RegExp('.{1,11}'))[0];
            if (value.length > 2) {
                value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
            }
            if (value.length > 9) {
                value = value.substring(0, 9) + '-' + value.substring(9);
            }
        }
        e.target.value = value;
    });

    // Manipulação do formulário
    const form = document.getElementById('registerForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Obter valores dos campos
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const terms = document.getElementById('terms').checked;

        // Validações
        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }

        if (password.length < 6) {
            alert('A senha deve ter pelo menos 6 caracteres!');
            return;
        }

        if (!terms) {
            alert('Você precisa aceitar os termos de uso e a política de privacidade!');
            return;
        }

        // Simular o registro bem-sucedido
        const userData = {
            name,
            email,
            phone,
            password
        };

        // Armazenar dados do usuário (em produção, isso seria feito no backend)
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('authToken', 'temp_token_' + Date.now());

        // Redirecionar para o dashboard
        alert('Cadastro realizado com sucesso!');
        window.location.href = 'dashboard.html';
    });

    // Verificar se já está autenticado
    if (localStorage.getItem('authToken')) {
        window.location.href = 'dashboard.html';
    }
});
