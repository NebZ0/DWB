const express = require("express");
const router = express.Router();
const reservCtrl = require("../controllers/reservation.controller");

const { reservationValidationRules, validate } = require('../middlewares/validateReservation');
const { reservationPresent, reservationIdPresent } = require('../middlewares/presenceReservation');

/**
 * @swagger
 * tags:
 *   - name: Reservations
 *     description: Gestion des réservations
 */

/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Liste de toutes les réservations
 *     tags: [Reservations]
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
 *                   DateArrive:
 *                     type: string
 *                     format: date
 *                   DateDepart:
 *                     type: string
 *                     format: date
 *                   id_client:
 *                     type: string
 *                   id_logement:
 *                     type: string
 */
router.get("/",reservationPresent ,reservCtrl.getAll);

/**
 * @swagger
 * /reservations/{id}:
 *   get:
 *     summary: Récupérer une réservation par ID
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la réservation
 *     responses:
 *       200:
 *         description: Réservation trouvée
 */
router.get("/:id", reservationIdPresent,reservCtrl.getById);

/**
 * @swagger
 * /reservations:
 *   post:
 *     summary: Créer une nouvelle réservation
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               DateArrive:
 *                 type: string
 *                 format: date
 *               DateDepart:
 *                 type: string
 *                 format: date
 *               id_client:
 *                 type: string
 *               id_logement:
 *                 type: string
 *     responses:
 *       201:
 *         description: Réservation créée avec succès
 */
router.post("/",validate(reservationValidationRules) ,reservCtrl.create);

/**
 * @swagger
 * /reservations/{id}:
 *   put:
 *     summary: Modifier une réservation existante
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la réservation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               DateArrive:
 *                 type: string
 *                 format: date
 *               DateDepart:
 *                 type: string
 *                 format: date
 *               id_client:
 *                 type: string
 *               id_logement:
 *                 type: string
 *     responses:
 *       200:
 *         description: Réservation modifiée
 */
router.put("/:id",reservationIdPresent, validate(reservationValidationRules) ,reservCtrl.modify);

/**
 * @swagger
 * /reservations/{id}:
 *   delete:
 *     summary: Supprimer une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la réservation
 *     responses:
 *       204:
 *         description: Réservation supprimée
 */
router.delete("/:id", reservationIdPresent,reservCtrl.dele);

module.exports = router;