import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const container = document.getElementById("threeD-container");

// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

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
container.appendChild(renderer.domElement);

// Controles
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Luz
const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
scene.add(light);

// Loader
const loader = new GLTFLoader();

// MODELO
let modeloActual = null;

function cargarModelo() {
    const ruta = "./models/juegos.glb"; // <-- cambia si tu archivo tiene otro nombre

    if (modeloActual) scene.remove(modeloActual);

    loader.load(
        ruta,
        function (gltf) {
            modeloActual = gltf.scene;
            modeloActual.scale.set(1.5, 1.5, 1.5);
            scene.add(modeloActual);
        },
        undefined,
        function (error) {
            console.error("Error cargando modelo:", error);
        }
    );
}

cargarModelo();

// Animación
function animate() {
    requestAnimationFrame(animate);
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
