const db = require("../models");
const { Op } = require("sequelize");
const Recruit = db.recruit;

/**
 * TODO: 필수적 기능
 *
 * * 채용공고 등록
 * * 채용공고 수정
 * * 채용공고 삭제
 * * 채용공고 목록
 * * 채용공고 상세 페이지
 *
 */

// 공고 검색

const searchRecruit = async (req, res) => {
  console.log("키워드", req.params.keyWord);

  let searchWord = req.params.keyWord;

  let searchRecruit = await Recruit.findAll({
    where: {
      [Op.or]: [
        { tech: { [Op.like]: `%${searchWord}%` } },
        { position: { [Op.like]: `%${searchWord}%` } },
      ],
    },
  });
  res.status(200).send(searchRecruit);
};

// 새로운 공고 추가
const addRecruit = async (req, res) => {
  console.log(req.body);

  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // 채용 정보 : 공고_id, 회사명, 국가, 지역, 포지션, 보상금, 기술
  let recruitInfo = {
    company_id: req.body.company_id,
    title: req.body.title,
    country: req.body.country,
    region: req.body.region,
    position: req.body.position,
    reward: req.body.reward,
    tech: req.body.tech,
  };

  try {
    const recruit = await Recruit.create(recruitInfo);
    res.status(200).send(recruit);
  } catch (err) {
    res.status(500).send({
      message: err.message || "채용공고를 생성하는 과정에서 문제 발생!",
    });
  }
};

// 모든 공고를 가져오기
const getAllRecruit = async (req, res) => {
  let recruit = await Recruit.findAll({});
  res.status(200).send(recruit);
};

// 공고 하나만 보여주기
const getSingleRecruit = async (req, res) => {
  let id = req.params.id;
  let recruit = await Recruit.findOne({ where: { id: id } });
  res.status(200).send(recruit);
};

// 공고 내용 변경하기
const updateRecruit = async (req, res) => {
  //? 회사id를 유니크화 => SequelizeUniqueConstraintError:
  //?  company_id must be unique 문제 =>  서버 꺼짐 현상 발생
  //! 조건문으로 해결 => 들어오는 요청과 기존 db에 저장된 요청을 비교

  const test = await Recruit.findAll({ where: {} });
  let arr = [];
  test.forEach((c) => {
    arr.push(c.dataValues.id);
  });

  let checkRecruitId = arr.includes(req.params.id);

  const preRecruit = await Recruit.findOne({ where: {} });
  const companyId = preRecruit.dataValues.company_id;

  // 변경하려는 요청이 회사의 id라면 막는다
  if (req.body.company_id !== companyId) {
    return res
      .status(400)
      .send(
        "<p>회사의 고유 id는 변경이 불가합니다.<br> 변경하려는 company_id를 확인하세요</p>"
      );
  } else {
    let id = req.params.id; //3
    await Recruit.update(req.body, { where: { id: id } });
    try {
      return res.status(201).send("<h3>채용 공고가 업데이트 되었습니다</h3>");
    } catch (e) {
      console.log("에러발생", e);
    }
  }
  // 파라미터 요청을 없는 공고 id로 했을 경우
  if (!checkRecruitId) {
    return res.status(400).send(
      `<p>요청한 공고 id는 현재 등록되지 않은 공고의 id입니다.<br>
		요청한 param을 확인하세요</p>`
    );
  }
};

// 공고 삭제
const deleteRecruit = async (req, res) => {
  let id = req.params.id;
  await Recruit.destroy({ where: { id: id } });
  res.status(200).send("Recruit is deleted");
};

module.exports = {
  addRecruit,
  getAllRecruit,
  getSingleRecruit,
  updateRecruit,
  deleteRecruit,
  searchRecruit,
};
