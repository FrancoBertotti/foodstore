import type { IUser } from "./types/IUser";
import { PRODUCTS, getCategories } from "./data/data";
import {checkAuthUser} from "./utils/auth";

// Navbar
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
                localStorage.removeItem('userData'); // se puede usar la funcion del auth (proxima mejora)
                window.location.href = 'login.html';
            });
        }
    }
};

// main de index productos recomendados, 

    const contenedorIndex = document.getElementById('contenedor-recomendados');

    function cargarRecomendados() {
    if (!contenedorIndex) return;

    const recomendados = PRODUCTS.slice(0, 2);

    contenedorIndex.innerHTML = "";

    recomendados.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'producto-card'; 

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

// lógica del carrito llamada por la funcion de arriba
function configurarBotonesCarrito() {
    const botones = document.querySelectorAll('.btn-agregar');
    botones.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt((e.target as HTMLButtonElement).dataset.id!);
            agregarAlCarrito(id);
        });
    });
}

//funcion que puede estar en cart.ts en la siguiente mejora
function agregarAlCarrito(id: number) {
    const producto = PRODUCTS.find(p => p.id === id);
    if (producto) {
        const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert(`${producto.nombre} agregado al carrito`);
    }
}

// Se inyecta las categorias en el index quye redirigen al home(catalogo)

function inyectarCategoriasIndex() {
    const listaUl = document.getElementById('lista-categorias');
    if (!listaUl) return;

    const categorias = getCategories();
    listaUl.innerHTML = "";

    categorias.forEach(cat => {
        const li = document.createElement('li');
        const link = document.createElement('a');

        link.href = `/src/pages/store/home/home.html?filtro=${cat.id}`;
        
        link.textContent = cat.nombre;
        link.classList.add('categoria-link');

        li.appendChild(link);
        listaUl.appendChild(li);
    });
}

// ejecuciones dentro del DOMContentLoaded una vez cargado el DOM
document.addEventListener('DOMContentLoaded', () => {
    checkAuthUser();
    updateNavbar();
    cargarRecomendados();
    inyectarCategoriasIndex(); 
});
