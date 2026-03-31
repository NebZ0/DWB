require('dotenv').config();

const express = require("express");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

app.use(express.json());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Users Demo',
      version: '1.0.0',
      description: 'Exemple d’API pour les utilisateurs'
    },
  },
  apis: ['./routes/*.js'],
};
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient(); 

const logementRoutes = require("./routes/logement.route");
const utilisateurRoutes = require("./routes/utilisateur.route");
const reservationRoutes = require("./routes/reservation.route");

app.use("/utilisateurs", utilisateurRoutes);
app.use("/logements", logementRoutes);
app.use("/reservations", reservationRoutes);

app.use(((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
      error: err.message || "Internal server error"
    });
}));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 

