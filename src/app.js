const express = require('express')

const morgan = require('morgan')
const createError = require('http-errors')
const xssclean = require('xss-clean')
const rateLimit = require('express-rate-limit')
const userRouter  = require("./routers/userRouter.js");
const bodyParser = require('body-parser')

const app = express()

const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 10, // Limit each IP to 10 requests per `window`
    message: 'Too many requests from this IP. Please try again later '
})

app.use(rateLimiter)
app.use(xssclean())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 
app.use('/api/users',userRouter)


// client error handler
app.use((req, res, next) => {
  
    next(createError(404, "Route not found"))
})

// server error handler ---> all the errors are 
app.use((err, req, res, next) => {

    return res.status(err.status || 5000).json({
        success: false,
        message: err.message
    })
})


module.exports = app;
