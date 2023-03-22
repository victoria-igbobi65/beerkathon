const express = require('express')
const CONFIG = require('./config/env')
require('./config/db')( CONFIG.DBURL )

const app = express()

module.exports={ app }