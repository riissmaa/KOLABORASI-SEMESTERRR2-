/* =====================================================
   RISMA PORTFOLIO — script.js
   Dibuat ulang dari nol
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ════════════════════════
     WELCOME SCREEN
  ════════════════════════ */
  const ws    = document.getElementById('welcome-screen');
  const wBar  = document.getElementById('wBar');
  const wPct  = document.getElementById('wPct');
  const wPart = document.getElementById('wParticles');

  document.body.classList.add('lock');

  // Partikel
  const pColors = ['#e07850','#d46090','#c9a96e','#ff7070'];
  for (let i = 0; i < 40; i++) {
    const d = document.createElement('div');
    d.className = 'wdot';
    const sz = Math.random() * 3 + 2;
    d.style.cssText = `
      left:${Math.random()*100}%;bottom:-6px;
      width:${sz}px;height:${sz}px;
      background:${pColors[Math.floor(Math.random()*4)]};
      animation-delay:${Math.random()*3}s;
      animation-duration:${Math.random()*4+3}s;
    `;
    wPart.appendChild(d);
  }

  // Progress
  let p = 0;
  const wt = setInterval(() => {
    p += Math.random() * 2.8 + 0.8;
    if (p >= 100) { p = 100; clearInterval(wt); setTimeout(closeWelcome, 300); }
    wBar.style.width = p + '%';
    wPct.textContent = Math.floor(p) + '%';
  }, 35);

  function closeWelcome() {
    ws.classList.add('gone');
    document.body.classList.remove('lock');
    setTimeout(() => {
      ws.remove();
      initPage();
    }, 850);
  }


  /* ════════════════════════
     CURSOR
  ════════════════════════ */
  const cur  = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx=0, my=0, rx=0, ry=0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
  });

  (function trackRing() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(trackRing);
  })();

  document.querySelectorAll('a,button,.sk-card,.proj-card,.stat,.ai-row,.cinfo-box').forEach(el => {
    el.addEventListener('mouseenter', () => { cur.classList.add('big'); ring.classList.add('big'); });
    el.addEventListener('mouseleave', () => { cur.classList.remove('big'); ring.classList.remove('big'); });
  });


  /* ════════════════════════
     NAVBAR
  ════════════════════════ */
  const navbar = document.getElementById('navbar');
  const ham    = document.getElementById('hamburger');
  const menu   = document.getElementById('navMenu');

  window.addEventListener('scroll', onScroll, { passive: true });

  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    menu.classList.toggle('open');
  });

  document.querySelectorAll('.nlink').forEach(l => {
    l.addEventListener('click', () => {
      ham.classList.remove('open');
      menu.classList.remove('open');
    });
  });

  function setActiveNav() {
    const y = window.scrollY + 90;
    document.querySelectorAll('section[id]').forEach(sec => {
      const id = sec.getAttribute('id');
      const el = document.querySelector(`.nlink[href="#${id}"]`);
      if (el) el.classList.toggle('active', y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight);
    });
  }

  function onScroll() {
    navbar.classList.toggle('solid', window.scrollY > 40);
    setActiveNav();
    reveal();
    animBars();
    animCounters();
    document.getElementById('btt').classList.toggle('show', window.scrollY > 400);
  }


  /* ════════════════════════
     SMOOTH SCROLL
  ════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); window.scrollTo({ top: t.offsetTop - 64, behavior: 'smooth' }); }
    });
  });


  /* ════════════════════════
     TYPED TEXT
  ════════════════════════ */
  const typEl   = document.getElementById('typed');
  const phrases = ['Creative Developer','Frontend Designer','Web Enthusiast','SMKN 1 Tengaran'];
  let pi=0, ci=0, del=false;

  function typeLoop() {
    const phrase = phrases[pi];
    if (!del) {
      typEl.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { del = true; setTimeout(typeLoop, 1600); return; }
      setTimeout(typeLoop, 70);
    } else {
      typEl.textContent = phrase.slice(0, --ci);
      if (ci === 0) { del = false; pi = (pi+1) % phrases.length; }
      setTimeout(typeLoop, 36);
    }
  }


  /* ════════════════════════
     REVEAL
  ════════════════════════ */
  function reveal() {
    document.querySelectorAll('.reveal:not(.show)').forEach((el, i) => {
      if (el.getBoundingClientRect().top < window.innerHeight - 70) {
        el.style.transitionDelay = (i % 3) * 0.1 + 's';
        el.classList.add('show');
      }
    });
  }


  /* ════════════════════════
     SKILL BARS
  ════════════════════════ */
  function animBars() {
    document.querySelectorAll('.sk-bar:not(.done)').forEach(bar => {
      if (bar.getBoundingClientRect().top < window.innerHeight - 30) {
        bar.classList.add('done');
        const fill = bar.querySelector('.sk-fill');
        const w    = bar.getAttribute('data-w');
        setTimeout(() => { fill.style.width = w + '%'; }, 100);
      }
    });
  }


  /* ════════════════════════
     COUNTER
  ════════════════════════ */
  function animCounters() {
    document.querySelectorAll('.sn:not(.counted)').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('counted');
        const raw = el.textContent;
        const tgt = parseInt(raw);
        const sfx = raw.replace(/[0-9]/g,'');
        let   n   = 0;
        const step = Math.ceil(tgt/28);
        const t = setInterval(() => {
          n = Math.min(n+step, tgt);
          el.textContent = n + sfx;
          if (n >= tgt) clearInterval(t);
        }, 36);
      }
    });
  }


  /* ════════════════════════
     BG CANVAS PARTICLES
  ════════════════════════ */
  function startCanvas() {
    const c = document.createElement('canvas');
    c.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.28;';
    document.body.prepend(c);
    const ctx = c.getContext('2d');
    let W, H, pts=[];

    function resize() { W=c.width=innerWidth; H=c.height=innerHeight; }
    window.addEventListener('resize', resize); resize();

    const clrs = ['#e07850','#d46090','#c9a96e'];
    for (let i=0;i<50;i++) pts.push({
      x:Math.random()*W, y:Math.random()*H,
      r:Math.random()*1.3+0.3,
      vx:(Math.random()-.5)*.25, vy:(Math.random()-.5)*.25,
      c:clrs[Math.floor(Math.random()*3)], a:Math.random()*.45+.15,
    });

    (function draw() {
      ctx.clearRect(0,0,W,H);
      pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=W; if(p.x>W)p.x=0;
        if(p.y<0)p.y=H; if(p.y>H)p.y=0;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=p.c; ctx.globalAlpha=p.a; ctx.fill();
      });
      ctx.strokeStyle='#e07850'; ctx.lineWidth=0.35;
      for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.sqrt(dx*dx+dy*dy);
        if(d<100){ ctx.globalAlpha=0.04*(1-d/100); ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y); ctx.stroke(); }
      }
      ctx.globalAlpha=1;
      requestAnimationFrame(draw);
    })();
  }


  /* ════════════════════════
     PROJECT CARD TILT
  ════════════════════════ */
  document.querySelectorAll('.proj-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX-r.left)/r.width - 0.5;
      const y = (e.clientY-r.top)/r.height - 0.5;
      card.style.transform = `translateY(-8px) rotateY(${x*6}deg) rotateX(${-y*6}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform=''; });
  });


  /* ════════════════════════
     CONTACT FORM
  ════════════════════════ */
  const form  = document.getElementById('contactForm');
  const toast = document.getElementById('toast');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.btn-send');
    btn.textContent = 'Mengirim...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      form.reset();
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    }, 1400);
  });


  /* ════════════════════════
     BACK TO TOP
  ════════════════════════ */
  document.getElementById('btt').addEventListener('click', () => {
    window.scrollTo({ top:0, behavior:'smooth' });
  });


  /* ════════════════════════
     INIT PAGE (after welcome)
  ════════════════════════ */
  function initPage() {
    typeLoop();
    reveal();
    animBars();
    animCounters();
    startCanvas();
    setActiveNav();
  }

}); // end DOMContentLoaded