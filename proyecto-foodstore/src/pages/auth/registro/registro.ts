// ─── TIPOS ───────────────────────────────────────────────
// Definimos cómo luce cada usuario (objeto con 4 campos)
interface Usuario {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
}

// ─── PASO 1: Agarrar el formulario del HTML ───────────────
const formulario = document.getElementById("formRegistro") as HTMLFormElement;

// ─── PASO 2: Escuchar cuando el usuario hace click en "Registrarse" ───
formulario.addEventListener("submit", function (evento) {

    // Evitamos que la página se recargue (comportamiento normal de un form)
    evento.preventDefault();

    // ─── PASO 3: Leer lo que escribió el usuario ──────────
    const nombre    = (document.getElementById("nombre")   as HTMLInputElement).value;
    const apellido  = (document.getElementById("apellido") as HTMLInputElement).value;
    const email     = (document.getElementById("email")    as HTMLInputElement).value;
    const password  = (document.getElementById("password") as HTMLInputElement).value;

    // ─── PASO 4: Crear objeto con los datos del usuario ───
    const nuevoUsuario: Usuario = {
        nombre,
        apellido,
        email,
        password
    };

    // ─── PASO 5: Leer usuarios que ya existen en localStorage ───
    // localStorage solo guarda texto, por eso usamos JSON.parse para convertirlo a Array
    // Si no hay nada guardado todavía, usamos un array vacío []
    const usuariosGuardados = localStorage.getItem("users");
    const listaUsuarios: Usuario[] = usuariosGuardados ? JSON.parse(usuariosGuardados) : [];
const emailExiste = listaUsuarios.some(user => user.email === nuevoUsuario.email);

if (emailExiste) {
    alert("Este correo electrónico ya está registrado. Intentá con otro.");
    return; // Cortamos la ejecución aquí para que no siga al PASO 6 y 7
}

    // ─── PASO 6: Agregar el nuevo usuario al array ────────
    listaUsuarios.push(nuevoUsuario);

    // ─── PASO 7: Guardar el array actualizado en localStorage ───
    // JSON.stringify convierte el array a texto para que localStorage pueda guardarlo
    localStorage.setItem("users", JSON.stringify(listaUsuarios));

    // ─── PASO 8: Avisar al usuario y redirigir al login ───
    alert("¡Cuenta creada con éxito!");
    window.location.href = "../login/login.html";
});
