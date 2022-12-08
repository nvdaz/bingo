import { useLayoutEffect, useRef } from 'react';
import assert from './assert';
import classNames from './Confetti.module.scss';
import Particle from './Particle';
import useBingoEffect from './useBingoEffect';

function Confetti() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useBingoEffect(() => {
    const { current } = canvas;
    assert(current, 'canvas');
    const ctx = current.getContext('2d');
    assert(ctx, 'ctx');

    let particles = [...Array(500)].map(() => new Particle());
    let previouslyElapsed: number;
    let animFrameId: number;

    function render(elapsed: number) {
      assert(current, 'canvas');
      assert(ctx, 'ctx');
      const delta = previouslyElapsed
        ? (elapsed - previouslyElapsed) / 1000
        : 0;

      ctx.clearRect(0, 0, current.width, current.height);

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        if (particle.tick(delta)) {
          particles = particles.filter((_, j) => j !== i);
        }

        particle.render(ctx);
      }

      previouslyElapsed = elapsed;
      animFrameId = window.requestAnimationFrame(render);
    }

    animFrameId = window.requestAnimationFrame(render);

    return () => {
      assert(current, 'canvas');
      assert(ctx, 'ctx');
      ctx.clearRect(0, 0, current.width, current.height);
      if (animFrameId) {
        window.cancelAnimationFrame(animFrameId);
      }
    };
  });

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
