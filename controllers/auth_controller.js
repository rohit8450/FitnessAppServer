const {User} = require('../models/user');
const {validate} = require('../routes/auth');
const Joi = require('joi');
const bcrypt = require('bcrypt');


module.exports.Login = async (req, res) => {
    try {
        const {error} = validate(req.body);

        if(error){
            return res.status(400).send({message: error.details[0].message});
        }

        const user = await User.findOne({email: req.body.email});

        if(!user) {
            return res.status(401).send({message: "Invalid Email or Password"});
        }

        const validPassword = await bcrypt.compare(
            req.body.password, user.password
        );

        if(!validPassword){
            return res.status(401).send({message: "Invalid Email or Password"});
        }

        const token = user.generateAuthToken();
        res.status(200).send({data: token, message: "Logged In Successfully"});

    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});
    }
}