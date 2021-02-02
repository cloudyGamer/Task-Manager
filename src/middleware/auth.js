 const User = require('../models/user');
  const jwt = require('jsonwebtoken');

 
 const auth = async (req,res,next) => {
      try {
           const token = req.header('Authorization').replace('Bearer ','');
           const decoded = jwt.verify(token, 'thisisasecret');
           const user = await User.findOne({_id:decoded._id,'tokens.token':token});
           if (!user) {
                throw new Error(`no user found`);
           } 
           req.user = user;
           req.token = token;
           console.log(`token passed by header ${token}`);
           console.log(`User found ${user}`);
      } catch (e) {
           res.status(401).send({error:'Please Authenticate'});
      }
      next();
 };


module.exports = auth;