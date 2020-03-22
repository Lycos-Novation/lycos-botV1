const mongoose = require('mongoose');

module.exports = {
    init() {
        const dbOptions = {
            useNewUrlParser: true,
            autoIndex: false,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family:4,
            useUnifiedTopology: true,
            authSource: "admin",
            user: "LePtitMetalleux",
            pass: "lapin49160"
        };
        mongoose.connect('mongodb://LePtitMetalleux:lapin49160@127.0.0.1:27017/LycosTest', dbOptions);
        mongoose.set('useFindAndModify', false);
        mongoose.Promise = global.Promise;

        mongoose.connection.on('connecting', () => {
           console.log('Début de la connexion mogoose')
        });
        mongoose.connection.on('connected', () => {
           console.log('Connexion mongoose établie !')
        });
        mongoose.connection.on('err', err => {
            console.log(`Erreur de connexion mongoose : \n ${err.stack}`)
        });
        mongoose.connection.on('disconnected', () => {
            console.log('Connexion mongoose terminée.')
        })
    },
};