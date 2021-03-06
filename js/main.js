var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var container, particle, camera, scene, renderer, material;
var number = 200; //粒子数量
var speed = 1500;//飘落速度
var mouseX = 0;
var mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var particles = [];
var particleImage = new Image();
particleImage.src = 'https://cdn.jsdelivr.net/gh/kaixc/cdn@1.0/img/ParticleSmoke.png';

function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(67, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000);
    camera.position.z = 1000;

    scene = new THREE.Scene();
    scene.add(camera);

    renderer = new THREE.CanvasRenderer();
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    material = new THREE.ParticleBasicMaterial({
        map: new THREE.Texture(particleImage)
    });

    for (var i = 0; i < number; i++) {

        particle = new Particle3D(material);
        particle.position.x = Math.random() * 2000 - 1000;
        particle.position.y = Math.random() * 2000 - 1000;
        particle.position.z = Math.random() * 2000 - 1000;
        particle.scale.x = particle.scale.y = 1;
        scene.add(particle);

        particles.push(particle);
    }

    container.appendChild(renderer.domElement);
    container.firstElementChild.setAttribute('style','position: fixed; z-index: 88888; left: 0; top: 0; pointer-events: none');


    /*监听鼠标*/
    // document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);

    setInterval(loop, speed / 60);

}

/*跟随鼠标*/
/* function onDocumentMouseMove( event ) {
	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;
} */
function onDocumentTouchStart(event) {
    if (event.touches.length == 1) {
        event.preventDefault();
        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
    }
}
function onDocumentTouchMove(event) {
    if (event.touches.length == 1) {
        event.preventDefault();
        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
    }
}

function loop() {

    for (var i = 0; i < particles.length; i++) {

        var particle = particles[i];
        particle.updatePhysics();

        with (particle.position) {
            if (y < -1000) y += 2000;
            if (x > 1000) x -= 2000;
            else if (x < -1000) x += 2000;
            if (z > 1000) z -= 2000;
            else if (z < -1000) z += 2000;
        }
    }

    /*跟随鼠标*/
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (- mouseY - camera.position.y) * 0.05;

    camera.lookAt(scene.position);
    renderer.clear();
    renderer.render(scene, camera);


}
