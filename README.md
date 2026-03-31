# DWB

## API REST de location de logement

Pour pouvoir utiliser, tout d'abord 

-npm install

-créer un fichier .env avec 
DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.dgekfss.mongodb.net/<database_name>?retryWrites=true&w=majority"

- npx prisma generate

- npx prisma db pull

- node .

L’API sera disponible sur : http://localhost:3000

La documentation Swagger sera disponible sur :
http://localhost:3000/api-docs

## Routes disponibles
### Utilisateurs
GET /utilisateurs → Liste de tous les utilisateurs
GET /utilisateurs/:id → Récupérer un utilisateur par ID
GET /utilisateurs/proprio/:id → Récupérer tous les logements d’un utilisateur (propriétaire)
POST /utilisateurs → Créer un nouvel utilisateur
PUT /utilisateurs/:id → Modifier un utilisateur
DELETE /utilisateurs/:id → Supprimer un utilisateur
### Logements
GET /logements → Liste de tous les logements
GET /logements/:id → Récupérer un logement par ID
POST /logements → Créer un logement
PUT /logements/:id → Modifier un logement
DELETE /logements/:id → Supprimer un logement
### Réservations
GET /reservations → Liste de toutes les réservations
GET /reservations/:id → Récupérer une réservation par ID
POST /reservations → Créer une réservation
PUT /reservations/:id → Modifier une réservation
DELETE /reservations/:id → Supprimer une réservation