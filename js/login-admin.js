
document.addEventListener("DOMContentLoaded", function() {

    const formulario = document.getElementById("formularioLogin");

    console.log("LOGIN ADMINISTRADOR CARGADO");

    formulario.addEventListener("submit", function(event) {

        event.preventDefault();

        const usuario = document.getElementById("usuario").value.trim();
        const contrasena = document.getElementById("contrasena").value;
        const mensaje = document.getElementById("mensajeError");

        console.log("Botón de inicio presionado");

        if (usuario === "cristhian" && contrasena === "Cristhian361") {

            sessionStorage.setItem("sesionAdmin", "activa");
            window.location.href = "admin.html";

        } else {

            mensaje.textContent = "Usuario o contraseña incorrectos.";

        }

    });

});
