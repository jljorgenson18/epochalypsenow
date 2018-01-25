/*eslint no-var:0*/
import 'babel-polyfill'; // This is set from babel-preset-env

import 'whatwg-fetch';

import finallyShim from 'promise.prototype.finally/shim';
finallyShim();
