// utils/auth.js
export const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Sesión cerrada");
    window.location.href = "/"; // Redirige a la pagina principal
  };
  