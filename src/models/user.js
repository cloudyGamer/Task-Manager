const {connect, model, Schema} = require('mongoose');
const validator = require('validator');
 const bcrypt = require('bcryptjs');
  const jwt = require('jsonwebtoken');



//<editor-fold defaultstate="collapsed" desc="new model User">
 const userSchema = new Schema({
      //<editor-fold defaultstate="collapsed" desc="properties">
      name: {
           //<editor-fold defaultstate="collapsed" desc="type">
           type: String,
           //</editor-fold>
           //<editor-fold defaultstate="collapsed" desc="two schema type">
           trim: true,
           required:true
           //</editor-fold>

      },
      //<editor-fold defaultstate="collapsed" desc="afe,email,password">
      age: {
           type: Number,
      default: 0,
           required:true,
           //<editor-fold defaultstate="collapsed" desc="validate age">
           validate(value){
                if (value<0) {
                     throw new Error('please enter a valid age');
                } 
           }
           //</editor-fold>
           
      },
      email: {
           type: String,
           required: true,
           lowercase:true,
           trim:true,
           unique: true,
           //<editor-fold defaultstate="collapsed" desc="validate email">
           validate(value) {
                if (!validator.isEmail(value)) {
                     throw new Error('please enter a valid email address');
                }
           }
           //</editor-fold>
           
      },
      password:{
           type:String,
           required: true,
           trim:true,
           minlength:7,
           //<editor-fold defaultstate="collapsed" desc="password cannot contain passowrd">
           validate(value){
                if (value.toLowerCase().includes('password')) {
                     throw new Error("password cannot contain 'password'");
                }
           }
           //</editor-fold>
           
      },
      tokens:[{
          token: {type:String,
           required:true}
      }]
      
      //</editor-fold>

      //</editor-fold>
 });
 userSchema.virtual('tasks',{
      ref: 'Task',
      localField: '_id',
      foreignField:'owner'
 });
 
 //how do we require each email to be unique?
 //<editor-fold defaultstate="collapsed" desc="comment">
//use unique:true property
//</editor-fold>
 
 //what user schema properties do we access here?
 //<editor-fold defaultstate="collapsed" desc="comment">
//statics.findByCredentials
//</editor-fold>

 //what function links login to our router?
 //<editor-fold defaultstate="collapsed" desc="comment">
//find by credentials
//</editor-fold>




//<editor-fold defaultstate="collapsed" desc="login">
userSchema.statics.findByCredentials = async (email,password) => {
      
     
     //<editor-fold defaultstate="collapsed" desc="find the user by their email">
     const user = await User.findOne({ email });
     //</editor-fold>

     //<editor-fold defaultstate="collapsed" desc="throw error for user not found">
     
     if (!user) {
          throw new Error('unable to login');
     }
     //</editor-fold>
      const isMatch = await bcrypt.compare(password,user.password);
     
     if (!isMatch) {
          throw new Error('Unable to login');
     }
     
     return user;
      
};
//</editor-fold>

userSchema.methods.toJSON =  function () {
      const user = this;
      const userObject = user.toObject();
      delete userObject.password;
      delete userObject.tokens;

      return userObject;
 };

userSchema.methods.generateAuthToken = async function () {
      const user = this;
       const token = jwt.sign({_id:user._id.toString()},'thisisasecret');
       //console.log(`token is ${token}`);
       user.tokens = user.tokens.concat({ token });
       await user.save();
       return token;
}; 
 //hash plaintext password
 //<editor-fold defaultstate="collapsed" desc=""userSchema.{?}" to run code before it saves">
userSchema.pre('save', async function (next) {
     //<editor-fold defaultstate="collapsed" desc="get access to user">
     const user = this;
     //</editor-fold>
     //<editor-fold defaultstate="collapsed" desc="check has password been modified - "if(user.{?}"">
     if (user.isModified('password')) {
          //<editor-fold defaultstate="collapsed" desc="hash password">
          user.password = await bcrypt.hash(user.password, 8);
          //</editor-fold>
          console.log('password hashed');
     };
     //</editor-fold>
     //<editor-fold defaultstate="collapsed" desc="function ran to allow fnc to continue">
     next();
     //</editor-fold>
});
//</editor-fold>
   
    const User = model('User',userSchema);

 //</editor-fold>
 
 module.exports = User;