const moment = require("moment");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");
const { promisify } = require("util");
const CONFIG = require("../../config/env");

const uniqueId = () => {
    return nanoid();
};

const signToken = (id) => {
    return jwt.sign({ id }, CONFIG.SECRET);
};

const setCookies = (res, tokenName, token) => {
    return res.cookie(tokenName, token, {
        httpOnly: true,
        secure: CONFIG.AP,
        maxAge: CONFIG.MAXAGE,
    });
};

const decodeToken = async (token) => {
    return promisify(jwt.verify)(token, CONFIG.SECRET);
};

const generateTicket = () => {
    return nanoid(5, "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
};

const date = () => {
    const startOfWeek = moment().startOf("week").toDate();
    const endOfWeek = moment().endOf("week").toDate();
    const today = moment().startOf('day').toDate()
    const month = moment().startOf('month').toDate();

    return { startOfWeek, endOfWeek, today, month };
};

const APIFEATURES = ( today, object ) => {

    let query = today ? { createdAt: { $gte: date().today }} : {};
    const sortBy = object.sort? object.sort.split(',').join(' '): '-createdAt';
    const page = +object.page || 1;
    const limit = +object.limit || 10;
    const skip = (page - 1) * limit;

    if ( object.status ){
        query.status = object.status;
    }

    return { sortBy, query, limit, skip }

}

module.exports = {
    uniqueId,
    signToken,
    setCookies,
    decodeToken,
    generateTicket,
    date,
    APIFEATURES
};
