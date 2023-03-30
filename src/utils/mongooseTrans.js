const mongoose = require('mongoose');
const { AppError } = require('../errors/AppError');

module.exports = async function transaction( callback ){

    const session = await mongoose.startSession();

    try{
        session.startTransaction();
        const result = await callback( session )
        await session.commitTransaction();
        session.endSession();

        return result

    }
    catch( err ){
        await session.abortTransaction();
        await session.endSession()
        throw new AppError('An Error occured, Try again!', 500 )
    }
    
}