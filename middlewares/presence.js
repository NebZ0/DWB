const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function logementPresent(req, res, next){
    const logements = await prisma.logement.findMany();
    if(logements.length === 0){
        const err = new Error("Aucun logement trouvé")
        err.status = 404
        throw err
  }
    req.logements = logements

    next();
}

async function logementIdPresent(req, res, next){
    const id = req.params.id
    const logement = await prisma.logement.findUnique({ where: { id } })

    if(!logement){
        const err = new Error("Id de logement inconnue")
        err.status = 404
        throw err
  }
    req.logement = logement

    next();
}

module.exports = {
  logementPresent,
  logementIdPresent
}