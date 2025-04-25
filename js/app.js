// PROBLEMAS DETECTADOS Y SOLUCIONES:

// 1. Función duplicada: checkAuthState está declarada dos veces
// Solución: Eliminar la duplicación y dejar solo la versión actualizada

// 2. Falta función logout()
// Añadir al final:
function logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('cart');
    window.location.href = 'index.html';
}

// 3. Mejorar manejo de errores en fetch
// Modificar todas las llamadas fetch para incluir:
// .then(res => {
//   if (!res.ok) throw new Error(res.statusText);
//   return res.json();
// })

// 4. Mejorar seguridad en el carrito
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// 5. Optimizar addToCart
async function addToCart(productId) {
    try {
        const response = await fetch(`/api/productos/${productId}`);
        if (!response.ok) throw new Error('Producto no encontrado');
        const producto = await response.json();
        
        // Resto del código igual...
    } catch (error) {
        showAlert(error.message, 'danger');
    }
}

// VERSIÓN CORREGIDA Y MEJORADA:
document.addEventListener('DOMContentLoaded', () => {
    checkAuthState();
    loadCategories();
    updateCartCounter(); // Añadir esto para inicializar el contador
});

// Función de autenticación única y mejorada
async function checkAuthState() {
    const token = localStorage.getItem('jwt');
    const authButtons = document.getElementById('authButtons');
    
    if (token) {
        try {
            const response = await fetch('/api/auth/profile', {
                headers: {'Authorization': `Bearer ${token}`}
            });
            
            if (!response.ok) throw new Error('Sesión expirada');
            
            const user = await response.json();
            authButtons.innerHTML = `
                <div class="dropdown">
                    <button class="btn btn-outline-light dropdown-toggle" data-bs-toggle="dropdown">
                        ${user.nombre}
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="${user.rol === 'VENDEDOR' ? 'dashboard-vendedor.html' : 'perfil.html'}">Mi Perfil</a></li>
                        <li><button class="dropdown-item" onclick="logout()">Cerrar Sesión</button></li>
                    </ul>
                </div>
            `;
        } catch (error) {
            console.error('Error de autenticación:', error);
            showAlert('Sesión expirada. Por favor ingresa nuevamente', 'warning');
            logout();
        }
    } else {
        authButtons.innerHTML = `
            <a href="login.html" class="btn btn-outline-light">Login</a>
            <a href="registro.html" class="btn btn-primary">Registro</a>
        `;
    }
}

// Función logout (añadir)
function logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('cart');
    window.location.href = 'index.html';
}

// Mejorar loadProducts con manejo de errores
async function loadProducts() {
    try {
        const response = await fetch('/api/productos');
        if (!response.ok) throw new Error('Error cargando productos');
        
        const productos = await response.json();
        
        if (!productos.length) {
            showAlert('No hay productos disponibles', 'info');
            return;
        }
        
        const productsGrid = document.getElementById('productsGrid');
        productsGrid.innerHTML = productos.map(producto => `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="${producto.imagenUrl}" class="card-img-top" alt="${producto.nombre}" 
                         onerror="this.src='placeholder-product.jpg'">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                        <p class="h4">$${producto.precio.toFixed(2)}</p>
                        <button onclick="addToCart(${producto.id})" class="btn btn-primary">
                            Agregar al carrito
                        </button>
                        <a href="producto.html?id=${producto.id}" class="btn btn-outline-secondary">
                            Ver detalles
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error:', error);
        showAlert(error.message, 'danger');
    }
}

// Mejoras adicionales recomendadas:

// 1. Añadir validación de formularios
function validateRegisterForm() {
    const password = document.getElementById('password').value;
    if (password.length < 8) {
        showAlert('La contraseña debe tener al menos 8 caracteres', 'warning');
        return false;
    }
    return true;
}

// 2. Mejorar el manejo del carrito
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
}

// 3. Añadir eliminación de productos del carrito
function removeFromCart(productId) {
    const cart = getCart().filter(item => item.id !== productId);
    saveCart(cart);
}

// 4. Mejorar las alertas
function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.setAttribute('role', 'alert');
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('.container') || document.body;
    container.prepend(alert);
    
    setTimeout(() => alert.remove(), 5000);
}


//Para la busqueda en tiempo real  

// En app.js
let searchTimeout;

document.getElementById('searchInput').addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(async () => {
        const query = e.target.value.trim();
        
        if (query.length < 3) {
            loadProducts();
            return;
        }

        try {
            const response = await fetch(`/api/productos?search=${encodeURIComponent(query)}`);
            const results = await response.json();
            renderProducts(results);
        } catch (error) {
            console.error('Error en búsqueda:', error);
        }
    }, 500);
});

function renderProducts(productos) {
    const container = document.getElementById('productsGrid');
    container.innerHTML = productos.map(/* ... */).join('');
    
    if (!productos.length) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <h4>No se encontraron productos</h4>
                <p>Intenta con otros términos de búsqueda</p>
            </div>
        `;
    }
}