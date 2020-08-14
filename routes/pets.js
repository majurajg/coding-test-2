const express = require('express');
const Joi = require('@hapi/joi');

const { validateBody } = require('../middlewares/route');
const pets = require('../models/pets');
const { Router } = require('express');

const router = express.Router();
//Methods to insert
router.post(
  '/',
  validateBody(Joi.object().keys({
    id: Joi.number().integer().required().description('Pets id'),
    name: Joi.string().required().description('Pets name'),
    colour: Joi.string().required().description('Pets colour'),
    age: Joi.number().integer().required().description('Pets age'),
  }),
  {
    stripUnknown: true,
  }),
  async (req, res, next) => {
    try {
      const pet = new pets(req.body);
      await pet.save();
      res.status(201).json(pet);
    } catch (e) {
      next(e);
    }
  }
);

//Methods to get with id
  router.get("/:id",async (req,res,next)=>
  {
    let id = req.params.id;
    pets.findOne({id:id}).exec((err,pets)=> res.status(201).json(pets))

  });

  //Methods to gets all data from the pets
  router.get("/",async (req,res,next)=>
  {
    pets.find().exec((err,pets)=> res.status(201).json({message:"All data fetched from database."}))
  });

  //Delete Pets details
  router.delete("/deletepet", async(req,res,next)=>{
   pets.deleteMany()
   .then(()=>{res.status(201).json({message:"Deleted All the pets"})})
   .catch(err=>{next(err);})
  });

  //Delete pets details based on the input id
  router.delete("/deletepet/:id",async (req, res, next) => {
    let id = req.params.id;
    pets.findOne({id:id})
      .exec((err,pets)=>{
        if(err){
          next(err);
        }
        else
        {
          pets.remove()
          .then(()=>{ res.status(201).json({message:`ID:${id} is successfully deleted`});})
           .catch(err=>{next(err);})
        }
      })
    });

module.exports = router;