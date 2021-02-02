const express = require('express');
const router = new express.Router();
const Task = require('../models/task');
 const auth = require('../middleware/auth');
router.post('/tasks', auth, async (req, res) => {
      console.log(req.body);
      // res.send('testing');

      //const task = new Task(req.body);
            const task = new Task({
                 ...req.body,
                 owner: req.user._id
            });

      try {
           await task.save();
           res.status(201).send(`the following data was added ${task}`);
      } catch (error) {
           res.status(400);
           res.send(error.message);
      }
 });

 //<editor-fold defaultstate="collapsed" desc="find task by id">
 router.get('/tasks/:id', async (req, res) => {
      const _id = req.params.id;
      // const task =  Task.findById(_id);
      try {
           const task = await Task.findById(_id);

           if (!task) {
                return res.status(400).send('Error: Task not found');
           }
           res.status(202).send(`the following task was found ${task}`);
      } catch (e) {
           res.status(400);
           res.send(`Error: Task not found ${e.message}`);
      }

 });
 //</editor-fold>

 router.get('/tasks', async (req, res) => {
      try {
           const task = await  Task.find({});
           if (!task) {
                return res.status(400).send('Error: tasks not found');
           }
           res.status(202).send(`the following tasks were found ${task}`);
      } catch (error) {
           res.status(500);
           res.send(error.message);
      }

 });
 
 //<editor-fold defaultstate="collapsed" desc="update tasks">
 router.patch('/tasks/:id', async (req, res) => {
      const updates = Object.keys(req.body);
      //<editor-fold defaultstate="collapsed" desc="check that update property is valid">
     const validUpdates = ['description', 'completed'];
     const isValidUpdate = updates.every((update) => validUpdates.includes(update));
     
     if (!isValidUpdate) {
          res.status(400).send('Invalid Update');
     }
     //</editor-fold>


      const _id = req.params.id;
      try {
           //const task = await Task.findByIdAndUpdate(_id, req.body, {new : true, runValidators: true});
           const task = await Task.findById(req.params.id);
           //<editor-fold defaultstate="collapsed" desc="dynamically go through updates and assign to update">
          updates.forEach((update) => {
               updates[update] = req.body[update];
          });
          await task.save();
          //</editor-fold>

           if (!task) {
                return  res.status(400).send('error: no task found!');
           }
           res.status(202).send(`the following task was updated ${task}`);
      } catch (e) {
           res.status(400).send('error', e.message);
      }

 });
 
 //</editor-fold>
router.delete('/tasks/:id', auth, async (req, res) => {
      
      const _id = req.params.id;
      try {
           const task = await Task.findByIdAndDelete(_id);
           if (!task) {
                return  res.status(400).send('error: no task found!');
           }
           res.status(202).send(`the following task was deleted ${task}`);
      } catch (e) {
           res.status(400).send('error', e.message);
      }

 });
 
 module.exports = router;