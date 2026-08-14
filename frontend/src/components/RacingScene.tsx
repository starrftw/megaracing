import { useEffect, useRef, useMemo } from "react";
import * as THREE from "three";

export function RacingScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  const upColor = useMemo(() => 0x00ff88, []);
  const downColor = useMemo(() => 0xff3366, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);

    const camera = new THREE.PerspectiveCamera(50, containerRef.current.clientWidth / 420, 0.1, 200);
    camera.position.set(0, 5.5, 11);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(containerRef.current.clientWidth, 420);
    containerRef.current.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.15));
    const dir = new THREE.DirectionalLight(0xffffff, 0.6);
    dir.position.set(5, 10, 5);
    scene.add(dir);

    const road = new THREE.Mesh(
      new THREE.PlaneGeometry(7, 60),
      new THREE.MeshStandardMaterial({ color: 0x0d0d0d, roughness: 0.9, metalness: 0.1 })
    );
    road.rotation.x = -Math.PI / 2;
    road.position.y = -0.01;
    scene.add(road);

    for (let i = -1; i <= 1; i += 2) {
      const line = new THREE.Mesh(
        new THREE.PlaneGeometry(0.08, 60),
        new THREE.MeshBasicMaterial({ color: 0x222222 })
      );
      line.rotation.x = -Math.PI / 2;
      line.position.set(i * 0.8, 0.0, 0);
      scene.add(line);
    }

    const makeStrip = (x: number, color: number) => {
      const geo = new THREE.BoxGeometry(0.06, 0.05, 60);
      const mat = new THREE.MeshBasicMaterial({ color });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, 0.03, 0);
      scene.add(mesh);
    };
    makeStrip(-3.2, upColor);
    makeStrip(3.2, downColor);

    const makeMarker = (z: number) => {
      const g = new THREE.BoxGeometry(7, 0.05, 0.15);
      const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: 0x333333 }));
      m.position.set(0, 0.0, z);
      scene.add(m);
    };
    makeMarker(-14);
    makeMarker(14);

    const buildCar = (color: number, x: number) => {
      const group = new THREE.Group();
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.9, 0.35, 2),
        new THREE.MeshStandardMaterial({ color, roughness: 0.3, metalness: 0.6 })
      );
      body.position.y = 0.35;
      group.add(body);

      const cabin = new THREE.Mesh(
        new THREE.BoxGeometry(0.65, 0.25, 1.0),
        new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.2, metalness: 0.9 })
      );
      cabin.position.set(0, 0.75, -0.1);
      group.add(cabin);

      const glow = new THREE.PointLight(color, 40, 3.5);
      glow.position.set(0, 0.4, 0);
      group.add(glow);

      group.position.set(x, 0, 10);
      scene.add(group);
      return group;
    };

    const upCar = buildCar(upColor, -1.2);
    const downCar = buildCar(downColor, 1.2);

    const makeTrail = (color: number) => {
      const group = new THREE.Group();
      for (let i = 0; i < 14; i++) {
        const chip = new THREE.Mesh(
          new THREE.BoxGeometry(0.06, 0.02, 0.06 + Math.random() * 0.12),
          new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.35 })
        );
        chip.position.set((Math.random() - 0.5) * 0.6, 0.05, (Math.random() - 0.5) * 2.5);
        group.add(chip);
      }
      return group;
    };
    const upTrail = makeTrail(upColor);
    const downTrail = makeTrail(downColor);
    scene.add(upTrail);
    scene.add(downTrail);

    const clock = new THREE.Clock();
    let raf: number;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const baseZ = 10;
      const amplitude = 5.5;
      const speed = 0.9;

      upCar.position.z = baseZ + Math.sin(t * speed) * amplitude;
      downCar.position.z = baseZ + Math.cos(t * speed * 1.1) * amplitude;
      upCar.rotation.z = Math.cos(t * speed) * 0.08;
      downCar.rotation.z = -Math.cos(t * speed * 1.1) * 0.08;

      upTrail.position.z = upCar.position.z;
      downTrail.position.z = downCar.position.z;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const { clientWidth } = containerRef.current;
      camera.aspect = clientWidth / 420;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, 420);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [upColor, downColor]);

  return <div ref={containerRef} style={{ width: "100%", height: 420 }} />;
}
