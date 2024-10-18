const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const backOfficeRoutes = require('./routes/backOffice');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/backoffice', backOfficeRoutes);

app.listen(3000, () => {
    console.log('Se inició el servidor backend del proyecto JOINNUS...')
});