const db = require('../../config/db')
const {perfil: obterPerfil} = require('../Query/perfil')
const tableName = 'perfis'
module.exports = {
    async novoPerfil(_, { dados }) {
        try {
            const id = await db(tableName).insert(dados,'id')
            return db(tableName).where({id: String(id)}).first()
        }
        catch (e) {
            console.log(e)
            throw new Error(e)
        }
    },
    async excluirPerfil(_, { filtro }) {
        try {
            const perfil = await obterPerfil(_, { filtro })
            if (perfil) {
                const perfil_id = perfil.id
                await db('usuarios_perfis').where({ perfil_id }).delete()
                await db(tableName).where({id: perfil_id}).delete()
            }
            return perfil

        } catch (e) {
            console.log(e)
            throw new Error(e)
        }
    },
    async alterarPerfil(_, { filtro, dados }) {
        try {
            console.log(filtro)
            const perfil = await obterPerfil(_, { filtro })
            if (perfil) {
                const perfil_id = perfil.id
                await db('perfis').where({ id: perfil_id })
                .update(dados)
            }
            return {...perfil, ...dados}

        } catch (e) {
            console.log(e)
            throw new Error(e)
        }
    }
}