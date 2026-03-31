const { check, validationResult } = require('express-validator')

const logementValidationRules = [
  check('titre')
    .notEmpty().withMessage('Le titre est obligatoire')
    .bail()
    .isString().withMessage('Le titre doit être une chaîne de caractères'),

  check('ville')
    .notEmpty().withMessage('La ville est obligatoire')
    .bail()
    .isString().withMessage('La ville doit être une chaîne de caractères'),

  check('prix')
    .notEmpty().withMessage('Le prix est obligatoire')
    .bail()
    .isFloat({ min: 0 }).withMessage('Le prix doit être un nombre positif'),

  check('id_proprio')
    .notEmpty().withMessage("L'id du propriétaire est obligatoire")
    .bail()
    .isString().withMessage("L'id du propriétaire doit être une chaîne")
]

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(v => v.run(req)))
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
}

module.exports = {
  logementValidationRules,
  validate
}