const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient()

exports.getAll = async (req, res) => {
    res.json(req.utilisateurs)
}

exports.getById = async (req, res) => {
    res.json(req.utilisateur)
}

exports.getLogementDeId = async (req, res) => {
    res.json(req.utilisateur.logements); 
}

exports.create = async (req, res) => {
    const { nom, email, role, DateNaissance } = req.body

    const nouveauUtilisateur = await prisma.utilisateur.create({
        data: { 
            nom, 
            email, 
            role: role || "user",
            DateNaissance: DateNaissance ? new Date(DateNaissance) : undefined
        }
    })

    res.status(201).json(nouveauUtilisateur)
}

exports.modify = async (req, res) => {
    const id = req.params.id
    const { nom, email, role, DateNaissance } = req.body

    const utilisateur = await prisma.utilisateur.update({
        where: { id },
        data: { 
            nom, 
            email, 
            role, 
            DateNaissance: DateNaissance ? new Date(DateNaissance) : undefined
        }
    })

    res.json(utilisateur)
}

exports.deleteUser = async (req, res) => {
    const id = req.params.id
    await prisma.utilisateur.delete({ where: { id } })
    res.status(204).send()
}