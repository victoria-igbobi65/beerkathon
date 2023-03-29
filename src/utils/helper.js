const {v4: uuid4} = require('uuid')
const jwt = require("jsonwebtoken");
const { promisify } = require('util')
const CONFIG = require('../../config/env')

const uniqueId = () => {
    return uuid4()
}

const signToken = (id) => {
    return jwt.sign({ id }, CONFIG.SECRET);
};

const setCookies = (res, tokenName, token) => {
    return res.cookie(tokenName, token, {
        httpOnly: true,
        secure: CONFIG.APP_ENV,
        maxAge: CONFIG.MAXAGE
    });
};

const decodeToken = async (token) => {
    return promisify(jwt.verify)(token, CONFIG.SECRET);
};


module.exports={ uniqueId, signToken, setCookies, decodeToken }