// home.ts
import { PRODUCTS, getCategories } from './../../../data/data';

// 1. Capturamos los elementos del DOM una sola vez al principio
const contenedor = document.getElementById('contenedor-productos');
const inputBuscador = document.getElementById('buscador') as HTMLInputElement;

// 2. Función principal para renderizar
function renderizarCatalogo() {
    // Verificamos que el contenedor exista para evitar el error de "posible null"
    if (!contenedor) return;

    // Obtener filtros (Categoría de la URL + Texto del Buscador)
    const urlParams = new URLSearchParams(window.location.search);
    const idFiltro = urlParams.get('filtro');
    const textoBusqueda = inputBuscador?.value.toLowerCase() || "";

    // Aplicar los filtros
    const productosFiltrados = PRODUCTS.filter(prod => {
        // Filtro por categoría
        const coincideCategoria = idFiltro 
            ? prod.categorias.some(cat => cat.id === parseInt(idFiltro)) 
            : true;

        // Filtro por texto
        const coincideNombre = prod.nombre.toLowerCase().includes(textoBusqueda);
        const coincideDescripcion = prod.descripcion.toLowerCase().includes(textoBusqueda);

        return coincideCategoria && (coincideNombre || coincideDescripcion);
    });

    // Limpiar el contenedor antes de dibujar
    contenedor.innerHTML = "";
    
    if (productosFiltrados.length === 0) {
        contenedor.innerHTML = `<p class="error-busqueda">No encontramos nada que coincida con "${textoBusqueda}"</p>`;
        return;
    }

    // Dibujar los productos
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

    // IMPORTANTE: Configurar botones después de crear el HTML
    configurarBotones();
}

// 3. Lógica del Carrito
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

// 4. Event Listeners
inputBuscador?.addEventListener('input', () => {
    renderizarCatalogo();
});

// Carga inicial al abrir la página
renderizarCatalogo();

// home.ts


const contenedorCategorias = document.getElementById('lista-categorias-home');

function renderizarBarraCategorias() {
    if (!contenedorCategorias) return;

    const categorias = getCategories();
    contenedorCategorias.innerHTML = "";

    // Botón para "Ver Todos"
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
            
            // Actualizamos la URL sin recargar la página (esto es muy Pro)
            const url = new URL(window.location.href);
            if (id === "all") {
                url.searchParams.delete('filtro');
            } else {
                url.searchParams.set('filtro', id!);
            }
            window.history.pushState({}, '', url);

            // Llamamos a la función que ya tenés para filtrar y mostrar
            renderizarCatalogo();
        });
    });
}

// home.ts -> dentro de renderizarBarraCategorias o al final del archivo
function resaltarBotonActivo() {
    const params = new URLSearchParams(window.location.search);
    const idActivo = params.get('filtro') || 'all';

    const botones = document.querySelectorAll('.btn-categoria');
    botones.forEach(btn => {
        const botonEl = btn as HTMLButtonElement;
        if (botonEl.dataset.id === idActivo) {
            botonEl.classList.add('active'); // Asegurate de tener .active en tu CSS
        } else {
            botonEl.classList.remove('active');
        }
    });
}

// Llamala siempre después de renderizar la barra y el catálogo
resaltarBotonActivo();

// En el inicio del archivo, además de renderizarCatalogo:
renderizarBarraCategorias();
renderizarCatalogo();
// home.ts - Al final del archivo

// Modificamos para que el resaltado sea parte del renderizado
function ejecutarTodo() {
    renderizarBarraCategorias();
    renderizarCatalogo();
    resaltarBotonActivo();
}

// Escuchar cuando el usuario vuelve atrás/adelante en el navegador
window.addEventListener('popstate', () => {
    renderizarCatalogo();
    resaltarBotonActivo();
});

// Ejecución inicial
ejecutarTodo();