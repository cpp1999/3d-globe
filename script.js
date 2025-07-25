// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.z = 400;  // 拉远相机位置

// 创建渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 轨道控制
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;

// 加载地球
const globe = new ThreeGlobe()
  .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg') // 使用稳定纹理
  .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png');

scene.add(globe);

// 光照
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const dLight = new THREE.DirectionalLight(0xffffff, 0.8);
dLight.position.set(100, 100, 100);
scene.add(dLight);

// 动画循环
function animate() {
  globe.rotation.y += 0.002; // 自动旋转
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

// 监听窗口大小
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
