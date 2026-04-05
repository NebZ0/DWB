const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

exports.getAll = async (req, res) => {
    res.json(req.reservations);
}

exports.getById = async (req, res) => {
    res.json(req.reservation);
}

exports.create = async (req, res) => {
    const { id_client, id_logement, DateArrive, DateDepart } = req.body;
    const nouvelleReservation = await prisma.reservation.create({
        data: { id_client, id_logement, DateArrive: new Date(DateArrive), DateDepart: new Date(DateDepart) }
    });

    res.status(201).json(nouvelleReservation);
}

exports.modify = async (req, res) => {
    const id = req.params.id;
    const { id_client, id_logement, DateArrive, DateDepart } = req.body;

    const reservation = await prisma.reservation.update({
        where: { id },
        data: { id_client, id_logement, DateArrive: new Date(DateArrive), DateDepart: new Date(DateDepart) }
    });

    res.json(reservation);
}

exports.dele = async (req, res) => {
    const id = req.params.id;
    await prisma.reservation.delete({ where: { id } });
    res.status(204).send();
}