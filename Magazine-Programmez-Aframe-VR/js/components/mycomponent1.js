// A template of a compontnt with all the lifecycle

// Registering component in foo-component.js
AFRAME.registerComponent('mycomponent1', {
  schema: {},
  init: function () {
    console.log("init");
  },
  update: function () {
    console.log("update");
  },
  tick: function () {
    //  console.log("tick");
  },
  remove: function () {
    console.log("remove");
  },
  pause: function () {
    console.log("pause");
  },
  play: function () {
    console.log("play");
  }
});
