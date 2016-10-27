/**
 * Created by cantgetnosleep on 10/25/16.
 */

var slinker = require('slinker');
var path = require('path');

var fs = require('fs');
var dir = './node_modules/@moksa';

if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

slinker.link({
  modules: ['utils'],
  modulesBasePath: path.join(__dirname, '../'),
  symlinkPrefix: '',
  nodeModulesPath: path.join(__dirname, 'node_modules/@moksa'),
  onComplete: function() {
    console.log('Yay, my modules are linked!');
  },
  onError: function(error) {
    console.log('Oh no, my modules aren\'t linked!');
  }
});