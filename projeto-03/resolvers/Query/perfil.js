const db = require('../../config/db')

module.exports = {
    perfis() {
        return db('perfis')
    },
    perfil(_, { filtro }) {
        if (!filtro) return null
        const { id, nome } = filtro
        if (id)
            return db('perfis').where({ id }).first()
        if(nome)
            return db('perfis').where({ nome }).first()
        return null
    }
}