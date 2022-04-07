const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        type: { type: DataTypes.STRING, allowNull: false },
        created: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        value: { type: DataTypes.DOUBLE, allowNull: false },
        userId: { type: DataTypes.INTEGER, allowNull: false },
        categoryId: { type: DataTypes.INTEGER, allowNull: false }
    };

    return sequelize.define('transaction', attributes);
}