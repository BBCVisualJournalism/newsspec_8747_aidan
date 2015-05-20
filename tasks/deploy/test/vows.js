'use strict';

var vows        = require('vows'),
    deployTests = require('./test')();

vows.describe('Deploy unit tests')
.addBatch(deployTests)
.export(module);