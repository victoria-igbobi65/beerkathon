const mongoose = require('mongoose');
const { AppError } = require('../errors/AppError');

module.exports = async function transaction( callback ){

    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        await callback( session )
        await session.commitTransaction();

    }
    catch( err ){
        await session.commitTransaction();
        throw new AppError('An Error occured, Try again!', 500 )
    }
    finally{
        session.endSession();
    }
}