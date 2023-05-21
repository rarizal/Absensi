"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config
	);
}

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf(".") !== 0 &&
			file !== basename &&
			file.slice(-3) === ".js" &&
			file.indexOf(".test.js") === -1
		);
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes
		);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
const user = require("./User");
const company = require("./Company");
const attendancelog = require("./AttendanceLog");
db.User = user(sequelize, Sequelize);
db.Company = company(sequelize, Sequelize);
db.AttendanceLogs = attendancelog(sequelize, Sequelize);
module.exports = db;

db.User.belongsTo(db.Company, {
	foreignKey: "company_id",
	as: "Company",
});

db.AttendanceLogs.belongsTo(db.User, {
	foreignKey: "user_id",
	as: "User",
});

// db.Company.belongsTo()
