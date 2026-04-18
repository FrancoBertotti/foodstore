// Definimos la interfaz para que TS no nos de errores
interface User {
    username: string;
    role: 'admin' | 'client';
    isLoggedIn: boolean;
}

// 1. Función de Protección de Rutas (El Guard)
const checkAuth = (): void => {
    const sessionData = localStorage.getItem('user_session');
    const user: User | null = sessionData ? JSON.parse(sessionData) : null;
    const path = window.location.pathname;

    // Rutas públicas: chequeamos si el path contiene estas palabras clave
    const isLoginPage = path.includes('login.html');
    const isRegisterPage = path.includes('registro.html');
    const isPublicPage = isLoginPage || isRegisterPage || path === '/' || path.endsWith('index.html');

    if (!user || !user.isLoggedIn) {
        if (!isPublicPage) {
            // REDIRECCIÓN DINÁMICA: Te manda a la ruta exacta del login que definiste en Vite
            window.location.href = '/src/pages/auth/login/login.html';
        }
    } else {
        // ... resto de tu lógica de admin/client
        if (user.role === 'client' && path.includes('/admin/')) {
            window.location.href = '/index.html'; 
        }
    }
};
// 2. Función para actualizar la UI global (Navbar)
const updateNavbar = (): void => {
    const sessionData = localStorage.getItem('user_session');
    const user: User | null = sessionData ? JSON.parse(sessionData) : null;
    const logoutBtn = document.getElementById('logout-btn');
    const userInfo = document.getElementById('user-info'); // Un span o div en tu HTML

    if (user && user.isLoggedIn) {
        if (userInfo) userInfo.textContent = `Hola, ${user.username}`;
        if (logoutBtn) {
            logoutBtn.style.display = 'block';
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('user_session');
                window.location.href = 'login.html';
            });
        }
    }
};

// Ejecución inicial
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    updateNavbar();
});