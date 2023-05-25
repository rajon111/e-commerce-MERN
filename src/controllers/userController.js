const createError = require('http-errors');

const getUserss = (req,res,next)=>{
    try{
        res.status(200).send({
            message:"Users successfully returned",

        })
    } catch(error){
        next(error)
    }
}

module.exports = getUserss;