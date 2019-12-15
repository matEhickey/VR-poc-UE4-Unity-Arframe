// simple reducers to manage the behavior state of the tablet

AFRAME.registerState({
  initialState: {
    interact: "None",
    translate: "Free",
    rotate: "Free"
  },

  handlers: {
    interactsActions: function (state, action) {
      switch (action.type) {
        case "NOTHING_INTERACT":
          state.interact = "None";
          console.log("NOTHING_INTERACT");
          break;
        case "GRAB_INTERACT":
          state.interact = "Grab";
          console.log("GRAB_INTERACT");
          break;
        case "GUN_INTERACT":
          state.interact = "Gun";
          console.log("GUN_INTERACT");
          break;
        default:
          console.log("DEFAULT WTF");
          break;

      }
    },
    translateActions: function (state, action) {

      switch (action.type) {
        case "FREE_TRANSLATE":
          state.translate = "Free";
          console.log("FREE_TRANSLATE");
          break;
        case "DASH_TRANSLATE":
          state.translate = "Dash";
          console.log("DASH_TRANSLATE");
          break;
        case "TELEPORT_TRANSLATE":
          state.translate = "Teleport";
          console.log("TELEPORT_TRANSLATE");
          break;
        default:
          console.log("DEFAULT WTF");
          break;

      }
    },
    rotateActions: function (state, action) {

      switch (action.type) {
        case "FREE_ROTATE":
          state.rotate = "Free";
          console.log("FREE_ROTATE");
          break;
        case "DASH_ROTATE":
          state.rotate = "Dash";
          console.log("DASH_ROTATE");
          break;

      }
    },
  }
});
