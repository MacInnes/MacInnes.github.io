var container, stats;

var camera, controls, scene, renderer;

var cross;

init();
animate();

function init() {

  camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 30;

  controls = new THREE.OrbitControls( camera );
  controls.enableRotate = true;
  controls.addEventListener( 'change', render );

  scene = new THREE.Scene();
  // scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

  // world
  var loader = new THREE.STLLoader();
  var material = new THREE.MeshPhongMaterial( { color: 0xAAAAAA, specular: 0x111111, shininess: 0 } );
  loader.load( './assets/testfile.stl', function ( geometry ) { // need to dynamically load each file (from url?)
    var meshMaterial = material;
    if (geometry.hasColors) {
      meshMaterial = new THREE.MeshPhongMaterial({ opacity: geometry.alpha, vertexColors: THREE.VertexColors });
    }
    var mesh = new THREE.Mesh( geometry, meshMaterial );
    

    // testing:
    var box = new THREE.Box3().setFromObject( mesh );
    box.center( mesh.position ); // this re-sets the mesh position
    mesh.position.multiplyScalar( - 1 );

    var pivot = new THREE.Group();
    scene.add( pivot );
    pivot.add( mesh );



    // mesh.position.set( 0, 0, 0);
    // mesh.rotation.set( Math.PI / 2, Math.PI / 2,  Math.PI / 2 );
    // mesh.scale.set( 0.3, 0.3, 0.3 );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add( mesh );
  } );

  // lights

  var light1 = new THREE.DirectionalLight( 0xffffff );
  light1.position.set( 2, 1, 1 );
  scene.add( light1 );

  // var light2 = new THREE.DirectionalLight( 0xffffff );
  // light2.position.set( 1, 1, 1 );
  // scene.add( light2 );

  var light3 = new THREE.AmbientLight( 0x222222 );
  scene.add( light3 );

  var light4 = new THREE.DirectionalLight( 0xffffff );
  light4.position.set(-2,-2, 2);
  scene.add( light4 );

  var light5 = new THREE.DirectionalLight( 0xffffff );
  light5.position.set(5,5,-10);
  scene.add( light5 );


  // renderer

  renderer = new THREE.WebGLRenderer( { antialias: false } );
  // renderer.setClearColor( scene.fog.color, 1 );
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