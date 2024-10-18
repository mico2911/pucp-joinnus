// Controlador para mostrar las opciones del back office
exports.getMenuPrincipal = (req, res) => {
    res.render('backoffice/menu-principal', { 
        titulo: 'Modulo de administrador', 
        path: "/"
    })
};