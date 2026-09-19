import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { required } from "zod/mini";

const UserSchema = new mongoose.Schema({
  UserName: {
    type: String,
    required: true,
    trim: true,
    unique:true
  },
  email:{
    type:String,
    required:true,
    trim:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  }

},{timestamps:true});


UserSchema.pre("save",async function(next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    
})

UserSchema.method.comparePassword = function(candidatePassword){
    return bcrypt.compare(candidatePassword, this.password);
}

const User = mongoose.model("User",UserSchema);

export default User;