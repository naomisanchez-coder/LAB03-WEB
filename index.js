const fs = require('fs');

// Se crea el stream de lectura en modo UTF-8
const readable = fs.createReadStream('datos.txt', { encoding: 'utf8' });

// Evento 'data': se dispara cuando se recibe un fragmento de datos (chunk)
readable.on('data', chunk => console.log('Fragmento recibido:', chunk));

// Evento 'end': se dispara cuando se termina de leer todo el archivo
readable.on('end', () => console.log('Lectura completa'));

// Evento 'error': se dispara si ocurre un fallo (ej. archivo no encontrado)
readable.on('error', err => console.error('Error:', err));