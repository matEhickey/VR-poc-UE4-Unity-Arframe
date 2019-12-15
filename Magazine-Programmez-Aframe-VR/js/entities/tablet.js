// the tablet entity creation
// create a tablet filled with widgets by scene
// some events to the states, and inner event to manipulate toggle groups when needed

AFRAME.registerComponent('tablet', {
    schema: {},
    init: function(){
      console.log("Tablet init");

      this.layout = document.createElement("a-gui-flex-container");
      this.layout.id="tablet_layout";
      this.layout.setAttribute('flex-direction', `column`);
      this.layout.setAttribute('justify-content', `center`);
      this.layout.setAttribute('align-items', `normal`);
      this.layout.setAttribute('component-padding', 2);
      this.layout.setAttribute('opacity', 1);
      this.layout.setAttribute('width', 0.4);
      this.layout.setAttribute('height', 1);

      this.layout.setAttribute('position', '0.3 0 0');  // WORK BUT DONT APPEAR IN DOM (see in inspector instead)
      this.layout.setAttribute('rotation', '-90 0 0');

      this.layout.setAttribute('visible', false); // hide tablet on launch

        if(isScene("Hub")){
          var infoPanels = createInfoHub();
          infoPanels.setAttribute("opacity", 1);
          this.layout.appendChild(infoPanels);
        }

        if(isScene("Movements")){
          var translations = createTranslations();
          this.layout.appendChild(translations);

          var rotations = createRotations();
          this.layout.appendChild(rotations);
        }


        rth = createChangeScene("./scenes/hub.html","Return to Hub");
        this.layout.appendChild(rth);
        goToInt = createChangeScene("./scenes/interactions.html","Interactions");
        this.layout.appendChild(goToInt);
        goToMouv = createChangeScene("./scenes/movements.html", "Mouvements");
        this.layout.appendChild(goToMouv);

        this.el.appendChild(this.layout);


    },
    reload: function(){
      console.log("*** reload");
      this.el.removeChild(this.layout);

    }
});

function setRadioChecked(radio, checked){
  radio.emit(checked ? "check":"uncheck");
}

function createInfoHub(){
  var txt = "Lorem ipsum dolor sit\n"+
            "consectetur adipiscing.\n"+
            "Etiam a est sit placerat\n "+
            "sollicitudin ut tellus.\n"+
            "Mauris scelerisque suscipit.\n"+
            "Dignissim ullamcorper.";

  var lines = txt.split('\n');

  var divContainer = document.createElement("a-gui-flex-container");
  divContainer.setAttribute('flex-direction', `column`);
  divContainer.setAttribute('justify-content', `center`);
  divContainer.setAttribute('align-items', `normal`);
  divContainer.setAttribute('width', 0.4);
  divContainer.setAttribute('height', 0.05*lines.length);

  var title = document.createElement("a-gui-label");
  title.setAttribute('value', "Tablet");
  title.setAttribute('width', 0.4);
  title.setAttribute('height', 0.2);
  title.setAttribute("font-size","20px");
  divContainer.appendChild(title);


  for (var i = 0; i<lines.length; i++) {
      var textHub = document.createElement("a-gui-label");
      textHub.setAttribute('width', 0.4);
      textHub.setAttribute('height', 0.05);
      textHub.setAttribute('value', lines[i]);
      textHub.setAttribute('position', i*0.2+' 0 0');
      textHub.setAttribute("font-size","10px");

      divContainer.appendChild(textHub);
  }
  return(divContainer);
}

