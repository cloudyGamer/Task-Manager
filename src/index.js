 const express = require('express');
 const app = express();
 const port = process.env.PORT || 3000;
 //const User = require('./models/User');
 //const Task = require('./models/Task');
 const userRouter = require('./routers/user');
 const taskRouter = require('./routers/tasks');
 require('./db/mongoose');

 //what does req and res stand for?
 //<editor-fold defaultstate="collapsed" desc="comment">
 //request, response
 //</editor-fold>

 app.use(express.json());

 app.use(userRouter);
 app.use(taskRouter);
 
 const jwt = require('jsonwebtoken');
 
 app.listen(port, () => {
      console.log(`server is up on port ${port}`);
 });
 const Task = require('./models/task');
 const User = require('./models/user');

 const main = async () => {
//      const task = await Task.findById('5ff7490b7b254fc219f9318c');
//      await task.populate('owner').execPopulate();
//      console.log(task.owner);
     const user = await User.findById('5ff749007b254fc219f9318a');
      await user.populate('tasks').execPopulate();
      console.log(user.tasks);
 };
main();
//myFunction();
 //<editor-fold defaultstate="collapsed" desc="What is a route parameter?">
 // e.g tasks:id - the paramter can be accessed and used as part of a request by express
 //</editor-fold>
 
 //<editor-fold defaultstate="collapsed" desc="How do we gain access to user details when running user/me?">
 //it is attached to the req 'req.user' by the auth middleware
 //</editor-fold>
 
 //<editor-fold defaultstate="collapsed" desc="How do we have an owner id in our task when we create new one?">
 //our add task router when called creates a new instance of our task model and uses the spread operater
 //to populate all the new from req.body values plus the new owner property
 //the new owner property has the user id attached to it from req.user
 //</editor-fold>

