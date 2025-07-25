// 创建 Three.js 场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 350;

// 创建渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 轨道控制
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;

// 创建地球
const globe = new ThreeGlobe()
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
  .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png');

// 将地球添加到场景
scene.add(globe);

// 光照
const ambientLight = new THREE.AmbientLight(0xbbbbbb, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 3, 5);
scene.add(directionalLight);

// 动画循环
function animate() {
  globe.rotation.y += 0.002;  // 让地球自动旋转
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

// 监听窗口变化
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
