const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient()

exports.getAll = async (req, res) => {
  try {
    const utilisateurs = await prisma.utilisateur.findMany()
    res.json(utilisateurs)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)

    const utilisateur = await prisma.utilisateur.findUnique({
      where: { id }
    })

    if (!utilisateur) {
      return res.status(404).json({ error: "Utilisateur inexistant." })
    }

    res.json(utilisateur)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.create = async (req, res) => {
  try {
    const { nom, email } = req.body

    if (!nom || !email) {
      return res.status(400).json({ error: "Champs manquants." })
    }

    const nouvelUtilisateur = await prisma.utilisateur.create({
      data: { nom, email }
    })

    res.status(201).json(nouvelUtilisateur)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.modify = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    const { nom, email } = req.body

    const utilisateur = await prisma.utilisateur.update({
      where: { id },
      data: {
        ...(nom !== undefined && { nom }),
        ...(email !== undefined && { email })
      }
    })

    res.json(utilisateur)
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: "Utilisateur non trouvé" })
    }
    res.status(500).json({ error: err.message })
  }
}

exports.dele = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)

    await prisma.utilisateur.delete({
      where: { id }
    })

    res.status(204).send()
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: "Utilisateur non trouvé" })
    }
    res.status(500).json({ error: err.message })
  }
}