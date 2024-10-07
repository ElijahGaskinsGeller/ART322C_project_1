

import * as THREE from '../node_modules/three/build/three.module.js';


function WindowScrollNormalPosition() {
	return window.scrollY / (GetPageHeight() - window.innerHeight);
}

function GetPageHeight() {
	return Math.max(document.body.scrollHeight, document.body.offsetHeight,
		document.documentElement.clientHeight, document.documentElement.scrollHeight,
		document.documentElement.offsetHeight);
}

function lerp(start, end, amt) {
	return (1 - amt) * start + amt * end
}

function inverse_lerp(start, end, amt) {
	return (amt - start) / (end - start);
}

function clamp(num, min, max) {
	return Math.min(Math.max(num, min), max);
}


function RectNormalPositionOnScreen(rectY, rectHeight, screenHeight) {
	let start = screenHeight;
	let end = -rectHeight;

	//NOTE: (x-min)/(max-min)
	let result = (rectY - start) / (end - start);

	return result;

}

console.log(THREE);


let scene = new THREE.Scene();


let imgWidth = 1275;
let imgHeight = 1650;

//let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//let imgHeight = 
//let imgWidth = 1275;
let camera = new THREE.OrthographicCamera(-imgWidth / 2, imgWidth / 2, imgHeight / 2, -imgHeight / 2, 1, 1000);

camera.position.z = 10;


let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerWidth / imgWidth * imgHeight);
document.getElementById("container").appendChild(renderer.domElement);
//document.body.appendChild(renderer.domElement);


let layerTexture_0 = new THREE.TextureLoader().load('./js/fg.png');
layerTexture_0.colorSpace = THREE.SRGBColorSpace;
let layerMaterial_0 = new THREE.SpriteMaterial({ map: layerTexture_0 });
let layer_0 = new THREE.Sprite(layerMaterial_0);
layer_0.scale.x = imgWidth;
layer_0.scale.y = imgHeight;
layer_0.position.z = 6;

let layerStart_0 = -400;
let layerEnd_0 = 0;


let layerTexture_1 = new THREE.TextureLoader().load('./js/band_0.png');
layerTexture_1.colorSpace = THREE.SRGBColorSpace;
let layerMaterial_1 = new THREE.SpriteMaterial({ map: layerTexture_1 });
let layer_1 = new THREE.Sprite(layerMaterial_1);
layer_1.scale.x = imgWidth;
layer_1.scale.y = imgHeight;
layer_1.position.z = 5;

let layerStart_1 = -1200;
let layerEnd_1 = 0;


let layerTexture_2 = new THREE.TextureLoader().load('./js/band_1.png');
layerTexture_2.colorSpace = THREE.SRGBColorSpace;
let layerMaterial_2 = new THREE.SpriteMaterial({ map: layerTexture_2 });
let layer_2 = new THREE.Sprite(layerMaterial_2);
layer_2.scale.x = imgWidth;
layer_2.scale.y = imgHeight;
layer_2.position.z = 4;

let layerStart_2 = -900;
let layerEnd_2 = 0;


let layerTexture_3 = new THREE.TextureLoader().load('./js/band_2.png');
layerTexture_3.colorSpace = THREE.SRGBColorSpace;
let layerMaterial_3 = new THREE.SpriteMaterial({ map: layerTexture_3 });
let layer_3 = new THREE.Sprite(layerMaterial_3);
layer_3.scale.x = imgWidth;
layer_3.scale.y = imgHeight;
layer_3.position.z = 3;
layer_3.position.y = 400;

let layerStart_3 = layer_3.position.y - 600;
let layerEnd_3 = layer_3.position.y;


let layerTexture_4 = new THREE.TextureLoader().load('./js/band_3.png');
layerTexture_4.colorSpace = THREE.SRGBColorSpace;
let layerMaterial_4 = new THREE.SpriteMaterial({ map: layerTexture_4 });
let layer_4 = new THREE.Sprite(layerMaterial_4);
layer_4.scale.x = imgWidth;
layer_4.scale.y = imgHeight;
layer_4.position.z = 2;
layer_4.position.y = 800;

let layerStart_4 = layer_4.position.y - 300;
let layerEnd_4 = layer_4.position.y;

let layerTexture_5 = new THREE.TextureLoader().load('./js/band_4.png');
layerTexture_5.colorSpace = THREE.SRGBColorSpace;
let layerMaterial_5 = new THREE.SpriteMaterial({ map: layerTexture_5 });
let layer_5 = new THREE.Sprite(layerMaterial_5);
layer_5.scale.x = imgWidth;
layer_5.scale.y = imgHeight;
layer_5.position.z = 1;
layer_5.position.y = 1200;

let layerStart_5 = layer_5.position.y;
let layerEnd_5 = layer_5.position.y;


scene.add(layer_5);
scene.add(layer_4);
scene.add(layer_3);
scene.add(layer_2);
scene.add(layer_1);
scene.add(layer_0);



function OnScroll(e) {

	let canvasRect = renderer.domElement.getBoundingClientRect();

	let canvasNormalPosition = RectNormalPositionOnScreen(canvasRect.y, canvasRect.height, window.innerHeight);
	let offsetCanvasNormalPosition = RectNormalPositionOnScreen(canvasRect.y - window.innerHeight, canvasRect.height, window.innerHeight);
	offsetCanvasNormalPosition = clamp(offsetCanvasNormalPosition, 0, 1);

	//canvasNormalPosition = RectNormalPositionOnScreen(canvasRect.y - window.innerHeight, canvasRect.height, window.innerHeight);
	canvasNormalPosition = clamp(canvasNormalPosition, 0, 1);

	layer_0.position.y = lerp(layerStart_0, layerEnd_0, 1);
	layer_1.position.y = lerp(layerStart_1, layerEnd_1, canvasNormalPosition);
	layer_2.position.y = lerp(layerStart_2, layerEnd_2, canvasNormalPosition);
	layer_3.position.y = lerp(layerStart_3, layerEnd_3, canvasNormalPosition);
	layer_4.position.y = lerp(layerStart_4, layerEnd_4, canvasNormalPosition);
	layer_5.position.y = lerp(layerStart_5, layerEnd_5, canvasNormalPosition);



	//console.log(canvasRect);
	//console.log(canvasNormalPosition);
	//console.log("ph: " + window.innerHeight);
}


function OnWindowResize(e) {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	//renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setSize(window.innerWidth, window.innerWidth / imgWidth * imgHeight);
	OnScroll(null);

}


function animate() {


	renderer.render(scene, camera);
}



window.addEventListener("resize", OnWindowResize);
window.addEventListener("scroll", OnScroll);

OnScroll(null);
renderer.setAnimationLoop(animate);
