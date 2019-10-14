const express = require('express')
const pool = require('../database')

const router = express.Router()

router.get('/add', (req, res) => {
  res.render('links/add')
})

router.post('/add', async (req, res) => {
  const { title, url, description } = req.body
  const newLink = {
    title,
    url,
    description
  }
  // req.session.contador = req.session.contador ? req.session.contador + 1 : 1
  // res.send({cont: req.session.contador})
  await pool.query('INSERT INTO links set ?', [newLink])
  req.flash('success', 'Link guardado correctamente')
  res.redirect('/links')
})

router.get('/', async (req, res) => {
  const links = await pool.query('SELECT * FROM links')
  res.render('links/list', { links })
})

router.get('/delete/:id', async (req, res) => {
  const { id } = req.params
  await pool.query('DELETE FROM links WHERE ID = ?', [id])
  req.flash('success', 'Enlace eliminado correctamente')
  res.redirect('/links')
})

router.get('/edit/:id', async (req, res) => {
  const { id } = req.params
  const links = await pool.query('SELECT * FROM links WHERE id = ?', [id])
  res.render('links/edit', { link: links[0] })
})

router.post('/edit/:id', async (req, res) => {
  const { id } = req.params
  const { title, description, url } = req.body
  const newLink = {
    title,
    description,
    url
  }
  await pool.query('UPDATE links SET ? WHERE id = ?', [newLink, id])
  req.flash('success', 'Enlace actualizado correctamente')
  res.redirect('/links')
})

module.exports = router
