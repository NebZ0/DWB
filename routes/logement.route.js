const express = require("express");
const router = express.Router();
const logementCtrl = require("../controllers/logement.controller");

const { logementValidationRules, validate } = require('../middlewares/validateLogement')
const { logementPresent, logementIdPresent } = require('../middlewares/presence')

/**
 * @swagger
 * tags:
 *   - name: Logements
 *     description: Gestion des logements
 */

/**
 * @swagger
 * /logements:
 *   get:
 *     summary: Liste de tous les logements
 *     tags: [Logements]
 *     responses:
 *       200:
 *         description: Liste renvoyée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   titre:
 *                     type: string
 *                   ville:
 *                     type: string
 *                   prix:
 *                     type: integer
 *                   id_proprio:
 *                     type: string
 */
router.get("/", logementPresent ,logementCtrl.getAll);

/**
 * @swagger
 * /logements/{id}:
 *   get:
 *     summary: Récupérer un logement par ID
 *     tags: [Logements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du logement
 *     responses:
 *       200:
 *         description: Logement trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 titre:
 *                   type: string
 *                 ville:
 *                   type: string
 *                 prix:
 *                   type: integer
 *                 id_proprio:
 *                   type: string
 *       404:
 *         description: Logement non trouvé
 */

/**
 * @swagger
 * /logements:
 *   post:
 *     summary: Créer un nouveau logement
 *     tags: [Logements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *               ville:
 *                 type: string
 *               prix:
 *                 type: integer
 *               id_proprio:
 *                 type: string
 *     responses:
 *       201:
 *         description: Logement créé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 titre:
 *                   type: string
 *                 ville:
 *                   type: string
 *                 prix:
 *                   type: integer
 *                 id_proprio:
 *                   type: string
 */

/**
 * @swagger
 * /logements/{id}:
 *   put:
 *     summary: Modifier un logement existant
 *     tags: [Logements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du logement
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *               ville:
 *                 type: string
 *               prix:
 *                 type: integer
 *               id_proprio:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logement modifié
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 titre:
 *                   type: string
 *                 ville:
 *                   type: string
 *                 prix:
 *                   type: integer
 *                 id_proprio:
 *                   type: string
 *       404:
 *         description: Logement non trouvé
 */

/**
 * @swagger
 * /logements/{id}:
 *   delete:
 *     summary: Supprimer un logement
 *     tags: [Logements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du logement
 *     responses:
 *       204:
 *         description: Logement supprimé
 *       404:
 *         description: Logement non trouvé
 */

router.get("/:id",logementIdPresent, logementCtrl.getById);
router.post("/", validate(logementValidationRules) ,logementCtrl.create);
router.put("/:id", logementIdPresent, validate(logementValidationRules) ,logementCtrl.modify);
router.delete("/:id",logementIdPresent ,logementCtrl.dele);

module.exports = router;