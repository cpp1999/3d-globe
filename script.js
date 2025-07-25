// 创建 Three.js 场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.z = 500; // 确保相机距离足够远

// 创建渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 控制器
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.enablePan = true;
controls.enableRotate = true;

// 创建地球
const globe = new ThreeGlobe()
  .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-dark.jpg') // 纹理
  .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png'); // 地形

scene.add(globe);

// 添加光照
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(200, 200, 200);
scene.add(directionalLight);

// 动画循环
function animate() {
  globe.rotation.y += 0.002; // 自动旋转
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

// 响应式
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
