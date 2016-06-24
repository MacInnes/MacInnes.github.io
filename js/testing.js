var container, stats;

var camera, controls, scene, renderer;

var cross;

init();
animate();

function init() {

  camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 250 );
  camera.position.z = 30;

  controls = new THREE.OrbitControls( camera );
  controls.enableRotate = true;
  controls.addEventListener( 'change', render );

  scene = new THREE.Scene();

  // world
  var loader = new THREE.STLLoader();

  var material = new THREE.MeshPhongMaterial( { color: 0xDEDEDE, specular: 0x111111, shininess: 0 } );
  loader.load( './assets/testfile3.stl', function ( geometry ) { // need to dynamically load each file (from url?)
    var meshMaterial = material;
    if (geometry.hasColors) {
      meshMaterial = new THREE.MeshPhongMaterial({ opacity: geometry.alpha, vertexColors: THREE.VertexColors });
    }
    var mesh = new THREE.Mesh( geometry, meshMaterial );
    

    // centering:
    var box = new THREE.Box3().setFromObject( mesh );
    box.center( mesh.position ); // this re-sets the mesh position
    mesh.position.multiplyScalar( - 1 );

    var pivot = new THREE.Group();
    scene.add( pivot );
    pivot.add( mesh );


    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add( mesh );
  } );

  // lights

  var ambient = new THREE.AmbientLight(0xaaaaaa);
  scene.add(ambient);

  var pointLight = new THREE.PointLight(0xffffff, 0.25, 0);
  pointLight.position.set(0,0,100);
  scene.add(pointLight);

  var pointLight2 = new THREE.PointLight(0xffffff, 0.25, 0);
  pointLight2.position.set(0,0,-100);
  scene.add(pointLight2);

  var pointLight3 = new THREE.PointLight(0xffffff, 1, 50);
  pointLight3.position.set(-30,30,0);
  scene.add(pointLight3);



  // renderer

  renderer = new THREE.WebGLRenderer( { antialias: false } );
  renderer.setClearColor( 0x2B2B2B, 1);
  renderer.setSize( window.innerWidth, window.innerHeight );

  container = document.getElementById( 'container' );
  container.appendChild( renderer.domElement );

  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

  render();

}

function animate() {

  requestAnimationFrame( animate );
  controls.update();
  render();
}

function render() {
  renderer.render( scene, camera );
}

function findFileName(url){
  var filePath = "/images/technical-drawings/3d/";
  var fileName = url.split('/');
  return filePath + fileName[fileName.length - 1] + '.stl';
}
// testing purposes:

console.log(findFileName('www.mockett.com/3d/PCS82A-U1'));

console.log(window.location.href);