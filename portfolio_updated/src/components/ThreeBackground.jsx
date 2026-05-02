import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function StarField({ count = 5000 }) {
  const ref = useRef()
  const sphere = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 2 + 0.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta) * 100
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 100
      positions[i * 3 + 2] = r * Math.cos(phi) * 100
    }
    return positions
  }, [count])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.01
      ref.current.rotation.y = state.clock.elapsedTime * 0.008
    }
  })

  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8c52ff"
        size={0.12}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  )
}

function FloatingGeometry({ position, color, speed = 1 }) {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.3 * speed
      ref.current.rotation.y = state.clock.elapsedTime * 0.4 * speed
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3
    }
  })

  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[0.4, 0]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.25}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

function NebulaOrb({ position, color, radius = 2 }) {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[radius, 16, 16]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.04}
        emissive={color}
        emissiveIntensity={0.8}
      />
    </mesh>
  )
}

function MouseReactive({ mouseX, mouseY }) {
  const groupRef = useRef()
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (mouseX * 0.5 - groupRef.current.rotation.y) * 0.03
      groupRef.current.rotation.x += (mouseY * -0.3 - groupRef.current.rotation.x) * 0.03
    }
  })

  return (
    <group ref={groupRef}>
      <FloatingGeometry position={[-3, 1, -2]} color="#8c52ff" speed={0.8} />
      <FloatingGeometry position={[3, -1, -3]} color="#00d4ff" speed={1.2} />
      <FloatingGeometry position={[0, 2, -4]} color="#ff2d78" speed={0.6} />
      <FloatingGeometry position={[-2, -2, -2]} color="#00ff9f" speed={1.0} />
      <FloatingGeometry position={[4, 2, -5]} color="#8c52ff" speed={0.9} />
    </group>
  )
}

function Scene({ mouseX, mouseY }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#8c52ff" intensity={2} />
      <pointLight position={[-10, -10, -10]} color="#00d4ff" intensity={1} />
      <StarField count={4000} />
      <MouseReactive mouseX={mouseX} mouseY={mouseY} />
      <NebulaOrb position={[-5, 0, -10]} color="#8c52ff" radius={4} />
      <NebulaOrb position={[5, 2, -8]} color="#00d4ff" radius={3} />
    </>
  )
}

export default function ThreeBackground({ mouseX = 0, mouseY = 0 }) {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <Scene mouseX={mouseX} mouseY={mouseY} />
      </Canvas>
    </div>
  )
}
