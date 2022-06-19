/**
 * TODO: recruit모델에 기본적으로 있어야 할 것들
 *  ? 회사id
 *  ? 회사명
 *  ? 포지션
 *  ? 국가
 *  ? 지역(위치)
 *  ? 채용보상금
 *  ? 내용
 *  ? 기술스택
 *  ?
 *
 */

module.exports = (sequelize, DataTypes) => {
  const Recruit = sequelize.define(
    "recruit",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
      },
      region: {
        type: DataTypes.STRING,
      },
      reward: {
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.TEXT,
      },
      tech: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // 한글 입력
      charset: "utf8",
      collate: "utf8_general_ci",
      underscored: true,
    }
  );
  return Recruit;
};
