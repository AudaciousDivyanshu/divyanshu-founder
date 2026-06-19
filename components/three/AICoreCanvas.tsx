"use client";

import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import AICore from "./AICore";
import { Suspense } from "react";

export default function AICoreCanvas({ scrollProgress }: { scrollProgress: number }) {
  return (
    <div className="w-full h-full absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        className="pointer-events-auto"
      >
        <ambientLight intensity={0.2} />
        <Suspense fallback={null}>
          <AICore scrollProgress={scrollProgress} />
          <EffectComposer enableNormalPass={false}>
            <Bloom
              luminanceThreshold={0.1}
              mipmapBlur
              intensity={2.0}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
