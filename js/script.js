
// =============================
// IDIOMA ACTUAL
// =============================

let idiomaActual = "es";

// =============================
// CAMBIO DE IDIOMA
// =============================

const botonIdioma = document.getElementById("botonIdioma");
const menuIdioma = document.getElementById("menuIdioma");

if (botonIdioma && menuIdioma) {

    botonIdioma.addEventListener("click", function () {

        if (menuIdioma.style.display === "block") {
            menuIdioma.style.display = "none";
        } else {
            menuIdioma.style.display = "block";
        }

    });

}


// =============================
// ELEMENTOS DE PROYECTOS
// =============================

const contenedorProyectos = document.querySelector(".contenedor-proyectos");

const botonesFiltro = document.querySelectorAll(".filtro");
const buscadorProyecto = document.querySelector(".buscador-proyectos input");
const botonBuscarProyecto = document.querySelector(".buscador-proyectos button");

const modalProyecto = document.getElementById("modal-proyecto");
const cerrarModal = document.getElementById("cerrar-modal");

const tituloModal = document.getElementById("titulo-modal");
const ubicacionModal = document.getElementById("ubicacion-modal");
const descripcionModal = document.getElementById("descripcion-modal");

let proyectosCatalogo = [];
let filtroActual = "todos";
let busquedaActual = "";
let proyectoModalActual = null;


// =============================
// TRADUCIR CATEGORÍAS
// =============================

function traducirCategoria(categoria) {

    if (idiomaActual === "en") {

        const categorias = {
            "Residencial": "Residential",
            "Comercial": "Commercial",
            "Infraestructura": "Infrastructure",
            "Industrial": "Industrial"
        };

        return categorias[categoria] || categoria;

    }

    return categoria;

}


// =============================
// TRADUCIR NOMBRE
// =============================

function traducirNombre(proyecto) {

    if (idiomaActual === "en") {
        return proyecto.nombreEn || proyecto.nombre;
    }

    return proyecto.nombre;

}


// =============================
// TRADUCIR DESCRIPCIÓN
// =============================

function traducirDescripcion(proyecto) {

    if (idiomaActual === "en") {
        return proyecto.descripcionEn || proyecto.descripcion;
    }

    return proyecto.descripcion;

}


// =============================
// CAMBIAR IDIOMA
// =============================

function cambiarIdioma(idioma) {

    idiomaActual = idioma;

    const elementos = document.querySelectorAll("[data-es][data-en]");

    elementos.forEach(function (elemento) {

        elemento.textContent = elemento.getAttribute("data-" + idioma);

    });


    // BUSCADOR PRINCIPAL

    const campoBuscarPrincipal = document.getElementById("campoBuscar");

    if (campoBuscarPrincipal) {

        campoBuscarPrincipal.placeholder =
            idioma === "en" ? "Search..." : "Buscar...";

    }

    const btnBuscarPrincipal = document.getElementById("btnBuscar");

    if (btnBuscarPrincipal) {

        btnBuscarPrincipal.textContent =
            idioma === "en" ? "Search" : "Buscar";

    }


    // BUSCADOR DE PROYECTOS

    if (buscadorProyecto) {

        buscadorProyecto.placeholder =
            idioma === "en" ? "Search project..." : "Buscar proyecto...";

    }


    // CERRAR MENÚ DE IDIOMA

    if (menuIdioma) {
        menuIdioma.style.display = "none";
    }


    // ACTUALIZAR GALERÍA

    if (contenedorProyectos) {
        mostrarGaleria();
    }


    // ACTUALIZAR MODAL SI ESTÁ ABIERTO

    if (proyectoModalActual) {
        mostrarDatosModal(proyectoModalActual);
    }

}


// =============================
// BUSCADOR PRINCIPAL
// =============================

const botonBuscar = document.getElementById("botonBuscar");
const buscador = document.getElementById("buscador");
const campoBuscar = document.getElementById("campoBuscar");
const btnBuscar = document.getElementById("btnBuscar");

if (botonBuscar && buscador) {

    botonBuscar.addEventListener("click", function () {

        if (buscador.style.display === "flex") {
            buscador.style.display = "none";
        } else {
            buscador.style.display = "flex";

            if (campoBuscar) {
                campoBuscar.focus();
            }
        }

    });

}


