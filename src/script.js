/* Create a name space */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

/* Create an instance of the WebGL renderer.
The renderer is a tool that Three.js uses
to alocate space on a webpage, where we can add and animate all the 3D stuff. */
const renderer = new THREE.WebGLRenderer();

// enable shadows
renderer.shadowMap.enabled = true;

/* Set the size of the space */
renderer.setSize(window.innerWidth, window.innerHeight);

/* Enject that space (which is basically a canvas element) into the page*/
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45, // field of view (usually a value between 40 - 80)
  window.innerWidth / window.innerHeight, // aspect
  0.1, // near
  1000 // far
);

const orbit = new OrbitControls(camera, renderer.domElement);

/* The axesHelper is a tool, that serves as a guide.
It mearly introduces the 3D coordinate system.  */
const axesHelper = new THREE.AxesHelper(3); // 5 is the length of the axes.
scene.add(axesHelper);

// x, y, z
camera.position.set(-10, 30, 30);
orbit.update(); // Important! update every time we set the camera position
// camera.position.z = 3;
// camera.position.y = 2;

// CUBE //////////
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const box = new THREE.Mesh(geometry, material);
scene.add(box);

// PLANE ///////////
const planeGeo = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  /* Add the side prop to the material, to see it also from behind.  */
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeo, planeMaterial);
scene.add(plane);

/* Make the plane match the grid, we rotate it. */
plane.rotation.x = -0.5 * Math.PI;

/* The plane receives shadows */
plane.receiveShadow = true;

// size of grid = 30 / amount of squares = 50
const gridHelper = new THREE.GridHelper(30, 50);
scene.add(gridHelper);

// SPHERE /////////////
/* Reduce the width and height segments to have a less rounded sphere; 
add the last 10, 10 */
const sphereGeo = new THREE.SphereGeometry(4, 50, 50);

/* Change the material. 
With MeshStandardMaterial or MeshLambertMaterial, 
the sphere is black because it has no light. */
const sphereMat = new THREE.MeshStandardMaterial({
  color: 0x0000ff,
  /* remove the color */
  wireframe: false,
});
const sphere = new THREE.Mesh(sphereGeo, sphereMat);
scene.add(sphere);

// sphere.position.x = -10;
sphere.position.set(-10, 10, 0);

/* The sphere casts shadows */
sphere.castShadow = true;

// AMBIENT LIGHT //////////
/* In order to see the light we need to change the Mesh material of the elements.*/
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// DIRECTIONAL LIGHT //////////
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); //  intencity = 0.8
scene.add(directionalLight);
directionalLight.position.set(-30, 50, 0);
directionalLight.castShadow = true;
directionalLight.shadow.camera.bottom = -12; // shift the bottom side of the camera.
// LIGHT HELPER ////////////
const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5); // size of square = 5
scene.add(dLightHelper); // It's the square above the cube.

// SPOT LIGHT ////////////
const spotLight = new THREE.SpotLight(0xffffff);
scene.add(spotLight);
spotLight.position.set(-100, 100, 0);
// The shadow is pixelated at first because the angle is too wide.
spotLight.castShadow = true;
spotLight.angle = 0.2; // decrease shadow angle

// SPOT LIGHT HELPER //////////
const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);

/* Shadows in Three.js use cameras,
which delimit where to render the shadows.
Each type of light, has a specifiek type of camera.
e.g. directional light uses an orthographic camera. 
Further more to visualize the space that the shadow camera marks, 
we can use another helper. */
const dLightShadowHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
scene.add(dLightShadowHelper);

// FOG /////////////
/* near = 0, far = 200
The further we go from 0 going backwards,
the denser the fog gets. 
The same counts for going further than 200. */
// scene.fog = new THREE.Fog(0xffffff, 0, 200);

// other method for creating fog
/*  density = 0.01, with this the density grows expodentialy */
// scene.fog = new THREE.FogEpx2(0xffffff, 0.01); // gives error

// DAT.GUI //////////////
const gui = new dat.GUI();

/* Change the color of the sphere */
const options = {
  sphereColor: "#ffea00",
  /* Add a checkbox to show the mesh in its wireframe mode when it's checked. */
  wireframe: false,
  speed: 0.01,
  angle: 0.2,
  penumbra: 0,
  intensity: 1,
};

gui.addColor(options, "sphereColor").onChange((e) => {
  sphere.material.color.set(e);
});

gui.add(options, "wireframe").onChange(function (e) {
  sphere.material.wireframe = e;
});

/* min val = 0 / max = 0.1 */
gui.add(options, "speed", 0, 1);

gui.add(options, "angle", 0, 1);
gui.add(options, "penumbra", 0, 1);
gui.add(options, "intensity", 0, 1);

/* Make the sphere bounce */
let step = 0;
// let speed = 0.01;

// ANIMATE //////////////
function animate(time) {
  box.rotation.x = time / 1000;
  box.rotation.y = time / 1000;

  /* Make the sphere bounce */
  step += options.speed;
  sphere.position.y = 10 * Math.abs(Math.sin(step));

  spotLight.angle = options.angle;
  spotLight.penumbra = options.penumbra; // ads a prograsive blure effect to edje of the spot.
  spotLight.intensity = options.intensity;
  // IMPORTANT !!!!
  sLightHelper.update();

  /* Link the scene with the camera */
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