function createTranslations(){

  function chooseTranslation(num){

    function disableTranslations(exception){
      // exception is the index of the toggle that dont need to be disable
      var elems = [document.getElementById("radioTranslate"), document.getElementById("radioDash"), document.getElementById("radioTeleport")];
      elems.splice(exception, 1); // remove the exception

      for(var i of elems){
        // if(i.components["gui-toggle"].data.checked == true){  // dont update, have to check it from inside (send an disable event, and change stae inside if checked)
        setRadioChecked(i, false);
        // }
      }
    };

    disableTranslations(num);

    switch(num){
      case 0:
        console.log("free transl choosen");
        AFRAME.scenes[0].emit('translateActions', {type: "FREE_TRANSLATE"});
        break;
      case 1:
        console.log("Dash state choosen");
        AFRAME.scenes[0].emit('translateActions', {type: "DASH_TRANSLATE"});
        break;
      case 2:
        console.log("Teleport state choosen");
        AFRAME.scenes[0].emit('translateActions', {type: "TELEPORT_TRANSLATE"});
        break;
    }

    // send check to the one clicked, in case he was unchecked
    setTimeout(function(){
      var elems = [document.getElementById("radioTranslate"), document.getElementById("radioDash"), document.getElementById("radioTeleport")];
      setRadioChecked(elems[num], true);
    }, 100);

  }

  var divContainer = document.createElement("a-gui-flex-container");
  divContainer.setAttribute('flex-direction', `column`);
  divContainer.setAttribute('justify-content', `center`);
  divContainer.setAttribute('align-items', `normal`);
  divContainer.setAttribute('opacity', 0.7);
  divContainer.setAttribute('width', 0.4);
  divContainer.setAttribute('height', 0.4);

  var radioTranslate = document.createElement("a-gui-toggle");
  var radioDash = document.createElement("a-gui-toggle");
  var radioTeleport = document.createElement("a-gui-toggle");
  radioTranslate.id = "radioTranslate";
  radioDash.id="radioDash";
  radioTeleport.id = "radioTeleport";

  radioTranslate.setAttribute("value", "Translate");
  radioDash.setAttribute("value", "Dash");
  radioTeleport.setAttribute("value", "Teleport");


  setTimeout(function(){
    setRadioChecked(radioTranslate, true);
  }, 300);

  var freemoveListener = function(){
    radioTranslate.removeEventListener("click", freemoveListener);
    radioDash.removeEventListener("click", dashListener);
    radioTeleport.removeEventListener("click", teleportListener);
    chooseTranslation(0);
  };

  var dashListener = function(){
    radioTranslate.removeEventListener("click", freemoveListener);
    radioDash.removeEventListener("click", dashListener);
    radioTeleport.removeEventListener("click", teleportListener);
    chooseTranslation(1);
  };

  var teleportListener = function(){
    radioTranslate.removeEventListener("click", freemoveListener);
    radioDash.removeEventListener("click", dashListener);
    radioTeleport.removeEventListener("click", teleportListener);
    chooseTranslation(2);
  };

  radioTranslate.addEventListener("click",freemoveListener);
  radioDash.addEventListener("click",dashListener);
  radioTeleport.addEventListener("click",teleportListener);

  var listenerAnimation = function(){
    // console.log("ANIMATION END");
    radioTranslate.addEventListener("click",freemoveListener);
    radioDash.addEventListener("click",dashListener);
    radioTeleport.addEventListener("click",teleportListener);
  };

  radioTranslate.addEventListener('animationend', listenerAnimation);
  radioDash.addEventListener('animationend', listenerAnimation);
  radioTeleport.addEventListener('animationend', listenerAnimation);



  var title = document.createElement("a-gui-label");
  title.setAttribute('value', "Translations");
  title.setAttribute('width', 0.4);
  title.setAttribute('height', 0.2);
  title.setAttribute("font-size","20px");
  title.setAttribute("active",true);
  divContainer.appendChild(title);

  for (let i of[radioTranslate, radioDash, radioTeleport]){
    i.setAttribute("width", 0.4);
    i.setAttribute("height", 0.08);
    i.setAttribute("font-size", "15px");

    divContainer.appendChild(i);
  }

  return(divContainer);
}
function createRotations(){

  function chooseRotation(num){

    function disableRotations(exception){
      // exception is the index of the toggle that dont need to be disable
      var elems = [document.getElementById("radioTranslateRot"), document.getElementById("radioDashRot")];
      elems.splice(exception, 1); // remove the exception

      for(var i of elems){
        setRadioChecked(i, false);
      }
    }
    //
    disableRotations(num);

    switch(num){
      case 0:
        console.log("Rotate  state choosen");
        AFRAME.scenes[0].emit('rotateActions', {type: "FREE_ROTATE"});
        // window.store.dispatch({type: "FREE-ROT"});
        break;
      case 1:
        console.log("Rotate Dash state choosen");
        AFRAME.scenes[0].emit('rotateActions', {type: "DASH_ROTATE"});
        // window.store.dispatch({type: "DASH-ROT"});
        break;
    }

    // send check to the one clicked, in case he was unchecked
    setTimeout(function(){
      var elems = [document.getElementById("radioTranslateRot"), document.getElementById("radioDashRot")];
      setRadioChecked(elems[num], true);
    }, 100);

  }

  var divContainer = document.createElement("a-gui-flex-container");
  divContainer.setAttribute('flex-direction', `column`);
  divContainer.setAttribute('justify-content', `center`);
  divContainer.setAttribute('align-items', `normal`);
  divContainer.setAttribute('opacity', 0.7);
  divContainer.setAttribute('width', 0.4);
  divContainer.setAttribute('height', 0.4);

  var radioTranslateRot = document.createElement("a-gui-toggle");
  var radioDashRot = document.createElement("a-gui-toggle");
  radioTranslateRot.id = "radioTranslateRot";
  radioDashRot.id="radioDashRot";

  radioTranslateRot.setAttribute("value", "Translate");
  radioDashRot.setAttribute("value", "Dash");


  setTimeout(function(){
    setRadioChecked(radioTranslateRot, true);
  }, 300);

  var freeRotListener = function(){
    radioTranslateRot.removeEventListener("click", freeRotListener);
    radioDashRot.removeEventListener("click", dashRotListener);
    chooseRotation(0);
  };

  var dashRotListener = function(){
    radioTranslateRot.removeEventListener("click", freeRotListener);
    radioDashRot.removeEventListener("click", dashRotListener);
    chooseRotation(1);
  };

  radioTranslateRot.addEventListener("click",freeRotListener);
  radioDashRot.addEventListener("click",dashRotListener);

  var listenerAnimation = function(){
    radioTranslateRot.addEventListener("click",freeRotListener);
    radioDashRot.addEventListener("click",dashRotListener);
  };

  radioTranslateRot.addEventListener('animationend', listenerAnimation);
  radioDashRot.addEventListener('animationend', listenerAnimation);



  var title = document.createElement("a-gui-label");
  title.setAttribute('value', "Rotations");
  title.setAttribute('width', 0.4);
  title.setAttribute('height', 0.2);
  title.setAttribute("font-size","20px");
  title.setAttribute("active",true);
  divContainer.appendChild(title);

  for (let i of[radioTranslateRot, radioDashRot]){
    i.setAttribute("width", 0.4);
    i.setAttribute("height", 0.2);
    i.setAttribute("height", 0.1);
    i.setAttribute("font-size", "20px");

    divContainer.appendChild(i);
  }

  return(divContainer);
}

