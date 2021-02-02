const {connect, model, Schema} = require('mongoose');
const validator = require('validator');

//<editor-fold defaultstate="collapsed" desc="create a model">
 const Task = model(
   //<editor-fold defaultstate="collapsed" desc="parameters">
 'Task', {
      description: {
           type: String,
           trim: true,
           required:true
      },
      completed: {
           type: Boolean,
           default: false
      },
      owner: {
           type: Schema.Types.ObjectId,
           required: true,
           ref:'User'
      }
      //</editor-fold>
      
 }
   );
 //</editor-fold>
 
 //<editor-fold defaultstate="collapsed" desc="this step is often forgoten">
module.exports = Task;
//</editor-fold>
