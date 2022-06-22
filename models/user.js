/**
 * TODO: user모델에 기본적으로 있어야 할 것들
 *  ? 이름
 *  ? 나이
 *
 *  ! 이 부분은 recruit와 다대다 관계가 될 수 있다(유보)
 *  ? 지원유무
 *  ? 지원한회사
 *  ? applicant 모델에서 가능
 *
 */

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
      },
      age: {
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      career: {
        type: DataTypes.STRING,
      },
    },
    {
      // 한글 입력
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return User;
};
