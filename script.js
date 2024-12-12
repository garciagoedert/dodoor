// Menu Mobile
const menuIcon = document.querySelector('.menu-icon');
const mobileMenu = document.querySelector('.mobile-menu');
const closeBtn = document.querySelector('.close-btn');
const overlay = document.querySelector('.overlay');

function toggleMenu() {
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

menuIcon?.addEventListener('click', toggleMenu);
closeBtn?.addEventListener('click', toggleMenu);
overlay?.addEventListener('click', toggleMenu);

// Fechar menu ao clicar em um link
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        toggleMenu();
    });
});

// Espaços disponíveis
const spaces = [
    {
        image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80',
        title: 'Consultório Odontológico Moderno',
        location: 'Florianópolis - Campeche',
        price: 'R$ 75,00/hora',
        rating: 4.8,
        reviews: 32,
        type: 'odonto',
        id: 1
    },
    {
        image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800&q=80',
        title: 'Sala para Fisioterapia',
        location: 'Florianópolis - Centro',
        price: 'R$ 60,00/hora',
        rating: 4.6,
        reviews: 28,
        type: 'fisio',
        id: 2
    },
    {
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
        title: 'Espaço para Academia',
        location: 'Florianópolis - Ingleses',
        price: 'R$ 90,00/hora',
        rating: 4.9,
        reviews: 45,
        type: 'academia',
        id: 3
    },
    {
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
        title: 'Coworking Premium',
        location: 'Florianópolis - Itacorubi',
        price: 'R$ 45,00/hora',
        rating: 4.7,
        reviews: 38,
        type: 'coworking',
        id: 4
    }
];

// Função para criar card de espaço
function createSpaceCard(space) {
    const stars = Array(5).fill('').map((_, index) => {
        if (index < Math.floor(space.rating)) {
            return '<i class="fas fa-star"></i>';
        } else if (index === Math.floor(space.rating) && space.rating % 1 >= 0.5) {
            return '<i class="fas fa-star-half-alt"></i>';
        } else {
            return '<i class="far fa-star"></i>';
        }
    }).join('');

    return `
        <a href="space.html?id=${space.id}" class="space-card" data-type="${space.type}">
            <div class="space-image">
                <img src="${space.image}" alt="${space.title}" onerror="this.src='https://via.placeholder.com/400x300/f3f4f6/666666.png?text=Espa%C3%A7o+Indispon%C3%ADvel'">
                <button class="favorite-btn" aria-label="Adicionar aos favoritos">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            <div class="space-info">
                <h3>${space.title}</h3>
                <p class="location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${space.location}
                </p>
                <p class="price">${space.price}</p>
                <div class="rating">
                    <div class="stars">
                        ${stars}
                    </div>
                    <span class="rating-value">${space.rating}</span>
                    <span class="reviews">(${space.reviews} avaliações)</span>
                </div>
            </div>
        </a>
    `;
}

// Renderizar espaços na grid
const grid = document.querySelector('.grid');
if (grid) {
    grid.innerHTML = spaces.map(space => createSpaceCard(space)).join('');

    // Adicionar evento de favorito aos cards
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const icon = btn.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            icon.classList.toggle('favorited');
            e.preventDefault();
            e.stopPropagation();
        });
    });
}

// Categorias
const categoryItems = document.querySelectorAll('.category-item');
categoryItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remover classe active de todas as categorias
        categoryItems.forEach(cat => cat.classList.remove('active'));
        // Adicionar classe active na categoria clicada
        item.classList.add('active');
        
        // Filtrar espaços baseado na categoria
        const type = item.querySelector('span').textContent.toLowerCase();
        filterSpaces(type);
    });
});

// Função para filtrar espaços
function filterSpaces(type) {
    const spaceCards = document.querySelectorAll('.space-card');
    
    spaceCards.forEach(card => {
        if (type === 'todos' || card.dataset.type === type) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
