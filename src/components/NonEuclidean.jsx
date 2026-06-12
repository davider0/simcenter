import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Un cubo que se convierte en esfera cuando la cámara rota a vista desde eje Z
// Si se rota fuera de esa vista, vuelve a ser cubo. Usa umbral con histéresis.
function NonEuclidean({ className, style }) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const meshRef = useRef(null);
  const cubeAngleDegRef = useRef(20); // ángulo (en grados) desde -Z en el que aún es cubo

  useEffect(() => {
    const container = containerRef.current;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    scene.background = null; // transparente
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(2.2, 2.0, 2.6);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Luces
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(3, 4, 2);
    scene.add(dir);

    // Geometría base (cubo con segmentos para morph suave)
    const cubeGeom = new THREE.BoxGeometry(1, 1, 1, 16, 16, 16);
    cubeGeom.computeVertexNormals();

    // Crear morph target hacia esfera, manteniendo el mismo número de vértices
    const pos = cubeGeom.attributes.position;
    const spherePositions = new Float32Array(pos.array.length);
    const sphereNormals = new Float32Array(pos.array.length);
    const v = new THREE.Vector3();
    const targetRadius = 0.85;
    for (let i = 0; i < pos.count; i++) {
      v.set(pos.getX(i), pos.getY(i), pos.getZ(i));
      v.normalize().multiplyScalar(targetRadius);
      spherePositions[i * 3 + 0] = v.x;
      spherePositions[i * 3 + 1] = v.y;
      spherePositions[i * 3 + 2] = v.z;
      // Normales de esfera (radiales)
      const n = v.clone().normalize();
      sphereNormals[i * 3 + 0] = n.x;
      sphereNormals[i * 3 + 1] = n.y;
      sphereNormals[i * 3 + 2] = n.z;
    }
    cubeGeom.morphAttributes.position = [new THREE.Float32BufferAttribute(spherePositions, 3)];
    cubeGeom.morphAttributes.normal = [new THREE.Float32BufferAttribute(sphereNormals, 3)];

    const material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.35, metalness: 0.2, morphTargets: true });
    const mesh = new THREE.Mesh(cubeGeom, material);
    // Inicializamos influencia del morph en 0 (cubo)
    mesh.morphTargetInfluences = [0];
    scene.add(mesh);
    meshRef.current = mesh;

    // Controles de órbita
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controlsRef.current = controls;

    // Centro de referencia
    controls.target.set(0, 0, 0);
    controls.update();
    const unitZNeg = new THREE.Vector3(0, 0, -1);
    const dirVec = new THREE.Vector3();

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    let rafId;
    const animate = () => {
      controls.update();
      // Calcular influencia del morph según ángulo de visión
      camera.getWorldDirection(dirVec);
      const angleZ = Math.acos(THREE.MathUtils.clamp(dirVec.dot(unitZNeg), -1, 1)); // 0 => -Z, pi => +Z
      const cubeAngle = THREE.MathUtils.degToRad(cubeAngleDegRef.current);
      const w = THREE.MathUtils.clamp((angleZ - cubeAngle) / (Math.PI - cubeAngle), 0, 1);
      const eased = w * w * (3 - 2 * w); // smoothstep 0..1
      if (meshRef.current) {
        meshRef.current.morphTargetInfluences[0] = eased;
      }
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', onResize);
      if (rafId) cancelAnimationFrame(rafId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      cubeGeom.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: '100%', height: '300px', ...style }}
    />
  );
}

NonEuclidean.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};

export default NonEuclidean;
