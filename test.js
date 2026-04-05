// test.js
const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

async function main() {
  console.log("=== Tous les utilisateurs ===");
  const utilisateurs = await prisma.utilisateur.findMany();
  console.log(utilisateurs);

  const userId = "69cb7aa6e8bc3860628efdd6"; // Mets ici un ID existant dans ta base

  console.log("\n=== Utilisateur sélectionné ===");
  const utilisateur = await prisma.utilisateur.findUnique({
    where: { id: userId }
  });
  console.log(utilisateur);

  console.log("\n=== Logements de l'utilisateur ===");
  const logements = await prisma.logement.findMany({
    where: { id_proprio: userId }
  });
  console.log(logements);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });