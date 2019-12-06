var scene,
    camera,
    renderer,
    controls,
    group;

var radius = 35;


function planet(r) {
    var groundMaterial = new THREE.MeshLambertMaterial({
        color: 0x634b35
    });
    var planetGeometry = new THREE.SphereGeometry(r, 100, 100);
    var planet = new THREE.Mesh(planetGeometry, groundMaterial);
    planet.position.set(0, 0, 0);
    scene.add(planet);
}


function init() {

    
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 80;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    
    var light1 = new THREE.DirectionalLight(0xDDEED3, 1);
    var light2 = new THREE.AmbientLight(0x7D7D7D);
    light1.position.set(0, 0, 1);

    scene.add(light1);
    scene.add(light2);
    scene.add(planet(radius));

    
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.update();
}

function render() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
}

init();
render();