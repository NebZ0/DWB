const { check, validationResult } = require('express-validator');

// Règles de validation pour la création/modification d'un utilisateur
const utilisateurValidationRules = [
  check('nom')
    .notEmpty().withMessage('Le nom est obligatoire')
    .bail()
    .isString().withMessage('Le nom doit être une chaîne de caractères'),

  check('email')
    .notEmpty().withMessage("L'email est obligatoire")
    .bail()
    .isEmail().withMessage("L'email n'est pas valide"),

  check('role')
    .notEmpty().withMessage('Le rôle est obligatoire')
    .bail()
    .isString().withMessage('Le rôle doit être une chaîne de caractères'),

  check('DateNaissance')
    .notEmpty().withMessage("La date de naissance est obligatoire")
    .bail()
    .isISO8601().withMessage("La date de naissance doit être une date valide (YYYY-MM-DD)")
];

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(v => v.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };
};

module.exports = {
  utilisateurValidationRules,
  validate
};