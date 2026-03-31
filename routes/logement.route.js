const express = require("express");
const router = express.Router();
const logementCtrl = require("../controllers/logement.controller");

const { logementValidationRules, validate } = require('../middlewares/validateLogement')
const { logementPresent, logementIdPresent } = require('../middlewares/presence')

router.get("/", logementPresent ,logementCtrl.getAll);
router.get("/:id",logementIdPresent, logementCtrl.getById);
router.post("/", validate(logementValidationRules) ,logementCtrl.create);
router.put("/:id", validate(logementValidationRules) ,logementCtrl.modify);
router.delete("/:id",logementIdPresent ,logementCtrl.dele);

module.exports = router;