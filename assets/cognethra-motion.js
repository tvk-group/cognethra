(() => {
  const canvas = document.querySelector("[data-hero-network]");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let nodes = [];
  let animationId = null;
  let width = 0;
  let height = 0;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const resize = () => {
    const parent = canvas.parentElement;
    if (!parent) return;
    width = parent.clientWidth || parent.offsetWidth;
    height = parent.clientHeight || parent.offsetHeight;
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    initNodes();
  };

  const initNodes = () => {
    const count = Math.min(28, Math.floor((width * height) / 18000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1.5 + Math.random() * 2
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    const maxDist = 140;

    nodes.forEach((node) => {
      if (!prefersReduced) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.35;
          ctx.strokeStyle = `rgba(124, 58, 237, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    nodes.forEach((node) => {
      ctx.fillStyle = "rgba(6, 182, 212, 0.75)";
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
      ctx.fill();
    });

    if (!prefersReduced) animationId = requestAnimationFrame(draw);
  };

  resize();
  draw();
  window.addEventListener("resize", resize);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (animationId) cancelAnimationFrame(animationId);
    } else if (!prefersReduced) {
      draw();
    }
  });
})();
