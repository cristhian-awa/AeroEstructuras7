document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // VERIFICAR SESIÓN DEL ADMINISTRADOR
    // =====================================

    if (sessionStorage.getItem("sesionAdmin") !== "activa") {
        window.location.href = "login-admin.html";
        return;
    }

    // =====================================
    // FECHA ACTUAL
    // =====================================

    const fechaActual = document.getElementById("fechaActual");

    if (fechaActual) {
        fechaActual.textContent = new Date().toLocaleDateString("es-PE", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }

    // =====================================
    // ELEMENTOS DE PEDIDOS
    // =====================================

    const pedidosTabla = document.getElementById("pedidosTabla");
    const totalPedidos = document.getElementById("totalPedidos");

    let pedidos = JSON.parse(
        localStorage.getItem("pedidosAeroEstructuras")
    ) || [];

    function mostrarPedidos() {

        if (!pedidosTabla) return;

        pedidosTabla.textContent = "";

        if (totalPedidos) {
            totalPedidos.textContent = pedidos.length;
        }

        if (pedidos.length === 0) {

            const fila = document.createElement("tr");
            const celda = document.createElement("td");

            celda.colSpan = 6;
            celda.textContent = "Todavía no hay pedidos registrados.";
            celda.style.textAlign = "center";

            fila.appendChild(celda);
            pedidosTabla.appendChild(fila);

            return;
        }

        pedidos.forEach(function (pedido, indice) {

            const fila = document.createElement("tr");

            const productos = Array.isArray(pedido.productos)
                ? pedido.productos.map(function (producto) {
                    return producto.nombre;
                }).join(", ")
                : (pedido.productos || pedido.producto || "Sin productos");

            const datos = [
                pedido.numero || pedido.id || (indice + 1),
                pedido.nombre || pedido.cliente || "Sin nombre",
                productos,
                pedido.fecha || "Sin fecha",
                "S/ " + Number(pedido.total || 0).toFixed(2)
            ];

            datos.forEach(function (dato) {

                const celda = document.createElement("td");
                celda.textContent = dato;

                fila.appendChild(celda);

            });

            const celdaEstado = document.createElement("td");
            const selector = document.createElement("select");

            selector.className = "estado-pedido";

            ["Pendiente", "En proceso", "Completado", "Cancelado"].forEach(function (estado) {

                const opcion = document.createElement("option");

                opcion.value = estado;
                opcion.textContent = estado;

                selector.appendChild(opcion);

            });

            selector.value = pedido.estado || "Pendiente";

            selector.addEventListener("change", function () {

                pedidos[indice].estado = selector.value;

                localStorage.setItem(
                    "pedidosAeroEstructuras",
                    JSON.stringify(pedidos)
                );

            });

            celdaEstado.appendChild(selector);
            fila.appendChild(celdaEstado);

            pedidosTabla.appendChild(fila);

        });

    }


    // =====================================
    // ELEMENTOS DE PROYECTOS
    // =====================================

    const formularioProyecto = document.getElementById("formularioProyecto");
    const indiceProyecto = document.getElementById("indiceProyecto");
    const nombreProyecto = document.getElementById("nombreProyecto");
    const categoriaProyecto = document.getElementById("categoriaProyecto");
    const imagenProyecto = document.getElementById("imagenProyecto");
    const precioProyecto = document.getElementById("precioProyecto");
    const descripcionProyecto = document.getElementById("descripcionProyecto");
    const proyectosTabla = document.getElementById("proyectosTabla");
    const totalProyectos = document.getElementById("totalProyectos");
    const cancelarEdicion = document.getElementById("cancelarEdicionProyecto");
    const guardarProyecto = document.getElementById("guardarProyecto");

    let proyectos = window.AeroCatalogo.obtener();

    function mostrarProyectos() {

        if (!proyectosTabla) return;

        proyectosTabla.textContent = "";

        if (totalProyectos) {
            totalProyectos.textContent = proyectos.length;
        }

        proyectos.forEach(function (proyecto, indice) {

            const fila = document.createElement("tr");

            const nombre = document.createElement("td");
            nombre.textContent = proyecto.nombre;

            const categoria = document.createElement("td");
            categoria.textContent = proyecto.categoria;

            const precio = document.createElement("td");
            precio.textContent = "S/ " + Number(proyecto.precio).toFixed(2);

            const imagen = document.createElement("td");
            const miniatura = document.createElement("img");

            miniatura.src = proyecto.imagen;
            miniatura.alt = proyecto.nombre;
            miniatura.className = "imagen-proyecto-admin";

            imagen.appendChild(miniatura);

            const acciones = document.createElement("td");

            // BOTÓN EDITAR

            const botonEditar = document.createElement("button");

            botonEditar.type = "button";
            botonEditar.textContent = "Editar";
            botonEditar.className = "btn-editar-proyecto";

            botonEditar.addEventListener("click", function () {

                nombreProyecto.value = proyecto.nombre;
                categoriaProyecto.value = proyecto.categoria;
                imagenProyecto.value = proyecto.imagen;
                precioProyecto.value = proyecto.precio;
                descripcionProyecto.value = proyecto.descripcion;

                indiceProyecto.value = indice;

                guardarProyecto.textContent = "Actualizar proyecto";

                cancelarEdicion.style.display = "inline-block";

                formularioProyecto.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            });

            // BOTÓN ELIMINAR

            const botonEliminar = document.createElement("button");

            botonEliminar.type = "button";
            botonEliminar.textContent = "Eliminar";
            botonEliminar.className = "btn-eliminar-proyecto";

            botonEliminar.addEventListener("click", function () {

                if (confirm("¿Deseas eliminar este proyecto de la tienda?")) {

                    proyectos.splice(indice, 1);

                    window.AeroCatalogo.guardar(proyectos);

                    mostrarProyectos();

                }

            });

            acciones.appendChild(botonEditar);
            acciones.appendChild(botonEliminar);

            fila.appendChild(nombre);
            fila.appendChild(categoria);
            fila.appendChild(precio);
            fila.appendChild(imagen);
            fila.appendChild(acciones);

            proyectosTabla.appendChild(fila);

        });

        if (proyectos.length === 0) {

            const fila = document.createElement("tr");
            const celda = document.createElement("td");

            celda.colSpan = 5;
            celda.textContent = "No hay proyectos registrados.";
            celda.style.textAlign = "center";

            fila.appendChild(celda);
            proyectosTabla.appendChild(fila);

        }

    }


    // =====================================
    // GUARDAR O ACTUALIZAR PROYECTO
    // =====================================

    if (formularioProyecto) {

        formularioProyecto.addEventListener("submit", function (evento) {

            evento.preventDefault();

            const nombre = nombreProyecto.value.trim();
            const categoria = categoriaProyecto.value;
            const imagen = imagenProyecto.value.trim();
            const precio = Number(precioProyecto.value);
            const descripcion = descripcionProyecto.value.trim();

            if (
                !nombre ||
                !categoria ||
                !imagen ||
                !descripcion ||
                !Number.isFinite(precio) ||
                precio <= 0
            ) {

                alert("Completa todos los campos con datos válidos.");
                return;

            }

            const nuevoProyecto = {
                nombre: nombre,
                categoria: categoria,
                imagen: imagen,
                precio: precio,
                descripcion: descripcion
            };

            if (indiceProyecto.value !== "") {

                proyectos[Number(indiceProyecto.value)] = nuevoProyecto;

                alert("Proyecto actualizado correctamente.");

            } else {

                proyectos.push(nuevoProyecto);

                alert("Proyecto agregado correctamente.");

            }

            window.AeroCatalogo.guardar(proyectos);

            formularioProyecto.reset();
            indiceProyecto.value = "";

            guardarProyecto.textContent = "Guardar proyecto";

            cancelarEdicion.style.display = "none";

            mostrarProyectos();

        });

    }


    // =====================================
    // CANCELAR EDICIÓN
    // =====================================

    if (cancelarEdicion) {

        cancelarEdicion.addEventListener("click", function () {

            formularioProyecto.reset();
            indiceProyecto.value = "";

            guardarProyecto.textContent = "Guardar proyecto";

            cancelarEdicion.style.display = "none";

        });

    }


    // =====================================
    // COTIZACIONES
    // =====================================

    const cotizacionesTabla = document.getElementById("cotizacionesTabla");
    const totalCotizaciones = document.getElementById("totalCotizaciones");

    let cotizaciones = JSON.parse(
        localStorage.getItem("cotizacionesAeroEstructuras")
    ) || [];

    function mostrarCotizaciones() {

        if (totalCotizaciones) {
            totalCotizaciones.textContent = cotizaciones.length;
        }

        if (!cotizacionesTabla) return;

        cotizacionesTabla.textContent = "";

        if (cotizaciones.length === 0) {

            const fila = document.createElement("tr");
            const celda = document.createElement("td");

            celda.colSpan = 7;
            celda.textContent = "Todavía no hay solicitudes registradas.";
            celda.style.textAlign = "center";

            fila.appendChild(celda);
            cotizacionesTabla.appendChild(fila);

            return;

        }

        cotizaciones.forEach(function (cotizacion, indice) {

            const fila = document.createElement("tr");

            const datos = [
                cotizacion.numero || (indice + 1),
                cotizacion.nombre || "Sin nombre",
                cotizacion.correo || "Sin correo",
                cotizacion.telefono || "Sin teléfono",
                cotizacion.tipoConsulta || "Sin tipo",
                cotizacion.mensaje || "Sin mensaje",
                cotizacion.fecha || "Sin fecha"
            ];

            datos.forEach(function (dato) {

                const celda = document.createElement("td");

                celda.textContent = dato;

                fila.appendChild(celda);

            });

            cotizacionesTabla.appendChild(fila);

        });

    }


    // =====================================
    // CERRAR SESIÓN
    // =====================================

    const botonSalir = document.createElement("button");

    botonSalir.textContent = "Cerrar sesión";
    botonSalir.className = "btn-cerrar-sesion";
    botonSalir.type = "button";

    botonSalir.addEventListener("click", function () {

        sessionStorage.removeItem("sesionAdmin");

        window.location.href = "login-admin.html";

    });

    const encabezado = document.querySelector(".encabezado-admin");

    if (encabezado) {
        encabezado.appendChild(botonSalir);
    }


    // =====================================
    // MOSTRAR INFORMACIÓN
    // =====================================

    mostrarPedidos();
    mostrarProyectos();
    mostrarCotizaciones();

});