if (btnBuscar && campoBuscar) {

    function ejecutarBusquedaPrincipal() {

        const texto = campoBuscar.value.toLowerCase().trim();

        if (texto === "") {

            alert(
                idiomaActual === "en"
                    ? "Enter something to search."
                    : "Escribe algo para buscar."
            );

            return;

        }


        if (texto === "inicio" || texto === "home") {
            window.location.href = "index.html";
            return;
        }


        if (
            texto === "nosotros" ||
            texto === "about" ||
            texto === "about us"
        ) {

            window.location.href = "nosotros.html";
            return;

        }


        if (
            texto === "servicio" ||
            texto === "servicios" ||
            texto === "service" ||
            texto === "services"
        ) {

            window.location.href = "servicios.html";
            return;

        }


        if (
            texto === "proyecto" ||
            texto === "proyectos" ||
            texto === "project" ||
            texto === "projects"
        ) {

            window.location.href = "proyectos.html";
            return;

        }


        if (texto === "tienda" || texto === "store") {

            window.location.href = "tienda.html";
            return;

        }


        if (
            texto === "contacto" ||
            texto === "contact" ||
            texto === "cotizacion" ||
            texto === "cotización" ||
            texto === "quote"
        ) {

            window.location.href = "contacto.html";
            return;

        }


        alert(
            idiomaActual === "en"
                ? "Not found: " + campoBuscar.value
                : "No se encontró: " + campoBuscar.value
        );

    }


    btnBuscar.addEventListener("click", ejecutarBusquedaPrincipal);


    campoBuscar.addEventListener("keydown", function (evento) {

        if (evento.key === "Enter") {
            ejecutarBusquedaPrincipal();
        }

    });

}


// =============================
// CATÁLOGO DE PROYECTOS
// =============================

if (contenedorProyectos && window.AeroCatalogo) {

    proyectosCatalogo = window.AeroCatalogo.obtener();

    mostrarGaleria();

}


// =============================
// MOSTRAR TARJETAS
// =============================

function mostrarGaleria() {

    if (!contenedorProyectos) return;

    contenedorProyectos.textContent = "";

    proyectosCatalogo.forEach(function (proyecto, indice) {

        const tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta-proyecto";

        const categoria = proyecto.categoria.toLowerCase();

        tarjeta.setAttribute("data-categoria", categoria);
        tarjeta.setAttribute("data-indice", indice);


        // IMAGEN

        const imagenContenedor = document.createElement("div");
        imagenContenedor.className = "imagen-proyecto";

        const imagen = document.createElement("img");
        imagen.src = proyecto.imagen;
        imagen.alt = traducirNombre(proyecto);

        const etiqueta = document.createElement("span");
        etiqueta.className = "categoria-proyecto";
        etiqueta.textContent = traducirCategoria(proyecto.categoria);

        imagenContenedor.appendChild(imagen);
        imagenContenedor.appendChild(etiqueta);


        // CONTENIDO

        const contenido = document.createElement("div");
        contenido.className = "contenido-proyecto";

        const titulo = document.createElement("h3");
        titulo.textContent = traducirNombre(proyecto);

        const categoriaTexto = document.createElement("p");
        categoriaTexto.className = "ubicacion-proyecto";
        categoriaTexto.textContent = traducirCategoria(proyecto.categoria);

        const descripcion = document.createElement("p");
        descripcion.textContent = traducirDescripcion(proyecto);


        // ENLACE

        const enlace = document.createElement("a");
        enlace.href = "javascript:void(0)";
        enlace.className = "ver-proyecto";

        enlace.textContent =
            idiomaActual === "en"
                ? "View project →"
                : "Ver proyecto →";


        // UNIR ELEMENTOS

        contenido.appendChild(titulo);
        contenido.appendChild(categoriaTexto);
        contenido.appendChild(descripcion);
        contenido.appendChild(enlace);

        tarjeta.appendChild(imagenContenedor);
        tarjeta.appendChild(contenido);

        contenedorProyectos.appendChild(tarjeta);

    });

    aplicarFiltros();

}


// =============================
// APLICAR FILTROS Y BÚSQUEDA
// =============================

function aplicarFiltros() {

    const tarjetas = document.querySelectorAll(".tarjeta-proyecto");

    tarjetas.forEach(function (tarjeta) {

        const categoria = tarjeta.getAttribute("data-categoria");
        const textoTarjeta = tarjeta.textContent.toLowerCase();

        const coincideCategoria =
            filtroActual === "todos" || categoria === filtroActual;

        const coincideBusqueda =
            textoTarjeta.includes(busquedaActual);

        tarjeta.style.display =
            coincideCategoria && coincideBusqueda
                ? "block"
                : "none";

    });

}


// =============================
// BOTONES DE CATEGORÍA
// =============================

botonesFiltro.forEach(function (boton) {

    boton.addEventListener("click", function () {

        filtroActual = boton.getAttribute("data-filtro");

        botonesFiltro.forEach(function (otroBoton) {

            otroBoton.classList.remove("activo");

        });

        boton.classList.add("activo");

        aplicarFiltros();

    });

});


// =============================
// BUSCADOR DE PROYECTOS
// =============================

