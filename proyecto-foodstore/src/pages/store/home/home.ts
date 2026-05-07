import { PRODUCTS, getCategories } from './../../../data/data';

const contenedor = document.getElementById('contenedor-productos');
const inputBuscador = document.getElementById('buscador') as HTMLInputElement;

// para renderizar
function renderizarCatalogo() {
    if (!contenedor) return;

    const urlParams = new URLSearchParams(window.location.search);
    const idFiltro = urlParams.get('filtro');
    const textoBusqueda = inputBuscador?.value.toLowerCase() || "";
    const productosFiltrados = PRODUCTS.filter(prod => {
        // Filtro por categoria
        const coincideCategoria = idFiltro 
            ? prod.categorias.some(cat => cat.id === parseInt(idFiltro)) 
            : true;

        // Filtro por texto
        const coincideNombre = prod.nombre.toLowerCase().includes(textoBusqueda);
        const coincideDescripcion = prod.descripcion.toLowerCase().includes(textoBusqueda);

        return coincideCategoria && (coincideNombre || coincideDescripcion);
    });

    // Limpia el contenedor
    contenedor.innerHTML = "";
    
    if (productosFiltrados.length === 0) {
        contenedor.innerHTML = `<p class="error-busqueda">No encontramos nada que coincida con "${textoBusqueda}"</p>`;
        return;
    }

    // inyeccion html
    productosFiltrados.forEach(prod => {
        if (!prod.eliminado) {
            const card = document.createElement('article');
            card.className = 'producto-card';
            card.innerHTML = `
                <img src="${prod.imagen || '/src/assets/placeholder.png'}" alt="${prod.nombre}">
                <h3>${prod.nombre}</h3>
                <p>${prod.descripcion}</p>
                <strong>$${prod.precio}</strong>
                <div class="acciones">
                    <button class="btn-detalles">Ver detalles</button>
                    <button class="btn-agregar" data-id="${prod.id}">Agregar</button>
                </div>
                `;
            contenedor.appendChild(card);
        }
    });

    configurarBotones();
}

//Carrito para pasar proximante al otro TS
function configurarBotones() {
    const botones = document.querySelectorAll('.btn-agregar');
    botones.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const el = e.target as HTMLButtonElement;
            const id = parseInt(el.dataset.id!);
            agregarAlCarrito(id);
        });
    });
}

function agregarAlCarrito(id: number) {
    const productoEncontrado = PRODUCTS.find(p => p.id === id);
    if (productoEncontrado) {
        const carritoActual = JSON.parse(localStorage.getItem('carrito') || '[]');
        carritoActual.push(productoEncontrado);
        localStorage.setItem('carrito', JSON.stringify(carritoActual));
        alert(`${productoEncontrado.nombre} se agregó al carrito`);
    }
}

inputBuscador?.addEventListener('input', () => {
    renderizarCatalogo();
});

const contenedorCategorias = document.getElementById('lista-categorias-home');

function renderizarBarraCategorias() {
    if (!contenedorCategorias) return;

    const categorias = getCategories();
    contenedorCategorias.innerHTML = "";

    // Boton "Ver Todos"
    const liTodos = document.createElement('li');
    liTodos.innerHTML = `<button class="btn-categoria" data-id="all">Todos</button>`;
    contenedorCategorias.appendChild(liTodos);

    categorias.forEach(cat => {
        const li = document.createElement('li');
        li.innerHTML = `<button class="btn-categoria" data-id="${cat.id}">${cat.nombre}</button>`;
        contenedorCategorias.appendChild(li);
    });

    configurarClicksCategorias();
}

function configurarClicksCategorias() {
    const botones = document.querySelectorAll('.btn-categoria');
    botones.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = (e.target as HTMLButtonElement).dataset.id;
            
            const url = new URL(window.location.href);
            if (id === "all") {
                url.searchParams.delete('filtro');
            } else {
                url.searchParams.set('filtro', id!);
            }
            window.history.pushState({}, '', url);

            renderizarCatalogo();
        });
    });
}

function resaltarBotonActivo() {
    const params = new URLSearchParams(window.location.search);
    const idActivo = params.get('filtro') || 'all';

    const botones = document.querySelectorAll('.btn-categoria');
    botones.forEach(btn => {
        const botonEl = btn as HTMLButtonElement;
        if (botonEl.dataset.id === idActivo) {
            botonEl.classList.add('active');
        } else {
            botonEl.classList.remove('active');
        }
    });
}

function ejecutarTodo() {
    renderizarBarraCategorias();
    renderizarCatalogo();
    resaltarBotonActivo();
}

// cuando se regar la pag en el navegador
window.addEventListener('popstate', () => {
    renderizarCatalogo();
    resaltarBotonActivo();
});

// Ejecución inicial
ejecutarTodo();