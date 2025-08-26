function supportsReducedMotion(){
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Tilt 3D nhẹ cho các phần tử có .hover-tilt
function attachTilt() {
  if (supportsReducedMotion()) return;
  const els = document.querySelectorAll('.hover-tilt');
  els.forEach(el => {
    const max = 6; // độ nghiêng tối đa
    let raf = null;
    function onMove(e){
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left)/rect.width - 0.5;
      const y = (e.clientY - rect.top)/rect.height - 0.5;
      const rx = (+y * max);
      const ry = (-x * max);
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
      });
    }
    function reset(){ el.style.transform = ''; }
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', reset);
  });
}

// “Nam châm” cho nút CTA
function attachMagnet() {
  if (supportsReducedMotion()) return;
  document.querySelectorAll('.btn').forEach(btn => {
    let raf = null;
    btn.addEventListener('pointermove', e => {
      const r = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width/2);
      const dy = e.clientY - (r.top + r.height/2);
      const dist = Math.hypot(dx, dy);
      const k = Math.max(0, 1 - dist/180);
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        btn.style.transform = `translate(${dx*0.06*k}px, ${dy*0.06*k}px)`;
      });
    });
    btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // View Transition cho những thay đổi nhỏ (nếu cần mở rộng về sau)
  if (document.startViewTransition) {
    document.querySelector('.vt-logo')?.setAttribute('style', 'view-transition-name: vt-logo;');
    document.querySelector('.vt-hero')?.setAttribute('style', 'view-transition-name: vt-hero;');
  }

  attachTilt();
  attachMagnet();
});
