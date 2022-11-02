import * as THREE from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"
import * as CANNON from "cannon-es"

    var width = window.innerWidth - 20;
    var height = window.innerHeight - 50;
    
    var scene = new THREE.Scene();
    const world = new CANNON.World({gravity: new CANNON.Vec3(0, -10, 0)});
    var camera = new THREE.PerspectiveCamera(50, width / height, .1, 1000);
    camera.position.z = 15;
    camera.position.y = 5;
    camera.position.x = -10;
    camera.updateProjectionMatrix();

    const renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setClearColor("#89cfe8");
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    const orbit = new OrbitControls(camera, renderer.domElement);

    window.addEventListener("newSize", () => {
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    })
    
    var light = new THREE.DirectionalLight(0xFFFFFF, 1, 500);
    light.position.set(0, 5, 0);
    scene.add(light);

    var planeGeo = new THREE.PlaneGeometry(6, 6);
    var planeMat = new THREE.MeshStandardMaterial({color : 0xcf4242})
    var planeMesh = new THREE.Mesh(planeGeo, planeMat);
    scene.add(planeMesh);

    const groundPhyMat = new CANNON.Material();
    const spherePhyMat = new CANNON.Material();
    const groundSphereContactMat = new CANNON.ContactMaterial(groundPhyMat, spherePhyMat, {restitution: .7});
    world.addContactMaterial(groundSphereContactMat);

    const groundBody = new CANNON.Body({shape: new CANNON.Box(new CANNON.Vec3(3,3,0.1)), type: CANNON.Body.STATIC, material: groundPhyMat});
    groundBody.quaternion.setFromEuler(-Math.PI / 3, 0, 0);
    world.addBody(groundBody);

    var planeGeo2 = new THREE.PlaneGeometry(6, 6);
    var planeMat2 = new THREE.MeshStandardMaterial({color : 0x4286cf})
    var planeMesh2 = new THREE.Mesh(planeGeo2, planeMat2);
    scene.add(planeMesh2);

    const groundBody2 = new CANNON.Body({shape: new CANNON.Box(new CANNON.Vec3(3,3,0.1)), type: CANNON.Body.STATIC, position: new CANNON.Vec3(0, -5, 10)});
    groundBody2.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    world.addBody(groundBody2);

    var planeGeo3 = new THREE.PlaneGeometry(6, 6);
    var planeMat3 = new THREE.MeshStandardMaterial({color : 0x47c96e})
    var planeMesh3 = new THREE.Mesh(planeGeo3, planeMat3);
    scene.add(planeMesh3);

    const groundBody3 = new CANNON.Body({shape: new CANNON.Box(new CANNON.Vec3(3,3,0.1)), type: CANNON.Body.STATIC, position: new CANNON.Vec3(0, -10, 20)});
    groundBody3.quaternion.setFromEuler(-Math.PI / 3, 0, 0);
    world.addBody(groundBody3);

    var planeGeo4 = new THREE.PlaneGeometry(6, 6);
    var planeMat4 = new THREE.MeshStandardMaterial({color : 0xa742cf})
    var planeMesh4 = new THREE.Mesh(planeGeo4, planeMat4);
    scene.add(planeMesh4);

    const groundBody4 = new CANNON.Body({shape: new CANNON.Box(new CANNON.Vec3(3,3,0.1)), type: CANNON.Body.STATIC, position: new CANNON.Vec3(0, -20, 30)});
    groundBody4.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    world.addBody(groundBody4);

    var boxGeo = new THREE.BoxGeometry(2,2,2);
    var boxMat = new THREE.MeshStandardMaterial({color : 0xcc3acf});
    var boxMesh = new THREE.Mesh(boxGeo, boxMat);
    scene.add(boxMesh);

    const boxBody = new CANNON.Body({shape: new CANNON.Box(new CANNON.Vec3(1,1,1)), mass: 10, position: new CANNON.Vec3(1, -8, 32.5)});
    world.addBody(boxBody);
    boxBody.angularDamping = 0.8;

    var sphereGeo = new THREE.SphereGeometry(1);
    var sphereMat = new THREE.MeshStandardMaterial({color : 0xd42053});
    var sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphereMesh);

    const sphereBody = new CANNON.Body({shape: new CANNON.Sphere(1), mass: 10, position: new CANNON.Vec3(0, 10, 0), material: spherePhyMat});
    world.addBody(sphereBody);


    const timeStep = 1/60;

    function animate(time)
    {
        world.step(timeStep);
        planeMesh.position.copy(groundBody.position);
        planeMesh.quaternion.copy(groundBody.quaternion);
        planeMesh2.position.copy(groundBody2.position);
        planeMesh2.quaternion.copy(groundBody2.quaternion);
        planeMesh3.position.copy(groundBody3.position);
        planeMesh3.quaternion.copy(groundBody3.quaternion);
        planeMesh4.position.copy(groundBody4.position);
        planeMesh4.quaternion.copy(groundBody4.quaternion);
        boxMesh.position.copy(boxBody.position);
        boxMesh.quaternion.copy(boxBody.quaternion);
        sphereMesh.position.copy(sphereBody.position);
        sphereMesh.quaternion.copy(sphereBody.quaternion);
        renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);