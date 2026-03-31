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
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   nom:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *                   DateNaissance:
 *                     type: string
 *                     format: date
 */
router.get("/", utilisateursPresent, utilisateurCtrl.getAll);

/**
 * @swagger
 * /utilisateurs/{id}:
 *   get:
 *     summary: Récupérer un utilisateur par ID
 *     tags: [Utilisateurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
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
 *       404:
 *         description: Utilisateur non trouvé
 */

/**
 * @swagger
 * /utilisateurs/proprio/{id}:
 *   get:
 *     summary: Récupérer tous les logements dont l'utilisateur est propriétaire
 *     tags: [Utilisateurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Logements renvoyés avec succès
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
 *       404:
 *         description: Utilisateur non trouvé
 */

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

/**
 * @swagger
 * /utilisateurs/{id}:
 *   put:
 *     summary: Modifier un utilisateur existant
 *     tags: [Utilisateurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
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
 *       200:
 *         description: Utilisateur modifié
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
 *       404:
 *         description: Utilisateur non trouvé
 */

/**
 * @swagger
 * /utilisateurs/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Utilisateurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       204:
 *         description: Utilisateur supprimé
 *       404:
 *         description: Utilisateur non trouvé
 */

router.get("/:id", utilisateurIdPresent, utilisateurCtrl.getById);
router.get("/proprio/:id", utilisateurIdPresent, utilisateurCtrl.getLogementDeId);
router.post("/", validate(utilisateurValidationRules), utilisateurCtrl.create);
router.put("/:id", utilisateurIdPresent, validate(utilisateurValidationRules), utilisateurCtrl.modify);
router.delete("/:id", utilisateurIdPresent, utilisateurCtrl.deleteUser);

module.exports = router;