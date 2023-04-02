const joi = require("@hapi/joi");

const validateBody = (schema) => {
    return (req, res, next) => {
        const result = schema.validate(req.body);

        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }

        next();
    };
};


/* Login validator */
const mealSchema = joi.object().keys({
    category: joi
        .string()
        .trim()
        .required()
        .error(new Error("Meal category is required!")),
    meal: joi
        .string()
        .trim()
        .required()
        .error(new Error("Meal name is required!")),
    price: joi
        .number()
        .min(1)
        .required()
        .error(new Error("Meal price is required!")),
});


const mealDto = validateBody(mealSchema);

module.exports = {
    mealDto
};
