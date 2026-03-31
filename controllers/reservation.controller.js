const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient()

exports.getAll = async (req, res) => {
  try {
    const reservations = await prisma.reservation.findMany()
    res.json(reservations)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getById = async (req, res) => {
  try {
    const id = req.params.id

    const reservation = await prisma.reservation.findUnique({
      where: { id }
    })

    if (!reservation) {
      return res.status(404).json({ error: "Réservation inexistante." })
    }

    res.json(reservation)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.create = async (req, res) => {
  try {
    const { DateArrive, DateDepart, id_client, id_logement } = req.body

    if (!DateArrive || !DateDepart || !id_client || !id_logement) {
      return res.status(400).json({ error: "Champs manquants." })
    }

    const nouvelleReservation = await prisma.reservation.create({
      data: {
        DateArrive: new Date(DateArrive),
        DateDepart: new Date(DateDepart),
        id_client,
        id_logement
      }
    })

    res.status(201).json(nouvelleReservation)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.modify = async (req, res) => {
  try {
    const id = req.params.id
    const { DateArrive, DateDepart, id_client, id_logement } = req.body

    const reservation = await prisma.reservation.update({
      where: { id },
      data: {
        ...(DateArrive && { DateArrive: new Date(DateArrive) }),
        ...(DateDepart && { DateDepart: new Date(DateDepart) }),
        ...(id_client && { id_client }),
        ...(id_logement && { id_logement })
      }
    })

    res.json(reservation)
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: "Réservation non trouvée" })
    }
    res.status(500).json({ error: err.message })
  }
}

exports.dele = async (req, res) => {
  try {
    const id = req.params.id

    await prisma.reservation.delete({
      where: { id }
    })

    res.status(204).send()
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: "Réservation non trouvée" })
    }
    res.status(500).json({ error: err.message })
  }
}