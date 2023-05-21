const db = require("../models");
const sequelize = require("sequelize");
const userController = {
	getAll: async (req, res) => {
		try {
			const user = await db.User.findOne({
				where: {
					email: req.body.email,
				},
			});
			console.log(user);
			return res.send(user);
		} catch (err) {
			res.status(500).send({
				message: err.message,
			});
		}
	},
	getById: async (req, res) => {
		const user = await db.User.findOne({
			where: {
				id: req.params.id,
			},
		});
		return res.send(user);
	},
	insertUserV1: async (req, res, next) => {
		try {
			const { fullname, username, address, email, password, company_id } =
				req.body;
			const result = await db.sequelize.transaction(async () => {
				const newUser = await db.User.create({
					fullname,
					username,
					address,
					email,
					password,
					company_id,
				});
				console.log(newUser.dataValues);
			});
			next();
		} catch (err) {
			res.status(500).send({
				message: err.message,
			});
		}
	},
};
module.exports = userController;
