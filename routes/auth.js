const router = require('express').Router();
const Joi = require('joi');
const authController = require('../controllers/auth_controller');


router.post('/auth', authController.Login);

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    });
    return schema.validate(data);
}

module.exports = router;