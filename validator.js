const Joi = require('joi');

function validate(req){
    const schema = Joi.object({
        title : Joi.string().max(15).min(2).required(),
    })
    const validattionResults = schema.validate(req.body);
    return validattionResults;
} 

module.exports= validate;