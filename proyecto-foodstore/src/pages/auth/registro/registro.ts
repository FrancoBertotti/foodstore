interface Usuario {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    role: "client" | "admin";
    loggedIn: boolean;
}

const formulario = document.getElementById("formRegistro") as HTMLFormElement;

formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();

    const nombre    = (document.getElementById("nombre")   as HTMLInputElement).value;
    const apellido  = (document.getElementById("apellido") as HTMLInputElement).value;
    const email     = (document.getElementById("email")    as HTMLInputElement).value;
    const password  = (document.getElementById("password") as HTMLInputElement).value;

    const nuevoUsuario: Usuario = {
        nombre,
        apellido,
        email,
        password,
        role: 'client',
        loggedIn: false
    };

    const usuariosGuardados = localStorage.getItem("users");
    const listaUsuarios: Usuario[] = usuariosGuardados ? JSON.parse(usuariosGuardados) : [];
    const emailExiste = listaUsuarios.some(user => user.email === nuevoUsuario.email);

if (emailExiste) {
    alert("Este correo electrónico ya está registrado. Intentá con otro.");
    return; 
}

    listaUsuarios.push(nuevoUsuario);

    localStorage.setItem("users", JSON.stringify(listaUsuarios));

    alert("¡Cuenta creada con éxito!");
    window.location.href = "../login/login.html";
});
