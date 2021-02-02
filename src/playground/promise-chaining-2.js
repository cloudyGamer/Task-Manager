const Task = require('../models/Task');
 require('../db/mongoose');
 
//Task.findByIdAndDelete('5fbe917d5039160244460b4b').then(
//    (result) => {
//          console.log(result);
//          return Task.countDocuments();
//     }
//  ).then((result) => {
//      console.log(result);
// }).catch((error) => {
//      console.log(error);
// });
 
 //create asynchronous call using async awaut. Find and update the age
 //of a document and then count all documents of that age
 //<editor-fold defaultstate="collapsed" desc="comment">
const  updateAgeAndCount = 
  //<editor-fold defaultstate="collapsed" desc="comment">
async (id,age) => 
     //</editor-fold>
{
     //<editor-fold defaultstate="collapsed" desc="comment">
     await Task.findByIdAndUpdate(id,{ age });
     const count = await Task.countDocuments({ age }); 
     return count;
     //</editor-fold>
};

//<editor-fold defaultstate="collapsed" desc="comment">
updateAgeAndCount('5fbe917d5039160244460b4a',14).then((result) => {
        console.log(result);
   }).catch((error) => {
        console.log(error);
   });
//</editor-fold>
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="deleteAndCount">
const  deleteAndCount = async (id) => {
     await Task.findByIdAndDelete(id);
     const count = await Task.countDocuments(); 
     return count;
};

deleteAndCount('5fc11f3eacdb0604115400df').then((result) => {
     console.log(result);
}).catch((error) => {
     console.log(error);
});

//</editor-fold>


 const findAndUpdate = async (id,update) => {
     await Task.findByIdAndUpdate(id,{ update });
     await Task.countDocuments({ update });
 };
 
 findAndUpdate().then((result) => {
        console.log(result);
   }).catch((error) => {
        console.log(error);
   });;