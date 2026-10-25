import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';

const scene = new THREE.Scene()

const gui = new GUI()

const size = {
  width: window.innerWidth,
  height: window.innerHeight
}

const clock = new THREE.Clock()

const geometry = new THREE.BoxGeometry(1, 1, 1)

const textureLoader = new THREE.TextureLoader()

// const texture = textureLoader.load('https://images.unsplash.com/photo-1791358272310-98a23840a7c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D')

// const marbleTexture = textureLoader.load("./texture.jpg")

// marbleTexture.colorSpace = THREE.SRGBColorSpace

// Public folder ki files ko slash (/) se load karein
const marbleTexture = textureLoader.load('/diff.jpg')
marbleTexture.colorSpace = THREE.SRGBColorSpace

const roughnessTexture = textureLoader.load('/roughness.jpg')
const normalTexture = textureLoader.load('/normal.jpg')

// const geometry = new THREE.BufferGeometry()

// const count = 50

// const positionArray = new Float32Array(count * 3 * 3)

// for (let i = 0; i < count * 3 * 3; i++) {
//   positionArray[i] = (Math.random() - 0.5) * 4
// }

// geometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))

const material = new THREE.MeshStandardMaterial({
  map: marbleTexture,
  roughnessMap: roughnessTexture,
  normalMap: normalTexture,
  roughness: 0.5,
})

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

const property = {
  color: "#ff0000"
}

const cube = new THREE.Mesh(geometry, material)

const positionFolder = gui.addFolder("Position")
const rotationFolder = gui.addFolder("Rotation")

positionFolder.add(cube.position, "x").min(-3).max(3).step(0.01).name("Position X")
positionFolder.add(cube.position, "y").min(-3).max(3).step(0.01).name("Position Y")
positionFolder.add(cube.position, "z").min(-3).max(3).step(0.01).name("Position Z")

rotationFolder.add(cube.rotation, "x").min(-3).max(3).step(0.01).name("Position X")
rotationFolder.add(cube.rotation, "y").min(-3).max(3).step(0.01).name("Position Y")
rotationFolder.add(cube.rotation, "z").min(-3).max(3).step(0.01).name("Position Z")

gui.add(cube, "visible")
gui.add(material, "wireframe")
gui.addColor(property, "color").onChange(() => {
  material.color.set(property.color)
})

scene.add(cube)

const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  100
)

camera.position.z = 3
camera.lookAt(0, 0, 0)

const canvas = document.querySelector("#web")

const renderer = new THREE.WebGLRenderer({ canvas })

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true
controls.dampingFactor = 0.1

renderer.setSize(size.width, size.height)

window.addEventListener("resize", () => {
  size.width = window.innerWidth
  size.height = window.innerHeight
  camera.aspect = size.width / size.height
  camera.updateProjectionMatrix()
  renderer.setSize(size.width, size.height)
})

function animate() {
  const delta = clock.getDelta()

  controls.update()

  // cube.rotation.y += delta
  // cube.rotation.x += delta

  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()