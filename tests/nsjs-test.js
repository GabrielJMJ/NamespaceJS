var path = require('path');

module.exports = {
    setUp: function (callback) {
        var ns = require('../src/namespace');
        ns.configure({
            dir: path.resolve('tests')
        });
        callback();
    },
    tearDown: function (callback) {
        var ns = require('../src/namespace');
        ns._clean();
        callback();
    },
    shouldReturnsTheCorrectModule: function (test) {
        var ns = require('../src/namespace');
        ns.add('MyApp\\', '/app');
        var appTxt = ns.use('MyApp\\hello');

        test.equal(appTxt, 'hello world');
        test.done();
    },
    shouldReturnsTheMostCorrectIfTwoNamespacesSeemsOneEachOther: function (test) {
        var ns = require('../src/namespace');
        ns.add('MyApp\\Controller', '/app/controllers');
        var appTxt = ns.use('MyApp\\Controller\\c');
        
        test.equal(appTxt, 'this is a controller');
        test.done();
    }
}