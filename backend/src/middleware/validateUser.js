// eslint-disable-next-line import/no-extraneous-dependencies
const Joi = require("joi");

const userSchema = Joi.object({
  firstname: Joi.string().max(255).required(),
  lastname: Joi.string().max(255).required(),
  pseudo: Joi.string().max(255).required(),
  email: Joi.string().email().max(255).required(),
  password: Joi.string().max(255).required(),
  birthdate: Joi.date().required(),
});

const validateUser = async (req, res, next) => {
  const { firstname, lastname, pseudo, email, password, birthdate } =
    req.body.data;
  const { error } = await userSchema.validate(
    { firstname, lastname, pseudo, email, password, birthdate },
    { abortEarly: false }
  );
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = validateUser;
