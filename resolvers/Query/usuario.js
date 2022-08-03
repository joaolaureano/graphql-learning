const db = require('../../config/db')

module.exports = {
    async usuarios() {
        return await db('usuarios')
    },
    async usuario(_, { filtro }) {
        if (!filtro) return null
        const { id, email } = filtro
        if (id)
            return db('usuario').where({ id }).first()
        if(email)
            return db('usuario').where({ email }).first()
        return null
    }
}