# Créer un serveur avec nodejs.

---

1. Tapez `npm init` et répondre aux questions.
2. Créer un fichier `index.js` (le nom du fichier doit correspondre à la clé main dans `package.json`).
3. On importe `express` et on crée une application avec `express()`.
4. Créer un script npm start dans `package.json`.
5. On install nodemon : `npm install --save-dev nodemon` ou `npm i -D nodemon`.
6. On crée un script pour se servir de `nodemon`.
7. On installe la librairie `dotenv`.
8. On crée un fichier `.env` (CE FICHIER NE DOIT JAMAIS ETRE PARTAGE).
9. Crée un fichier `.gitignore` et mettre dedans ce que voue voulez ignorer.
10. Ensuite on peut faire `git init`.
11. Créer un dossier routes.
12. Dans le dossier routes : créer un dossier api.
13. Dans le dossier api : créer un dossier users.
14. Dans `index.js` : on peut commencer le routing.
15. Dans le dossier route/api/users : On peut créer les routes et envoyer des réponses.
    
## Installer React et faire communiquer le backend et le frontend.

16. Clone du repo blog. (ou `npx create-react-app` pour les app nouvelles).
17. Faire cd vers le dossier client et faire `npm install`.
18. Revenir dans le dossier 'root' : racine de l'application.
18. Installer concurrently : `npm i -D concurrently` ou `npm install --save-dev concurrently`.
19. On écrit les scripts pour que `concurrently` fonctionne.
20. Penser à la clé proxy dans `package.json` du client (app react).
    
## Créer le repo

21. Créer un README.md bien précis et documenté.
22. Créer un repo git et l'envoyer sur github. (Choix URL : `git@github.com:<userName>/<repoName>.git`)


## Installation de mongoose
23. `npm install mongoose` dans le dossier racine de votre api.
24. Créer la connection à la base de données.

## Installation de bcrypjs
25. `npm i bcryptjs`
26. Gérer les mots de passe avec les méthodes **salt, hash et compare**


## Créer une base de données mongoDB
1. Ouvrir Compass.
2. On crée un base de données plus une collection.
3. On switch sur la nouvelle base de données avec `mongoSH` (le terminal en bas dans compass) : `use <dbName>`
4. Vous exécutez la command `db.createUser({ <options> })`.
5. Vous redémarrez Compass.
6. On teste la string de connexion dans Compass : `mongodb://<user>:<password>@localhost:27017/<dbName>`
7. Si ça marche : on est OK, Sinon on reprend depuis 5.
