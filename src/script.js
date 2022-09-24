/* Create a name space */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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

const orbit = new OrbitControls(camera, renderer.domElement);

/* The axesHelper is a tool, that serves as a guide.
It mearly introduces the 3D coordinate system.  */
const axesHelper = new THREE.AxesHelper(3); // 5 is the length of the axes.
scene.add(axesHelper);

// x, y, z
camera.position.set(0, 2, 5);
orbit.update(); // Important! update every time we set the camera position
// camera.position.z = 3;
// camera.position.y = 2;

// Red cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const box = new THREE.Mesh(geometry, material);
scene.add(box);

function animate(time) {
  box.rotation.x = time / 1000;
  box.rotation.y = time / 1000;

  /* Link the scene with the camera */
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
