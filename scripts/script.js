import * as THREE from 'three';

const CAMERA_FOV = 75;
const CAMERA_ASPECT_RATIO = window.innerWidth / window.innerHeight;
const CAMERA_NEAR = 0.1;
const CAMERA_FAR = 1000;

const RENDERER_CLEAR_COLOR = 0xbaf9ff;  // 背景色
const AMBIENT_LIGHT_COLOR = 0xffffff;

const X_DIRECTION = -1;  // 回転の向き。-1でマウスと同じ向き、1でマウスと逆向きに回る

let scene, camera, renderer;
let isMouseDown = false;
let mouseX = 0;
let rotate = 0;

function init() {

  // シーンを作成
  scene = new THREE.Scene();

  // カメラを作成
  camera = new THREE.PerspectiveCamera(
    CAMERA_FOV,
    CAMERA_ASPECT_RATIO,
    CAMERA_NEAR,
    CAMERA_FAR
  );
  camera.position.z = 1;

  // レンダラーを作成
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(RENDERER_CLEAR_COLOR, 1);
  document.body.appendChild(renderer.domElement);

  // 自然光を追加
  const light = new THREE.AmbientLight(AMBIENT_LIGHT_COLOR, 1);
  scene.add(light);
}


function animate() {
  const targetRot = (mouseX / window.innerWidth) * 360 * X_DIRECTION;
  rotate += (targetRot - rotate);
  if (!isMouseDown) {
    mouseX += 0.2;
  }

  const radian = rotate * Math.PI / 180;
  camera.position.x = 1 * Math.sin(radian);
  camera.position.z = 1 * Math.cos(radian);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function main() {
  document.addEventListener('mousedown', () => {
    isMouseDown = true;
  });

  document.addEventListener('mouseup', () => {
    isMouseDown = false;
  });

  document.addEventListener('mousemove', (event) => {
    if (isMouseDown) {
      mouseX = event.pageX;
    }
  });

  init();
  animate();

  // 立方体を作成
  const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  const material = new THREE.MeshNormalMaterial();
  const cube = new THREE.Mesh(geometry, material);
  cube.rotation.x = Math.PI / 4;
  cube.rotation.y = Math.PI / 4;
  scene.add(cube);
}
document.addEventListener('DOMContentLoaded', main);
