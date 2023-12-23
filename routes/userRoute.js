const router = require('express').Router();
const User = require('../models/userModel');
const mongoose = require('mongoose');
const bcrypt=require('bcrypt')

router.post('/register', async (req, res) => {
  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create a new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    // Save the new user
    await newUser.save();
    
    // Respond with success
    res.json({ message: 'User Registration Success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;


router.post("/login", async (req, res) => {
  try {
    const docs = await User.find({ email: req.body.email, password: req.body.password });

    if (docs.length > 0) {
      const user = {
        name: docs[0].name,
        _id: docs[0]._id,
        email: docs[0].email,
        isAdmin: docs[0].isAdmin
      };

      res.status(200).json(user);
    } else {
      res.status(400).json({ message: 'Invalid Credentials' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/update', async (req, res) => {
  try {
    const {userid, updateuser} = req.body;

    // Use await to make sure the update operation completes before proceeding
    const result = await User.findByIdAndUpdate({ _id: userid }, {
      name: updateuser.name,
      email: updateuser.email,
      password: updateuser.password
    });

    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }
    else{

      return res.status(200).json({ message: 'Updated successfully', user: result });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error updating user', error: error.message });
  }
});

router.get('/getallusers',async(req,res)=>{
  try{
    const docs=await User.find({});
    res.send(docs)
  }
  catch(err){
    res.status(500).json({message:'intenal server'})
  }
})

router.post('/deleteuser', async (req, res) => {
  try {
    const userId = req.body.userid;

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Attempt to find and delete the user
    await User.findByIdAndDelete(userId);

    // If successful, send success message
    res.send('User Deleted Successfully');
  } catch (error) {
    // Handle errors
    console.error(error);

    // Check if the error is due to invalid ObjectId or other reasons
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid User ID' });
    }

    // Generic error response
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports=router