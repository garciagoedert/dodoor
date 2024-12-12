// Adiciona um token temporário para teste
if (!localStorage.getItem('authToken')) {
    localStorage.setItem('authToken', 'temp_token_123');
}

// Estado global para armazenar o período selecionado
let selectedPeriod = 7;
let customDateRange = null;

// Função para inicializar todos os gráficos e funcionalidades
function initDashboard() {
    // Carrega a biblioteca Chart.js dinamicamente
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = function() {
        initCharts();
        setupEventListeners();
        updateDashboardData();
    };
    document.head.appendChild(script);
}

// Configurar event listeners
function setupEventListeners() {
    // Filtros de período
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const period = btn.dataset.period;
            if (period === 'custom') {
                showDateRangePicker();
            } else {
                selectedPeriod = parseInt(period);
                updateDashboardData();
            }
        });
    });

    // Botão de exportação
    document.querySelector('.export-btn')?.addEventListener('click', exportReport);

    // Botões de detalhes
    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', () => {
            const metricName = btn.closest('.metric-card, .performance-card')
                .querySelector('h3').textContent;
            showMetricDetails(metricName);
        });
    });
}

// Função para mostrar seletor de período personalizado
function showDateRangePicker() {
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    
    const picker = document.createElement('div');
    picker.className = 'date-range-picker';
    picker.innerHTML = `
        <div class="picker-content">
            <h3>Selecione o período</h3>
            <div class="date-inputs">
                <div class="input-group">
                    <label>Data inicial</label>
                    <input type="date" id="start-date" value="${formatDate(lastMonth)}">
                </div>
                <div class="input-group">
                    <label>Data final</label>
                    <input type="date" id="end-date" value="${formatDate(today)}">
                </div>
            </div>
            <div class="picker-actions">
                <button class="cancel-btn">Cancelar</button>
                <button class="apply-btn">Aplicar</button>
            </div>
        </div>
    `;

    document.body.appendChild(picker);

    picker.querySelector('.cancel-btn').addEventListener('click', () => {
        document.body.removeChild(picker);
    });

    picker.querySelector('.apply-btn').addEventListener('click', () => {
        const startDate = picker.querySelector('#start-date').value;
        const endDate = picker.querySelector('#end-date').value;
        customDateRange = { start: startDate, end: endDate };
        document.body.removeChild(picker);
        updateDashboardData();
    });
}

// Função para formatar data para o input date
function formatDate(date) {
    return date.toISOString().split('T')[0];
}

// Função para atualizar dados do dashboard
function updateDashboardData() {
    // Aqui você faria uma chamada à API para obter os dados reais
    // Por enquanto, vamos simular com dados estáticos
    updateMetrics();
    updateCharts();
    updateInsights();
}

// Função para criar gráfico de receita
function createRevenueChart() {
    const canvas = document.createElement('canvas');
    canvas.id = 'revenueChart';
    const chartContainer = document.querySelector('.chart');
    if (chartContainer) {
        chartContainer.innerHTML = '';
        chartContainer.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

        const data = generateRevenueData();

        const config = {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Receita',
                    data: data.values,
                    fill: true,
                    backgroundColor: gradient,
                    borderColor: '#3B82F6',
                    tension: 0.4
                }]
            },
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

// Função para criar gráfico de ocupação
function createOccupancyChart() {
    const canvas = document.createElement('canvas');
    canvas.id = 'occupancyChart';
    const chartContainer = document.querySelector('.occupancy-chart');
    if (chartContainer) {
        chartContainer.innerHTML = '';
        chartContainer.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const data = generateOccupancyData();

        const config = {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Ocupação',
                    data: data.values,
                    backgroundColor: '#10B981',
                    borderRadius: 5
                }]
            },
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
                        max: 100,
                        ticks: {
                            callback: value => value + '%'
                        },
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

// Função para criar gráfico de períodos
function createPeriodChart() {
    const canvas = document.createElement('canvas');
    canvas.id = 'periodChart';
    const chartContainer = document.querySelector('.period-chart');
    if (chartContainer) {
        chartContainer.innerHTML = '';
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
                        display: false
                    }
                }
            }
        };

        new Chart(ctx, config);
    }
}

