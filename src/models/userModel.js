const {Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const { defaultImgPath } = require('../secret');

const userSchema = new Schema({
    name:{
        type:String,
        required:[true, 'Username is required'],
        trim: true,
        maxLength:[31, 'The maximum length of the username can be max 31 characters'],
        minLength:[3, 'The minimum length of the username at least 3 characters'] 
    },
    email:{
        type:String,
        required:[true, 'Email is required'],
        trim: true,
        unique: true,
        lowercase: true,
        validate:{
            validator: function(v){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
            },
            message:'Please enter a valid email address'
        }
    },
    password:{
        type:String,
        required:[true, 'Password is required'],
        minLength:[6, 'The minimum length of the password at least 6 characters'],
        set:(v)=> bcrypt.hashSync(v, bcrypt.genSaltSync(10))

    },
    image:{
        type:String,
        default:defaultImgPath
    },
    address:{
        type:String,
        required:[true, 'User address is required']
    },
    phone:{
        type:String,
        required:[true, 'User phone is required']
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isBanned:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

const User = model('Users',userSchema);


module.exports = User;