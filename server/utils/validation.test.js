var expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('Should reject non-string values', () => {
        var res = isRealString(11);
        expect(res).toBeFalsy();
    });
    
    it('Should reject strings with only spaces', () => {
        var res = isRealString('   ');
        expect(res).toBeFalsy();
    });
    
    it('Should allow string with non-spaces characters', () => {
        var res = isRealString('  noSpaces  ');
        expect(res).toBeTruthy();
    });
});