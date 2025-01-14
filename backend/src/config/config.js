// {
//   "development": {
//     "username": "root",
//     "password": null,
//     "database": "database_development",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "test": {
//     "username": "root",
//     "password": null,
//     "database": "database_test",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "database_production",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   }
// }

const { db_username, db_password, db_database, db_host, db_dialect } =
	process.env;
console.log(db_dialect);
module.exports = {
	development: {
		username: db_username,
		password: db_password,
		database: db_database,
		host: db_host,
		dialect: db_dialect,
		dialectOptions: {
			useUTC: false, // for reading from database
		},
		timezone: "+07:00", // for writing to database
	},
};
