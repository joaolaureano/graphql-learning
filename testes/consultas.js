const db = require('../config/db')


// db('perfis')
//     .then(res => res.map(p => p.nome))
//     .then(nomes => console.log(nomes))
//     .finally(() => db.destroy())

// db('perfis').select('nome', 'id')
//     .then(res => console.log(res))
//     .finally(() => db.destroy())

// db.select('nome', 'id').from('perfis')
//     .then(res => console.log(res))
//     .finally(() => db.destroy())


// db.select('nome', 'id').from('perfis')
//         .limit(4).offset(2)
//     .then(res => console.log(res))
//     .finally(() => db.destroy())

db.select('nome', 'id').from('perfis')
    // .where('id', '=', 2)
    // .where('nome', 'like', '%m%')
//     .where('nome', 'like', '%m%')
    .whereIn('id', [1, 3])
    // .whereNot({id: 1})
    .then(res => console.log(res))
    .finally(() => db.destroy())