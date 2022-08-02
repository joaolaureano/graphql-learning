const { usuarios, nextId } = require('../../data/db')

function indiceUsuario(filtro) {
    if (!filtro) return -1;
    const {id, email} = filtro
    if (id) 
        return usuarios.findIndex(u => u.id === id)
    
    if (email)
        return usuarios.findIndex(u => u.email === email)

    return -1
}


module.exports = {
    novoUsuario(_, { dados }) {
        const existsEmail = usuarios.some(u => u.email === dados.email)
        if (existsEmail) {
            throw new Error('Email já cadastrado')
        }
        const new_user = {
            id: nextId(),
            ...dados,
            perfil_id: 1,
            status: 'ATIVO'
        }
        usuarios.push(new_user)
        return new_user
    },
    excluirUsuario(_, {filtro}) {
        const index = indiceUsuario(filtro)
        if (index === -1) {
            return null
        }
        const removed = usuarios.splice(index, 1)
        return  removed ? removed[0] : null
    },

    alterarUsuario(_, {filtro, dados}) {
        const index = indiceUsuario(filtro)
        if (index === -1) {
            return null
        }
        const user = usuarios.splice(index, 1)[0]
        const new_user = {
            ...user,
            ...dados
        }
        usuarios.push(new_user)
        return new_user
    }
}