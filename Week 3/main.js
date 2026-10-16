
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
)

camera.position.set(12, 14, 25)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const pointLight = new THREE.PointLight(0xffffff, 400, 0, 1.6)
const ambientLight = new THREE.AmbientLight(0xffffff, 2.3)
scene.add(pointLight, ambientLight)

// Sun
const sun = new THREE.Mesh(
    new THREE.SphereGeometry(2, 32, 24),
    new THREE.MeshStandardMaterial({
        color: 0xb44d1a,
        wireframe: true,
        roughness: 0.9
    })
)

scene.add(sun)

// Earth orbit
const earthOrbit = new THREE.Object3D()
sun.add(earthOrbit)

const earth = new THREE.Mesh(
    new THREE.SphereGeometry(0.8, 32, 24),
    new THREE.MeshStandardMaterial({
        color: 0x1e40ff,
        roughness: 0.9
    })
)

earth.position.x = 6
earthOrbit.add(earth)

// Moon orbit
const moonOrbit = new THREE.Object3D()
earth.add(moonOrbit)

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(0.28, 32, 24),
    new THREE.MeshStandardMaterial({
        color: 0x9c9c9c,
        roughness: 0.9
    })
)

moon.position.x = 1.5
moonOrbit.add(moon)

// Mars orbit
const marsOrbit = new THREE.Object3D()
sun.add(marsOrbit)

const mars = new THREE.Mesh(
    new THREE.SphereGeometry(0.6, 32, 24),
    new THREE.MeshStandardMaterial({
        color: 0xc65a35,
        roughness: 0.9
    })
)

mars.position.x = 10
marsOrbit.add(mars)

// Phobos orbit
const phobosOrbit = new THREE.Object3D()
mars.add(phobosOrbit)

const phobos = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 16, 12),
    new THREE.MeshStandardMaterial({
        color: 0x8c8175,
        roughness: 1
    })
)

phobos.position.x = 1.2
phobosOrbit.add(phobos)

// Saturn orbit
const saturnOrbit = new THREE.Object3D()
sun.add(saturnOrbit)

const saturn = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 24),
    new THREE.MeshStandardMaterial({
        color: 0xd6bd8a,
        roughness: 0.9
    })
)

saturn.position.x = 15
saturnOrbit.add(saturn)

// Saturn ring
const ringGeometry = new THREE.RingGeometry(1.3, 2.2, 64)

const ringMaterial = new THREE.MeshStandardMaterial({
    color: 0xc9b28a,
    side: THREE.DoubleSide,
    roughness: 0.9
})

const saturnRing = new THREE.Mesh(ringGeometry, ringMaterial)
saturnRing.rotation.x = Math.PI / 2.5
saturn.add(saturnRing)

// Controls
const control = new OrbitControls(camera, renderer.domElement)
control.target.set(0, 0, 0)
control.update()

// Animation
function animate() {
    requestAnimationFrame(animate)

    control.update()

    earthOrbit.rotation.y += 0.01
    moonOrbit.rotation.y += 0.004

    marsOrbit.rotation.y += 0.005
    phobosOrbit.rotation.y += 0.03

    saturnOrbit.rotation.y += 0.003

    earth.rotation.y += 0.05
    mars.rotation.y += 0.04
    saturn.rotation.y += 0.02
    sun.rotation.y += 0.006

    renderer.render(scene, camera)
}

animate()

// Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})
