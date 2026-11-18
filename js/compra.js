
(function () {

    // =====================================
    // ELEMENTOS DEL HTML
    // =====================================

    const listaResumen = document.getElementById("lista-resumen");
    const totalResumen = document.getElementById("total-resumen");

    const formulario = document.getElementById("formulario-cliente");

    const nombre = document.getElementById("nombre-cliente");
    const correo = document.getElementById("correo-cliente");
    const telefono = document.getElementById("telefono-cliente");

    const departamento = document.getElementById("departamento");
    const provincia = document.getElementById("provincia");
    const distrito = document.getElementById("distrito");

    const direccion = document.getElementById("direccion");
    const referencia = document.getElementById("referencia");
    const metodoPago = document.getElementById("metodo-pago");

    const botonConfirmar = document.getElementById("confirmar-compra");

    if (!formulario || !listaResumen || !totalResumen) return;

    // =====================================
    // CONFIGURACIÓN EMAILJS
    // =====================================

    const SERVICE_ID = "service_wz13yzc";
    const TEMPLATE_ID = "template_3qe1ekh";
    const PUBLIC_KEY = "D74DGtjV9IAUPJHOk";

    emailjs.init({
        publicKey: PUBLIC_KEY
    });

    // =====================================
    // RECUPERAR CARRITO
    // =====================================

    let carrito = JSON.parse(
        localStorage.getItem("carritoAeroEstructuras")
    ) || [];

    function calcularTotal() {
        return carrito.reduce(function (total, producto) {
            return total +
                (Number(producto.precio) || 0) *
                (Number(producto.cantidad) || 1);
        }, 0);
    }

    // =====================================
    // MOSTRAR RESUMEN
    // =====================================

    function mostrarResumen() {

        listaResumen.textContent = "";

        if (carrito.length === 0) {
            const mensaje = document.createElement("p");
            mensaje.textContent = "Tu carrito está vacío.";
            listaResumen.appendChild(mensaje);
            totalResumen.textContent = "0.00";
            return;
        }

        carrito.forEach(function (producto, indice) {

            const cantidad = Number(producto.cantidad) || 1;
            const precio = Number(producto.precio) || 0;

            const elemento = document.createElement("div");
            elemento.className = "producto-resumen";

            const imagen = document.createElement("img");
            imagen.src = producto.imagen;
            imagen.alt = producto.nombre;
            imagen.className = "imagen-resumen";

            const informacion = document.createElement("div");
            informacion.className = "informacion-resumen";

            const titulo = document.createElement("h3");
            titulo.textContent = producto.nombre;

            const precioTexto = document.createElement("p");
            precioTexto.textContent =
                "Precio: S/ " + precio.toFixed(2);

            const cantidadTexto = document.createElement("p");
            cantidadTexto.textContent = "Cantidad: " + cantidad;

            const subtotal = document.createElement("p");
            subtotal.textContent =
                "Subtotal: S/ " + (precio * cantidad).toFixed(2);

            const botonEliminar = document.createElement("button");
            botonEliminar.type = "button";
            botonEliminar.className = "btn-eliminar-resumen";
            botonEliminar.textContent = "Eliminar";
            botonEliminar.dataset.indice = indice;

            const enlaceAgregar = document.createElement("a");
            enlaceAgregar.href = "tienda.html";
            enlaceAgregar.className = "btn-agregar-resumen";
            enlaceAgregar.textContent = "+ Agregar";

            informacion.appendChild(titulo);
            informacion.appendChild(precioTexto);
            informacion.appendChild(cantidadTexto);
            informacion.appendChild(subtotal);
            informacion.appendChild(botonEliminar);
            informacion.appendChild(enlaceAgregar);

            elemento.appendChild(imagen);
            elemento.appendChild(informacion);

            listaResumen.appendChild(elemento);
        });

        totalResumen.textContent = calcularTotal().toFixed(2);
    }

    // =====================================
    // ELIMINAR PRODUCTOS
    // =====================================

    listaResumen.addEventListener("click", function (event) {

        if (event.target.classList.contains("btn-eliminar-resumen")) {

            const indice = Number(event.target.dataset.indice);

            carrito.splice(indice, 1);

            localStorage.setItem(
                "carritoAeroEstructuras",
                JSON.stringify(carrito)
            );

            mostrarResumen();
        }
    });

    // =====================================
    // DIRECCIONES DEL PERÚ
    // =====================================

    const urlBase =
        "https://jmc-software-x.github.io/public-ubigeo-pe/data/";

    async function cargarDepartamentos() {

        try {
            const respuesta = await fetch(urlBase + "hierarchy.json");

            if (!respuesta.ok) {
                throw new Error("No se pudieron cargar los departamentos");
            }

            const datos = await respuesta.json();

            datos.forEach(function (item) {
                const opcion = document.createElement("option");
                opcion.value = item.id;
                opcion.textContent = item.name;
                departamento.appendChild(opcion);
            });

        } catch (error) {
            departamento.innerHTML =
                '<option value="">No se pudieron cargar los departamentos</option>';

            console.error(error);
        }
    }

    // =====================================
    // CARGAR PROVINCIAS
    // =====================================

    departamento.addEventListener("change", async function () {

        provincia.innerHTML =
            '<option value="">Selecciona una provincia</option>';

        distrito.innerHTML =
            '<option value="">Primero selecciona una provincia</option>';

        provincia.disabled = true;
        distrito.disabled = true;

        if (!departamento.value) return;

        try {
            const respuesta = await fetch(
                urlBase + "departments/" + departamento.value + ".json"
            );

            if (!respuesta.ok) throw new Error("Error al cargar provincias");

            const datos = await respuesta.json();

            datos.provinces.forEach(function (item) {
                const opcion = document.createElement("option");
                opcion.value = item.id;
                opcion.textContent = item.name;
                provincia.appendChild(opcion);
            });

            provincia.disabled = false;

        } catch (error) {
            provincia.innerHTML =
                '<option value="">Error al cargar provincias</option>';

            console.error(error);
        }
    });

    // =====================================
    // CARGAR DISTRITOS
    // =====================================

    provincia.addEventListener("change", async function () {

        distrito.innerHTML =
            '<option value="">Selecciona un distrito</option>';

        distrito.disabled = true;

        if (!provincia.value) return;

        try {
            const respuesta = await fetch(
                urlBase + "provinces/" + provincia.value + ".json"
            );

            if (!respuesta.ok) throw new Error("Error al cargar distritos");

            const datos = await respuesta.json();

            datos.districts.forEach(function (item) {
                const opcion = document.createElement("option");
                opcion.value = item.id;
                opcion.textContent = item.name;
                distrito.appendChild(opcion);
            });

            distrito.disabled = false;

        } catch (error) {
            distrito.innerHTML =
                '<option value="">Error al cargar distritos</option>';

            console.error(error);
        }
    });

    // =====================================
    // VALIDACIONES
    // =====================================

    function mostrarError(campo, mensaje) {

        campo.classList.add("error");
        campo.classList.remove("correcto");

        const mensajeError = document.getElementById("error-" + campo.id);

        if (mensajeError) mensajeError.textContent = mensaje;
    }

    function campoCorrecto(campo) {

        campo.classList.remove("error");
        campo.classList.add("correcto");

        const mensajeError = document.getElementById("error-" + campo.id);

        if (mensajeError) mensajeError.textContent = "";
    }

    function validarNombre() {

        const valor = nombre.value.trim();
        const partes = valor.split(/\s+/);

        if (
            partes.length < 2 ||
            !/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s'-]+$/.test(valor)
        ) {
            mostrarError(nombre, "Ingresa tu nombre y apellido correctamente.");
            return false;
        }

        campoCorrecto(nombre);
        return true;
    }

    function validarCorreo() {

        const valor = correo.value.trim();

        if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(valor)) {
            mostrarError(correo, "Ingresa una dirección Gmail válida.");
            return false;
        }

        campoCorrecto(correo);
        return true;
    }

    function validarTelefono() {

        const valor = telefono.value.trim();

        if (!/^9\d{8}$/.test(valor)) {
            mostrarError(
                telefono,
                "Ingresa un celular peruano de 9 dígitos que comience con 9."
            );
            return false;
        }

        campoCorrecto(telefono);
        return true;
    }

    function validarSeleccion(campo, mensaje) {

        if (!campo.value) {
            mostrarError(campo, mensaje);
            return false;
        }

        campoCorrecto(campo);
        return true;
    }

    function validarDireccion() {

        if (direccion.value.trim().length < 5) {
            mostrarError(direccion, "Ingresa una dirección válida.");
            return false;
        }

        campoCorrecto(direccion);
        return true;
    }

    // =====================================
    // GUARDAR PEDIDO PARA ADMINISTRACIÓN
    // =====================================

    function guardarPedido(datosPedido, total) {

        const pedidos = JSON.parse(
            localStorage.getItem("pedidosAeroEstructuras")
        ) || [];

        const nuevoPedido = {

            id: Date.now(),
            numero: Date.now(),

            fecha: new Date().toLocaleString("es-PE"),

            nombre: datosPedido.nombre,
            correo: datosPedido.correo,
            telefono: datosPedido.telefono,

            departamento: datosPedido.departamento,
            provincia: datosPedido.provincia,
            distrito: datosPedido.distrito,

            direccion: datosPedido.direccion,
            referencia: datosPedido.referencia,

            productos: carrito.map(function (producto) {
                return {
                    nombre: producto.nombre,
                    precio: Number(producto.precio) || 0,
                    imagen: producto.imagen,
                    cantidad: Number(producto.cantidad) || 1
                };
            }),

            metodo_pago: datosPedido.metodo_pago,

            total: total,

            estado: "Pendiente"
        };

        pedidos.push(nuevoPedido);

        localStorage.setItem(
            "pedidosAeroEstructuras",
            JSON.stringify(pedidos)
        );
    }

    // =====================================
    // ENVIAR PEDIDO CON EMAILJS
    // =====================================

    async function enviarPedido() {

        const total = calcularTotal();

        let productos = "";

        carrito.forEach(function (producto) {

            const cantidad = Number(producto.cantidad) || 1;
            const precio = Number(producto.precio) || 0;

            productos +=
                producto.nombre +
                " | Cantidad: " + cantidad +
                " | Subtotal: S/ " +
                (precio * cantidad).toFixed(2) + "\n";
        });

        const datosPedido = {

            nombre: nombre.value.trim(),
            correo: correo.value.trim(),
            telefono: telefono.value.trim(),

            departamento: departamento.options[
                departamento.selectedIndex
            ].text,

            provincia: provincia.options[
                provincia.selectedIndex
            ].text,

            distrito: distrito.options[
                distrito.selectedIndex
            ].text,

            direccion: direccion.value.trim(),
            referencia: referencia.value.trim(),

            productos: productos,

            metodo_pago: metodoPago.value,

            total: total.toFixed(2)
        };

        // CORREO AL ADMINISTRADOR
        await emailjs.send(
            SERVICE_ID,
            TEMPLATE_ID,
            datosPedido
        );

        // CORREO AL CLIENTE
        await emailjs.send(
            SERVICE_ID,
            "template_2s77naf",
            datosPedido
        );

        // REGISTRAR PEDIDO
        guardarPedido(datosPedido, total);
    }

    // =====================================
    // CONFIRMAR COMPRA
    // =====================================

    formulario.addEventListener("submit", async function (event) {

        event.preventDefault();

        const valido =
            validarNombre() &&
            validarCorreo() &&
            validarTelefono() &&
            validarSeleccion(departamento, "Selecciona tu departamento.") &&
            validarSeleccion(provincia, "Selecciona tu provincia.") &&
            validarSeleccion(distrito, "Selecciona tu distrito.") &&
            validarDireccion();

        if (carrito.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }

        if (!metodoPago.value) {
            alert("Selecciona un método de pago.");
            return;
        }

        if (!valido) return;

        botonConfirmar.disabled = true;
        botonConfirmar.textContent = "Enviando pedido...";

        try {

            await enviarPedido();

            alert("¡Pedido enviado correctamente! Revisa tu Gmail.");

            localStorage.removeItem("carritoAeroEstructuras");

            window.location.href = "tienda.html";

        } catch (error) {

            console.error("Error al enviar el pedido:", error);

            alert(
                "No se pudo completar el envío del pedido. Inténtalo nuevamente."
            );

            botonConfirmar.disabled = false;
            botonConfirmar.textContent = "Confirmar pedido";
        }
    });

    // =====================================
    // VALIDAR CAMPOS AL SALIR
    // =====================================

    nombre.addEventListener("blur", validarNombre);
    correo.addEventListener("blur", validarCorreo);
    telefono.addEventListener("blur", validarTelefono);
    direccion.addEventListener("blur", validarDireccion);

    // =====================================
    // INICIAR
    // =====================================

    mostrarResumen();
    cargarDepartamentos();

})();
