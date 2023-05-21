const db = require("../models");
const sequelize = require("sequelize");
const loginController = {
	goLogin: async (req, res) => {
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
};
module.exports = loginController;