// Função para gerar dados de receita
function generateRevenueData() {
    const labels = [];
    const values = [];
    const days = selectedPeriod;
    
    for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (days - 1 - i));
        labels.push(date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }));
        values.push(Math.floor(Math.random() * 500) + 100);
    }

    return { labels, values };
}

// Função para gerar dados de ocupação
function generateOccupancyData() {
    const labels = [];
    const values = [];
    const days = selectedPeriod;
    
    for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (days - 1 - i));
        labels.push(date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }));
        values.push(Math.floor(Math.random() * 40) + 60);
    }

    return { labels, values };
}

// Função para atualizar métricas
function updateMetrics() {
    // Aqui você atualizaria com dados reais da API
    const metrics = {
        revenue: {
            value: 'R$ 1.536,00',
            trend: '+2.1%'
        },
        occupancy: {
            value: '68%',
            trend: '+5.3%'
        }
    };

    // Atualiza os valores na interface
    updateMetricDisplay('Receita Total', metrics.revenue);
    updateMetricDisplay('Taxa de Ocupação', metrics.occupancy);
}

// Função para atualizar exibição de métrica
function updateMetricDisplay(metricName, data) {
    const card = document.querySelector(`.metric-card h3:contains('${metricName}')`);
    if (card) {
        const valueEl = card.closest('.metric-card').querySelector('.metric-value h2');
        const trendEl = card.closest('.metric-card').querySelector('.trend');
        
        if (valueEl) valueEl.textContent = data.value;
        if (trendEl) {
            const isPositive = data.trend.startsWith('+');
            trendEl.className = `trend ${isPositive ? 'positive' : 'negative'}`;
            trendEl.querySelector('span').textContent = isPositive ? 'arrow_upward' : 'arrow_downward';
            trendEl.lastChild.textContent = ` ${data.trend} vs período anterior`;
        }
    }
}

// Função para atualizar insights
function updateInsights() {
    const insightsList = document.querySelector('.insights-list');
    if (!insightsList) return;

    // Aqui você geraria insights baseados nos dados reais
    const insights = [
        {
            type: 'positive',
            icon: 'trending_up',
            title: 'Alta demanda detectada',
            description: 'Terças e quintas à tarde têm alta procura. Considere ajustar os preços.'
        },
        {
            type: 'warning',
            icon: 'schedule',
            title: 'Horários ociosos',
            description: 'Baixa ocupação nas segundas pela manhã. Oportunidade para promoções.'
        },
        {
            type: 'info',
            icon: 'people',
            title: 'Clientes recorrentes',
            description: '60% das reservas são de clientes que retornam. Considere um programa de fidelidade.'
        }
    ];

    insightsList.innerHTML = insights.map(insight => `
        <div class="insight-item ${insight.type}">
            <span class="material-icons">${insight.icon}</span>
            <div class="insight-content">
                <h4>${insight.title}</h4>
                <p>${insight.description}</p>
            </div>
        </div>
    `).join('');
}

// Função para exportar relatório
function exportReport() {
    const reportData = {
        period: customDateRange || `Últimos ${selectedPeriod} dias`,
        metrics: {
            revenue: document.querySelector('.metric-value h2').textContent,
            occupancy: document.querySelectorAll('.metric-value h2')[1].textContent
        },
        // Adicione mais dados conforme necessário
    };

    // Aqui você implementaria a lógica real de exportação
    // Por enquanto, vamos apenas simular um download
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio-dodoor-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Função para mostrar detalhes de uma métrica
function showMetricDetails(metricName) {
    // Aqui você implementaria a lógica para mostrar mais detalhes
    // Por exemplo, abrindo um modal com informações detalhadas
    console.log(`Mostrando detalhes para: ${metricName}`);
}

// Função para inicializar todos os gráficos
function initCharts() {
    createRevenueChart();
    createOccupancyChart();
    createPeriodChart();
}

// Inicializa o dashboard quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initDashboard);

// Adiciona eventos de navegação
document.querySelectorAll('.sidebar nav ul li').forEach(item => {
    item.addEventListener('click', () => {
        const page = item.getAttribute('data-page');
        if (page) {
            navigateToPage(page);
        }
    });
});

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
        'Ajuda': '#',
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
