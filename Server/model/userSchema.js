const mongoose = require ("mongoose");

const userSchema = mongoose.Schema({

    name: {
        type: String, 
        require:true
    },
    dob: {
        type: String, 
        require:true
    },
    email: {
        type:String, 
        require:true, 
        Unique:true
    },
    password:{
        type:String, require:true
    },
    isAdmin:{
        type: Boolean,  default:true
    }
},{
    timestamp:true,
})

const userModel = mongoose.model('users',userSchema);

module.exports = userModel;