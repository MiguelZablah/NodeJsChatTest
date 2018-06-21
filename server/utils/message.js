var moment = require('moment');

var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    }
};

var generateLocationMessage = (from, lati, long) => {
    return{
        from,
        url: `https://www.google.com/maps?q=${lati},${long}`,
        createdAt: moment().valueOf()
    }
};

module.exports = {
    generateMessage,
    generateLocationMessage
};