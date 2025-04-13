import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';


// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// ✅ Green material for plane
const greenMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00, // green
    side: THREE.DoubleSide,
});
const redMaterial = new THREE.MeshBasicMaterial({
    color: 0xFF4500,

})
const whiteMaterial = new THREE.MeshBasicMaterial({
    color: 'white',
    side: THREE.DoubleSide,

})
const ambientLight = new THREE.AmbientLight(0xffffff, 0.05); // soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.05); // strong directional light
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// ✅ Blue material for wall
const blueMaterial = new THREE.MeshBasicMaterial({
    color: 0x0000ff, // blue
});


const textureLoader = new THREE.TextureLoader();
const displacementTexture = textureLoader.load('./brown_mud_leaves_01_disp_1k.jpg');
const doortexture = textureLoader.load('./door.jpg')
console.log(doortexture)
const doorMaterial = new THREE.MeshBasicMaterial({
    map: doortexture,
    side: THREE.DoubleSide // optional, in case you wanna see both sides
});
const floordisplacementtexture = textureLoader.load('./brown_mud_leaves_01_disp_1k.png')
const floortexture = textureLoader.load('./brown_mud_leaves_01_diff_1k.jpg')
const floormaterial = new THREE.MeshStandardMaterial(
    {
        map: floortexture,
        side: THREE.DoubleSide,
        displacementMap: floordisplacementtexture,
        displacementScale: 0.5,
       
    }
)


const walltexture = textureLoader.load('./mixed_brick_wall_diff_1k.jpg')
const wallmaterial = new THREE.MeshBasicMaterial(
    {
        map: walltexture,
        side: THREE.DoubleSide
    }
)
const buushtexture = textureLoader.load('./coast_sand_rocks_02_diff_1k.jpg');
const buuushmaterial = new THREE.MeshBasicMaterial(
    {
        map: buushtexture,
        side: THREE.DoubleSide
    }
)

const toptexture = textureLoader.load('./rebar_reinforced_concrete_diff_1k.jpg')
const topmaterial = new THREE.MeshBasicMaterial(
    {
        map: toptexture,
        side: THREE.DoubleSide
    }
)

const graveeetexture = textureLoader.load('./8.png');
const graveeematerial = new THREE.MeshBasicMaterial(
    {
        map: graveeetexture,
        side: THREE.DoubleSide

    }
)






const ghost1 = new THREE.PointLight('#8800ff',4)
const ghost2 = new THREE.PointLight('green',4)
ghost1.position.set(2,0.5,-2)
ghost2.position.set(1,0.5,-3)
scene.add(ghost1,ghost2)




// ✅ Plane (Green ground)
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20,256,256),
    floormaterial
);
plane.rotation.x = -Math.PI * 0.5; // flat on ground

scene.add(plane);

// ✅ House Group
const house = new THREE.Group();
scene.add(house);

// ✅ Wall (Blue box)
const wall = new THREE.Mesh(
    new THREE.BoxGeometry(4, 5, 4),
wallmaterial
);
wall.position.y = 2.55;
house.add(wall);
const top = new THREE.Mesh(
    new THREE.ConeGeometry(4,3,4),
    topmaterial
)
top.position.y = 6.5;
top.rotation.y = Math.PI*0.25
house.add(top)

const door = new THREE.Mesh(
    new THREE.PlaneGeometry(3,1.5),
    doorMaterial
)
door.position.y = 1.5;

door.position.z =2.01;
door.rotation.z = Math.PI*0.5
house.add(door)

//doorlight
// PointLight
const pointLight = new THREE.PointLight('#ff7d46', 5, 10); // white light, intensity, distance
pointLight.position.set(0, 4.9, 2.3); // position of the light
house.add(pointLight);

// Sphere to represent the light source (like a bulb)
const lightBulbGeometry = new THREE.SphereGeometry(0.2, 16, 16); // small sphere
const lightBulbMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // yellow color for the bulb
const lightBulb = new THREE.Mesh(lightBulbGeometry, lightBulbMaterial);
lightBulb.position.copy(pointLight.position); // position it same as the light
house.add(lightBulb);

// bushes
const bushgeometry = new THREE.SphereGeometry(1,16,16)
const bushmaterial = new THREE.MeshStandardMaterial()

const bush1 = new THREE.Mesh(bushgeometry,buuushmaterial)
bush1.scale.set(0.5,0.5,0.5)
bush1.position.set(2.5,0.5,1)
house.add(bush1)

const bush2 = new THREE.Mesh(bushgeometry,buuushmaterial)
bush2.scale.set(0.6,0.5,0.7)
bush2.position.set(-1.7,0.5,2.9)
house.add(bush2)

const bush3 = new THREE.Mesh(bushgeometry,buuushmaterial)
bush3.scale.set(0.8,0.9,1)
bush3.position.set(1.5,0.9,3.1)
house.add(bush3)
//graves
const gravematerial = new THREE.MeshStandardMaterial()
const gravegeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graves = new THREE.Group()
scene.add(graves)

for (let i = 0; i < 30; i++) {
    const grave = new THREE.Mesh(gravegeometry, graveeematerial)

    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 6  // Spread the graves out
    const xx = Math.sin(angle) * radius
    const yy = Math.cos(angle) * radius

    grave.position.x = xx
    grave.position.z = yy
  
    grave.position.y =0.4;
    grave.rotation.y = (Math.random() - 0.5) * 0.4 // Small random horizontal rotation
    grave.rotation.z = (Math.random() - 0.5) * 0.2 // Small forward/back tilt

    graves.add(grave)
}









// ✅ Sizes
const sizes = {
    width: 1200,
    height: 900
};

// ✅ Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(5, 5, 15);
camera.lookAt(house.position);
scene.add(camera);

// ✅ Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);

// ✅ Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = true;

const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime(); // in seconds

    // 🔁 Circular motion
    const raadius = 5;
    ghost1.position.x = Math.cos(elapsedTime) * raadius;
    ghost1.position.z = Math.sin(elapsedTime) * raadius;
    ghost2.position.x = -(Math.cos(elapsedTime) * raadius*1.5);
    ghost2.position.z = Math.sin(elapsedTime) * raadius*1.5;
   
    
  


    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
};

tick();
//shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

directionalLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;

wall.castShadow = true;
wall.receiveShadow = true;
top.castShadow = true;
plane.receiveShadow = true;
for(  const grave of graves.children){
    grave.castShadow =true;
    grave.receiveShadow = true;
}
directionalLight.shadow.mapSize.width =256;
directionalLight.shadow.mapSize.height =256;
const sky = new Sky();
sky.scale.setScalar(10000);
scene.add(sky);

const sun = new THREE.Vector3();
sun.setFromSphericalCoords(1, Math.PI * 0.5, Math.PI * 0.25);
sky.material.uniforms['sunPosition'].value.copy(sun);
directionalLight.position.copy(sun.clone().multiplyScalar(100)); // optional but realistic

sky.material.uniforms['turbidity'].value = 10;
sky.material.uniforms['rayleigh'].value = 2;
sky.material.uniforms['mieCoefficient'].value = 0.005;
sky.material.uniforms['mieDirectionalG'].value = 0.8;
scene.fog = new THREE.FogExp2('#02343f',0.04)

