import type { IUser } from "./types/IUser";
import { PRODUCTS, getCategories } from "./data/data";
import {checkAuthUser} from "./utils/auth";

// (Navbar)
    const updateNavbar = (): void => {
    const sessionData = localStorage.getItem('userData');
    const user: IUser | null = sessionData ? JSON.parse(sessionData) : null;
    const logoutBtn = document.getElementById('logout-btn');
    const userInfo = document.getElementById('user-info'); 

    if (user && user.loggedIn) {
        if (userInfo) userInfo.textContent = `Hola, ${user.nombre}`;
        if (logoutBtn) {
            logoutBtn.style.display = 'block';
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('userData');
                window.location.href = 'login.html';
            });
        }
    }
};

// main.ts

    const contenedorIndex = document.getElementById('contenedor-recomendados');

    function cargarRecomendados() {
    if (!contenedorIndex) return;

    // Supongamos que queremos mostrar solo los primeros 2 productos como "recomendados"
    const recomendados = PRODUCTS.slice(0, 2);

    contenedorIndex.innerHTML = ""; // Limpiar

    recomendados.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'producto-card'; // Tu clase de CSS

        card.innerHTML = `
            <img src="${prod.imagen || './src/assets/placeholder.png'}" alt="${prod.nombre}">
            <h3>${prod.nombre}</h3>
            <p>${prod.descripcion}</p>
            <strong>$${prod.precio}</strong>
            <div class="acciones">
                <button class="btn-detalles">Ver detalles</button>
                <button class="btn-agregar" data-id="${prod.id}">Agregar</button>
            </div>
        `;
        contenedorIndex.appendChild(card);
    });

    configurarBotonesCarrito();
}

// Reutilizamos la lógica del carrito que hablamos antes
function configurarBotonesCarrito() {
    const botones = document.querySelectorAll('.btn-agregar');
    botones.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt((e.target as HTMLButtonElement).dataset.id!);
            agregarAlCarrito(id);
        });
    });
}

function agregarAlCarrito(id: number) {
    const producto = PRODUCTS.find(p => p.id === id);
    if (producto) {
        const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert(`${producto.nombre} agregado al carrito`);
    }
}

// Iniciar carga
cargarRecomendados();

// main.ts (el script de tu index.html)

function inyectarCategoriasIndex() {
    const listaUl = document.getElementById('lista-categorias');
    if (!listaUl) return;

    const categorias = getCategories();
    listaUl.innerHTML = "";

    categorias.forEach(cat => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        
        // Usamos la ruta completa desde la raíz para evitar errores de nivel de carpeta
        // Y usamos 'filtro' que es lo que lee tu home.ts
        link.href = `/src/pages/store/home/home.html?filtro=${cat.id}`;
        
        link.textContent = cat.nombre;
        link.classList.add('categoria-link');

        li.appendChild(link);
        listaUl.appendChild(li);
    });
}

// Centralizá todas las ejecuciones dentro del DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    //checkAuth();
    checkAuthUser();
    updateNavbar();
    cargarRecomendados();
    inyectarCategoriasIndex(); 
});
