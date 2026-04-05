const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function reservationPresent(req, res, next) {
    const reservations = await prisma.reservation.findMany();
    if (reservations.length === 0) {
        const err = new Error("Aucune réservation trouvée");
        err.status = 404;
        throw err;
    }
    req.reservations = reservations;
    next();
}

async function reservationIdPresent(req, res, next) {
    const id = req.params.id;
    const reservation = await prisma.reservation.findUnique({ where: { id } });

    if (!reservation) {
        const err = new Error("ID de réservation inconnue");
        err.status = 404;
        throw err;
    }
    req.reservation = reservation;
    next();
}

module.exports = {
    reservationPresent,
    reservationIdPresent
}