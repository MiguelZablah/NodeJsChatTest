var expect = require('expect');
var {generateMessage} = require('./message');

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