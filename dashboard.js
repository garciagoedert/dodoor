// Adiciona um token temporário para teste
if (!localStorage.getItem('authToken')) {
    localStorage.setItem('authToken', 'temp_token_123');
}

// Função para criar gráfico de linha
function createLineChart() {
    const canvas = document.createElement('canvas');
    canvas.id = 'revenueChart';
    const chartContainer = document.querySelector('.chart');
    if (chartContainer) {
        chartContainer.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

        const data = {
            labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
            datasets: [{
                label: 'Receita',
                data: [150, 230, 180, 290, 200, 250, 220],
                fill: true,
                backgroundColor: gradient,
                borderColor: '#3B82F6',
                tension: 0.4
            }]
        };

        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        };

        new Chart(ctx, config);
    }
}

// Função para criar gráfico de pizza
function createPieChart() {
    const canvas = document.createElement('canvas');
    canvas.id = 'periodChart';
    const chartContainer = document.querySelector('.period-chart');
    if (chartContainer) {
        chartContainer.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const data = {
            labels: ['Manhã', 'Tarde', 'Noite'],
            datasets: [{
                data: [35, 45, 20],
                backgroundColor: [
                    '#3B82F6',
                    '#10B981',
                    '#F59E0B'
                ]
            }]
        };

        const config = {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        };

        new Chart(ctx, config);
    }
}

// Função para criar gráfico de barras para avaliações
function createRatingsChart() {
    const canvas = document.createElement('canvas');
    canvas.id = 'ratingsChart';
    const chartContainer = document.querySelector('.ratings-chart');
    if (chartContainer) {
        chartContainer.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const data = {
            labels: ['5★', '4★', '3★', '2★', '1★'],
            datasets: [{
                label: 'Avaliações',
                data: [42, 28, 8, 2, 1],
                backgroundColor: '#3B82F6',
                borderRadius: 5
            }]
        };

        const config = {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        };

        new Chart(ctx, config);
    }
}

// Função para inicializar todos os gráficos
function initCharts() {
    // Carrega a biblioteca Chart.js dinamicamente
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = function() {
        createLineChart();
        createPieChart();
        createRatingsChart();
    };
    document.head.appendChild(script);
}

// Função para navegar entre páginas
function navigateToPage(page) {
    const pages = {
        'Relatórios': 'dashboard.html',
        'Locações': 'locations.html',
        'Gestão': 'management.html',
        'Avaliações dos Usuários': 'reviews.html',
        'Configurações': 'settings.html',
        'Pagamentos': 'payments.html',
        'Conta': 'account.html',
        'Ajuda': '#', // Implementar página de ajuda
        'Sair': 'login.html'
    };

    const url = pages[page];
    if (url) {
        if (page === 'Sair') {
            localStorage.removeItem('authToken');
            localStorage.removeItem('rememberLogin');
        }
        window.location.href = url;
    }
}

// Adiciona eventos de clique aos itens do menu
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa os gráficos se estiver na página do dashboard
    if (document.querySelector('.chart')) {
        initCharts();
    }

    // Adiciona eventos de clique aos itens do menu
    document.querySelectorAll('.sidebar nav ul li').forEach(item => {
        item.addEventListener('click', () => {
            const page = item.getAttribute('data-page');
            if (page) {
                navigateToPage(page);
            }
        });
    });
});
