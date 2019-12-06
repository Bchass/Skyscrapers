// three.js vars
var scene,
    camera,
    renderer,
    controls,
    group;

var radius = 50;

// setup of planet
function planet(r) {
    var groundMaterial = new THREE.MeshLambertMaterial({
        color: 0x7d715b
    });
    var planetGeometry = new THREE.SphereGeometry(r, 100, 100);
    var planet = new THREE.Mesh(planetGeometry, groundMaterial);
    planet.position.set(0, 0, 0);
    scene.add(planet);
}


function init() {

    // setup scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 80;

    // render planet
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // lights for the planet
    var light1 = new THREE.DirectionalLight(0x403f3e);
    var light2 = new THREE.AmbientLight(0xadbcff);
    light1.position.set(0, 0, 1);

    scene.add(light1);
    scene.add(light2);
    scene.add(planet(radius));

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