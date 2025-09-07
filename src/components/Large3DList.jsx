import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import '../App.css';

const Large3DList = ({ items: initialItems }) => {
    const [items] = useState(initialItems);
    const containerRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const cameraRef = useRef(null);
    const controlsRef = useRef(null);
    const itemsRef = useRef([]);
    const raycasterRef = useRef(new THREE.Raycaster());
    const mouseRef = useRef(new THREE.Vector2());
    const isDraggingRef = useRef(false);
    const selectedItemRef = useRef(null);
    const rotationSpeedRef = useRef(0);
    const targetRotationRef = useRef(0);

    // Inicializar Three.js
    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff);
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(
            75,
            1,
            0.1,
            1000
        );
        camera.position.z = 10;
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        const { clientWidth, clientHeight } = containerRef.current;
        renderer.setSize(clientWidth, clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.rotateSpeed = 1;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.enableRotate = false; // rotamos con nuestro propio gesto
        controlsRef.current = controls;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(0, 1, 5);
        scene.add(directionalLight);

        // Crear items en circunferencia
        createItemsInCircle();

        const animate = () => {
            requestAnimationFrame(animate);

            controls.update();

            // Inercia de giro
            if (Math.abs(rotationSpeedRef.current) > 0.001) {
                rotationSpeedRef.current *= 0.98;
                const circleGroup = itemsRef.current.circleGroup;
                if (circleGroup) {
                    circleGroup.rotation.x += rotationSpeedRef.current;
                }
            }

            // Animación hacia rotación objetivo
            if (
                selectedItemRef.current === null &&
                Math.abs(targetRotationRef.current) > 0.001
            ) {
                const step = targetRotationRef.current * 0.05;
                const circleGroup = itemsRef.current.circleGroup;
                if (circleGroup) {
                    circleGroup.rotation.x += step;
                }
                targetRotationRef.current -= step;
            }

            renderer.render(scene, camera);
        };

        animate();

        window.addEventListener('resize', handleResize);
        renderer.domElement.addEventListener('mousedown', handleMouseDown);
        renderer.domElement.addEventListener('mousemove', handleMouseMove);
        renderer.domElement.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('resize', handleResize);
            renderer.domElement.removeEventListener('mousedown', handleMouseDown);
            renderer.domElement.removeEventListener('mousemove', handleMouseMove);
            renderer.domElement.removeEventListener('mouseup', handleMouseUp);

            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    // Cuando cambian los items, recrear
    useEffect(() => {
        if (!sceneRef.current) return;

        // limpiar anteriores
        if (itemsRef.current.circleGroup) {
            sceneRef.current.remove(itemsRef.current.circleGroup);
        }
        itemsRef.current.forEach((m) => m?.geometry?.dispose?.());
        itemsRef.current = [];

        createItemsInCircle();
    }, [initialItems]);

    // Crear elementos en circunferencia
    const createItemsInCircle = () => {
        if (!sceneRef.current) return;

        const scene = sceneRef.current;
        const radius = 5;
        const itemCount = items.length || 1;

        const circleGroup = new THREE.Group();
        scene.add(circleGroup);

        items.forEach((item, index) => {
            const angle = (index / itemCount) * Math.PI * 2;
            const y = radius * Math.sin(angle);
            const z = radius * Math.cos(angle);

            // Canvas de texto
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 1255;
            canvas.height = 184;
            ctx.font = '72px "Segoe UI"';
            ctx.fillStyle = '#000';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillText(String(item), canvas.width / 2, canvas.height / 2);

            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            texture.anisotropy = 4;

            const material = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                side: THREE.DoubleSide, // Ver por delante y por detrás (evita clipping)
            });

            const geometry = new THREE.PlaneGeometry(2, 1);
            const mesh = new THREE.Mesh(geometry, material);

            // Posición en el círculo
            mesh.position.set(0, y, z);


            const parentQuat = new THREE.Quaternion();
            const invParentQuat = new THREE.Quaternion();
            mesh.onBeforeRender = (renderer, scene, camera) => {
                if (!mesh.parent) return;
                mesh.parent.getWorldQuaternion(parentQuat);
                invParentQuat.copy(parentQuat).invert();
                mesh.quaternion.copy(camera.quaternion).premultiply(invParentQuat);
            };

            mesh.userData = {
                index,
                value: item,
                originalPosition: { x: 0, y, z },
                isHovered: false,
            };

            circleGroup.add(mesh);
            itemsRef.current.push(mesh);
        });

        itemsRef.current.circleGroup = circleGroup;
    };

    const handleResize = () => {
        if (!cameraRef.current || !rendererRef.current || !containerRef.current) return;

        const camera = cameraRef.current;
        const renderer = rendererRef.current;
        const { clientWidth, clientHeight } = containerRef.current;

        camera.aspect = clientWidth / clientHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(clientWidth, clientHeight);
    };

    const handleMouseDown = (event) => {
        if (!containerRef.current || !cameraRef.current || !sceneRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);

        const intersects = raycasterRef.current.intersectObjects(itemsRef.current, false);

        if (intersects.length > 0) {
            if (controlsRef.current) controlsRef.current.enabled = false;
            isDraggingRef.current = true;
            selectedItemRef.current = intersects[0].object;

            const material = selectedItemRef.current.material;
            if (material && material.color) material.color = new THREE.Color(0x4caf50);

            rotationSpeedRef.current = 0;
            targetRotationRef.current = 0;

            event.preventDefault();
        } else {
            // Arrastre para girar el grupo completo
            isDraggingRef.current = true;
            selectedItemRef.current = null;
            mouseRef.current.startY = event.clientY;
        }
    };

    const handleMouseMove = (event) => {
        if (!isDraggingRef.current) return;

        const circleGroup = itemsRef.current.circleGroup;
        if (!circleGroup) return;

        if (selectedItemRef.current) {
            // Girar el grupo con el elemento seleccionado (arrastre vertical)
            const deltaY = event.movementY * 0.001;
            circleGroup.rotation.x += deltaY;
            rotationSpeedRef.current = deltaY;
        } else {
            // Girar el grupo (no toda la escena) cuando no hay selección
            const deltaY = event.movementY * 0.005;
            circleGroup.rotation.x += deltaY;
        }
    };

    const handleMouseUp = () => {
        if (controlsRef.current) controlsRef.current.enabled = true;

        if (selectedItemRef.current) {
            const material = selectedItemRef.current.material;
            if (material && material.color) material.color = new THREE.Color(0x1b5e20);
            selectedItemRef.current = null;
        }

        isDraggingRef.current = false;
    };

    return (
        <div
            ref={containerRef}
            className="three-js-container"
            style={{ width: '100%', height: '400px', position: 'relative' }}
        />
    );
};

Large3DList.propTypes = {
    items: PropTypes.array.isRequired,
};

export default Large3DList;
