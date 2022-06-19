/**
 * TODO: company모델에 기본적으로 있어야 할 것들
 *  ? 회사명
 *  ? 국가
 *  ? 지역(위치)
 *  ? 소개
 */

module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    "company",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      country: {
        type: DataTypes.STRING,
      },
      region: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      tech: {
        type: DataTypes.STRING,
      },
    },
    {
      // 한글 입력
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return Company;
};
