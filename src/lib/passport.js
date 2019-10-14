const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const pool = require('../database')
const helpers = require('./helpers')

passport.use('local.signin', new LocalStrategy({
  usernameField: 'username', // como se llama el usuarname del formulario
  passwordField: 'password', // como se llama el password del formulario
  passReqToCallback: true // pasa los demas campos del formulario
}, async (req, username, password, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username])
  if (rows.length > 0) {
    const user = rows[0]
    const isValidPassword = await helpers.matchPassword(password, user.password)
    if (isValidPassword) {
      done(null, user, req.flash('success', 'Bienvenido ' + user.username))
    } else {
      done(null, false, req.flash('message', 'Contraseña incorrecta'))
    }
  } else {
    return done(null, false, req.flash('message', 'Nombre de usuario no existe'))
  }
}))

passport.use('local.signup', new LocalStrategy({
  usernameField: 'username', // como se llama el usuarname del formulario
  passwordField: 'password', // como se llama el password del formulario
  passReqToCallback: true // pasa los demas campos del formulario
}, async (req, username, password, done) => {
  const { fullname } = req.body
  const newUser = {
    username,
    password,
    fullname
  }
  newUser.password = await helpers.encryptPassword(password)
  const result = await pool.query('INSERT INTO users SET ?', [newUser])
  newUser.id = result.insertId
  return done(null, newUser)
}))

// para guardar el usuario dentro de la sesión
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id])
  done(null, rows[0])
})
