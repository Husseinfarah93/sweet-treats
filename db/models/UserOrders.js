const Sequelize = require('sequelize');
const db = require('APP/db')

// ***THIS IS NOT WORKING******///

const UserOrder = db.define('userOrder', {
	test:{
		type:Sequelize.STRING
	}
})
module.exports = UserOrder;
