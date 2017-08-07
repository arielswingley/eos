// Created by Bjorn Sandvik - thematicmapping.org
(function () {
	// when the mouse moves, call the given function
	//Added by Bryan to try to get ontinents to be clickable
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );

	var webglEl = document.getElementById('webgl');

	if (!Detector.webgl) {
		Detector.addGetWebGLMessage(webglEl);
		return;
	}

	var width  = window.innerWidth,
		height = window.innerHeight;

	// Earth params
	var radius   = 0.5,
		segments = 32,
		rotation = 6;  

	var scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
	camera.position.z = 1.5;

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);

	scene.add(new THREE.AmbientLight(0xffffff));
	
	//Added by Bryan to try to get ontinents to be clickable
	var targetList = [];
	var projector, mouse = { x: 0, y: 0 };
	var projector = new THREE.Projector();
	//Directional Lighting
	// var light = new THREE.DirectionalLight(0xffffff, 1);
	// light.position.set(5,3,5);
	// scene.add(light);

    var sphere = createSphere(radius, segments);
	sphere.rotation.y = rotation; 
	scene.add(sphere)
	//Added by Bryan to try to get ontinents to be clickable
	targetList.push(sphere)
 //   var clouds = createClouds(radius, segments);
	// clouds.rotation.y = rotation;
	// scene.add(clouds)

	var stars = createStars(90, 64);
	scene.add(stars);
	
	
	var controls = new THREE.TrackballControls(camera,  renderer.domElement);

	webglEl.appendChild(renderer.domElement);

	render();

	function render() {
		controls.update();
		sphere.rotation.y += 0.0005;
		// clouds.rotation.y += 0.0005;		
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}

	function createSphere(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('http://final-project-zeegeeko.c9users.io/fog_world.svg')
				// bumpMap:     THREE.ImageUtils.loadTexture('http://final-project-zeegeeko.c9users.io/elev_bump_4k.jpg'),
				// bumpScale:   0.005,
				// specularMap: THREE.ImageUtils.loadTexture('http://final-project-zeegeeko.c9users.io/water_4k.png'),
				// specular:    new THREE.Color('grey')								
			})
		);
	}

	// function createClouds(radius, segments) {
	// 	return new THREE.Mesh(
	// 		new THREE.SphereGeometry(radius + 0.003, segments, segments),			
	// 		new THREE.MeshPhongMaterial({
	// 			map:         THREE.ImageUtils.loadTexture('http://final-project-zeegeeko.c9users.io/fair_clouds_4k.png'),
	// 			transparent: true
	// 		})
	// 	);		
	// }

	function createStars(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments), 
			new THREE.MeshBasicMaterial({
				map:  THREE.ImageUtils.loadTexture('http://final-project-zeegeeko.c9users.io/galaxy_starfield.png'), 
				side: THREE.BackSide
			})
		);
	}
	//Added by Bryan to try to get ontinents to be clickable
	//Problem: does not read the click unless radial menu is popped up
	function onDocumentMouseDown( event ) {
	// the following line would stop any other event handler from firing
	// (such as the mouse's TrackballControls)
	event.preventDefault();
	
	console.log("Click.");
	
	// update the mouse variable
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	
	// find intersections

	// create a Ray with origin at the mouse position
	//   and direction into the scene (camera direction)
	var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
	projector.unprojectVector( vector, camera );
	var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

	// create an array containing all objects in the scene with which the ray intersects
	var intersects = ray.intersectObjects( targetList );
	
	// if there is one (or more) intersections
	if ( intersects.length > 0 )
	{
		console.log("Hit @ " + toString( intersects[0].point ) );
		// change the color of the closest face.
		intersects[ 0 ].face.color.setRGB( 0.8 * Math.random() + 0.2, 0, 0 ); 
		intersects[ 0 ].object.geometry.colorsNeedUpdate = true;
	}

}
}());