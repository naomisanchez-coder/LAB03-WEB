const http = require('http');
const ExcelJS = require('exceljs');

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  // Ruta de descarga del reporte Excel
  if (req.url === '/reporte') {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Ventas');

      worksheet.columns = [
        { header: 'Producto', key: 'producto', width: 25 },
        { header: 'Cantidad', key: 'cantidad', width: 15 },
        { header: 'Precio', key: 'precio', width: 15 }
      ];

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

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader(
        'Content-Disposition',
        'attachment; filename="Reporte_Ventas.xlsx"'
      );

      await workbook.xlsx.write(res);
      res.end();
    } catch (error) {
      console.error('Error al generar el Excel:', error);
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Error interno al generar el reporte.');
      }
    }
  } else {
    // Interfaz visual para cualquier otra ruta diferente a /reporte
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    const html = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Gestión de Reportes - Streams</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
        <style>
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Poppins', sans-serif;
          }
          body {
            background: linear-gradient(135deg, #ffe5ec 0%, #ffc2d1 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }
          .card {
            background: #ffffff;
            border-radius: 20px;
            padding: 40px;
            max-width: 450px;
            width: 100%;
            text-align: center;
            box-shadow: 0 10px 30px rgba(255, 114, 159, 0.2);
            border: 2px solid #ffb3c6;
          }
          .icon {
            font-size: 45px;
            margin-bottom: 15px;
          }
          h1 {
            color: #800f2f;
            font-size: 22px;
            margin-bottom: 12px;
          }
          p {
            color: #a4133c;
            font-size: 14px;
            margin-bottom: 25px;
            line-height: 1.6;
          }
          .btn {
            display: inline-block;
            background-color: #ff4d6d;
            color: #ffffff;
            padding: 14px 28px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-size: 15px;
            box-shadow: 0 4px 15px rgba(255, 77, 109, 0.4);
            transition: all 0.3s ease;
          }
          .btn:hover {
            background-color: #c9184a;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(201, 24, 74, 0.5);
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="icon">📊</div>
          <h1>Generador de Reportes</h1>
          <p>Visita <strong>/reporte</strong> para descargar el Excel o presiona el botón inferior para obtener la descarga inmediata.</p>
          <a href="/reporte" class="btn">✨ Descargar Reporte Excel ✨</a>
        </div>
      </body>
      </html>
    `;
    res.end(html);
  }
});

server.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});