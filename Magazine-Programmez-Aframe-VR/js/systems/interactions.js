
document.addEventListener("DOMContentLoaded", function(event) {
  AFRAME.scenes[0].addEventListener("stateupdate",function(event){
    if(event.detail.action === "interactsActions"){
      console.log("** INTERACT UPDATED **");
      
      switch(event.detail.state.interact){
        case "None":

          break;
        case "Grab":

          break;
        case "Gun":

          break;
      }
    }
  });
});
