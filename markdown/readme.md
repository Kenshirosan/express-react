# Express and React Blog

---
wip

Apprentissage des technologies react, express, github, git, mongoDB

Création d'un blog.

## Installation
- Cloner le repo
- `cd /chemin/du/blog`
- Taper la commande `npm run init`
- Dans mongoDB, creer une base de donnees blog. (taper `use blog` dans mongo shell)
- Creer un utilisateur de BDD, dans mongoShell : 
```mongodb
use blog;
db.createUser(
    {
        user: 'votre username',
        pwd:'votre password',
        roles:[{role:'readWrite', db: 'blog' }]
    }
);
```
- Creer un role `admin`:
```mongodb
db.roles.insert({name: 'admin'}) ;
```
- Dans le fichier `routes/api/users/register`, mettez votre email a la ligne 36.
- Renommer le fichier .env.example en .env 
- Mettre a jour les variables d'environnement dans .env (string de connection a mongoDB)
- Taper la commande `npm run watch` pour demarrer le serveur et le client.
- Vous pouvez cliquer sur le bouton signup et creer un compte avec l'email que vous avez choisi plus haut, votre utilisateur sera un admin.

## TODO :
Voir [le todo](TODO.md) !
