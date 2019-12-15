// This file should serve as a map between the differents headset brand buttons and the corresponding actions
// it is not used now, because still can't get axis values (can get event axisMove, but no axis values for now)

var mappings = {
  behaviours: {},
  mappings : {
    "default": {
      'vive-controls': {
        // 'grip.down': { left: "teleportLeft", right: "teleportRight" },
        'trackpad.touchstart': "touched",
        'dpad.changed': "axisMove"
      },

      'oculus-touch-controls': {
        'xbuttondown': 'teleport'
      }
    },
    "paint": {
      'common': {
        'triggerdown': 'paint',
      },
      'vive-controls': {
        'menudown': 'toggleMenu',
        'grip.down': 'changeTask',
      },
      'oculus-touch-controls': {
        'abuttondown': 'toggleMenu'
      }
    }
  }
}

// this following registration was disabled for now and should be used for test and search

// document.addEventListener("DOMContentLoaded", function(event) {
//     console.log("DOM fully loaded and parsed");
//
//     // AFRAME.registerInputMappings(mappings);
//     // AFRAME.currentInputMapping = 'default';
//     //
//     // var scene = document.getElementById("scene");
//     //
//     // scene.addEventListener('teleportLeft', function(evt) {
//     //   console.log("teleportLeft");
//     // });
//     // scene.addEventListener('teleportRight', function(evt) {
//     //   console.log("teleportRight");
//     // });
//     // scene.addEventListener('touched', function(evt) {
//     //   console.log("touched");
//     //   console.log(evt);
//     // });
//     // // scene.addEventListener('axisMove', function(evt) {
//     // //   console.log("axisMove");
//     // //   console.log(evt);
//     // // });
//   });
