import { useEffect, useRef } from "react";

const IMAGE_SRC = "/images/ascii-portrait.png";

export default function AsciiPortrait({ className = "ascii-portrait-canvas" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationId;
    let destroyed = false;

    const pointer = {
      x: -1000,
      y: -1000,
    };

    let particles = [];
    let width = 0;
    let height = 0;

    const image = new Image();

    /*
      ASCII characters:
      space = white
      @/#/* = dark
    */
    const ASCII = " .:-=+*#%@";

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();

      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (image.complete && image.naturalWidth > 0) {
        createParticles();
      }
    }

    function createParticles() {
      if (!image.naturalWidth || !image.naturalHeight) return;

      /*
        Keep the ASCII density reasonable.

        More columns = more detailed portrait.
        70-90 works well for this size of hero frame.
      */
      const cols = width < 500 ? 58 : 70;

      /*
        Because ASCII characters are taller than they are wide,
        compensate vertically so the portrait does not look stretched.
      */
      const charWidth = width / cols;
      const fontSize = Math.max(7, charWidth * 1.05);
      const charHeight = fontSize * 1.05;

      const rows = Math.max(30, Math.floor(height / charHeight));

      /*
        Offscreen canvas.
        We render the SOURCE IMAGE directly into this grid.

        This is deliberately simple:
        no bounding-box detection,
        no secondary zoom,
        no complicated crop calculations.
      */
      const sampleCanvas = document.createElement("canvas");
      sampleCanvas.width = cols;
      sampleCanvas.height = rows;

      const sampleCtx = sampleCanvas.getContext("2d");

      if (!sampleCtx) return;

      /*
        COVER the complete hero frame.

        This means the image fills the available ASCII area
        instead of becoming a tiny portrait in the center.
      */
      const imageRatio = image.naturalWidth / image.naturalHeight;

      const canvasRatio = cols / rows;

      let sourceX = 0;
      let sourceY = 0;
      let sourceWidth = image.naturalWidth;
      let sourceHeight = image.naturalHeight;

      /*
        Keep the COMPLETE source image.

        Do not crop the portrait. The source image is already
        composed correctly, so we want the entire illustration
        represented in ASCII.
      */
      sourceX = 0;
      sourceY = 0;
      sourceWidth = image.naturalWidth;
      sourceHeight = image.naturalHeight;

      sampleCtx.drawImage(
        image,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        cols,
        rows,
      );

      const pixels = sampleCtx.getImageData(0, 0, cols, rows).data;

      const nextParticles = [];

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const index = (row * cols + col) * 4;

          const r = pixels[index];
          const g = pixels[index + 1];
          const b = pixels[index + 2];

          /*
            Convert image pixel to brightness.
          */
          const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

          /*
            Ignore the pure white background.

            This is important because the source image
            has a white background.
          */
          if (brightness > 0.94) {
            continue;
          }

          /*
            Dark pixels -> dense ASCII characters.
            Light pixels -> lighter characters.
          */
          const charIndex = Math.min(
            ASCII.length - 1,
            Math.floor((1 - brightness) * (ASCII.length - 1)),
          );

          const char = ASCII[charIndex];

          if (!char || char === " ") {
            continue;
          }

          const baseX = (col + 0.5) * (width / cols);

          const baseY = (row + 0.5) * (height / rows);

          const zoom = 1.15;

          const x = width / 2 + (baseX - width / 2) * zoom;

          const y = height / 2 + (baseY - height / 2) * zoom;

          nextParticles.push({
            x,
            y,

            originX: x,
            originY: y,

            vx: 0,
            vy: 0,

            char,
            brightness,
          });
        }
      }

      particles = nextParticles;

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace`;
    }

    function updatePointer(event) {
      const rect = canvas.getBoundingClientRect();

      pointer.x = event.clientX - rect.left;

      pointer.y = event.clientY - rect.top;
    }

    function resetPointer() {
      pointer.x = -1000;
      pointer.y = -1000;
    }

    function animate() {
      if (destroyed) return;

      ctx.clearRect(0, 0, width, height);

      /*
        Cursor interaction.
      */
      const interactionRadius = Math.min(110, Math.max(65, width * 0.25));

      for (const particle of particles) {
        const dx = particle.x - pointer.x;

        const dy = particle.y - pointer.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        /*
          Push characters away from cursor.
        */
        if (distance < interactionRadius && distance > 0.01) {
          const strength = (1 - distance / interactionRadius) * 8;

          particle.vx += (dx / distance) * strength;

          particle.vy += (dy / distance) * strength;
        }

        /*
          Spring back to original position.
        */
        particle.vx += (particle.originX - particle.x) * 0.08;

        particle.vy += (particle.originY - particle.y) * 0.08;

        /*
          Damping.
        */
        particle.vx *= 0.82;
        particle.vy *= 0.82;

        particle.x += particle.vx;
        particle.y += particle.vy;

        /*
          Draw.
        */
        const alpha = Math.max(
          0.5,
          Math.min(1, (1 - particle.brightness) * 1.6),
        );

        ctx.fillStyle = `rgba(15, 15, 15, ${alpha})`;

        ctx.fillText(particle.char, particle.x, particle.y);
      }

      animationId = requestAnimationFrame(animate);
    }

    /*
      IMPORTANT:
      Set the image source AFTER all functions exist.
    */
    image.onload = () => {
      if (destroyed) return;

      resizeCanvas();
      createParticles();
      animate();
    };

    image.onerror = () => {
      console.error("ASCII portrait failed to load:", IMAGE_SRC);
    };

    image.src = IMAGE_SRC;

    canvas.addEventListener("pointermove", updatePointer);

    canvas.addEventListener("pointerleave", resetPointer);

    window.addEventListener("resize", resizeCanvas);

    /*
      Initial sizing.
    */
    resizeCanvas();

    return () => {
      destroyed = true;

      cancelAnimationFrame(animationId);

      canvas.removeEventListener("pointermove", updatePointer);

      canvas.removeEventListener("pointerleave", resetPointer);

      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      role="img"
      aria-label="Interactive ASCII portrait"
    />
  );
}
