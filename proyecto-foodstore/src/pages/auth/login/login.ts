import '../../../style.css'
import '../../../login.css'
console.log("prueba conexion")

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {

    app.innerHTML = `
    <main>
        <div class="card">
            <img class="logo" src="../../../assets/logoSinFondo.png" width="150px" alt="Logo">
            <h3 class="titulo">Iniciar Sesión</h3>

            <form class="formulario" id="formulario">
                <div class="campo">
                    <label class="contra" for="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="ejemplo@mail.com" required>
                </div>

                <div class="campo">
                    <label class="contra" for="password">Contraseña</label>
                    <input type="password" id="password" name="password" placeholder="********" required>
                </div>

                <button type="submit" class="botonEntrar">Entrar</button>
            </form>

            <p>¿No tenes cuenta? <a class="link" href="../registro/registro.html">Registrate</a></p>
        </div>
    </main>
    `;

    const formLogin = document.getElementById("formulario") as HTMLFormElement;

    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();

        // 3. Capturamos los inputs por sus IDs
        const emailInput = document.getElementById("email") as HTMLInputElement;
        const passwordInput = document.getElementById("password") as HTMLInputElement;

        // 4. Traemos los usuarios de localStorage
        const usuariosGuardados = localStorage.getItem("users");
        const listaUsuarios = usuariosGuardados ? JSON.parse(usuariosGuardados) : [];

        // 5. Buscamos la coincidencia
        const usuarioEncontrado = listaUsuarios.find((u: any) => 
            u.email.toLowerCase() === emailInput.value.toLowerCase() && 
            u.password === passwordInput.value
        );

        if (usuarioEncontrado) {
            // Guardamos la sesión
            localStorage.setItem("userData", JSON.stringify(usuarioEncontrado));
            alert(`¡Hola ${usuarioEncontrado.nombre}! Iniciando sesión...`);
            
            // Redirección al index (ajustá los ../ según tu carpeta)
            window.location.href = "../../../../index.html";
        } else {
            alert("Email o contraseña incorrectos.");
        }
    });
}