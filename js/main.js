// Variables de saldo para diferentes monedas
let saldoARS = 0;
let saldoUSD = 0;
let saldoEUR = 0;
let saldoCLP = 0;

// Cargar datos del localStorage
function cargarDatos() {
    const movimientosGuardados = JSON.parse(localStorage.getItem('movimientos')) || [];
    movimientosGuardados.forEach(mov => agregarMovimientoATabla(mov));
    
    saldoARS = parseFloat(localStorage.getItem('saldoARS')) || 0;
    saldoUSD = parseFloat(localStorage.getItem('saldoUSD')) || 0;
    saldoEUR = parseFloat(localStorage.getItem('saldoEUR')) || 0;
    saldoCLP = parseFloat(localStorage.getItem('saldoCLP')) || 0;
    
    actualizarSaldos();
}

// Actualizar visualmente los saldos en la barra de navegación
function actualizarSaldos() {
    document.getElementById('saldoARS').textContent = saldoARS.toFixed(2);
    document.getElementById('saldoUSD').textContent = saldoUSD.toFixed(2);
    document.getElementById('saldoEUR').textContent = saldoEUR.toFixed(2);
    document.getElementById('saldoCLP').textContent = saldoCLP.toFixed(2);
}

// Consultar API del dólar blue en Argentina
async function obtenerDolarBlue() {
    try {
        const response = await fetch('https://api.bluelytics.com.ar/v2/latest');
        const data = await response.json();
        document.getElementById('dolarBlue').textContent = data.blue.value_sell;
    } catch (error) {
        document.getElementById('dolarBlue').textContent = 'Error al obtener';
    }
}

// Función para agregar movimiento a la tabla y a localStorage
function agregarMovimientoATabla(movimiento) {
    const tabla = document.getElementById('movimientosTabla').querySelector('tbody');
    const fila = document.createElement('tr');

    fila.innerHTML = `
        <td>${movimiento.fecha}</td>
        <td>${movimiento.tipo}</td>
        <td>${movimiento.descripcion}</td>
        <td class="${movimiento.tipo === 'Ingreso' ? 'verde' : 'rojo'}">${movimiento.cantidad}</td>
        <td>${movimiento.moneda}</td>
        <td>${movimiento.metodo}</td>
    `;
    
    tabla.appendChild(fila);

    // Guardar movimiento en localStorage
    const movimientosGuardados = JSON.parse(localStorage.getItem('movimientos')) || [];
    movimientosGuardados.push(movimiento);
    localStorage.setItem('movimientos', JSON.stringify(movimientosGuardados));
}

// Manejar ingreso de dinero
document.getElementById('btnIngreso').addEventListener('click', () => {
    Swal.fire({
        title: 'Registrar Ingreso',
        html: `
            <input id="cantidad" type="number" class="swal2-input" placeholder="Cantidad">
            <select id="moneda" class="swal2-input">
                <option value="ARS">ARS</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CLP">CLP</option>
            </select>
            <select id="categoria" class="swal2-input">
                <option value="Construcción">Construcción</option>
                <option value="Diezmo">Diezmo</option>
                <option value="Ofrenda">Ofrenda</option>
                <option value="Viáticos">Viáticos</option>
                <option value="Otra">Otra</option>
            </select>
            <input id="descripcion" type="text" class="swal2-input" placeholder="Descripción" style="display: none;">
            <select id="metodo" class="swal2-input">
                <option value="Efectivo">Efectivo</option>
                <option value="Transferencia">Transferencia</option>
                <option value="Cheque">Cheque</option>
            </select>
        `,
        focusConfirm: false,
        preConfirm: () => {
            const cantidad = parseFloat(document.getElementById('cantidad').value);
            const moneda = document.getElementById('moneda').value;
            const categoria = document.getElementById('categoria').value;
            const descripcion = categoria === 'Otra' ? document.getElementById('descripcion').value : categoria;
            const metodo = document.getElementById('metodo').value;
            const fecha = new Date().toLocaleString();

            if (isNaN(cantidad)) {
                Swal.showValidationMessage('La cantidad debe ser un número válido');
                return false;
            }

            return { cantidad, moneda, descripcion, metodo, fecha };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const movimiento = {
                tipo: 'Ingreso',
                cantidad: result.value.cantidad,
                moneda: result.value.moneda,
                descripcion: result.value.descripcion,
                metodo: result.value.metodo,
                fecha: result.value.fecha
            };

            // Actualizar el saldo según la moneda seleccionada
            if (movimiento.moneda === 'ARS') saldoARS += movimiento.cantidad;
            if (movimiento.moneda === 'USD') saldoUSD += movimiento.cantidad;
            if (movimiento.moneda === 'EUR') saldoEUR += movimiento.cantidad;
            if (movimiento.moneda === 'CLP') saldoCLP += movimiento.cantidad;

            // Agregar el movimiento a la tabla y localStorage
            agregarMovimientoATabla(movimiento);
            actualizarSaldos();
            localStorage.setItem('saldoARS', saldoARS);
            localStorage.setItem('saldoUSD', saldoUSD);
            localStorage.setItem('saldoEUR', saldoEUR);
            localStorage.setItem('saldoCLP', saldoCLP);
        }
    });

    // Mostrar campo de descripción si se selecciona "Otra" en categoría
    document.getElementById('categoria').addEventListener('change', function () {
        const descripcionInput = document.getElementById('descripcion');
        if (this.value === 'Otra') {
            descripcionInput.style.display = 'block';
        } else {
            descripcionInput.style.display = 'none';
        }
    });
});

// Manejar salida de dinero (Egresos)
document.getElementById('btnSalida').addEventListener('click', () => {
    // Similar a Ingreso pero con tipo "Egreso"
    // ...
});

// Función para exportar datos a CSV
document.getElementById('btnExportarCSV').addEventListener('click', () => {
    // Lógica para exportar a CSV
});

// Función para buscar y filtrar
document.getElementById('btnBuscar').addEventListener('click', () => {
    Swal.fire({
        title: 'Buscar',
        html: `<input id="buscar" type="text" class="swal2-input" placeholder="Buscar por descripción">`,
        preConfirm: () => {
            const query = document.getElementById('buscar').value.toLowerCase();
            buscarEnTabla(query);
        }
    });
});

document.getElementById('btnFiltrar').addEventListener('click', () => {
    Swal.fire({
        title: 'Filtrar',
        html: `
            <input id="fechaInicio" type="date" class="swal2-input">
            <input id="fechaFin" type="date" class="swal2-input">
        `,
        preConfirm: () => {
            const fechaInicio = document.getElementById('fechaInicio').value;
            const fechaFin = document.getElementById('fechaFin').value;
            filtrarPorFecha(fechaInicio, fechaFin);
        }
    });
});

function buscarEnTabla(query) {
    // Lógica de búsqueda en la tabla
}

function filtrarPorFecha(fechaInicio, fechaFin) {
    // Lógica de filtrado de movimientos
}

// Iniciar la app cargando datos y obteniendo el dólar blue
cargarDatos();
obtenerDolarBlue();
