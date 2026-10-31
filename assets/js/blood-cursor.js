(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || matchMedia('(pointer: coarse)').matches) return;

  const canvas = document.createElement('canvas');
  canvas.className = 'blood-cursor';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.append(canvas);
  document.body.classList.add('blood-cursor-enabled');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.remove();
    document.body.classList.remove('blood-cursor-enabled');
    return;
  }

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0;
  let height = 0;
  let mouseX = -9999;
  let mouseY = -9999;
  let drawX = mouseX;
  let drawY = mouseY;
  let active = false;
  let clicked = 0;
  let overLink = false;
  const trail = [];
  let lastScrollAt = 0;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('pointermove', event => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    if (!active) {
      drawX = mouseX;
      drawY = mouseY;
      active = true;
    }
    overLink = Boolean(event.target.closest('a, button, [role="button"]'));
  }, { passive: true });
  document.addEventListener('pointerdown', () => { clicked = 1; }, { passive: true });
  window.addEventListener('scroll', () => {
    trail.length = 0;
    lastScrollAt = performance.now() + 140;
  }, { passive: true });

  function draw(now) {
    ctx.clearRect(0, 0, width, height);
    if (!active) {
      requestAnimationFrame(draw);
      return;
    }

    drawX += (mouseX - drawX) * 0.35;
    drawY += (mouseY - drawY) * 0.35;
    clicked *= 0.88;

    if (now > lastScrollAt) {
      trail.push({ x: drawX, y: drawY, t: now });
      if (trail.length > 40) trail.shift();
    }

    ctx.filter = 'blur(6px)';
    for (let i = 0; i < trail.length; i++) {
      const point = trail[i];
      const alpha = i / trail.length;
      const age = (now - point.t) / 1000;
      if (age > 1.2) continue;
      const radius = Math.max(3, (1 - Math.abs(alpha - 0.4) * 1.5) * 12 * (1 + clicked * 0.6));
      const brightness = 0.4 + alpha * 0.6;
      ctx.fillStyle = `rgba(${Math.round(160 * brightness)},${Math.round(10 * brightness)},${Math.round(5 * brightness)},${(0.3 + alpha * 0.4) * (1 - age / 1.2)})`;
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.filter = 'none';

    const phase = (now % 1200) / 1200;
    const pulse = Math.exp(-(phase ** 2) / 0.004) + 0.5 * Math.exp(-((phase - 0.17) ** 2) / 0.006);
    const scale = 1 + pulse * 0.3 + clicked * 0.7 + (overLink ? 0.35 : 0);
    ctx.fillStyle = 'rgba(140,10,5,0.5)';
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 10 * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(200,20,10,0.85)';
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 5 * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,80,40,0.9)';
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 2 * scale, 0, Math.PI * 2);
    ctx.fill();

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
})();
