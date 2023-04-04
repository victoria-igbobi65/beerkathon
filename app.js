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
app.use('/api/v1/auth', authRouter )
app.use('/api/v1/ticket', ticketRouter )
app.use('/api/v1/users', userRouter )
app.use('/api/v1/me', meRouter )



app.use("*", unknownEndpoint )
app.use( globalErrorHandler )


module.exports={ app }