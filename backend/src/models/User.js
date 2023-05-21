module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("Users", {
    fullname: Sequelize.STRING,
    address: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
  });
  return User;
};
