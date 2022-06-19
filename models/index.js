const configDB = require("../config/config");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(configDB.DB, configDB.USER, configDB.PASSWORD, {
  host: configDB.HOST,
  dialect: configDB.dialect,
  timezone: configDB.timezone,
  logging: configDB.logging,
});

//* 테스트용
sequelize
  .authenticate()
  .then((res) => {
    console.log("정상적으로 DB와 연결 되었습니다.", res);
  })
  .catch((err) => {
    console.error(err);
  });

//* 개발용 DB 동기화 : force가 true시 drop and re-sync된다
db.sequelize.sync({ force: false }).then(() => {
  console.log("DB 삭제 및 재 연결");
});
//const env = process.env.NODE_ENV || "development";
//const config = require(__dirname + "/../config/config.json")[env];

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

const db = {};
db.sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
