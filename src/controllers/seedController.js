
const User = require('../models/userModel')

const data = {
    users: [
        {
            name: 'John',
            email: 'john@gmail.com',
            password: 'password',
            phone: '012324r56',
            address: 'Mym,BD'
        },
        {
            name: 'kabir',
            email: 'kabir@gmail.com',
            password: 'password',
            phone: '0146789',
            address: 'Dhaka,BD'
        }
    ]
}

const seedUser = async(req,res,next) => {
 
        try {
            // detelting all existing users
        await User.deleteMany({})

        //inserting new users
        const users = await User.insertMany(data.users)

        //successful response
        return res.status(201).json(users);    
        } catch (error) {
            next(error);
        }
    } 


module.exports = {seedUser};