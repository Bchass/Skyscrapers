// three.js vars
var scene,
    camera,
    renderer,
    controls,
    geometry,
    group;

// geometry of buildings
var buildingMaterial = new THREE.MeshLambertMaterial({
    color: 0xe3dca1
});
var cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

var radius = 40;
// setup of planet
function planet(r) {
    var groundMaterial = new THREE.MeshLambertMaterial({
        color: 0x7d715b
    });
    var planetGeometry = new THREE.SphereGeometry(radius, 100, 100);
    var planet = new THREE.Mesh(planetGeometry, groundMaterial);
    planet.position.set(0, 0, 0);
    scene.add(planet);
}
// setup of buildings
function building(x, y, z) {
    var structure = new THREE.Mesh(cubeGeometry, buildingMaterial);
    structure.position.set(0, radius + 0.75, 0);
    structure.scale.set(0.3, 1.5, 0.3);


    var building = new THREE.Group();
    building.add(structure);


    building.rotation.x = x;
    building.rotation.y = y;
    building.rotation.z = z;

    return building;
}


function init() {
    // setup scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 80;

    // lights for the planet
    var light1 = new THREE.DirectionalLight(0x403f3e);
    var light2 = new THREE.AmbientLight(0xadbcff);
    light1.position.set(0, 0, 1);

    scene.add(light1);
    scene.add(light2);
    scene.add(planet(radius));

    // How many buildings to generate
    for (var i = 0; i < 3000; i++) {
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