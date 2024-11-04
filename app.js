const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');
const flash      = require('connect-flash');

const mongoose     = require('mongoose');
const session      = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const MONGODB_URI = 'mongodb+srv://mactperu2911:vo7OzZA73rx5LSjX@cluster0.1vyjt.mongodb.net/joinnusweb?retryWrites=true&w=majority&appName=Cluster0';

const backOfficeRoutes = require('./routes/backOffice');
const tiendaRoutes = require('./routes/tienda');
const authRoutes = require('./routes/auth')

const errorController = require('./controllers/PageNotFound');

const app = express();

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'algo muy secreto', resave: false, saveUninitialized: false, store: store }));

app.use(flash());

app.use('/backoffice', backOfficeRoutes);
app.use('/tienda', tiendaRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose.connect(MONGODB_URI)
    .then(result => {
        app.listen(3000, () => {
            console.log('Se inició el servidor backend del proyecto JOINNUS...')
        });
    })
    .catch(err => {
        console.log(err);
    });
