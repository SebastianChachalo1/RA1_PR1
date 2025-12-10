import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/controls/OrbitControls.js";

const container = document.getElementById("threeD-container");

// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf2f2f2);

// Cámara
const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.set(0, 2, 5);

// Render
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Controles
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = true;
controls.autoRotate = false;

// Luces
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.3);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

// Loader
const loader = new GLTFLoader();
let modeloActual = null;

function cargarModelo() {
  const ruta = "./models/play4.glb";

  if (modeloActual) {
    scene.remove(modeloActual);
  }

  loader.load(
    ruta,
    function (gltf) {
      modeloActual = gltf.scene;

      // Ajustes del modelo
      modeloActual.position.set(0, 0, 0);
      modeloActual.scale.set(1.5, 1.5, 1.5);

      scene.add(modeloActual);
    },
    undefined,
    function (error) {
      console.error("❌ Error cargando modelo:", error);
    }
  );
}

cargarModelo();

// Animación
function animate() {
  requestAnimationFrame(animate);

  if (modeloActual) {
    modeloActual.rotation.y += 0.003;
  }

  controls.update();
  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener("resize", () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});
