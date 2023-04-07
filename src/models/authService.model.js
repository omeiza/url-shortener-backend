/**
 * Model: AuthService
 * Table: authServices
 * Author: https://github.com/omeiza
 */

const {DataTypes} = require('sequelize');
const sequelize = require('../utils/sequelize.util');
const User = require('./user.model');

const AuthService = sequelize.define(
	'authServices',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		userId: {
			type: DataTypes.INTEGER,
			references: {
				key: 'id',
				model: User
			}
		},
		providerName: {
			type: DataTypes.ENUM('onsite', 'twitter', 'google'),
			defaultValue: 'onsite',
			allowNull: false
		},
		providerIdentifier: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}
);

AuthService.associate = (models) => {
	models.users.hasOne(AuthService, {foreignKey: 'userId'});
	AuthService.belongsTo(models.users);
}

module.exports = AuthService;