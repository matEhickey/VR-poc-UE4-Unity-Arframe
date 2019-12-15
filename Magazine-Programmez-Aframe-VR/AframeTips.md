# Aframe quick documentation

Aframe is a web vr framework based on Entity-Component-System
It use the dom (the HTML structure) as the representation of our scene

### Defining a scene
~~~html
<a-scene></a-scene>
~~~

### Defining entity
An entity is the atomic game object, we can put it some component that will affect his behavior
~~~html
<a-entity component1></a-entity>
~~~

### Defining components
To create our custom component, we have to register it in aframe:
~~~js
AFRAME.registerComponent('componentName', {
  schema: {},
  // schema: {type: 'int', default: 5} maybe have to define it ??
  init: function () {
    console.log(this.data); // argument of html : <a-entity componentName="coucou">

    console.log(this.el); // own dom element
    console.log(this.el.object3D); // own threejs element
  },
  tick: function () {
    console.log("tick");
  }
});
~~~

Other methods:  
~~~js
init: function () {},
update: function () {},
tick: function () {},
remove: function () {},
pause: function () {},
play: function () {}
~~~

### Schema (html args)  

~~~js
  schema: {
    color: {default: '#FFF'},
    size: {type: 'int', default: 5}
  }
~~~  


~~~html
<a-scene>
  <a-entity bar="color: red; size: 20"></a-entity>
</a-scene>
~~~


### Requiring attribute
~~~javascript
AFRAME.registerComponent('collider-check', {
  dependencies: ['raycaster'], ... });
~~~

### Defining a primitive
A primitive is like a entity with a component attached by default, so we can use it it like:
~~~html
<a-my-primitive></a-my-primitive>
~~~

How to register:
~~~js
AFRAME.registerPrimitive('a-my-primitive', {
    defaultComponents: {
        'a-mycomponent': { }
    },
    mappings: {} // mappings map the attribute value of the primitive and its components
});
~~~

### Changing attribute at runtime
~~~js
element.setAttribute('color', "#fff");
~~~

### Dynamic instanciation:
~~~js
let circleElement = document.createElement('a-entity');
circleElement.setAttribute('class', `circleElement`);
circleElement.setAttribute('scale', `${elementScale} ${elementScale} ${elementScale}`);
circleElement.setAttribute('material', `color:#${getRandomColor()}; metalness: 0; roughness: 0`);
~~~


## World position / Apply transformations  

~~~js
entityEl.object3D.getWorldPosition();
entityEl.object3D.getWorldRotation();
~~~

More functions:  

~~~js
.localToWorld (vector)
.getWorldDirection ()
.getWorldQuaternion ()
.getWorldScale ()
~~~


from world to an object local space  

~~~js
var worldToLocal = new THREE.Matrix4().getInverse(object3D.matrixWorld)
~~~

Then we can apply that worldToLocal matrix to anything we want to transform:  

~~~js
anotherObject3D.applyMatrix(worldToLocal);
~~~

## Changing scene
~~~html
<a-scene>
  <!-- Templates. -->
  <a-assets>
    <script id="scene1" type="text/html">
      <a-box></a-box>
    </script>
    <script id="scene2" type="text/html">
      <a-sphere></a-sphere>
    </script>
  </a-assets>

  <a-entity template="src: #box"></a-entity>
</a-scene>

~~~
Then when you want to change your scene, change the src:  

~~~html
<a-entity template="src: #sphere"></a-entity>
~~~

[See](https://stackoverflow.com/questions/38738147/how-to-load-a-new-scene-in-a-frame)  


### Aframe work with event
~~~js
// <a-entity id="leftcontroller" vive-controls="hand: left">
document.getElementById("leftcontroller").addEventListener("triggerdown", function(){});
~~~

### Animation
~~~html
<a-plane>
  <a-animation attribute="visible" from="false" to="true" delay="800" dur="1" fill="both"></a-animation>
</a-plane>
~~~
[See](https://github.com/aframevr/aframe/blob/master/docs/core/animations.md)  
Events: animationbegin, animationend

### Mixins
Mixins are used to avoid to repeat component declaration when used many times:  
~~~html
<a-scene>
  <a-assets>
    <a-mixin id="box" geometry="primitive: box"></a-mixin>
    <a-mixin id="tall" geometry="height: 10"></a-mixin>
    <a-mixin id="wide" geometry="width: 10"></a-mixin>
  </a-assets>

  <a-entity mixin="wide tall box" geometry="depth: 2"></a-entity>
</a-scene>
~~~

## Misc

### Prevent VR Mode
~~~html
<a-scene vr-mode-ui="enabled: false"></a-scene>
~~~

### Laser-control / Raycaster  

~~~html  
<a-entity laser-controls raycaster="objects: .links; far: 5"></a-entity>
~~~  

[See also](https://aframe.io/docs/0.8.0/components/raycaster.html)


## World space GUI
[Aframe-GUI](https://github.com/rdub80/aframe-gui)  

Layout:  
~~~html
<a-gui-flex-container
	flex-direction="column" justify-content="center" align-items="normal" component-padding="0.1" opacity="0.7" width="3.5" height="4.5"
	position="2 2.5 -4" rotation="0 0 0"
>
... gui items here...
</a-gui-flex-container>
~~~

Cursor / raycast:
~~~html
<a-entity raycaster="interval: 1000; objects: [gui-interactable]"
					  cursor="fuse: true; fuseTimeout: 2000"
					  gui-cursor="design:reticle;" >
</a-entity> <!-- /cursor -->
~~~

<!-- ## Getting controller events/value
Mappings -->

## State component
[aframe-state-component](https://www.npmjs.com/package/aframe-state-component)  
state component object redux like:

~~~js
// registering reducers

AFRAME.registerState({
  initialState: {
    state1: "None",
    state2: {fzefze: "fezfze", fezfez:"efreg"},
    state3: []
  },

  handlers: {
    action1: function (state, action) {
      switch (action.type) {
        case "EVENT1":
          state.state1 = "Wazzaa";
          break;
        case "EVENT2":
          state.state2.push({ezf: "zefzef"});
          break;

      }
    },
    otherActions: function (state, action) {
      ...
    }
  }
});


// Getting the state
console.log(AFRAME.scenes[0].systems.state.state);

// event state changed
AFRAME.scenes[0].addEventListener("stateupdate",function(event){
  console.log(event.detail.state);
});

// emit an action
AFRAME.scenes[0].emit('translateActions', {type: "EVENT1", otherarg: 50});

// bind a value
<a-scene>
  <a-entity bind__text="value: app.score"></a-entity>
  <!-- Or <a-entity bind="text.value: score"> -->
</a-scene>

<a-entity bind="visible: !enabled"></a-entity>
<a-entity bind__visible="!!enabled"></a-entity>

~~~

## Debug / stat
~~~html
<!-- aframe scene declaration, with debug and stats enabled -->
<a-scene debug stats> </a-scene>
~~~

## Customise renderer
~~~html
<a-scene renderer="antialias: false;
               gammaOutput: false;
               sortObjects: false;
               physicallyCorrectLights: false;">
<!-- renderer config exemple (all false is by default) -->
~~~
