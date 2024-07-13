const express = require("express");
const restaurantController = require("../controllers/restaurantController.js");

const router = express.Router();

router.get("/restaurant", restaurantController.getAllList);
// 검색결과 쿼리스트링
router.get("/restaurant/search", restaurantController.getSearchList);

module.exports = router;
