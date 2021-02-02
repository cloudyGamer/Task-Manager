 const {connect, model} = require('mongoose');

 connect('mongodb://127.0.0.1:27017/task-manager-api', {
      useNewUrlParser: true,
      useCreateIndex: true
 });

 //<editor-fold defaultstate="collapsed" desc="create a basic user model, instance and save">
 ///////////create constructor obj
// const User = model('User',{
//      name: {type:String},
//      age:  {type:Number}
// });
// ///////////create new instance of obj and call a method on it
// const dave = new User({name:'Dave', age:22});
// dave.save().then(() => {
//      console.log(dave);
// }).catch((error) => {
//      console.log(error);
// });

 //</editor-fold>

 //<editor-fold defaultstate="collapsed" desc="new model User">
// const User = model('User', {
//      //<editor-fold defaultstate="collapsed" desc="properties">
//      name: {
//           //<editor-fold defaultstate="collapsed" desc="type">
//           type: String,
//           //</editor-fold>
//           //<editor-fold defaultstate="collapsed" desc="two schema type">
//           trim: true,
//           required:true
//           //</editor-fold>
//
//      },
//      //<editor-fold defaultstate="collapsed" desc="afe,email,password">
//      age: {
//           type: Number,
//      default: 0,
//           required:true,
//           //<editor-fold defaultstate="collapsed" desc="validate age">
//           validate(value){
//                if (value<0) {
//                     throw new Error('please enter a valid age');
//                } 
//           }
//           //</editor-fold>
//           
//      },
//      email: {
//           type: String,
//           required: true,
//           lowercase:true,
//           trim:true,
//           //<editor-fold defaultstate="collapsed" desc="validate email">
//           validate(value) {
//                if (!validator.isEmail(value)) {
//                     throw new Error('please enter a valid email address');
//                }
//           }
//           //</editor-fold>
//           
//      },
//      password:{
//           type:String,
//           required: true,
//           trim:true,
//           minlength:7,
//           //<editor-fold defaultstate="collapsed" desc="password cannot contain passowrd">
//           validate(value){
//                if (value.toLowerCase().includes('password')) {
//                     throw new Error("password cannot contain 'password'");
//                }
//           }
//           //</editor-fold>
//           
//      }
//      //</editor-fold>
//
//      //</editor-fold>
//
//      
// });
//
// const dave = new User({name: 'Dave', age: 22, email:'billy@dave.com',password:'rememberthis'});
// 
// dave.save().then(() => {
//      console.log(dave);
// }).catch((error) => {
//      console.log(error);
// });
// 
// const michael = new User({name: 'Michael Mackleson', age: 25, email:'billyve@liveliving.com',password:'secretBrony'});
// 
// michael.save().then(() => {
//      console.log(michael);
// }).catch((error) => {
//      console.log(error);
// });
 //</editor-fold>
 
 //<editor-fold defaultstate="collapsed" desc="create a task model">
// const Task = model(
//   //<editor-fold defaultstate="collapsed" desc="parameters">
// 'Task', {
//      description: {
//           type: String,
//           trim: true,
//           required:true
//      },
//      completed: {
//           type: Boolean,
//      default: false
//      }
//      //</editor-fold>
//      
// }
//   );
 //</editor-fold>
 
 //<editor-fold defaultstate="collapsed" desc="add two tasks">
// const homework = new Task({description:'homework'});
// 
// 
// homework.save().then(() => {
//      console.log(homework);
// }).catch((error) => {
//      console.log(error);
// });
// 
// const cleaning = new Task({description:'cleaning',completed:true});
// 
// cleaning.save().then(() => {
//      console.log(cleaning);
// }).catch((error) => {
//      console.log(error);
// });
 //</editor-fold>

 //name six schema types and their function
 //<editor-fold defaultstate="collapsed" desc="answer">
 // String
 //Number
 //Date
 //Buffer
 //Boolean
 //required
 //validate
 //default
 //</editor-fold> 
 //what does REST stand for?
 //<editor-fold defaultstate="collapsed" desc="comment">
 //Representational State Transfer
 //</editor-fold>
 //what is an api?
 //<editor-fold defaultstate="collapsed" desc="comment">
 //A set of tools allowing you to build software 
 //</editor-fold>
 //what does the rest server transfer and what name does this give it?
 //<editor-fold defaultstate="collapsed" desc="comment">
 //the rest server is stateless. State has been transferred to the server to the client
 //</editor-fold>
 //What is CRUD?
 //<editor-fold defaultstate="collapsed" desc="comment">
 //create Read Update Delete
 //</editor-fold>
 //what two things does every http request have?
 //<editor-fold defaultstate="collapsed" desc="comment">
 //Data, and a http method
 //</editor-fold>
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 