function createInteractions(){

  function chooseInteraction(num){

    function disableInteractions(exception){
      // exception is the index of the toggle that dont need to be disable
      var elems = [document.getElementById("radioNone"), document.getElementById("radioGrab"), document.getElementById("radioGun")];
      elems.splice(exception, 1); // remove the exception

      for(var i of elems){
        // if(i.components["gui-toggle"].data.checked == true){  // dont update, have to check it from inside (send an disable event, and change stae inside if checked)
        setRadioChecked(i, false);
        // }
      }
    };

    disableInteractions(num);

    switch(num){
      case 0:
        console.log("None state choosen");
        // window.store.dispatch({type: "NOTHING_INTERACT"});
        AFRAME.scenes[0].emit('interactsActions', {type: "NOTHING_INTERACT"});
        break;
      case 1:
        console.log("Grab state choosen");
        // window.store.dispatch({type: "GRAB_INTERACT"});
        AFRAME.scenes[0].emit('interactsActions', {type: "GRAB_INTERACT"});
        break;
      case 2:
        console.log("Gun state choosen");

        AFRAME.scenes[0].emit('interactsActions', {type: "GUN_INTERACT"});

        // window.store.dispatch({type: "GUN_INTERACT"});
        break;
    }

    // send check to the one clicked, in case he was unchecked
    setTimeout(function(){
      var elems = [document.getElementById("radioNone"), document.getElementById("radioGrab"), document.getElementById("radioGun")];
      setRadioChecked(elems[num], true);
      // console.log(window.store.getState());
    }, 100);

  }

  var divContainer = document.createElement("a-gui-flex-container");
  divContainer.setAttribute('flex-direction', `column`);
  divContainer.setAttribute('justify-content', `center`);
  divContainer.setAttribute('align-items', `normal`);
  divContainer.setAttribute('opacity', 0.7);
  divContainer.setAttribute('width', 0.4);
  divContainer.setAttribute('height', 0.4);

  var radioNone = document.createElement("a-gui-toggle");
  var radioGrab = document.createElement("a-gui-toggle");
  var radioGun = document.createElement("a-gui-toggle");
  radioNone.id = "radioNone";
  radioGrab.id="radioGrab";
  radioGun.id = "radioGun";

  radioNone.setAttribute("value", "None");
  radioGrab.setAttribute("value", "Grab");
  radioGun.setAttribute("value", "Gun");


  setTimeout(function(){
    setRadioChecked(radioNone, true);
  }, 300);

  var noneListener = function(){
    radioNone.removeEventListener("click", noneListener);
    radioGrab.removeEventListener("click", grabListener);
    radioGun.removeEventListener("click", gunListener);
    chooseInteraction(0);
  };

  var grabListener = function(){
    radioNone.removeEventListener("click", noneListener);
    radioGrab.removeEventListener("click", grabListener);
    radioGun.removeEventListener("click", gunListener);
    chooseInteraction(1);
  };

  var gunListener = function(){
    radioNone.removeEventListener("click", noneListener);
    radioGrab.removeEventListener("click", grabListener);
    radioGun.removeEventListener("click", gunListener);
    chooseInteraction(2);
  };

  radioNone.addEventListener("click",noneListener);
  radioGrab.addEventListener("click",grabListener);
  radioGun.addEventListener("click",gunListener);

  var listenerAnimation = function(){
    // console.log("ANIMATION END");
    radioNone.addEventListener("click",noneListener);
    radioGrab.addEventListener("click",grabListener);
    radioGun.addEventListener("click",gunListener);
  };

  radioNone.addEventListener('animationend', listenerAnimation);
  radioGrab.addEventListener('animationend', listenerAnimation);
  radioGun.addEventListener('animationend', listenerAnimation);



  var title = document.createElement("a-gui-label");
  title.setAttribute('value', "Interactions");
  title.setAttribute('width', 0.4);
  title.setAttribute('height', 0.2);
  title.setAttribute("font-size","20px");
  title.setAttribute("active",true);
  divContainer.appendChild(title);

  for (let i of[radioNone, radioGrab, radioGun]){
    i.setAttribute("width", 0.4);
    i.setAttribute("height", 0.08);
    i.setAttribute("font-size", "15px");

    divContainer.appendChild(i);
  }

  return(divContainer);
}

