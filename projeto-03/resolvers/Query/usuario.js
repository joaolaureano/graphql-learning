const db = require('../../config/db')
const tableName  = 'usuarios'
module.exports = {
    async usuarios() {
        return await db(tableName)
    },
    async usuario(_, { filtro }) {
        if (!filtro) return null
        const { id, email } = filtro
        if (id)
            return db(tableName).where({ id }).first()
        if(email)
            return db(tableName).where({ email }).first()
        return null
    }
}