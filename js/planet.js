// three.js vars
var scene,
    camera,
    renderer,
    controls,
    geometry,
    group;

//var currentBuildings = 0;

// geometry of buildings
const buildingMaterial = new THREE.MeshLambertMaterial({
    color: 0xe61919
});
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const LightMaterial = new THREE.MeshLambertMaterial({
    color: 0xffea00
});

const radius = 50;
// setup of planet
function planet(r) {
    const groundMaterial = new THREE.MeshLambertMaterial({
        color: 0x00c3ff
    });
    const planetGeometry = new THREE.SphereGeometry(r, 100, 100);
    const planet = new THREE.Mesh(planetGeometry, groundMaterial);
    planet.position.set(0, 0, 1);
    scene.add(planet);
}

// setup of buildings
function building(x, y, z) {
    const structure = new THREE.Mesh(cubeGeometry, buildingMaterial);
    structure.position.set(0, radius + 0.1, 0);
    structure.scale.set(0.3, 1.5, 0.3);

    const Light = new THREE.Mesh(cubeGeometry, LightMaterial);
    Light.position.set(0, radius + 1, 0);
    Light.scale.set(0.5, 0.1, 1);


    const building = new THREE.Group();
    building.add(structure);
    building.add(Light);


    building.rotation.x = x;
    building.rotation.y = y;
    building.rotation.z = z;

    return building;
}

//function fetchBuildings(){
// var different = Math.floor(1000) - currentBuildings;
//if (different > 0){
//currentBuildings += different;
//randomBuilding(different);
// }
//}

//function randomAngle(){
//return[
// 2 * Math.PI * Math.random(),
// 2 * Math.PI * Math.random(),
//2 * Math.PI * Math.random()
//];
//}

//function randomBuilding(n){
//for (var i = 0; i < n; i++){
//scene.add(building(randomAngle()));
//}
//}


function init() {

    //fetchBuildings();
    //setInterval(fetchBuildings, 100000);

    // setup scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 80;

    // lights for the planet
    const light1 = new THREE.DirectionalLight(0x6e6e6e);
    const light2 = new THREE.AmbientLight(0xb3b3b3);
    light1.position.set(5, 0, 5);
    light2.position.set(0, 0, 3);

    scene.add(light1);
    //scene.add(light2);
    scene.add(planet(radius));

    // How many buildings to generate between [0,2π]
    for (var i = 0; i < 2000; i++) {
        scene.add(building(Math.PI * Math.random() * 2, Math.PI * Math.random() * 2, Math.PI * Math.random() * 2));
    }
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.update();
}
// display planet
function render() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
}

init();
render();