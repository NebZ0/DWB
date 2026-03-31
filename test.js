const { PrismaClient } = require('./generated/prisma'); // chemin vers ton client Prisma
const prisma = new PrismaClient();

async function testLogements() {
  const id = "69cb7aa6e8bc3860628efdd6"; // remplace par un id existant dans ta DB

  const utilisateur = await prisma.utilisateur.findUnique({
    where: { id },
    include: { logements: true } // récupère les logements du propriétaire
  });

  if (!utilisateur) {
    console.log("Utilisateur introuvable");
  } else {
    console.log("Utilisateur :", utilisateur.nom);
    console.log("Logements :", utilisateur.logements);
  }
}

testLogements()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());