// const {ApolloServer, gql} = require('apollo-server')

// const profiles = [
//     {
//         id: '1',
//         nome: 'Administrador',
//     }, {
//         id: '2',
//         nome: 'Comum',
//     }
//     ]

//     const usuarios = [{
//         id: '1',
//         nome: 'João',
//         email: 'Joao@gmail.com',
//         idade: 20,
//         salario: 1000.00,
//         vip: true,
//         profile: profiles[0]

//     },
//     {
//         id: '2',
//         nome: 'Maria',
//         email: 'Maria@gmail.com',
//         idade: 20,
//         salario: 1000.00,
//         vip: true,
//         profile: profiles[1]

//     },
//         {
//             id: '3',
//             nome: 'Pedro',
//             email: 'Pedro@gmail.com',
//             idade: 20,
//             salario: 1000.00,
//             vip: true,
//             profile: profiles[1]
//         }
// ]


// const typeDefs = gql`
//     type Usuario {
//         id: ID
//         nome: String
//         email: String
//         idade: Int
//         salario: Float
//         vip: Boolean
//         perfil_id: Int
//     }
//     type Perfil {
//         id: ID
//         nome: String
//     }

//     type Query{
//         usuarios: [Usuario]
//         usuario(id: ID!): Usuario
//         usuarioPerfil(id: ID!): [Usuario]
//         perfil(id: ID!): Perfil
//         perfis: [Perfil]


//     }
// `

// const resolvers = {
//     Usuario: {
//         perfil: (usuario, args, {db}) => {
//             return db.perfis.find(perfil => perfil.id === usuario.profile.id) || null
//         }
//     },
//     Query: {
//         usuarios: () => usuarios,
//         usuario: (_, args) => usuarios.find(u => u.id === args.id) || null,
//         usuarioPerfil: (_, args) => usuarios.filter(u => u.profile.id === args.id) || null,
//         perfil: (_, args) => profiles.find(p => p.id === args.id) || null,
//         perfis: () => profiles
        
//     }
    
// }


// const server = new ApolloServer({
//     typeDefs,
//     resolvers
// })


// server.listen().then(({ url }) => {
//     console.log(url)
// })