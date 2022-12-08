import { useEffect, useLayoutEffect, useRef } from 'react';
import assert from './assert';
import classNames from './Confetti.module.scss';
import Particle from './Particle';
import useBingoEffect from './useBingoEffect';

function Confetti() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);

  useBingoEffect(() => {
    for (let i = 0; i < 500; i++) {
      if (particles.current.length > 1000) {
        particles.current.shift();
      }

      particles.current.push(new Particle());
    }
  });

  useEffect(() => {
    let previouslyElapsed: number;
    let animFrameId: number;

    function render(elapsed: number) {
      const { current } = canvas;
      assert(current, 'canvas');
      const ctx = current.getContext('2d');
      assert(ctx, 'ctx');
      const delta = previouslyElapsed
        ? (elapsed - previouslyElapsed) / 1000
        : 0;

      ctx.clearRect(0, 0, current.width, current.height);

      for (let i = 0; i < particles.current.length; i++) {
        const particle = particles.current[i];
        if (particle.tick(delta)) {
          particles.current = particles.current.filter((_, j) => j !== i);
        }

        particle.render(ctx);
      }
      previouslyElapsed = elapsed;
      animFrameId = window.requestAnimationFrame(render);
    }

    animFrameId = window.requestAnimationFrame(render);

    return () => {
      canvas.current
        ?.getContext('2d')
        ?.clearRect(0, 0, canvas.current.width, canvas.current.height);
      window.cancelAnimationFrame(animFrameId);
    };
  }, []);

  useLayoutEffect(() => {
    if (!canvas || !canvas.current) {
      return;
    }

    function updateCanvasSize() {
      canvas.current!.width = window.innerWidth;
      canvas.current!.height = window.innerHeight;
    }

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [canvas]);

  return <canvas className={classNames.canvas} ref={canvas}></canvas>;
}

export default Confetti;
