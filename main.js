// ============================================================
// Yasaman Abdollahi — Portfolio interactivity
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

    // ---- Mobile hamburger menu ----
    (function () {
        const burger = document.querySelector('.nav-burger');
        const menu = document.getElementById('mobile-menu');
        if (!burger || !menu) return;
        function setOpen(open) {
            burger.classList.toggle('open', open);
            menu.classList.toggle('open', open);
            burger.setAttribute('aria-expanded', open ? 'true' : 'false');
            menu.setAttribute('aria-hidden', open ? 'false' : 'true');
            document.body.style.overflow = open ? 'hidden' : '';
        }
        burger.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
        menu.querySelectorAll('.mobile-menu-link').forEach(link => link.addEventListener('click', () => setOpen(false)));
        document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
    })();

    // ---- Scroll reveal with stagger ----
    (function () {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const selectors = ['.section-title', '.about-body', '.ov2', '.vcg-card', '.stack-item', '.skills-grid > .skill-tag', '.contact-content'];
        const els = [];
        selectors.forEach(sel => document.querySelectorAll(sel).forEach(el => els.push(el)));
        els.forEach(el => el.classList.add('reveal'));
        if (reduce || !('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('is-visible')); return; }
        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const sibs = Array.from(el.parentElement.querySelectorAll('.reveal'));
                const idx = sibs.indexOf(el);
                el.style.transitionDelay = (idx > 0 ? Math.min(idx, 6) * 70 : 0) + 'ms';
                el.classList.add('is-visible');
                obs.unobserve(el);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
        els.forEach(el => io.observe(el));
    })();

    // ---- Smooth anchor scroll with fixed-nav offset ----
    (function () {
        const NAV_OFFSET = 84;
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                const id = a.getAttribute('href');
                if (id === '#' || id.length < 2) return;
                const target = document.querySelector(id);
                if (!target) return;
                e.preventDefault();
                const y = target.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;
                window.scrollTo({ top: y, behavior: 'smooth' });
            });
        });
    })();

    // ---- Scrollspy: highlight nav link for the section in view ----
    (function () {
        const links = Array.from(document.querySelectorAll('.nav-center a'));
        const map = links.map(l => ({ link: l, sec: document.querySelector(l.getAttribute('href')) })).filter(x => x.sec);
        if (!map.length || !('IntersectionObserver' in window)) return;
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const match = map.find(x => x.sec === entry.target);
                if (!match) return;
                links.forEach(l => l.classList.remove('active'));
                match.link.classList.add('active');
            });
        }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
        map.forEach(x => io.observe(x.sec));
    })();

});