//
//
function isScene(sceneName){
  var elSceneName = document.getElementById("scene").getAttribute("template").src;

  switch(sceneName){
    case "Hub":
      return(elSceneName === "./scenes/hub.html");
      break;
    case "Interactions":
      return(elSceneName === "./scenes/interactions.html");
      break;
    case "Movements":
      return(elSceneName === "./scenes/movements.html");
      break;
    default:
      return(false);
  }
}
//
function createChangeScene(scene, title){

  var divButton = document.createElement("a-gui-button");
  divButton.setAttribute('height', 0.2);
  divButton.setAttribute('width', 0.4);
  divButton.setAttribute('value', title);
  divButton.setAttribute('font-size', "15px");
  divButton.addEventListener("click", function(){
    var el = document.getElementById("scene");
    if(document.getElementById("tablet_layout").getAttribute("visible")){
      el.setAttribute("template","src",scene);
    }

  });
  // layout.appendChild(divButton);
  return(divButton);
}

function createTablet(){
  var layout = document.createElement("a-gui-flex-container");
  layout.id="tablet_layout";
  layout.setAttribute('flex-direction', `column`);
  layout.setAttribute('justify-content', `center`);
  layout.setAttribute('align-items', `normal`);
  layout.setAttribute('component-padding', 2);
  layout.setAttribute('opacity', 1);
  layout.setAttribute('width', 0.4);
  layout.setAttribute('height', 1);

  layout.setAttribute('position', '0.3 0 0');  // WORK BUT DONT APPEAR IN DOM (see in inspector instead)
  layout.setAttribute('rotation', '-90 0 0');

  layout.setAttribute('visible', false); // hide tablet on launch

  if(isScene("Hub")){
    var infoPanels = createInfoHub();
    infoPanels.setAttribute("opacity", 1);
    layout.appendChild(infoPanels);
  }
  else if(isScene("Movements")){
    var translations = createTranslations();
    layout.appendChild(translations);

    var rotations = createRotations();
    layout.appendChild(rotations);
  }
  else if(isScene("Interactions")){
    var interactions = createInteractions();
    layout.appendChild(interactions);
  }


  var rth = createChangeScene("./scenes/hub.html","Return to Hub");
  layout.appendChild(rth);
  var goToInt = createChangeScene("./scenes/interactions.html","Interactions");
  layout.appendChild(goToInt);
  var goToMouv = createChangeScene("./scenes/movements.html", "Mouvements");
  layout.appendChild(goToMouv);


  return(layout);
}

try{
  module.exports = createTablet;
}
catch(e){
  console.log("can't export module, should be dev version");
}
