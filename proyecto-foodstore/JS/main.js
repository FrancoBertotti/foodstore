//console.log("hola hola")
const listaCategorias = document.getElementById("lista-categorias"); 
const cargarcategorias = () => {
    categorias.forEach((el) => {
        const li = document.createElement('li')
        li.innerHTML =`<a href="#"> ${el} </a>`
        listaCategorias.appendChild(li)
    });
};
cargarcategorias();
const articulosRecomendados = document.getElementById("contenedor-productos");
const cargarArticulos = () => {
    productos.forEach((el) => {
        const art = document.createElement('article')
        art.innerHTML = `
            <img src=${el.imagen} width="150px" alt="Pizza Marguerita">
            <h3>${el.nombre}</h3>
            <p>${el.descripcion}</p>
            <strong>${el.precio}</strong><br><br>
            <button type="button" class="b-detalles">Ver detalles</button>
            <button type="button" class="b-agregar" >Agregar</button>
        `
        const botonA = art.querySelector('.b-agregar');
        botonA.addEventListener('click', () => {
            alert("Se agrego al carrito: " + el.nombre);
        });
        const botonD = art.querySelector('.b-detalles');
        botonD.addEventListener('click', () => {
            alert("Detalles: " + el.nombre + ", disponible para envios.");
        });
        articulosRecomendados.appendChild(art)
    });
};

cargarArticulos();