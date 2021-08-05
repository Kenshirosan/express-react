// Création d'un utilisateur de la base de données blog dans mongoDB
//
// 1. : On switch sur las BDD qu'on a crée
'use blog';
// 2. : On crée l'utilisateur avec les droits read / write
db.createUser({
    user: 'laurent',
    pwd: 'password',
    roles: [{ role: 'readWrite', db: 'blog' }],
});
