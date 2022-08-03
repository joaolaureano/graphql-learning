const usuario = require('./Usuario')
const profile = require('./Profile')

module.exports = {
    ...usuario,
    ...profile
    
}