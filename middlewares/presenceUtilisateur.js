const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function utilisateursPresent(req, res, next) {
  const utilisateurs = await prisma.utilisateur.findMany();
  if (utilisateurs.length === 0) {
    const err = new Error("Aucun utilisateur trouvé");
    err.status = 404;
    throw err;
  }
  req.utilisateurs = utilisateurs;
  next();
}

async function utilisateurIdPresent(req, res, next) {
  const id = req.params.id;
  const utilisateur = await prisma.utilisateur.findUnique({ where: { id } });
  if (!utilisateur) {
    const err = new Error("Id d'utilisateur inconnu");
    err.status = 404;
    throw err;
  }
  req.utilisateur = utilisateur;
  next();
}

module.exports = {
  utilisateursPresent,
  utilisateurIdPresent
};