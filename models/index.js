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
  .then(() => {
    console.log("정상적으로 DB와 연결 되었습니다.");
  })
  .catch((err) => {
    console.log("Unable to connect to the database:", err);
  });
//   .finally(() => {
//     sequelize.close();
//   });

const db = {};
db.sequelize = Sequelize;
db.sequelize = sequelize;

db.company = require("./company.js")(sequelize, DataTypes);
db.recruit = require("./recruit.js")(sequelize, DataTypes);
db.user = require("./user.js")(sequelize, DataTypes);

// ?회사는 포지션 별로 공고를 여러번 등록할 수 있다.
db.company.hasMany(db.recruit, {
  foreignKey: {
    name: "company_id",
    sourceKey: "id",
  },
});
// recruit 모델에 company_id 추가
db.recruit.belongsTo(db.company, {
  foreignKey: {
    name: "company_id",
    targetKey: "id",
    onUpdate: "RESTRICT",
    unique: "company_id",
  },

  //uniqueKey: "company_id",
});

// db.user.hasMany(db.recruit, {
//   foreignKey: "user_id",
//   sourceKey: "id",
// });
// db.recruit.belongsTo(db.user, {
//   foreignKey: "user_id",
//   sourceKey: "id",
// });

//* 개발용 DB 동기화 : force가 true시 drop and re-sync된다
db.sequelize.sync({ force: false }).then(() => {
  console.log("DB 삭제 및 재 연결");
});

module.exports = db;
