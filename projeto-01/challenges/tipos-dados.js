const {ApolloServer, gql} = require('apollo-server')


const typeDefs = gql`

    type Usuario {
        id: ID
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
    }

    type Query {
        usuarioLogado: Usuario
    }
`

const resolvers = {
    Usuario: {
        salario(usuario) {
            return usuario.salario_real
        }
    },
    Query: {
        usuarioLogado() {
            return {
                id: '1',
                nome: 'João',
                email: 'Joao@gmail.com',
                idade: 20,
                salario_real: 1000.00,
                vip: true
            }
        }
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers
})


server.listen().then(({ url }) => {
    console.log(url)
})