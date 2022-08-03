const db = require('../../config/db')

module.exports = {
    async novoUsuario(_, { dados }) {
        try {
            const idsPerfis = []
            if(dados.perfis) {
                for(let filtro of dados.perfis) {
                    const perfil = await obterPerfil(_, {
                        filtro
                    })
                    if(perfil) idsPerfis.push(perfil.id)
                }
            }

            const [ id ] = await db('usuarios')
                .insert({
                    nome,
                    email,
                    senha,
                })

            for(let perfil_id of idsPerfis) {
                await db('usuarios_perfis')
                    .insert({ perfil_id, usuario_id: id })
            }

            return db('usuarios')
                .where({ id }).first()
        } catch(e) {
            throw new Error(e.sqlMessage)
        }
    },
    async excluirUsuario(_, { filtro }) {
        try {
            const usuario = await obterUsuario(_, filtro)
            if(usuario) {
                const { id } = usuario
                await db('usuarios_perfis')
                    .where({ usuario_id: id }).delete()
                await db('usuarios')
                    .where({ id }).delete()
            }
            return usuario
        } catch(e) {
            throw new Error(e.sqlMessage)
        }
    },
    async alterarUsuario(_, { filtro, dados }) {
        try {

            const usuario = await obterUsuario(_, { filtro })
            if(usuario) {
                const { id } = usuario
                if (dados.perfis) {
                    // remove todos os perfis do usuário
                    await db('usuarios_perfis')
                        .where({ usuario_id: id }).delete()

                    for(let filtro of dados.perfis) {
                        const perfil = await obterPerfil(_, {
                            filtro
                        })
                        // adiciona apenas os perfis do usuário que são novos
                        if(perfil) {
                            await db('usuarios_perfis')
                                .insert({
                                    perfil_id: perfil.id,
                                    usuario_id: id
                                })
                        }
                    }
                }

                delete dados.perfis
                // atualiza dados do usuário
                await db('usuarios')
                    .where({ id })
                    .update(dados)
            }
            return !usuario ? null : { ...usuario, ...dados }
        } catch(e) {
            throw new Error(e)
        }
    }
    }
}