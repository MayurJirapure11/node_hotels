const express = require('express')
const router = express.Router()

const Person = require("./../models/person.js");
const {jwtAuthMiddleware,generateToken} = require('./../jwt')

router.post("/signup",async (req, res) => {
    try{
      const body = req.body;
      const newPerson = new Person(body);
  
      const response = await newPerson.save()
      console.log('Data Saved')

      const payload = {
        id : response.id ,
        username : responce.username 
      }
      console.log(JSON.stringify(payload)) ;
      const token = generateToken(payload);
      console.log("Token is: ",token)

      res.status(200).json(response)
  
    }catch(err){
      console.log(err)
      res.status(500).json({error : 'Internal Server Error'})
    }
})

//Login Route
router.post('/login',async(req,res) => {
  try{
    //Extracting login credentials
    const {username,password} = req.body ;

    //finding by username
    const user = await Person.findOne({username : username})

    if(!user || !(await user.comparePassword(password))){
      return res.status(401).json({error : 'Wrong Username or Password'})
    }

    //Generating Token
    const payload = {
      id : user.id,
      username : user.username
    }
    const token = generateToken(payload) ;
    
    res.json({token});

  }catch(err){
    console.log(err)
    res.status(500).json({error : 'Internal Server Error'})
  }
})


router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try{
      const userData = req.user;
      console.log("User Data: ", userData);

      const userId = userData.id;
      const user = await Person.findById(userId);

      res.status(200).json({user});
  }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
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