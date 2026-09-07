"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function MedallionMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const coinRef = useRef<THREE.Group>(null);

  // Decorative rivets around the perimeter
  const rivets = useMemo(() => {
    const points: [number, number, number][] = [];
    const count = 24;
    const radius = 2.15;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      points.push([Math.cos(angle) * radius, Math.sin(angle) * radius, 0.19]);
    }
    return points;
  }, []);

  useFrame((state, delta) => {
    if (coinRef.current) {
      // Auto-rotation
      coinRef.current.rotation.y += delta * 0.7;

      // Mouse interactive tilt
      const targetX = state.pointer.y * 0.35;
      const targetZ = -state.pointer.x * 0.2;
      coinRef.current.rotation.x = THREE.MathUtils.lerp(
        coinRef.current.rotation.x,
        targetX,
        0.08
      );
      coinRef.current.rotation.z = THREE.MathUtils.lerp(
        coinRef.current.rotation.z,
        targetZ,
        0.08
      );
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={groupRef}>
        <group ref={coinRef}>
          {/* Main Coin Cylinder */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[2.5, 2.5, 0.36, 64]} />
            <meshStandardMaterial
              color="#D4AF37"
              metalness={0.88}
              roughness={0.22}
            />
          </mesh>

          {/* Outer Raised Border Ring Front */}
          <mesh position={[0, 0, 0.18]}>
            <torusGeometry args={[2.42, 0.09, 16, 64]} />
            <meshStandardMaterial
              color="#F0D78C"
              metalness={0.92}
              roughness={0.15}
            />
          </mesh>

          {/* Outer Raised Border Ring Back */}
          <mesh position={[0, 0, -0.18]}>
            <torusGeometry args={[2.42, 0.09, 16, 64]} />
            <meshStandardMaterial
              color="#F0D78C"
              metalness={0.92}
              roughness={0.15}
            />
          </mesh>

          {/* Inner Groove Ring Front */}
          <mesh position={[0, 0, 0.185]}>
            <torusGeometry args={[1.95, 0.04, 16, 64]} />
            <meshStandardMaterial
              color="#AA822A"
              metalness={0.9}
              roughness={0.25}
            />
          </mesh>

          {/* Center Finlogue Emblem Shield / Monogram (Front) */}
          <group position={[0, 0, 0.2]}>
            {/* Center Diamond / Crest */}
            <mesh rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[1.05, 1.05, 0.08]} />
              <meshStandardMaterial
                color="#FFFFFF"
                metalness={0.7}
                roughness={0.2}
              />
            </mesh>

            <mesh rotation={[0, 0, Math.PI / 4]} position={[0, 0, 0.04]}>
              <boxGeometry args={[0.75, 0.75, 0.08]} />
              <meshStandardMaterial
                color="#0A1329"
                metalness={0.3}
                roughness={0.4}
              />
            </mesh>

            {/* F Center Symbol */}
            <mesh position={[0, 0, 0.08]}>
              <boxGeometry args={[0.22, 0.45, 0.05]} />
              <meshStandardMaterial
                color="#E5C158"
                metalness={0.95}
                roughness={0.1}
              />
            </mesh>
          </group>

          {/* Center Emblem Back */}
          <group position={[0, 0, -0.2]} rotation={[0, Math.PI, 0]}>
            <mesh rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[1.05, 1.05, 0.08]} />
              <meshStandardMaterial
                color="#FFFFFF"
                metalness={0.7}
                roughness={0.2}
              />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 4]} position={[0, 0, 0.04]}>
              <boxGeometry args={[0.75, 0.75, 0.08]} />
              <meshStandardMaterial
                color="#0A1329"
                metalness={0.3}
                roughness={0.4}
              />
            </mesh>
            <mesh position={[0, 0, 0.08]}>
              <boxGeometry args={[0.22, 0.45, 0.05]} />
              <meshStandardMaterial
                color="#E5C158"
                metalness={0.95}
                roughness={0.1}
              />
            </mesh>
          </group>

          {/* Perimeter Rivets (Front) */}
          {rivets.map(([x, y, z], idx) => (
            <mesh key={`rf-${idx}`} position={[x, y, z]}>
              <sphereGeometry args={[0.045, 12, 12]} />
              <meshStandardMaterial
                color="#FFF0BA"
                metalness={0.95}
                roughness={0.1}
              />
            </mesh>
          ))}

          {/* Perimeter Rivets (Back) */}
          {rivets.map(([x, y, z], idx) => (
            <mesh key={`rb-${idx}`} position={[x, y, -z]}>
              <sphereGeometry args={[0.045, 12, 12]} />
              <meshStandardMaterial
                color="#FFF0BA"
                metalness={0.95}
                roughness={0.1}
              />
            </mesh>
          ))}
        </group>
      </group>
    </Float>
  );
}

export default function Finlogue3DMedallion() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          height: "420px",
          borderRadius: "50%",
          border: "2px dashed rgba(197, 168, 128, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--gold-oxford)",
          margin: "0 auto",
        }}
      >
        <span className="font-metadata-mono" style={{ fontSize: "11px" }}>
          INITIALIZING 3D MEDALLION...
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "420px",
        height: "420px",
        position: "relative",
        margin: "0 auto",
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          inset: "10%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(197, 168, 128, 0.25) 0%, rgba(7, 13, 30, 0) 70%)",
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />

      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%", cursor: "grab" }}
      >
        {/* Studio Lighting */}
        <ambientLight intensity={1.3} />
        <directionalLight position={[5, 8, 6]} intensity={2.8} color="#FFF5D6" />
        <directionalLight position={[-5, -4, -4]} intensity={1.2} color="#90B8F8" />
        <pointLight position={[0, 4, 3]} intensity={1.8} color="#FFDF85" />
        <pointLight position={[3, -2, 2]} intensity={1.0} color="#FFFFFF" />

        <MedallionMesh />
      </Canvas>

      {/* Subtle Bottom Badge Label */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        <span
          className="font-metadata-mono"
          style={{
            fontSize: "10px",
            color: "var(--gold-oxford)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            backgroundColor: "rgba(7, 13, 30, 0.8)",
            padding: "4px 12px",
            borderRadius: "100px",
            border: "1px solid rgba(197, 168, 128, 0.3)",
          }}
        >
          INTERACTIVE 3D · FINLOGUE SEAL
        </span>
      </div>
    </div>
  );
}
