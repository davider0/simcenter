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

    // Inicializar la escena Three.js
    useEffect(() => {
        // Crear escena
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff);
        sceneRef.current = scene;

        // Crear cámara
        const camera = new THREE.PerspectiveCamera(
            75, // FOV
            window.innerWidth / window.innerHeight, // Aspect ratio
            0.1, // Near
            1000 // Far
        );
        camera.position.z = 10;
        cameraRef.current = camera;

        // Crear renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Añadir controles de órbita
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.rotateSpeed = 1;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.minDistance = 5;
        controls.maxDistance = 20;
        controls.enableRotate = false;
        controlsRef.current = controls;

        // Añadir luz
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(0, 1, 5);
        scene.add(directionalLight);

        // Crear elementos en circunferencia


        // Función de animación
        const animate = () => {
            requestAnimationFrame(animate);

            // Actualizar controles
            controls.update();

            // Aplicar rotación automática si hay velocidad
            if (Math.abs(rotationSpeedRef.current) > 0.001) {
                // Aplicar fricción para desacelerar gradualmente
                rotationSpeedRef.current *= 0.98;

                // Rotar el grupo completo en lugar de elementos individuales
                const circleGroup = itemsRef.current.circleGroup;
                if (circleGroup) {
                    circleGroup.rotation.x += rotationSpeedRef.current;

                    // Asegurar que todos los textos mantengan su orientación frontal
                    itemsRef.current.forEach(item => {
                        if (item.rotation) {
                            item.rotation.x = 0; // Mantener siempre de frente
                        }
                    });
                }
            }

            // Animar hacia la rotación objetivo
            if (selectedItemRef.current === null && Math.abs(targetRotationRef.current) > 0.001) {
                const step = targetRotationRef.current * 0.05;

                // Rotar el grupo en lugar de la escena
                const circleGroup = itemsRef.current.circleGroup;
                if (circleGroup) {
                    circleGroup.rotation.x += step;

                    // Asegurar que todos los textos mantengan su orientación frontal
                    itemsRef.current.forEach(item => {
                        if (item.rotation) {
                            item.rotation.x = 0; // Mantener siempre de frente
                        }
                    });
                }

                targetRotationRef.current -= step;
            }

            renderer.render(scene, camera);
        };

        // Iniciar animación
        animate();

        // Event listeners para interacción
        window.addEventListener('resize', handleResize);
        renderer.domElement.addEventListener('mousedown', handleMouseDown);
        renderer.domElement.addEventListener('mousemove', handleMouseMove);
        renderer.domElement.addEventListener('mouseup', handleMouseUp);

        // Limpieza al desmontar
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

    // Actualizar cuando cambian los items
    useEffect(() => {
        if (sceneRef.current) {
            // Limpiar items anteriores
            itemsRef.current.forEach(item => {
                sceneRef.current.remove(item);
            });
            itemsRef.current = [];

            // Crear nuevos items
            createItemsInCircle();
        }
    }, [initialItems]);

    // Crear elementos en una circunferencia
    const createItemsInCircle = () => {
        if (!sceneRef.current) return;

        const scene = sceneRef.current;
        const radius = 5; // Radio de la circunferencia
        const itemCount = items.length;

        // Grupo principal que contendrá todos los elementos
        const circleGroup = new THREE.Group();
        scene.add(circleGroup);

        items.forEach((item, index) => {
            // Calcular posición en la circunferencia
            const angle = (index / itemCount) * Math.PI * 2;
            const y = radius * Math.sin(angle);
            const z = radius * Math.cos(angle);

            // Crear canvas para el texto (más grande para mejor calidad)
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 512;
            canvas.height = 256;

            // Configurar estilo de texto (más grande y nítido)
            context.font = 'Bold 72px Segoe UI';
            context.fillStyle = '#1b5e20';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(item, canvas.width / 2, canvas.height / 2);

            // Crear textura a partir del canvas
            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;

            // Crear material con transparencia
            const textMaterial = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                side: THREE.DoubleSide
            });

            // Crear solo un plano para el texto (sin geometría de caja)
            const textGeometry = new THREE.PlaneGeometry(2, 1);
            const mesh = new THREE.Mesh(textGeometry, textMaterial);

            // Posicionar en la circunferencia
            mesh.position.set(0, y, z);

            // Rotar para que mire siempre hacia la cámara (de frente)
            mesh.lookAt(0, 0, 10);

            // Asegurar que el texto siempre esté de frente a la cámara
            // Anular cualquier rotación en X para que no mire hacia arriba o abajo
            mesh.rotation.x = 0;

            // Guardar datos adicionales en el mesh
            mesh.userData = {
                index,
                value: item,
                originalPosition: { x: 0, y, z },
                originalRotation: mesh.rotation.clone(),
                isHovered: false,
            };

            // Añadir al grupo
            circleGroup.add(mesh);

            // Guardar referencia
            itemsRef.current.push(mesh);
        });

        // Guardar el grupo principal
        itemsRef.current.circleGroup = circleGroup;
    };

    // Manejar redimensionamiento de ventana
    const handleResize = () => {
        if (!cameraRef.current || !rendererRef.current || !containerRef.current) return;

        const camera = cameraRef.current;
        const renderer = rendererRef.current;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Manejar inicio de arrastre
    const handleMouseDown = (event) => {
        if (!containerRef.current || !cameraRef.current || !sceneRef.current) return;

        // Calcular posición del mouse normalizada
        const rect = containerRef.current.getBoundingClientRect();
        mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // Lanzar rayo desde la cámara
        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);

        // Comprobar intersecciones con los elementos
        const intersects = raycasterRef.current.intersectObjects(itemsRef.current);

        if (intersects.length > 0) {
            // Deshabilitar controles de órbita temporalmente
            if (controlsRef.current) {
                controlsRef.current.enabled = false;
            }

            // Marcar como arrastrando
            isDraggingRef.current = true;

            // Guardar el elemento seleccionado
            selectedItemRef.current = intersects[0].object;

            // Resaltar el elemento seleccionado
            const material = selectedItemRef.current.material;
            material.color = new THREE.Color(0x4caf50);

            // Detener cualquier rotación automática
            rotationSpeedRef.current = 0;
            targetRotationRef.current = 0;

            // Prevenir comportamiento por defecto
            event.preventDefault();
        } else {
            // Si no se seleccionó ningún elemento, iniciar rotación de la escena
            isDraggingRef.current = true;
            selectedItemRef.current = null;
            mouseRef.current.startX = event.clientX;
        }
    };

    // Manejar movimiento durante arrastre
    const handleMouseMove = (event) => {
        if (!isDraggingRef.current || !containerRef.current) return;

        if (selectedItemRef.current) {
            // Mover el elemento seleccionado en la circunferencia
            const rect = containerRef.current.getBoundingClientRect();

            mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            // Calcular nueva posición en la circunferencia basada en el movimiento del mouse
            const circleGroup = itemsRef.current.circleGroup;
            if (circleGroup) {
                // Calcular el ángulo de rotación basado en el movimiento vertical
                const deltaY = event.movementY * 0.001;
                circleGroup.rotation.x += deltaY;

                // Asegurar que todos los textos mantengan su orientación frontal
                itemsRef.current.forEach(item => {
                    if (item.rotation) {
                        item.rotation.x = 0; // Mantener siempre de frente
                    }
                });

                // Actualizar velocidad de rotación
                rotationSpeedRef.current = deltaY;
            }
        } else {
            // Si no se seleccionó ningún elemento, rotar la escena
            const deltaY = event.movementY * 0.01;
            sceneRef.current.rotation.x += deltaY;
        }
    };

    // Manejar fin de arrastre
    const handleMouseUp = () => {
        // Restaurar controles de órbita
        if (controlsRef.current) {
            controlsRef.current.enabled = true;
        }

        // Si había un elemento seleccionado, quitar resaltado
        if (selectedItemRef.current) {
            const material = selectedItemRef.current.material;
            material.color = new THREE.Color(0x1b5e20);
            selectedItemRef.current = null;
        }

        // Marcar como no arrastrando
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