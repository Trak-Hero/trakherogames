import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Vector3 } from "three";
import { useNavigate } from "react-router-dom";

function RoomModel() {
  const { scene } = useGLTF("/models/cozy-reading-room.glb");

  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child.material) child.material.needsUpdate = true;
    }
  });

  return <primitive object={scene} scale={0.1} position={[18, 8, -32]} />;
}

function Player({ setCanRead }) {
  const navigate = useNavigate();
  const playerRef = useRef();
  const keys = useRef({});
  const speed = 0.06;

  // IMPORTANT:
  // You will likely need to update this to the REAL book position in world space
  // now that the room is at [9, 0, -14].
  const bookPosition = useMemo(() => new Vector3(10, -0.6, -10.6), []);

  useEffect(() => {
    const down = (e) => {
      keys.current[e.key.toLowerCase()] = true;

      if (e.key.toLowerCase() === "e" && playerRef.current) {
        const distance = playerRef.current.position.distanceTo(bookPosition);
        if (distance < 1.9) {
          navigate("/story");
        }
      }
    };

    const up = (e) => {
      keys.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [navigate, bookPosition]);

  useFrame((state) => {
    if (!playerRef.current) return;

    const pos = playerRef.current.position;

    if (keys.current["w"]) pos.z -= speed;
    if (keys.current["s"]) pos.z += speed;
    if (keys.current["a"]) pos.x -= speed;
    if (keys.current["d"]) pos.x += speed;

    // You may want to expand these bounds later to match the room better
    pos.x = Math.max(6.5, Math.min(11.5, pos.x));
    pos.z = Math.max(-17.5, Math.min(-10.5, pos.z));

    const distance = pos.distanceTo(bookPosition);
    setCanRead(distance < 1.9);

    state.camera.position.lerp(
      new Vector3(pos.x, 1.4, pos.z + 2.0),
      0.08
    );
    state.camera.lookAt(pos.x, 1.15, pos.z - 1.5);
  });

  return <mesh ref={playerRef} position={[9, 0, -11.5]} visible={false} />;
}

function BookHotspot({ canRead }) {
  return (
    <group position={[9.9, 0.45, -13.6]}>
      <mesh visible={false}>
        <boxGeometry args={[0.4, 0.2, 0.4]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      {canRead && (
        <Html center distanceFactor={8}>
          <div className="interaction-prompt">
            <div className="interaction-key">Press E to read</div>
            <div className="interaction-title">Title: Trak&apos;s Story</div>
          </div>
        </Html>
      )}
    </group>
  );
}

export default function ReadingRoomScene() {
  const [canRead, setCanRead] = useState(false);

  return (
    <Canvas
      shadows
      camera={{ position: [9, 1.4, -11], fov: 65 }}
      gl={{ antialias: true }}
    >
      {/* darker warm background */}
      <color attach="background" args={["#140b08"]} />

      {/* subtle interior fog, much less aggressive */}
      <fog attach="fog" args={["#140b08", 8, 20]} />

      {/* remove this later if using the player camera */}
      {/* <OrbitControls /> */}

      {/* soft global fill */}
      <ambientLight intensity={0.45} color="#ffd9b0" />

      {/* gentle ceiling/bounce fill */}
      <hemisphereLight
        intensity={0.55}
        color="#ffe6c7"
        groundColor="#2b170f"
      />

      {/* warm lamp by right wall string lights / lamp area */}
      <pointLight
        position={[18, 8, -20]}
        intensity={2.4}
        distance={8}
        decay={2}
        color="#ffb56b"
        castShadow
      />

      {/* warm reading light near chair / side table */}
      <pointLight
        position={[10, 8, -20]}
        intensity={550.1}
        distance={20}
        decay={2}
        color="#ffd08a"
      />

      {/* subtle fill from window side */}
      <pointLight
       position={[15, 8, -20]}
        intensity={220.0}
        distance={7}
        decay={2}
        color="#ffc58a"
      />

      {/* top-down soft focus light to help reveal geometry */}
      <spotLight
        position={[18, 8, -25]}
        angle={0.65}
        penumbra={0.8}
        intensity={20}
        distance={10}
        color="#ffe2b8"
        castShadow
      />

      <Suspense fallback={null}>
        <RoomModel />
        <BookHotspot canRead={canRead} />
        <Player setCanRead={setCanRead} />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload("/models/cozy-reading-room.glb");