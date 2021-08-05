const mongoose = require('mongoose');

async function dbconnexion() {
    // process.env.DB_CONNEXION va chercher la string de connection dans le fichier .env

    try {
        const conn = await mongoose.connect(process.env.DB_CONNEXION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });

        mongoose.connection.on('error', err => {
            console.log(err.message);
        });

        console.log('Mongoose connected !! 🔥 🔥 😀 🍟 🇫🇷');
    } catch (e) {
        console.log(e.message);

        process.exit(1);
    }
}

module.exports = dbconnexion;
