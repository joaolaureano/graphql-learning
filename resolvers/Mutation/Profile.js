const { perfis, nextId } = require('../../data/db')

function indiceProfile(filtro) {
    if (!filtro) return -1;
    const {id, nome} = filtro
    if (id) 
        return perfis.findIndex(u => u.id === id)
    
    if (nome)
        return perfis.findIndex(u => u.nome === nome)

    return -1
}


module.exports = {
    novoPerfil(_, { dados }) {
        const existsNome = perfis.some(u => u.nome === dados.nome)
        if (existsNome) {
            throw new Error('Nome já cadastrado')
        }
        const new_profile = {
            id: nextId(),
            ...dados,
        }
        perfis.push(new_profile)
        return new_profile
    },
    excluirPerfil(_, {filtro}) {
        const index = indiceProfile(filtro)
        if (index === -1) {
            return null
        }
        const removed = perfis.splice(index, 1)
        return  removed ? removed[0] : null
    },

    alterarPerfil(_, {filtro, dados}) {
        const index = indiceProfile(filtro)
        if (index === -1) {
            return null
        }
        const profile = perfis.splice(index, 1)[0]
        const new_profile = {
            ...profile,
            ...dados
        }
        perfis.push(new_profile)
        return new_profile
    }
}