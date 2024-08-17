const express = require('express')
const router = express.Router()

const Person = require("./../models/person.js");

router.post("/",async (req, res) => {
    try{
      const body = req.body;
      const newPerson = new Person(body);
  
      const response = await newPerson.save()
      console.log('Data Saved')
      res.status(200).json(response)
  
    }catch(err){
      console.log(err)
      res.status(500).json({error : 'Internal Server Error'})
    }
})

router.get("/",async (req,res) => {
    try{
      const data = await Person.find()
      console.log('Data Fetched')
      res.status(200).json(data)
    }catch(err){
      console.log(err)
      res.status(500).json({error : 'Internal Server Error'})
    }
})

router.get('/:workType', async(req,res) => {
    try{
      const workType = req.params.workType;
      if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){
        const response = await Person.find({work: workType})
        console.log('Responce fetched')
        res.status(200).json(response)
      }else{
        res.status(404).json({error: 'Invalid workType'})
      }
    }
    catch(err){
      console.log(err)
      res.status(500).json({error : 'Internal Server Error'})
    }
})

router.put('/:id', async(req , res) => {
    try{
        const personId = req.params.id ;
        const updatedPersonData = req.body ;

        const response = await Person.findByIdAndUpdate(personId , updatedPersonData,{
            new : true ,
            runValidators: true ,
        })

        if(!response){
            return res.status(404).json({error : 'Person not found'})
        }

        console.log('Updated Succesfully')
        res.status(200).json(response)

    }catch(err){
        console.log(err)
        res.status(500).json({error : 'Internal Server Error'})
    }
})

router.delete('/:id', async(req , res) => {
    try{
        const personId = req.params.id

        const responce = await Person.findByIdAndDelete(personId);

        if(!responce){
            return res.status(404).json({error : 'Person not found'})
        }
        console.log('Data Deleted')
        res.status(200).json(responce)

    }catch(err){
        console.log(err)
        res.status(500).json({error : 'Internal Server Error'})
    }
})

module.exports = router ;