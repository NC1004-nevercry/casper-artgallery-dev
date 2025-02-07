const express = require("express");
const { getTradingPairs } = require("../controllers/tradingController");

const router = express.Router();

router.route("/trading-pair").get(getTradingPairs);

module.exports = router;
