const sequelize = require('../sequelize ')
const Sequelize = require('sequelize');
let { DataTypes } = Sequelize;

const cityhouse = sequelize.define("cityhouse", {
    cityid: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cityName: {
        type: DataTypes.STRING
    },
    houselist: {
        type: DataTypes.ARRAY
    }

});