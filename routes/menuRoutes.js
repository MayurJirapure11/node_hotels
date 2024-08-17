const express = require('express')
const router = express.Router()

const MenuItem = require('./../models/menu.js')

router.post('/',async(req,res) => {
    try{
      const data = req.body;
      const newMenu = new MenuItem(data);
      const response = await newMenu.save()
      console.log('Data Saved')
      res.status(200).json(response)
    }catch(err){
      console.log(err)
      res.status(500).json({error : 'Internal Server Error'})
    }
})
  
router.get("/",async (req,res) => {
    try{
      const data = await MenuItem.find()
      console.log('Data Fetched')
      res.status(200).json(data)
    }catch(err){
      console.log(err)
      res.status(500).json({error : 'Internal Server Error'})
    }
})

router.get('/:tasteType',async(req,res)=>{
    try{
        const tasteType = req.params.tasteType;
        if(tasteType == 'sour' || tasteType == 'sweet' ||tasteType == 'spicy'){
          const response = await MenuItem.find({taste: tasteType})
          console.log('Responce fetched')
          res.status(200).json(response)
        }
        else{
          res.status(404).json({error: 'Invalid workType'})
        }
      }
      catch(err){
        console.log(err)
        res.status(500).json({error : 'Internal Server Error'})
    }
})

module.exports = router ;