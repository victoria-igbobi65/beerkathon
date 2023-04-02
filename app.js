const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const { userRouter } = require('./src/routes/users')
const { ticketRouter } = require('./src/routes/ticket')
const { authRouter } = require("./src/routes/auth");
const globalErrorHandler = require('./src/errors/errorhandler')
const unknownEndpoint = require('./src/middlewares/unknownEndpoint')
const CONFIG = require('./config/env')
const { meRouter } = require('./src/routes/me')
require('./config/db')( CONFIG.DBURL )

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use(cookieParser());
app.use(cors()); 
app.use(helmet());
app.use('/auth', authRouter )
app.use('/ticket', ticketRouter )
app.use('/users', userRouter )
app.use('/me', meRouter )



app.use("*", unknownEndpoint )
app.use( globalErrorHandler )


module.exports={ app }