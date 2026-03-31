const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient()

exports.getAll = async (req, res) => {
    res.json(req.logements)
}

exports.getById = async (req, res) => {
  res.json(logement)
}

exports.create = async (req, res) => {

  const { titre, ville, prix, id_proprio } = req.body
  const nouveauLogement = await prisma.logement.create({
    data: { titre, ville, prix, id_proprio }
  })

  res.status(201).json(nouveauLogement)
}

exports.modify = async (req, res) => {

  const id = req.params.id
  const { titre, ville, prix, id_proprio } = req.body

  const logement = await prisma.logement.update({
    where: { id },
    data: { titre, ville, prix, id_proprio}
  })

  res.json(logement)

}

exports.dele = async (req, res) => {
  const id = req.params.id
  await prisma.logement.delete({ where: { id } })
  res.status(204).send()
}