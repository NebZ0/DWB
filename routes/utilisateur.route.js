const express = require("express");
const router = express.Router();
const utilisateurCtrl = require("../controllers/utilisateur.controller");

const { utilisateurValidationRules, validate } = require('../middlewares/validateUtilisateur');
const { utilisateursPresent, utilisateurIdPresent } = require('../middlewares/presenceUtilisateur');
/**
 * @swagger
 * tags:
 *   - name: Utilisateurs
 *     description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /utilisateurs:
 *   get:
 *     summary: Liste de tous les utilisateurs
 *     tags: [Utilisateurs]
 *     responses:
 *       200:
 *         description: Liste renvoyée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       nom:
 *                         type: string
 *                       email:
 *                         type: string
 *                       role:
 *                         type: string
 *                       DateNaissance:
 *                         type: string
 *                         format: date
 */
router.get("/", utilisateursPresent, utilisateurCtrl.getAll);


/**
 * @swagger
 * /utilisateurs:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     tags: [Utilisateurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *               DateNaissance:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 nom:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                 DateNaissance:
 *                   type: string
 *                   format: date
 */

router.get("/", utilisateursPresent, utilisateurCtrl.getAll);
router.get("/:id", utilisateurIdPresent, utilisateurCtrl.getById);
router.post("/", validate(utilisateurValidationRules), utilisateurCtrl.create);
router.put("/:id", utilisateurIdPresent, validate(utilisateurValidationRules), utilisateurCtrl.modify);
router.delete("/:id", utilisateurIdPresent, utilisateurCtrl.deleteUser);

module.exports = router;