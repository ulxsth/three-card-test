import * as THREE from 'three';
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

// シーンを作成
const scene = new THREE.Scene();

// カメラを作成
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 1;

// レンダラーを作成
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xbaf9ff, 1);
document.body.appendChild(renderer.domElement);

// 光源を作成
const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(1, 1, 1);

// 自然光を追加
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// 立方体を作成
const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const material = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh(geometry, material);
cube.rotation.x = Math.PI / 4;
cube.rotation.y = Math.PI / 4;
scene.add(cube);

let isMouseDown = false;
let mouseX = 0;
let rot = 0;
document.addEventListener('mousedown', (event) => {
  isMouseDown = true;
  mouseX = event.pageX;
});

document.addEventListener('mouseup', () => {
  isMouseDown = false;
});

document.addEventListener('mousemove', (event) => {
  if (isMouseDown) {
    mouseX = event.pageX;
  }
});

// オブジェクトを描画
function animate() {
  const targetRot = (mouseX / window.innerWidth) * 360;
  rot += (targetRot - rot);

  const radian = rot * Math.PI / 180;
  camera.position.x = 1 * Math.sin(radian);
  camera.position.z = 1 * Math.cos(radian);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
