import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function RainbowShader({ className, style }) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const meshRef = useRef(null);
  const animationRef = useRef(null);
  const startTimeRef = useRef(performance.now());

  useEffect(() => {
    const container = containerRef.current;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    cameraRef.current = camera;

    const geometry = new THREE.PlaneGeometry(2, 2);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(1, 1) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `uniform lowp float estiramientoX;
uniform lowp float estiramientoZ;
uniform lowp float estiramientoY;
uniform lowp float estiramientoW;
uniform lowp float fSaturacion;
uniform lowp float fTamanyo;
uniform lowp float fGrosor;
uniform lowp float fLongitudDegradado;
uniform lowp float fCorteSeccion;
uniform lowp float fIntensidadTensor;
uniform lowp float fConcavidadTensor;
uniform lowp float fElevacionZEfectoDeformacion;
const lowp float fSuavidadEfectoDegradado = 7.0;
uniform lowp float fBrilloEfectoDegradado;
uniform lowp float fFondo;
uniform lowp float fSuavidadLineasEfectoDegradado;
uniform lowp float fColorR1;
uniform lowp float fColorG1;
uniform lowp float fColorB1;
uniform lowp float iColorR2;
uniform lowp float iColorG2;
uniform lowp float iColorB2;
uniform lowp float fPosicion;

// Assuming these are defined elsewhere in the shader
uniform lowp sampler2D samplerFront;
uniform mediump vec2 srcStart;
uniform mediump vec2 srcEnd;
uniform mediump vec2 srcOriginStart;
uniform mediump vec2 srcOriginEnd;
uniform mediump vec2 layoutStart;
uniform mediump vec2 layoutEnd;
uniform lowp sampler2D samplerBack;
uniform mediump vec2 destStart;
uniform mediump vec2 destEnd;
uniform mediump float seconds;
uniform mediump vec2 pixelSize;
uniform mediump float layerScale;
uniform mediump float layerAngle;

// Assuming this is a placeholder for a complex function M
#define m *= mat2(cos(vec4(estiramientoX,estiramientoY,estiramientoZ,estiramientoW) + t*
#define M \
    (s.xz m.4)), s.xy m.3)), \
    length(s + sin(t*fGrosor))*log(length(s)+fTamanyo)+ \
    sin(sin(sin(s=s+s+t).y+s).z+s).x*fIntensidadTensor-fConcavidadTensor)

void main(void) {
    lowp vec3 p, s, O = vec3(0.0), R = vec3(1.0,1920.0,1080.0);
    lowp vec2 u = vec2(gl_FragCoord.xy / R.y);
    lowp float t = seconds, d = fElevacionZEfectoDeformacion, r;
    
    // Initialize color accumulator
    highp vec3 colorAccumulator = vec3(0.0);
    
    for (lowp float i = 0.0; i < fSuavidadEfectoDegradado; i++) {
        t = seconds + i; // Update time within the loop
        s = p = vec3((u - fPosicion * R.xy) / R.y * d, fCorteSeccion - d);
        d += min(r = M, fSuavidadLineasEfectoDegradado); // Assuming M is defined elsewhere
        s = p + fSaturacion;
        highp vec3 color = max(O + fBrilloEfectoDegradado - r * fLongitudDegradado, O + fFondo) * (vec3(fColorR1, fColorG1, fColorB1) - vec3(iColorR2, iColorG2, iColorB2) * (M - r) / 4.0);
        colorAccumulator += color; // Accumulate color
    }
    
    // Average the color after the loop
    colorAccumulator /= fSuavidadEfectoDegradado;
    
    // Set the final color
    gl_FragColor = vec4(colorAccumulator, 1.0); // Set alpha to 1.0 for full opacity
}`,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      material.uniforms.u_resolution.value.set(w, h);
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      const now = performance.now();
      material.uniforms.u_time.value = (now - startTimeRef.current) / 1000.0;
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
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
RainbowShader.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};
export default RainbowShader;
