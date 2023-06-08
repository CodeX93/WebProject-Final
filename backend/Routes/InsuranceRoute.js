const router = require("express").Router();

const { getPlans } = require("../Controller/Insurance");
const { getPlansbyID } = require("../Controller/Insurance");

router.get("/get-plans", getPlans);
router.get("/get-plansid", getPlansbyID);

module.exports = router;
