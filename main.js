import './style.css'

import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js'
import * as dat from 'dat.gui';

const gui = new dat.GUI();
const world = {
  plane: {
    width: 10
  }
}

gui.add(world.plane, 'width', 1, 10)
  .onChange(() => {
    planeMesh.geometry.dispose();
    planeMesh.geometry = new THREE.PlaneGeometry(
      world.plane.width,
      3,
      10,
      10
    );
  });

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

camera.position.z = 4;

const planeGeometry = new THREE.PlaneGeometry(
  3,
  3,
  10,
  10
);

const planeMaterial = new THREE.MeshPhongMaterial({
    color: 0x9f0000,
    side: THREE.DoubleSide,
    flatShading: THREE.FlatShading
});

const planeMesh = new THREE.Mesh(
  planeGeometry,
  planeMaterial
);

scene.add(planeMesh);

const { array } = planeMesh.geometry.attributes.position;

for(let i = 0; i < array.length; i+=3){
  const x = array[i];
  const y = array[i+1];
  const z = array[i+2];

  array[i + 2] = z + Math.random();
}


const light = new THREE.DirectionalLight(
  0xffffff,
  1
);

light.position.set(0, 0, 1);

scene.add(light);

const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    
    //planeMesh.rotation.x += .01;
}

animate();