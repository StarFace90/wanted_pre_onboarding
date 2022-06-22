const recruitController = require("../controller/recruit");
const router = require("express").Router();

/**
 * TODO: 필요한 API
 *  * [요구] 채용공고 등록
 *  * [요구] 채용공고 수정
 *  * [요구] 채용공고 삭제
 *  * [요구] 모든 채용공고 보기
 *  * [선택] 채용공고(키워드) 검색하기
 *  * [요구] 채용공고 상세내역 보기
 *
 */

router.post("/addRecruit", recruitController.addRecruit);
router.get("/allRecruit", recruitController.getAllRecruit);
router.get("/detailPage/:id", recruitController.detailPage);
router.get("/:id", recruitController.getSingleRecruit);
router.put("/:id", recruitController.updateRecruit);
router.delete("/:id", recruitController.deleteRecruit);
router.get("/search/:keyWord", recruitController.searchRecruit);

module.exports = router;
