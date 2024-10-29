const Categoria = require('../models/categoria');

exports.getMenuPrincipal = (req, res) => {
    res.render('backoffice/menu-principal', { 
        titulo: 'Modulo de administrador', 
        path: "/"
    })
};

exports.getListaCategorias = async (req, res) => {
    Categoria
    .find()
    .then(categorias => {
        res.render('backoffice/categories/listar-categorias', { 
            titulo        : 'Categorías', 
            tituloSeccion : 'Gestión de categorías',
            opcion        : 'categorias',
            categorias    : categorias
        })
    })
    .catch(err => console.log(err));
};

exports.postCrearCategoria = async (req, res) => {
    const nombre = req.body.nombreCategoria;

    const categoria = new Categoria({
        nombre : nombre
    });

    categoria.save()
    .then(result => {
        console.log('Categoría creada');
        res.redirect('categorias');
      })
    .catch(err => {
        console.log(err);
    });
};

exports.postEliminarCategoria = async (req, res) => {
    const idCategoria = req.body.idCategoria;
    Categoria.findByIdAndDelete(idCategoria)
    .then(() => {
        res.redirect('categorias');
      })
    .catch(err => console.log(err));
};