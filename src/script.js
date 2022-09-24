/* Create a name space */
import * as THREE from "three";

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
  75, // field of view (usually a value between 40 - 80)
  window.innerWidth / window.innerHeight, // aspect
  0.1, // near
  1000 // far
);

/* The axesHelper is a tool, that serves as a guide.
It mearly introduces the 3D coordinate system.  */
const axesHelper = new THREE.AxesHelper(3); // 5 is the length of the axes.
scene.add(axesHelper);

// camera.position.set(2, 2, 2);
camera.position.z = 3;

/* Link the scene with the camera */
renderer.render(scene, camera);
