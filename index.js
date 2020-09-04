const mongoose = require('mongoose');
const config = require('./config');
const app = require('./app');

mongoose.connect(
    config.mongoose.url,
    config.mongoose.options,

    (err) => {
        if (err) {
            console.error('MongoDB NOT able to Connect!');
            console.log(err);
            process.exit(1);
        } else {
            const server = app.listen(config.port, () => {
                console.log(`server started and listening on port  ${config.port}`);
            })
            
            const exitHandler = () => {
                if (server) {
                    server.close(() => {
                        console.log('Server closed');
                        process.exit(1);
                    });
                } else {
                    process.exit(1);
                }
            };
            
            const unexpectedErrorHandler = (error) => {
                console.log(error);
                exitHandler();
            };
            
            process.on('uncaughtException', unexpectedErrorHandler);
            process.on('unhandledRejection', unexpectedErrorHandler);
        }
    });





