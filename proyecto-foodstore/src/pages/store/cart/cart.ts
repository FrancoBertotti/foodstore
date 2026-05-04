
import type { Product } from './../../../types/product';

const contenedor = document.getElementById('lista-carrito');
const totalElemento = document.getElementById('precio-total');
const btnVaciar = document.getElementById('btn-vaciar');

function renderizarCarrito() {
    if (!contenedor || !totalElemento) return;

    const carritoRaw: Product[] = JSON.parse(localStorage.getItem('carrito') || '[]');
    
    if (carritoRaw.length === 0) {
        contenedor.innerHTML = "<p>El carrito está vacío.</p>";
        totalElemento.innerText = "$0";
        return;
    }

    // Agrupamos para mostrar cantidades
    const carritoAgrupado = new Map<number, { producto: Product, cantidad: number }>();
    carritoRaw.forEach((p) => {
        if (carritoAgrupado.has(p.id)) {
            carritoAgrupado.get(p.id)!.cantidad++;
        } else {
            carritoAgrupado.set(p.id, { producto: p, cantidad: 1 });
        }
    });

    contenedor.innerHTML = "";
    let totalGeneral = 0;

    carritoAgrupado.forEach((item) => {
        const subtotal = item.producto.precio * item.cantidad;
        totalGeneral += subtotal;

        const fila = document.createElement('div');
        fila.classList.add('item-carrito');
        // Agregamos el botón con un data-id para saber qué borrar
        fila.innerHTML = `
            <div class="info-producto">
                <h4>${item.producto.nombre} x${item.cantidad}</h4>
                <p>Subtotal: $${subtotal}</p>
            </div>
            <button class="btn-eliminar" data-id="${item.producto.id}">
                Eliminar todos
            </button>
        `;
        contenedor.appendChild(fila);
    });

    totalElemento.innerText = `$${totalGeneral}`;
    
    // Importante: Volver a escuchar los clicks de los nuevos botones
    configurarBotonesEliminar();
}
btnVaciar?.addEventListener('click', () => {
    if (confirm("¿Seguro que querés vaciar el carrito?")) {
        localStorage.removeItem('carrito');
        renderizarCarrito();
    }
});

function configurarBotonesEliminar() {
    const botones = document.querySelectorAll('.btn-eliminar');
    
    botones.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const id = parseInt((e.target as HTMLButtonElement).dataset.id!);
            eliminarProducto(id);
        });
    });
}

function eliminarProducto(id: number) {
    const carritoActual: Product[] = JSON.parse(localStorage.getItem('carrito') || '[]');
    
    // Filtramos: dejamos todos los productos EXCEPTO los que tengan ese ID
    const nuevoCarrito = carritoActual.filter(p => p.id !== id);
    
    // Guardamos y refrescamos la pantalla
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    renderizarCarrito();
}
renderizarCarrito();