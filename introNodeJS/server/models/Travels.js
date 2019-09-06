const Sequelize = require('sequelize');
const db = require('../config/database');

const Travels = db.define('travels', {
    title: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.NUMBER
    },
    departure_date: {
        type: Sequelize.DATE
    },
    return_date: {
        type: Sequelize.DATE
    },
    image: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    available: {
        type: Sequelize.STRING
    },
});

module.exports = Travels;