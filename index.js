const {ApolloServer, gql} = require('apollo-server')


const typeDefs = gql`

    type Produto {
        id: ID
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float

    }

    type Query{
        produtoEmDestaque: Produto
    }
`

const resolvers = {
    Produto: {
        precoComDesconto(produto) {
            return produto.desconto ? produto.preco * (1 - produto.desconto) : produto.preco;
        }
    },
    Query: {
        produtoEmDestaque() {
            return {
                id: '1',
                nome: 'Notebook',
                preco: '1999.99',
                // desconto: 0.15
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