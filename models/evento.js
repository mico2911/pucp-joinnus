module.exports = class Evento {

    constructor(nombre, urlImagen, descripcion, fecha, hora, lugar, ciudad) {
        this.nombre = nombre;
        this.urlImagen = urlImagen;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.hora = hora;
        this.lugar = lugar;
        this.ciudad = ciudad;        
    }

    getFechaYHora() {
        return this.fecha + ' ' + this.hora;
    }

}