if (botonBuscarProyecto && buscadorProyecto) {

    botonBuscarProyecto.addEventListener("click", function () {

        busquedaActual = buscadorProyecto.value.toLowerCase().trim();

        aplicarFiltros();

    });


    buscadorProyecto.addEventListener("input", function () {

        busquedaActual = buscadorProyecto.value.toLowerCase().trim();

        aplicarFiltros();

    });

}


// =============================
// DATOS DEL MODAL
// =============================

function mostrarDatosModal(proyecto) {

    if (!proyecto) return;

    if (tituloModal) {
        tituloModal.textContent = traducirNombre(proyecto);
    }

    if (ubicacionModal) {

        ubicacionModal.textContent =
            idiomaActual === "en"
                ? "Category: " + traducirCategoria(proyecto.categoria)
                : "Categoría: " + proyecto.categoria;

    }

    if (descripcionModal) {
        descripcionModal.textContent = traducirDescripcion(proyecto);
    }

}


// =============================
// ABRIR VENTANA DEL PROYECTO
// =============================

if (contenedorProyectos) {

    contenedorProyectos.addEventListener("click", function (evento) {

        const enlace = evento.target.closest(".ver-proyecto");

        if (!enlace || !modalProyecto) return;

        const tarjeta = enlace.closest(".tarjeta-proyecto");

        const indice = Number(tarjeta.getAttribute("data-indice"));

        const proyecto = proyectosCatalogo[indice];

        if (!proyecto) return;

        proyectoModalActual = proyecto;

        mostrarDatosModal(proyecto);

        modalProyecto.style.display = "flex";

    });

}


// =============================
// CERRAR VENTANA DEL PROYECTO
// =============================

if (cerrarModal && modalProyecto) {

    cerrarModal.addEventListener("click", function () {

        modalProyecto.style.display = "none";
        proyectoModalActual = null;

    });

}


// =============================
// FORMULARIO DE CONTACTO
// =============================

document.addEventListener("DOMContentLoaded", function () {

    const btnEnviar = document.getElementById("btnEnviar");

    if (btnEnviar) {

        btnEnviar.addEventListener("click", function () {

            const nombre = document.getElementById("nombre").value.trim();
            const correo = document.getElementById("correo").value.trim();
            const telefono = document.getElementById("telefono").value.trim();
            const tipoConsulta = document.getElementById("tipoConsulta").value.trim();
            const mensaje = document.getElementById("mensaje").value.trim();


            // VALIDAR CAMPOS

            if (
                nombre === "" ||
                correo === "" ||
                telefono === "" ||
                tipoConsulta === "" ||
                mensaje === ""
            ) {

                alert("Por favor, completa todos los campos.");
                return;

            }


            // VALIDAR CORREO

            const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!formatoCorreo.test(correo)) {

                alert("Por favor, coloca tu correo correctamente.");
                return;

            }


            // CREAR SOLICITUD

            const nuevaSolicitud = {

                numero: Date.now(),
                nombre: nombre,
                correo: correo,
                telefono: telefono,
                tipoConsulta: tipoConsulta,
                mensaje: mensaje,
                fecha: new Date().toLocaleString("es-PE")

            };


            // GUARDAR EN LOCALSTORAGE

            let solicitudes = JSON.parse(
                localStorage.getItem("cotizacionesAeroEstructuras")
            ) || [];

            solicitudes.push(nuevaSolicitud);

            localStorage.setItem(
                "cotizacionesAeroEstructuras",
                JSON.stringify(solicitudes)
            );


            // CONFIRMACIÓN

            alert("¡Tu solicitud se envió correctamente!");


            // LIMPIAR FORMULARIO

            document.getElementById("nombre").value = "";
            document.getElementById("correo").value = "";
            document.getElementById("telefono").value = "";
            document.getElementById("tipoConsulta").selectedIndex = 0;
            document.getElementById("mensaje").value = "";

        });

    }

});


// =============================
// MODAL DE COTIZACIÓN
// =============================

const btnCotizacion = document.getElementById("btnCotizacion");
const modalCotizacion = document.getElementById("modalCotizacion");

const btnContinuarCotizacion = document.getElementById("btnContinuarCotizacion");
const btnCerrarCotizacion = document.getElementById("btnCerrarCotizacion");


if (btnCotizacion && modalCotizacion) {

    btnCotizacion.addEventListener("click", function (evento) {

        evento.preventDefault();

        modalCotizacion.style.display = "flex";

    });

}


if (btnCerrarCotizacion && modalCotizacion) {

    btnCerrarCotizacion.addEventListener("click", function () {

        modalCotizacion.style.display = "none";

    });

}


if (btnContinuarCotizacion && modalCotizacion) {

    btnContinuarCotizacion.addEventListener("click", function () {

        modalCotizacion.style.display = "none";

        const campoNombre = document.getElementById("nombre");

        if (campoNombre) {
            campoNombre.focus();
        }

    });

}
