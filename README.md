Sistema de Control de Caja en JavaScript

Este proyecto es un sistema de control de caja diseñado en JavaScript que te permite registrar ingresos y egresos de dinero de manera fácil y rápida, con la capacidad de mantener un historial de movimientos, todo almacenado en el localStorage del navegador. También se conecta a una API para mostrar el precio del dólar blue en Argentina. 🚀

Funcionalidades principales:
- Ingresos y Egresos: Registra entradas y salidas de dinero con categorías predefinidas (como "Construcción", "Viáticos") o personalizadas.
- Monedas: Gestiona movimientos en múltiples monedas: ARS, USD, EUR y CLP.
- Métodos de pago: Especifica si el movimiento fue en efectivo, transferencia (con opciones como Mercado Pago, Banco Nación, Credicoop) o cheque.
- Consulta del dólar blue: Usa una API para mostrar el valor actual del dólar blue y mantenerte informado sobre la cotización.
- Búsqueda y Filtrado: Encuentra movimientos por descripción o aplica filtros por fecha.
- Exportación a CSV: Descarga todo el historial de movimientos en formato CSV.
- Persistencia de datos: Los movimientos se almacenan localmente en el navegador, así que aunque recargues la página, ¡nada se pierde!
- Visualización amigable: Diferencia cada línea de la tabla de movimientos con colores alternados (blanco y gris) y usa colores llamativos: verde para ingresos y rojo para egresos.

Tecnologías utilizadas:
- HTML5: Estructura de la página.
- CSS3: Estilos para una visualización agradable y responsiva.
- JavaScript: Manejo de la lógica, almacenamiento en localStorage y conexión a la API.
- SweetAlert2: Para las ventanas emergentes de ingreso, egreso, búsqueda y filtrado.
- API de Dólar Blue: Información en tiempo real sobre el valor del dólar blue.
