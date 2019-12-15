
document.addEventListener("DOMContentLoaded", function(event) {
  AFRAME.scenes[0].addEventListener("stateupdate",function(event){
    if(event.detail.action === "rotateActions"){
      console.log("ROTATE UPDATED");
      // console.log(AFRAME.scenes[0].systems.state.state);
      console.log(event.detail.state);
    }
  });
});
