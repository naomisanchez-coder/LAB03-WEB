const http = require('http');
const ExcelJS = require('exceljs');

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  // Validación de rutas: si no es /reporte, muestra texto plano
  if (req.url !== '/reporte') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Visita /reporte para descargar el Excel');
  }

  try {
    // Creación del libro y la hoja "Ventas"
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Ventas');

    // Configuración de las columnas principales
    worksheet.columns = [
      { header: 'Producto', key: 'producto', width: 25 },
      { header: 'Cantidad', key: 'cantidad', width: 15 },
      { header: 'Precio', key: 'precio', width: 15 }
    ];

    // 20 filas de datos de ejemplo
    const datosEjemplo = [
      { producto: 'Teclado Mecánico', cantidad: 10, precio: 150 },
      { producto: 'Mouse Gamer', cantidad: 25, precio: 80 },
      { producto: 'Monitor 24"', cantidad: 8, precio: 650 },
      { producto: 'Audífonos USB', cantidad: 15, precio: 120 },
      { producto: 'Pad Mouse XL', cantidad: 30, precio: 40 },
      { producto: 'Silla Gamer', cantidad: 5, precio: 850 },
      { producto: 'Webcam HD', cantidad: 12, precio: 180 },
      { producto: 'Micrófono Condensador', cantidad: 7, precio: 220 },
      { producto: 'Disco SSD 1TB', cantidad: 20, precio: 320 },
      { producto: 'Memoria RAM 16GB', cantidad: 18, precio: 210 },
      { producto: 'Tarjeta de Video', cantidad: 4, precio: 1800 },
      { producto: 'Fuente de Poder', cantidad: 10, precio: 300 },
      { producto: 'Gabinete ATX', cantidad: 6, precio: 250 },
      { producto: 'Cooler Líquido', cantidad: 9, precio: 290 },
      { producto: 'Pasta Térmica', cantidad: 50, precio: 25 },
      { producto: 'Cable HDMI 2m', cantidad: 40, precio: 30 },
      { producto: 'Soporte Monitor', cantidad: 14, precio: 95 },
      { producto: 'Hub USB-C', cantidad: 22, precio: 110 },
      { producto: 'Parlantes Bluetooth', cantidad: 11, precio: 140 },
      { producto: 'Teclado Inalámbrico', cantidad: 16, precio: 130 }
    ];

    worksheet.addRows(datosEjemplo);

    // Cabeceras HTTP para la descarga del archivo .xlsx
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="Reporte_Ventas.xlsx"'
    );

    // Envío del Excel directamente a la respuesta HTTP como Stream
    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error('Error al generar el Excel:', error);
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Error interno al generar el reporte.');
    }
  }
});

server.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});