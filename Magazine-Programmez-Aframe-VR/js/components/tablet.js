AFRAME.registerComponent('tablet-hider', {
    // when user try to display or hide the tablet with the left trigger
    // if on interaction scene and gun behavior is selected, when the tablet is closed, the right controller transform in a gun mesh

    schema: {},
    init: function () {
      var tablet = document.getElementById("tablet_layout");
      var rightlaser = document.getElementById("rightlaser");

      this.el.addEventListener("triggerdown", function(){
        tablet.setAttribute('visible', true);
        tablet.setAttribute('gui-interactable', "");
        rightlaser.setAttribute('visible', true);


        var gunItem = document.getElementById("gunItem");
        if(gunItem){ // scene interaction
          gunItem.setAttribute("visible", false);
          var righthand = document.getElementById("righthand");
          righthand.setAttribute("oculus-touch-controls", {model:"true", hand:"right"});
        }

      });
      this.el.addEventListener("triggerup", function(){
        tablet.setAttribute('visible', false);
        tablet.removeAttribute("gui-interactable");

        rightlaser.setAttribute('visible', false);

        var gunItem = document.getElementById("gunItem");
        if(gunItem){
          var righthand = document.getElementById("righthand");
          if(AFRAME.scenes[0].systems.state.state.interact === "Gun"){
            gunItem.setAttribute("visible", true);
            console.log("state gun -> hide model (dont work, only when initilisation set model to false, but there is no controller on the begining...)");
            righthand.setAttribute("oculus-touch-controls", {model:"false", hand:"right"});
          }
          else{
            righthand.setAttribute("oculus-touch-controls", {model:"true", hand:"right"});
            gunItem.setAttribute("visible", false);

          }
        }

      });
    }
  }
);

// try to load the controllers models after creation, to avoid the bug where crotroller don't wan't to hide.
AFRAME.registerComponent('show_model',{
  init: function () {
    // console.log("load right model of interaction");
    this.el.setAttribute("oculus-touch-controls", {model:"true", hand:"right"});
  },
});

AFRAME.registerComponent('gui-tablet', {
  // the definition of the tablet compoennt
    schema: {},
    init: function () {
      this.createTablet();
    },
    update: function () {},
    tick: function () {},
    createTablet: function(){
      this.tablet = createTablet();
      this.el.appendChild(this.tablet);
    },

    reload: function(){
      // Hide all scene dependant elements, then show only the one that interest us
      console.log("reload gui-tablet");
      console.log(this.tablet);//.reload();
    }
  }
);

AFRAME.registerPrimitive('a-gui-tablet', {
  // the definition of the a-gui-tablet primitive tag 
    defaultComponents: {
        'gui-tablet': { }
    },
    mappings: {  }
});
