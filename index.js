const fs = require('fs');

const readable = fs.createReadStream('entrada.txt');
const writable = fs.createWriteStream('copia_controlada.txt');

readable.on('data', chunk => {
  // Si la escritura no puede procesar el fragmento inmediatamente, pausamos la lectura
  if (!writable.write(chunk)) {
    console.log('Búfer de escritura lleno. Pausando lectura...');
    readable.pause();
  }
});

// Cuando el destino libera espacio en memoria, reanudamos la lectura
writable.on('drain', () => {
  console.log('Búfer liberado. Reanudando lectura...');
  readable.resume();
});

writable.on('finish', () => console.log('Transferencia con control de flujo completada.'));