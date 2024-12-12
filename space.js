// Dados de exemplo do espaço
const spaceData = {
    id: 1,
    name: 'Consultório Médico em Localização Privilegiada',
    location: 'Lauro Linhares, Trindade',
    price: 'R$50,00',
    rating: 4.9,
    reviews: 128,
    images: [
        'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1570174006382-148305ce4972?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?q=80&w=800&auto=format&fit=crop'
    ]
};

// Função para trocar a imagem principal
function changeMainImage(imageUrl) {
    const mainImage = document.querySelector('.main-image img');
    if (mainImage) {
        mainImage.src = imageUrl;
    }
}

// Função para inicializar o calendário
function initializeCalendar() {
    const calendar = document.querySelector('.calendar');
    if (calendar) {
        const currentDate = new Date();
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        
        renderCalendar(month, year);
    }
}

// Função para renderizar o calendário
function renderCalendar(month, year) {
    const calendar = document.querySelector('.calendar');
    if (!calendar) return;

    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                   'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    let calendarHTML = `
        <div class="calendar-header">
            <button class="prev-month">&lt;</button>
            <h3>${months[month]} ${year}</h3>
            <button class="next-month">&gt;</button>
        </div>
        <div class="calendar-grid">
            <div class="weekday">Dom</div>
            <div class="weekday">Seg</div>
            <div class="weekday">Ter</div>
            <div class="weekday">Qua</div>
            <div class="weekday">Qui</div>
            <div class="weekday">Sex</div>
            <div class="weekday">Sáb</div>
    `;

    let day = 1;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < startingDay) {
                calendarHTML += '<div class="day empty"></div>';
            } else if (day > daysInMonth) {
                calendarHTML += '<div class="day empty"></div>';
            } else {
                const isToday = day === new Date().getDate() && 
                               month === new Date().getMonth() && 
                               year === new Date().getFullYear();
                
                calendarHTML += `
                    <div class="day ${isToday ? 'today' : ''}" data-date="${year}-${month + 1}-${day}">
                        ${day}
                    </div>
                `;
                day++;
            }
        }
    }

    calendarHTML += '</div>';
    calendar.innerHTML = calendarHTML;

    // Adicionar event listeners para navegação do calendário
    const prevButton = calendar.querySelector('.prev-month');
    const nextButton = calendar.querySelector('.next-month');

    prevButton.addEventListener('click', () => {
        const newMonth = month === 0 ? 11 : month - 1;
        const newYear = month === 0 ? year - 1 : year;
        renderCalendar(newMonth, newYear);
    });

    nextButton.addEventListener('click', () => {
        const newMonth = month === 11 ? 0 : month + 1;
        const newYear = month === 11 ? year + 1 : year;
        renderCalendar(newMonth, newYear);
    });

    // Adicionar event listeners para seleção de dias
    const days = calendar.querySelectorAll('.day:not(.empty)');
    days.forEach(day => {
        day.addEventListener('click', () => {
            days.forEach(d => d.classList.remove('selected'));
            day.classList.add('selected');
        });
    });
}

// Inicializar a página
document.addEventListener('DOMContentLoaded', () => {
    // Carregar dados do espaço
    const mainImage = document.querySelector('.main-image img');
    if (mainImage) {
        mainImage.src = spaceData.images[0];
    }

    // Carregar thumbnails
    const thumbnailGrid = document.querySelector('.thumbnail-grid');
    if (thumbnailGrid) {
        thumbnailGrid.innerHTML = spaceData.images.map((image, index) => `
            <img src="${image}" alt="Imagem ${index + 1}" onclick="changeMainImage('${image}')">
        `).join('');
    }

    // Inicializar calendário
    initializeCalendar();

    // Adicionar event listener para o botão de reserva
    const reserveBtn = document.querySelector('.reserve-btn');
    if (reserveBtn) {
        reserveBtn.addEventListener('click', () => {
            const selectedDay = document.querySelector('.day.selected');
            if (selectedDay) {
                const selectedDate = selectedDay.dataset.date;
                alert(`Reserva solicitada para: ${selectedDate}`);
                // Aqui você implementaria a lógica real de reserva
            } else {
                alert('Por favor, selecione uma data para fazer a reserva.');
            }
        });
    }
});
