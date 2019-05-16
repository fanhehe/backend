import { expect } from 'chai';
import * as article from '../src/services/check/article';
describe('fanhehe', function () {
    it('some information', ()=> {
        expect({1:2}).to.have.property('1');
    });
});

describe('fanhehes', () => {
    it('another information', () => {
       expect([1,2,3,3]).has.length.below(3);
    });
});
