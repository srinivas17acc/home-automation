 require('dotenv').config();

module.exports = {
    env: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || '5001',
    mongoose: {
        url: process.env.DB_CONNECT,
        options: {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    },
    jwt: {
        secret: process.env.TOKEN_SECRET || 'mysecretpassword',
        accessExpirationMinutes: 60 * 100,
        options:{
            algorithm: 'RS256',
        },
    }
}