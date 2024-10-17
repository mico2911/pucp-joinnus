module.exports = class Evento {

    constructor(codigo, nombre, urlImagen, codCategoria, descripcion, fecha, hora, lugar, ciudad) {        
        this.codigo = codigo;
        this.nombre = nombre;
        this.urlImagen = urlImagen;
        this.codCategoria = codCategoria;
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