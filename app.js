const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

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

app.listen(3000, () => {
    console.log('Se inició el servidor backend del proyecto JOINNUS...')
});