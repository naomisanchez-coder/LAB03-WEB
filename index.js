const { Transform } = require('stream');
const fs = require('fs');

// Se crea el Transform Stream para modificar los datos sobre la marcha
const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    // Convertimos cada fragmento a texto y lo transformamos a mayúsculas
    callback(null, chunk.toString().toUpperCase());
  }
});

const readStream = fs.createReadStream('texto.txt');
const writeStream = fs.createWriteStream('texto_mayusculas.txt');

// Conectamos lectura -> transformación -> escritura mediante pipes
readStream.pipe(transformStream).pipe(writeStream);

writeStream.on('finish', () => console.log('Conversión a mayúsculas completada exitosamente.'));