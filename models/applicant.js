/**
 * TODO: 지원내역 모델에 기본적으로 있어야 할 것들
 *  ? 채용공고id
 *  ? 사용자id
 *  ? 사용자가 지원한 recruit_id는 재 지원 불가 1회만 가능 === 같은 회사의 다른 recruit는 지원 가능 => 지원 하면 true, 아니라면 false?
 */

module.exports = (sequelize, DataTypes) => {
  const Applicant = sequelize.define(
    "applicant",
    {
      recruit_id: {
        field: "recruit_id",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        field: "user_id",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      // 한글 입력
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return Applicant;
};
