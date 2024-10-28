const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

const backOfficeRoutes = require('./routes/backOffice');
const tiendaRoutes = require('./routes/tienda');

const errorController = require('./controllers/PageNotFound');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/backoffice', backOfficeRoutes);
app.use('/tienda', tiendaRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://mactperu2911:vo7OzZA73rx5LSjX@cluster0.1vyjt.mongodb.net/joinnusweb?retryWrites=true&w=majority&appName=Cluster0')
    .then(result => {
        app.listen(3000, () => {
            console.log('Se inició el servidor backend del proyecto JOINNUS...')
        });
    })
    .catch(err => {
        console.log(err);
    });
