// See dev/index.html for description of these librairies

require('aframe');
require('aframe-supercraft-loader');

require('aframe-extras');
require('aframe-template-component');

require('./libs/aframe-gui');
require('./libs/aframe-state-component');
// require('./libs/aframe-input-mapping-component');


createTablet = require('./entities/tablet');

require('./components/tablet');
require('./components/keyboardMove');

require('./systems/states');
require('./systems/inputMapping');

require('./systems/interactions');
require('./systems/translations');
require('./systems/rotations');
