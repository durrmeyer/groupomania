require("dotenv").config('./env')

//Paramètres de connexion à la BDD MYSQL via Sequelize//
module.exports = {
    HOST: process.env.DB_HOST,
    PASSWORD: process.env.DB_PASSWORD,
    USER: process.env.DB_USER,
    DB: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};