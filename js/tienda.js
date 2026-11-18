
(function () {

    const listaProductos = document.getElementById("lista-productos");
    const contadorCarrito = document.getElementById("contador-carrito");

    const abrirCarrito = document.getElementById("abrir-carrito");
    const cerrarCarrito = document.getElementById("cerrar-carrito");
    const ventanaCarrito = document.getElementById("ventana-carrito");
    const listaCarrito = document.getElementById("lista-carrito");
    const totalCarrito = document.getElementById("total-carrito");
    const finalizarCompra = document.getElementById("finalizar-compra");

    const CLAVE_CARRITO = "carritoAeroEstructuras";

    let proyectos = window.AeroCatalogo.obtener();
    let carrito = JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || [];

    // =====================================
    // MOSTRAR PROYECTOS
    // =====================================

    function mostrarProyectos() {

        listaProductos.textContent = "";

        proyectos.forEach(function (proyecto, indice) {

            const tarjeta = document.createElement("article");
            tarjeta.className = "producto-card";

            const imagen = document.createElement("img");
            imagen.src = proyecto.imagen;
            imagen.alt = proyecto.nombre;
            imagen.className = "producto-imagen";

            const contenido = document.createElement("div");
            contenido.className = "producto-info";

            const categoria = document.createElement("span");
            categoria.textContent = proyecto.categoria;
            categoria.className = "categoria-producto";

            const nombre = document.createElement("h3");
            nombre.textContent = proyecto.nombre;

            const descripcion = document.createElement("p");
            descripcion.textContent = proyecto.descripcion;

            const precio = document.createElement("strong");
            precio.textContent = "S/ " + Number(proyecto.precio).toFixed(2);
            precio.className = "producto-precio";

            const boton = document.createElement("button");
            boton.type = "button";
            boton.textContent = "Comprar";
            boton.className = "btn-agregar";

            boton.addEventListener("click", function () {
                agregarAlCarrito(indice);
            });

            contenido.appendChild(categoria);
            contenido.appendChild(nombre);
            contenido.appendChild(descripcion);
            contenido.appendChild(precio);
            contenido.appendChild(boton);

            tarjeta.appendChild(imagen);
            tarjeta.appendChild(contenido);

            listaProductos.appendChild(tarjeta);
        });
    }

    // =====================================
    // AGREGAR AL CARRITO
    // =====================================

    function agregarAlCarrito(indice) {

        const proyecto = proyectos[indice];

        if (!proyecto) return;

        const existente = carrito.find(function (producto) {
            return producto.nombre === proyecto.nombre;
        });

        if (existente) {
            existente.cantidad++;
        } else {
            carrito.push({
                nombre: proyecto.nombre,
                precio: Number(proyecto.precio),
                imagen: proyecto.imagen,
                cantidad: 1
            });
        }

        guardarCarrito();
        mostrarCarrito();

        alert("¡Proyecto agregado al carrito!");
    }

    // =====================================
    // GUARDAR CARRITO
    // =====================================

    function guardarCarrito() {
        localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
    }

    // =====================================
    // MOSTRAR CARRITO
    // =====================================

    function mostrarCarrito() {

        listaCarrito.textContent = "";

        let total = 0;
        let cantidadTotal = 0;

        if (carrito.length === 0) {
            const mensaje = document.createElement("p");
            mensaje.textContent = "Tu carrito está vacío.";
            listaCarrito.appendChild(mensaje);
        }

        carrito.forEach(function (producto, indice) {

            const fila = document.createElement("div");
            fila.className = "producto-carrito";

            const informacion = document.createElement("div");

            const nombre = document.createElement("h3");
            nombre.textContent = producto.nombre;

            const detalle = document.createElement("p");
            detalle.textContent = "Cantidad: " + producto.cantidad;

            informacion.appendChild(nombre);
            informacion.appendChild(detalle);

            const precio = document.createElement("span");
            precio.textContent = "S/ " +
                (Number(producto.precio) * producto.cantidad).toFixed(2);

            const eliminar = document.createElement("button");
            eliminar.type = "button";
            eliminar.textContent = "Eliminar";
            eliminar.className = "btn-eliminar";

            eliminar.addEventListener("click", function () {
                carrito.splice(indice, 1);
                guardarCarrito();
                mostrarCarrito();
            });

            fila.appendChild(informacion);
            fila.appendChild(precio);
            fila.appendChild(eliminar);

            listaCarrito.appendChild(fila);

            total += Number(producto.precio) * producto.cantidad;
            cantidadTotal += producto.cantidad;
        });

        totalCarrito.textContent = total.toFixed(2);
        contadorCarrito.textContent = cantidadTotal;
    }

    // =====================================
    // ABRIR Y CERRAR CARRITO
    // =====================================

    if (abrirCarrito) {
        abrirCarrito.addEventListener("click", function () {
            ventanaCarrito.style.display = "flex";
        });
    }

    if (cerrarCarrito) {
        cerrarCarrito.addEventListener("click", function () {
            ventanaCarrito.style.display = "none";
        });
    }

    // =====================================
    // FINALIZAR COMPRA
    // =====================================

    if (finalizarCompra) {
        finalizarCompra.addEventListener("click", function () {

            if (carrito.length === 0) {
                alert("Tu carrito está vacío.");
                return;
            }

          window.location.href = "compra.html";
        });
    }

    // =====================================
    // INICIAR TIENDA
    // =====================================

    mostrarProyectos();
    mostrarCarrito();

})();
