const Joi = require('joi');

const listingSchema=Joi.object({
    listing:Joi.object({
      title:Joi.string().required() ,
      description:Joi.string().required(),
      // it is not compulsory that we need image so we keep like this
      image:Joi.string().allow("",null),
      price:Joi.number().required(),
      location:Joi.string().required(),
      country:Joi.string().required(),
    }).required()
});

const reviewSchema=Joi.object({
  review:Joi.object({
    rating:Joi.number().required().min(1).max(5),
    comment:Joi.string().required(),
  }).required()
});

module.exports=listingSchema;
module.exports=reviewSchema;

