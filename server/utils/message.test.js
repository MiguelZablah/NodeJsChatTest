var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        // Test 
        var from = 'Mike';
        var text = 'Some message';

        // Store res in variable
        var message =  generateMessage(from, text);
        // Assert createdAt is number
        expect(typeof message.createdAt).toBe('number');
        // Assert from and text match
        expect(message).toMatchObject({from,text});
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        // Test 
        var from = 'Mike';
        var lati = 25.6494227;
        var long = -100.3255111;
        var url = `https://www.google.com/maps?q=${lati},${long}`;

        // Store res in variable
        var message =  generateLocationMessage(from, lati, long);
        // Assert createdAt is number
        expect(typeof message.createdAt).toBe('number');
        // Assert from and text match
        expect(message).toMatchObject({from,url});
    });
});