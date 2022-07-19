const Sequelize = require('sequelize');
const dbConfig = require('../config/db')
const User = require('../models/User')
require('dotenv/config')

const connection = new Sequelize(dbConfig[process.env.NODE_ENV])

User.init(connection)

module.exports = connection;