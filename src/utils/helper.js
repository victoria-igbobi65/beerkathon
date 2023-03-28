const {v4: uuid4} = require('uuid')

const uniqueId = () => {
    return uuid4()
}

module.exports={ uniqueId }