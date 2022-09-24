/* Create a name space */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

/* Create an instance of the WebGL renderer.
The renderer is a tool that Three.js uses
to alocate space on a webpage, where we can add and animate all the 3D stuff. */
const renderer = new THREE.WebGLRenderer();

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

// Red cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const box = new THREE.Mesh(geometry, material);
scene.add(box);

// Plane
const planeGeo = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  /* Add the side prop to the material, to see it also from behind.  */
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeo, planeMaterial);
scene.add(plane);

/* Make the plane match the grid, we rotate it. */
plane.rotation.x = -0.5 * Math.PI;

// size of grid = 30 / amount of squares = 50
const gridHelper = new THREE.GridHelper(30, 50);
scene.add(gridHelper);

/* Reduce the width and height segments to have a less rounded sphere; 
add the last 10, 10 */
const sphereGeo = new THREE.SphereGeometry(4, 50, 50);

/* Change the material. 
With MeshStandardMaterial or MeshLambertMaterial, 
the sphere is black because it has no light. */
const sphereMat = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  /* remove the color */
  wireframe: false,
});
const sphere = new THREE.Mesh(sphereGeo, sphereMat);
scene.add(sphere);

// sphere.position.x = -10;
sphere.position.set(-10, 10, 0);

const gui = new dat.GUI();

/* Change the color of the sphere */
const options = {
  sphereColor: "#ffea00",
};

gui.addColor(options, "sphereColor").onChange((e) => {
  sphere.material.color.set(e);
});

function animate(time) {
  box.rotation.x = time / 1000;
  box.rotation.y = time / 1000;

  /* Link the scene with the camera */
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
