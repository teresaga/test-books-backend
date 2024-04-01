const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        mongoose.connect( process.env.DB_CNN);

        console.log('Database Online');
    } catch (error) {
       console.error(error);
       throw new Error('Database connection error'); 
    }
}

module.exports = {
    dbConnection
}