const {v4: uuid4} = require('uuid')
const jwt = require("jsonwebtoken");
const { nanoid } = require('nanoid');
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
        secure: CONFIG.AP,
        maxAge: CONFIG.MAXAGE
    });
};

const decodeToken = async (token) => {
    return promisify(jwt.verify)(token, CONFIG.SECRET);
};

const generateTicket = () => {
    return nanoid();
}


module.exports={ uniqueId, signToken, setCookies, decodeToken, generateTicket }