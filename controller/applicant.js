const { recruit, user } = require("../models");
const db = require("../models");
const Applicant = db.applicant;

// ? 유저가 채용공고에 지원하기
const applicant = async (req, res) => {
  let userInfo = {
    user_id: req.body.user_id,
    recruit_id: req.body.recruit_id,
    name: req.body.name,
  };

  // TODO: 한 회사의 여러 공고에는 여러번 지원 가능하지만
  // ! 어느 회사의 단일 공고에는 오직 딱 한번만 지원 가능 하다 (중복 지원 불가)

  const userApply = await Applicant.create(userInfo);
  res.status(200).send(userApply);
  console.log(userApply);
};

//? 내 지원 정보 가져오기
const getMyApply = async (req, res) => {
  // 모델간의 join 활용
  const applyInfo = await Applicant.findOne({
    include: [
      {
        model: recruit,
        require: true,
      },
    ],
  });

  //? applicant Model의 user_id로  User모델의 id를 찾는다
  const findUser = await Applicant.findOne({
    include: [{ model: user, where: { id: applyInfo.user_id }, require: true }],
  });
  //const applyInfoUser = applyInfo.dataValues.user.dataValues;
  const recruitJoin = applyInfo.dataValues.recruit;

  // 유저가 자신의 지원내역에 대한 정보를 찾으면 보여줄 내역
  const userApplyInfo = {
    recruit_id: recruitJoin.dataValues.id,
    username: findUser.user.dataValues.name,
    recruitTitle: recruitJoin.dataValues.title,
    applyPosition: recruitJoin.dataValues.position,
    recruitContent: recruitJoin.dataValues.description,
    company_id: recruitJoin.dataValues.company_id,
  };
  res.status(200).send(userApplyInfo);
};

//? 지원 내역을 삭제한다
const deleteApply = async (req, res) => {
  let id = req.params.id;
  await Company.destroy({ where: { id: id } });
  res.status(200).send("지원내역이 삭제 되었습니다");
};

module.exports = { applicant, deleteApply, getMyApply };
