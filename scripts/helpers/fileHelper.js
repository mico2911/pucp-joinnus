const fs = require('fs');

const leerArchivoJSON = (ruta) => {
    return new Promise((resolve, reject) => {
        fs.readFile(ruta, 'utf8', (err, fileContent) => {
            if (err) {
                return reject(err);
            }
            try {
                const jsonData = JSON.parse(fileContent);
                resolve(jsonData);
            } catch (parseErr) {
                reject(parseErr);
            }
        });
    });
};

module.exports = {
    leerArchivoJSON : leerArchivoJSON
};