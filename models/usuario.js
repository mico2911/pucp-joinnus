module.exports = class Usuario {

    constructor(nombre, apellido, dni, fechaNacimiento, genero, ciudad, correo, password) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.fechaNacimiento = fechaNacimiento;
        this.genero = genero;
        this.ciudad = ciudad;
        this.correo = correo;
        this.password = password;
    }

    static getGeneros() {
        return ['Masculino', 'Femenimo'];
    }

}