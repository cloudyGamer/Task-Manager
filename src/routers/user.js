const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');

router.post('/users', async (req, res) => {
      console.log(req.body);
      const user = new User(req.body);
      try {
           await user.save();
           const token = await user.generateAuthToken();
           res.status(201).send({user,token});
      } catch (error) {
           res.status(400);
           res.send(error.message);
      }
 });
   
router.get('/users/me', auth, async (req, res) => {

res.send(req.user);
 });
 
  //<editor-fold defaultstate="collapsed" desc="find user by id">
 router.get('/users/:id', async (req, res) => {
      const _id = req.params.id;
      try {
           const user = await User.findById(_id);

           if (!user) {
                return res.status(400).send('Error: Task not found');
           }
           res.status(202).send(`the following user was found ${user}`);
      } catch (e) {
           res.status(400);
           res.send(`Error: Task not found ${e.message}`);
      }

 });
 //</editor-fold>
 

 //<editor-fold defaultstate="collapsed" desc="update user">
 router.patch('/users/me', auth, async (req, res) => {
      const updates = Object.keys(req.body);
      const allowedUpdates = ['name','email','age','password'];
      
     //<editor-fold defaultstate="collapsed" desc="check are updates allowedUpdates 'updates.{?}'">
     const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
     //</editor-fold>
      
      if (!isValidOperation) {
           return res.status(400).send('invalid updates');
      }
      
      //const _id = req.params.id;
      try {
           //<editor-fold defaultstate="collapsed" desc="find user by id - call method on user">
          //const user = await User.findByIdAndUpdate(req.user._id);
          //</editor-fold>
            updates.forEach((update)=>{
                req.user[update] = req.body[update];
           });
           
          //<editor-fold defaultstate="collapsed" desc="call code to execute before save - reference model">
          await req.user.save();
          //</editor-fold>
           
//           if (!user) {
//                return res.status(400).send('Error: User not found');
//           }
           res.status(202).send(req.user);
          
      } catch (e) {
           res.status(400);
           res.send(`Error: ${e.message}`);
      }
      
 });
 //</editor-fold>
 //
 //<editor-fold defaultstate="collapsed" desc="log in">
router.post('/users/login', async (req, res) => {
     try {
          //<editor-fold defaultstate="collapsed" desc="call the find user fnc defined in model 'User.{?}(arg1,arg2)'">
          const user =  await User.findByCredentials(req.body.email,req.body.password);
          //</editor-fold>
          
          const token = await user.generateAuthToken();
          
          //<editor-fold defaultstate="collapsed" desc="send the user profile back if login was successful">
          res.send({ user,token });
          //</editor-fold>
          
     } catch (e) {
          res.status(400).send(`error: ${e}`);
     }
     
     
});
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="logout all">
router.post('/users/logoutAll', auth, async (req, res) => {
      try {
           req.user.tokens = [];
           await req.user.save();
           res.status(200).send();
      } catch (e) {
           res.status(500).send('unable to carry out operation');
      }

});
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="log out">
router.post('/users/logout', auth, async (req, res) => {
      try {
           req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !== req.token;
           });
           await req.user.save();
           res.send();
      } catch (e) {
           res.status(500).send();
      }

});
//</editor-fold>
//<editor-fold defaultstate="collapsed" desc="delete user by id">
router.delete('/users/me', auth, async (req, res) => {
     
     try {
//          const user = await User.findByIdAndDelete(req.user._id);
//          if (!user) {
//               return  res.status(400).send('error: no user found!');
//          }
//<editor-fold defaultstate="collapsed" desc="what new method are we using to delete user?">
          await req.user.remove();
          //</editor-fold>
          res.status(202).send(req.user);
     } catch (e) {
          res.status(400).send('error', e.message);
     }
     
});
//</editor-fold>



module.exports = router;