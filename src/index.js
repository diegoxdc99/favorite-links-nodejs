const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const MySQLStore = require('express-mysql-session');
require('dotenv').config()

const { database } = require('./keys')

// Initializations
const app = express()

// Settings
app.set('port', process.env.PORT || 4000)
app.set('views', path.join(__dirname, 'views')) // establece la ruta de las views
app.engine('.hbs', exphbs({ // .hbs el nombre del motor
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'), // establece la ruta de los layouts
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs', // Establecer la extensión de los archivos
  helpers: require('./lib/handlebars') // Definir el código de las vistas
}))
app.set('view engine', '.hbs')

// Middleware
app.use(session({
  secret: 'DiegoMysqlSession',
  resave: false, // no se renove la sesión
  saveUninitialized: false, // no se vuelva a establecer la sesión
  store: new MySQLStore(database)

}))
app.use(flash())
app.use(morgan('dev'))
// Aceptar desde los formularios los datos que envien los usuarios
// extended false para indicar que son datos sencillos (sin imagenes)
app.use(express.urlencoded({ extended: false }))
app.use(express.json()) // habilita enviar y recibir json


// Global Variables
app.use((req, res, next) => {
  app.locals.success = req.flash('success')
  next()
})
// Routes
app.use(require('./routes'))
app.use(require('./routes/authentication'))
app.use('/links', require('./routes/links'))

// Public
app.use(express.static(path.join(__dirname, 'public')))

// Starting the server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
})
