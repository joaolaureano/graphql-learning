const { usuarios, nextId } = require('../data/db')

module.exports = {
    novoUsuario(_, args) {
        const existsEmail = usuarios.some(u => u.email === args.email)
        if (existsEmail) {
            throw new Error('Email já cadastrado')
        }
        const new_user = {
            id: nextId(),
            ...args,
            perfil_id: 1,
            status: 'ATIVO'
        }
        usuarios.push(new_user)
        return new_user
    },
    excluirUsuario(_, args) {
        const index = usuarios.findIndex(u => u.id === args.id)
        if (index === -1) {
            throw new Error('Usuário não encontrado')
        }
        const user = usuarios.splice(index, 1)[0]
        
        return user
    },

    alterarUsuario(_, args) {
        const index = usuarios.findIndex(u => u.id === args.id)
        if (index === -1) {
            throw new Error('Usuário não encontrado')
        }
        const user = usuarios.splice(index, 1)[0]
        const new_user = {
            ...user,
            ...args
        }
        usuarios.push(new_user)
        return new_user
    }
}