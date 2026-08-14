import { useEffect, useRef } from "react";
import * as THREE from "three";

export function RacingScene({ round }: { round: any }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);

    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / 400,
      0.1,
      1000
    );
    camera.position.set(0, 6, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, 400);
    containerRef.current.appendChild(renderer.domElement);

    // Road
    const road = new THREE.Mesh(
      new THREE.PlaneGeometry(6, 40),
      new THREE.MeshBasicMaterial({ color: 0x111111 })
    );
    road.rotation.x = -Math.PI / 2;
    scene.add(road);

    // UP car
    const upGeo = new THREE.BoxGeometry(0.8, 0.4, 1.6);
    const upMat = new THREE.MeshBasicMaterial({ color: 0x00ff88 });
    const upCar = new THREE.Mesh(upGeo, upMat);
    upCar.position.set(-1.2, 0.3, 0);
    scene.add(upCar);

    // DOWN car
    const downGeo = new THREE.BoxGeometry(0.8, 0.4, 1.6);
    const downMat = new THREE.MeshBasicMaterial({ color: 0xff3366 });
    const downCar = new THREE.Mesh(downGeo, downMat);
    downCar.position.set(1.2, 0.3, 0);
    scene.add(downCar);

    // Simple animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      upCar.position.z = Math.sin(t * 2) * 6;
      downCar.position.z = Math.cos(t * 2) * 6;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / 400;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, 400);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: 400 }} />;
}
