const recruitController = require("../controller/recruit");

const router = require("express").Router();

router.post("/addRecruit", recruitController.addRecruit);
router.get("/allRecruit", recruitController.getAllRecruit);
router.get("/:id", recruitController.getSingleRecruit);
router.put("/:id", recruitController.updateRecruit);
router.delete("/:id", recruitController.deleteRecruit);

module.exports = router;
