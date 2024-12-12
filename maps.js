// Função para criar estilo personalizado para o mapa
function createCustomMap(elementId, options = {}) {
    const defaultOptions = {
        zoomControl: false,
        scrollWheelZoom: true
    };
    
    const map = L.map(elementId, { ...defaultOptions, ...options });
    
    // Adiciona o layer do OpenStreetMap com estilo claro
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        className: 'map-tiles'
    }).addTo(map);

    // Adiciona controles de zoom em posição personalizada
    L.control.zoom({
        position: 'bottomright'
    }).addTo(map);

    return map;
}

// Função para inicializar o mapa na página de espaços
function initSpaceMap(lat = -27.5717, lng = -48.5482) {
    // Verifica se o elemento do mapa existe
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    // Cria o mapa com estilo personalizado
    const map = createCustomMap('map', {
        center: [lat, lng],
        zoom: 14
    });

    // Cria um ícone personalizado para o marcador
    const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div class="marker-pin"></div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 30]
    });

    // Adiciona o marcador com o ícone personalizado
    L.marker([lat, lng], { icon: customIcon })
        .addTo(map)
        .bindPopup('<strong>Localização do Espaço</strong><br>Clique para mais detalhes')
        .openPopup();

    // Adiciona estilos CSS para o marcador
    const style = document.createElement('style');
    style.textContent = `
        .custom-marker {
            background: none;
            border: none;
        }
        .marker-pin {
            width: 30px;
            height: 30px;
            border-radius: 50% 50% 50% 0;
            background: var(--primary-color);
            position: absolute;
            transform: rotate(-45deg);
            left: 50%;
            top: 50%;
            margin: -15px 0 0 -15px;
            animation: bounce 0.5s ease-out;
        }
        .marker-pin::after {
            content: '';
            width: 14px;
            height: 14px;
            margin: 8px 0 0 8px;
            background: white;
            position: absolute;
            border-radius: 50%;
        }
        @keyframes bounce {
            0% {
                transform: rotate(-45deg) translateY(-20px);
                opacity: 0;
            }
            100% {
                transform: rotate(-45deg) translateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

// Função para inicializar o mapa na página de anúncio com múltiplos preços
function initPriceMap(lat = -27.5717, lng = -48.5482) {
    // Verifica se o elemento do mapa existe
    const mapElement = document.getElementById('price-map');
    if (!mapElement) return;

    // Cria o mapa com estilo personalizado
    const map = createCustomMap('price-map', {
        center: [lat, lng],
        zoom: 12
    });

    // Dados de exemplo de preços em diferentes localizações
    const pricePoints = [
        { lat: -27.5917, lng: -48.5482, price: 'R$262' },
        { lat: -27.5817, lng: -48.5382, price: 'R$457' },
        { lat: -27.5617, lng: -48.5582, price: 'R$510' },
        { lat: -27.5517, lng: -48.5282, price: 'R$444' },
        { lat: -27.5417, lng: -48.5182, price: 'R$2.377' },
        { lat: -27.5717, lng: -48.5682, price: 'R$1.016' },
        { lat: -27.5817, lng: -48.5782, price: 'R$305' },
        { lat: -27.5917, lng: -48.5882, price: 'R$554' }
    ];

    // Adiciona os marcadores de preço com estilo personalizado
    pricePoints.forEach((point, index) => {
        const priceIcon = L.divIcon({
            className: 'price-marker',
            html: `<div class="price-tag" style="animation-delay: ${index * 0.1}s">${point.price}</div>`,
            iconSize: [80, 30],
            iconAnchor: [40, 15]
        });

        L.marker([point.lat, point.lng], { icon: priceIcon })
            .addTo(map)
            .bindPopup(`<strong>Preço médio da região:</strong><br>${point.price}/hora`);
    });

    // Adiciona estilos CSS para os marcadores de preço
    const style = document.createElement('style');
    style.textContent = `
        .price-marker {
            background: none;
            border: none;
        }
        .price-tag {
            background: white;
            padding: 8px 16px;
            border-radius: 20px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
            font-weight: 600;
            font-size: 1rem;
            color: var(--text-color);
            white-space: nowrap;
            opacity: 0;
            animation: fadeInPrice 0.5s ease-out forwards;
            transition: transform 0.2s ease;
        }
        .price-tag:hover {
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 6px 12px rgba(0,0,0,0.2);
        }
        @keyframes fadeInPrice {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Inicializa os mapas quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Tenta inicializar o mapa da página de espaços
    initSpaceMap();
    
    // Tenta inicializar o mapa da página de preços
    initPriceMap();
});
