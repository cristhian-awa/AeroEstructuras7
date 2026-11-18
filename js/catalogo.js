
(function () {

    const CLAVE = "proyectosAeroEstructuras";

    const proyectosIniciales = [
        {
            nombre: "Edificio Los Olivos",
            nombreEn: "Los Olivos Building",
            categoria: "Residencial",
            categoriaEn: "Residential",
            imagen: "img/Edificio Corporativo.png",
            descripcion: "Propuesta arquitectónica residencial con distribución de ambientes, diseño de espacios y planificación general del edificio.",
            descripcionEn: "Residential architectural proposal featuring room layouts, space design, and general building planning.",
            precio: 250
        },
        {
            nombre: "Centro Empresarial Connecta",
            nombreEn: "Connecta Business Center",
            categoria: "Comercial",
            categoriaEn: "Commercial",
            imagen: "img/Centro Empresarial Conecta.png",
            descripcion: "Diseño arquitectónico de un complejo empresarial con distribución de oficinas, áreas comunes y espacios comerciales.",
            descripcionEn: "Architectural design of a business complex featuring office layouts, common areas, and commercial spaces.",
            precio: 350
        },
        {
            nombre: "Puente San Rafael",
            nombreEn: "San Rafael Bridge",
            categoria: "Infraestructura",
            categoriaEn: "Infrastructure",
            imagen: "img/Puente San Rafael.png",
            descripcion: "Propuesta de diseño de infraestructura vial con representación del proyecto y documentación técnica referencial.",
            descripcionEn: "Road infrastructure design proposal with project representation and reference technical documentation.",
            precio: 300
        },
        {
            nombre: "Planta Logística Norte",
            nombreEn: "Northern Logistics Facility",
            categoria: "Industrial",
            categoriaEn: "Industrial",
            imagen: "img/Planta Logistica del Norte.png",
            descripcion: "Diseño de infraestructura industrial orientado a la organización de almacenes, zonas operativas y áreas de distribución.",
            descripcionEn: "Industrial infrastructure design focused on organizing warehouses, operational areas, and distribution spaces.",
            precio: 400
        },
        {
            nombre: "Conjunto Residencial Alameda",
            nombreEn: "Alameda Residential Complex",
            categoria: "Residencial",
            categoriaEn: "Residential",
            imagen: "img/Conjunto residencial alameda.png",
            descripcion: "Propuesta de diseño residencial que integra viviendas, áreas comunes y espacios destinados al bienestar de sus habitantes.",
            descripcionEn: "Residential design proposal integrating homes, common areas, and spaces intended to improve residents' well-being.",
            precio: 280
        },
        {
            nombre: "Mall Plaza Sur",
            nombreEn: "Mall Plaza Sur Shopping Center",
            categoria: "Comercial",
            categoriaEn: "Commercial",
            imagen: "img/Mall Plaza Sur.png",
            descripcion: "Diseño arquitectónico de un centro comercial con distribución de locales, zonas de circulación y espacios de servicio.",
            descripcionEn: "Architectural design of a shopping center featuring store layouts, circulation areas, and service spaces.",
            precio: 450
        },
        {
            nombre: "Vía de Evitamiento",
            nombreEn: "Bypass Road",
            categoria: "Infraestructura",
            categoriaEn: "Infrastructure",
            imagen: "img/Via de evitamiento.png",
            descripcion: "Propuesta de diseño vial orientada a mejorar la circulación vehicular y la conectividad entre diferentes zonas.",
            descripcionEn: "Road design proposal aimed at improving vehicle traffic and connectivity between different areas.",
            precio: 320
        },
        {
            nombre: "Almacén Central",
            nombreEn: "Central Warehouse",
            categoria: "Industrial",
            categoriaEn: "Industrial",
            imagen: "img/Almacen Central.png",
            descripcion: "Diseño de infraestructura logística con distribución de espacios para almacenamiento, organización y despacho de productos.",
            descripcionEn: "Logistics infrastructure design with spaces for product storage, organization, and dispatch.",
            precio: 220
        },
        {
            nombre: "Infraestructura Urbana",
            nombreEn: "Urban Infrastructure",
            categoria: "Infraestructura",
            categoriaEn: "Infrastructure",
            imagen: "img/INDUS-MM.png",
            descripcion: "Propuesta de planificación de espacios urbanos e infraestructura para mejorar la organización y funcionalidad de una zona.",
            descripcionEn: "Urban space and infrastructure planning proposal to improve the organization and functionality of an area.",
            precio: 380
        }
    ];

    // OBTENER PROYECTOS GUARDADOS

    let proyectosGuardados = JSON.parse(localStorage.getItem(CLAVE));

    if (!proyectosGuardados) {
        proyectosGuardados = proyectosIniciales;
    }

    // COMPLETAR TRADUCCIONES SIN BORRAR PROYECTOS

    proyectosGuardados = proyectosGuardados.map(function (proyecto) {

        const proyectoInicial = proyectosIniciales.find(function (inicial) {
            return inicial.nombre === proyecto.nombre;
        });

        if (proyectoInicial) {

            if (!proyecto.nombreEn) {
                proyecto.nombreEn = proyectoInicial.nombreEn;
            }

            if (!proyecto.categoriaEn) {
                proyecto.categoriaEn = proyectoInicial.categoriaEn;
            }

            if (!proyecto.descripcionEn) {
                proyecto.descripcionEn = proyectoInicial.descripcionEn;
            }

        }

        return proyecto;

    });

    localStorage.setItem(CLAVE, JSON.stringify(proyectosGuardados));

    // FUNCIONES DEL CATÁLOGO

    window.AeroCatalogo = {

        obtener: function () {
            return JSON.parse(localStorage.getItem(CLAVE)) || [];
        },

        guardar: function (proyectos) {
            localStorage.setItem(CLAVE, JSON.stringify(proyectos));
        }

    };

})();
