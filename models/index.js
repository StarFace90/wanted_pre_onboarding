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
db.applicant = require("./applicant.js")(sequelize, DataTypes);

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
  },
});

// applicant 지원 모델 관계 설정
//? 지원자는 여러 회사에 지원할 수 있다.
//? 채용공고는 여러개의 지원 내역을 가질 수 있다. (지원자가 여러명 있을 수 있다)

db.user.hasMany(db.applicant, {
  foreignKey: "user_id",
  sourceKey: "id",
});

db.recruit.hasMany(db.applicant, {
  foreignKey: "recruit_id",
  sourceKey: "id",
});

db.applicant.belongsTo(db.user, {
  foreignKey: {
    name: "user_id",
    targetKey: "id",
    onDelete: "Cascade",
  },
});

db.applicant.belongsTo(db.recruit, {
  foreignKey: {
    name: "recruit_id",
    targetKey: "id",
    onDelete: "Cascade",
  },
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
