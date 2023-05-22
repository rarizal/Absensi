const db = require("../models");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const moment = require("moment");
const mainController = {
	getAll: async (req, res) => {
		try {
			const main = await db.AttendanceLogs.findAll({
				where: {
					user_id: req.body.user_id,
				},
				order: [["createdAt", "ASC"]],
			});

			return res.send(main);
		} catch (err) {
			console.log(err);
			return res.status(500).send({
				message: err.message,
			});
		}
	},
	getByMonth: async (req, res) => {
		try {
			const timeStart = moment(req.body.createdAt).format(
				"YYYY-MM-DD HH:mm:ss"
			);
			const timeEnd = moment(req.body.createdAt)
				.add(1, "month")
				.format("YYYY-MM-DD HH:mm:ss");
			const main = await db.AttendanceLogs.findAll({
				where: {
					user_id: req.body.user_id,
					createdAt: { [Op.between]: [timeStart, timeEnd] },
				},
				order: [["createdAt", "ASC"]],
			});
			return res.send(main);
		} catch (err) {
			console.log(err);
			return res.status(500).send({
				message: err.message,
			});
		}
	},

	getbyID: async (req, res) => {
		// Declaring time range to get the current tupple only
		const timeStart = moment(req.body.createdAt).format(
			"YYYY-MM-DD HH:mm:ss"
		);
		const timeEnd = moment(req.body.createdAt)
			.add({
				hours: 23,
				minutes: 59,
				seconds: 59,
			})
			.format("YYYY-MM-DD HH:mm:ss");
		try {
			const main = await db.AttendanceLogs.findOne({
				where: {
					user_id: req.body.user_id,
					createdAt: { [Op.between]: [timeStart, timeEnd] },
				},
			});

			return res.send(main);
		} catch (err) {
			console.log(err);
			return res.status(500).send({
				message: err.message,
			});
		}
	},

	insertClockOut: async (req, res) => {
		try {
			// Declaring time range to prevent mass update
			const timeStart = moment(req.body.createdAt).format(
				"YYYY-MM-DD HH:mm:ss"
			);
			const timeEnd = moment(req.body.createdAt)
				.add({
					hours: 23,
					minutes: 59,
					seconds: 59,
				})
				.format("YYYY-MM-DD HH:mm:ss");
			// Check if user_id already has a record for today
			const existingLog = await db.AttendanceLogs.findOne({
				where: {
					user_id: req.body.user_id,
					clockOut: { [Op.not]: null }, // gabisa pake notnull 😅
					createdAt: { [Op.between]: [timeStart, timeEnd] },
				},
			});

			if (existingLog) {
				// If a record with the same user_id, null clockOut, and a createdAt value within the current date exists, throw an error
				return res.status(400).send({
					message: "User already clocked out",
				});
			}

			const att = await db.AttendanceLogs.update(
				{
					clockOut: "CLOCK-OUT",
				},
				{
					where: {
						user_id: req.body.user_id,
						createdAt: { [Op.between]: [timeStart, timeEnd] },
					},
				}
			);

			return res.send({
				message:
					"Successfully update column clockOut with value CLOCK-OUT",
			});
		} catch (err) {
			console.log(err);
			return res.status(500).send({
				message: err.message,
			});
		}
	},
	insertClockIn: async (req, res) => {
		try {
			// Declaring time range to prevent duplicate data
			const timeStart = moment(req.body.createdAt).format(
				"YYYY-MM-DD HH:mm:ss"
			);
			const timeEnd = moment(req.body.createdAt)
				.add({
					hours: 23,
					minutes: 59,
					seconds: 59,
				})
				.format("YYYY-MM-DD HH:mm:ss");
			// Check if user_id already has a record for today
			const existingLog = await db.AttendanceLogs.findOne({
				where: {
					user_id: req.body.user_id,
					createdAt: { [Op.between]: [timeStart, timeEnd] },
				},
			});

			if (existingLog) {
				// If a record with the same user_id, null clockOut, and a createdAt value within the current date exists, throw an error
				return res.status(400).send({
					message: "User already clocked in",
				});
			}

			// If no existing record is found, create a new AttendanceLogs record
			const att = await db.AttendanceLogs.create({
				clockIn: "CLOCK-IN",
				clockOut: null,
				user_id: req.body.user_id,
			});
			return res.send({
				message:
					"Successfully insert column ClockIn with CLOCK-IN and CreatedAt & UpdatedAt columns are filled. ",
			});
		} catch (err) {
			return res.status(500).send({
				message: err.message,
			});
		}
	},
};

module.exports = mainController;
