const applyController = require("../controller/applicant.js");

const router = require("express").Router();

/**
 * TODO: 필요한 API
 *  * [요구] 채용공고에 지원한다
 */

// 기본적인 기능 : 채용공고 지원하기, 공고삭제(취소하기), 지원내역 확인하기

router.post("/apply", applyController.applicant);
router.delete("/:id", applyController.deleteApply);
router.get("/:id", applyController.getMyApply);

module.exports = router;
