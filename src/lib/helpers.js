const bcrypt = require('bcryptjs')

const helpers = {}

helpers.encryptPassword = async (password) => {
  // Genera una cadena de caracteres para cifrar
  // Las veces que se va a ejecutar el algoritmo, mayor mas tiempo y mas seguro
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

helpers.matchPassword = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword)
  } catch (error) {
    console.log(error)
  }
}

module.exports = helpers
