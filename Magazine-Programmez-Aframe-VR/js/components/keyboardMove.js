// POC mouvement with keyboard, probably not achieve well (same as unity or ue4, need to rotate based on the player position in the chaperone.)


function moveEvent(keyCode, camera){
  var pos = camera.getAttribute("position");
  var rot = camera.getAttribute("rotation");

  var pasTranslation = 0.05;
  var pasRotation = 0.8;

  if(keyCode == 122){

    // var matrix = new THREE.Matrix4();
    // matrix.extractRotation( mesh.matrix );
    //
    // var direction = new THREE.Vector3( 0, 0, 1 );
    // direction = matrix.multiplyVector3( direction );

    // Have to find camera forward direction, to move along it
    // Have to rotate all position for player camera axis -> create a component globally positionned on user camera, attach all player as child of this component, rotate it, detach children, remove object

    camera.object3D.translateZ(-pasTranslation);
    // camera.setAttribute('position', {x: pos.x, y: pos.y, z: pos.z - pasTranslation});
  }
  else if(keyCode == 113){
    camera.setAttribute('rotation', {x: rot.x, y: rot.y + pasRotation, z: rot.z});  // Dumb rotation, copy unity or ue4 one
  }
  else if(keyCode == 115){
    camera.object3D.translateZ(pasTranslation);
    // camera.setAttribute('position', {x: pos.x, y: pos.y, z: pos.z + pasTranslation});
  }
  else if(keyCode == 100){
    camera.setAttribute('rotation', {x: rot.x, y: rot.y - pasRotation, z: rot.z});  // Dumb rotation, copy unity or ue4 one
  }
}

function initListener(threeObject){
  document.addEventListener('DOMContentLoaded', function() {
      window.onkeypress = function(e) {
        keyCode = e.which || e.keyCode;
        // console.log(keyCode);
        if([122,113,115,100].includes(keyCode)){
          moveEvent(keyCode, threeObject);
        }
        else{
          // console.log(THREE);
        }
      }
  }, false);
}

AFRAME.registerComponent('keyboardcamera', {
  schema: {},
  init: function () {
    initListener(this.el);
  },
  update: function () {
    // console.log("update");
  },
  tick: function () {
    //console.log("tick");
  },
  remove: function () {
    // console.log("remove");
  },
  pause: function () {
    // console.log("pause");
  },
  play: function () {
    // console.log("play");
  }
});
