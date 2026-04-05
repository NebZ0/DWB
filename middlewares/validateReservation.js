const { check, validationResult } = require('express-validator');

const reservationValidationRules = [
    check('id_client')
        .notEmpty().withMessage("L'id du client est obligatoire")
        .bail()
        .isString().withMessage("L'id du client doit être une chaîne"),

    check('id_logement')
        .notEmpty().withMessage("L'id du logement est obligatoire")
        .bail()
        .isString().withMessage("L'id du logement doit être une chaîne"),

    check('DateArrive')
        .notEmpty().withMessage("La date d'arrivée est obligatoire")
        .bail()
        .isISO8601().withMessage("La date d'arrivée doit être au format ISO"),

    check('DateDepart')
        .notEmpty().withMessage("La date de départ est obligatoire")
        .bail()
        .isISO8601().withMessage("La date de départ doit être au format ISO")
];

const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(v => v.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
}

module.exports = {
    reservationValidationRules,
    validate
}