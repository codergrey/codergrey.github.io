const API_URL = 'https://api.escuelajs.co/api/v1/products';
        const catalogo = document.getElementById('catalogo');
    
        async function fetchProducts() {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error('Error al obtener los productos');
                }
                const products = await response.json();
                renderProducts(products);
            } catch (error) {
                console.error(error);
            }
        }

        function renderProducts(products) {
            catalogo.innerHTML = '';
            products.forEach(product => {
                const card = document.createElement('div');
                card.classList.add('producto');
                card.innerHTML = `
                    <div class="imagen">
                        <img src="${product.images[0]}" alt="${product.title}">
                    </div>
                    <h3>${product.title}</h3>
                    <p>$${product.price}</p>
                    <button>AGREGAR AL CARRITO</button>
                `;
                catalogo.appendChild(card);
            });
            
            document.querySelectorAll('.producto button').forEach(btn => {
                btn.addEventListener('click', Anadir);
            });
        }

        document.addEventListener('DOMContentLoaded', fetchProducts);