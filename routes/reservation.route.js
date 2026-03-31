const express = require("express");
const router = express.Router();
const reservCtrl = require("../controllers/utilisateur.controller");

router.get("/", reservCtrl.getAll);
router.get("/:id", reservCtrl.getById);
router.post("/", reservCtrl.create);
router.put("/:id", reservCtrl.modify);
// router.delete("/:id", reservCtrl.dele);

module.exports = router;