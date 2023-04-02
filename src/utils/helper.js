
const jwt = require("jsonwebtoken");
const { nanoid } = require('nanoid');
const { promisify } = require('util')
const CONFIG = require('../../config/env')

const uniqueId = () => {
    return nanoid()
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
    return nanoid(5, "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
}


module.exports={ uniqueId, signToken, setCookies, decodeToken, generateTicket }