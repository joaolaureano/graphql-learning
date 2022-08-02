const {ApolloServer, gql} = require('apollo-server')


const typeDefs = gql`
    scalar Date

    type Usuario {
        id: ID
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
    }

    type Query {
        horaAtual: Date
        usuarioLogado: Usuario
    }
`

const resolvers = {
    Query: {
        horaAtual() {
            return `${new Date}`
        },
        usuarioLogado() {
            return {
                id: '1',
                nome: 'João',
                email: 'Joao@gmail.com',
                idade: 20,
                salario: 1000.00,
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