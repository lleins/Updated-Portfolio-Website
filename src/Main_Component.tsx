
import './Styles/Main_Style.css';


import shotGlendinning from "./Images/projects/glendinningsmith.jpg";
import shotGregWalton from "./Images/projects/gregwalton.jpg";
import shotNexus from "./Images/projects/nexussupport.jpg";

import React, { useState, useEffect, useRef } from 'react';


// ===================== MINESWEEPER EASTER EGG =====================
// (hidden: click the clock in the top bar 10x to open)
const MS_ROWS = 9;
const MS_COLS = 9;
const MS_MINES = 10;

type MsCell = { mine: boolean; revealed: boolean; flagged: boolean; adj: number };

const msEmptyBoard = (): MsCell[][] =>
    Array.from({ length: MS_ROWS }, () =>
        Array.from({ length: MS_COLS }, () => ({ mine: false, revealed: false, flagged: false, adj: 0 }))
    );

// Mines are placed after the first click so the first tile is always safe.
const msPlantMines = (board: MsCell[][], safeR: number, safeC: number): MsCell[][] => {
    const b = board.map((row) => row.map((cell) => ({ ...cell })));
    let placed = 0;
    while (placed < MS_MINES) {
        const r = Math.floor(Math.random() * MS_ROWS);
        const c = Math.floor(Math.random() * MS_COLS);
        if (b[r][c].mine || (r === safeR && c === safeC)) continue;
        b[r][c].mine = true;
        placed++;
    }
    for (let r = 0; r < MS_ROWS; r++) {
        for (let c = 0; c < MS_COLS; c++) {
            if (b[r][c].mine) continue;
            let n = 0;
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    const nr = r + dr, nc = c + dc;
                    if (nr >= 0 && nr < MS_ROWS && nc >= 0 && nc < MS_COLS && b[nr][nc].mine) n++;
                }
            }
            b[r][c].adj = n;
        }
    }
    return b;
};

// Flood-fill reveal: opening a blank (0) tile cascades to its neighbours.
const msFloodReveal = (board: MsCell[][], r: number, c: number): MsCell[][] => {
    const b = board.map((row) => row.map((cell) => ({ ...cell })));
    const stack: [number, number][] = [[r, c]];
    while (stack.length) {
        const [cr, cc] = stack.pop() as [number, number];
        const cell = b[cr][cc];
        if (cell.revealed || cell.flagged) continue;
        cell.revealed = true;
        if (cell.adj === 0 && !cell.mine) {
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    const nr = cr + dr, nc = cc + dc;
                    if (nr >= 0 && nr < MS_ROWS && nc >= 0 && nc < MS_COLS && !b[nr][nc].revealed) stack.push([nr, nc]);
                }
            }
        }
    }
    return b;
};

function MinesweeperModal({ onClose }: { onClose: () => void }) {
    const [board, setBoard] = useState<MsCell[][]>(msEmptyBoard);
    const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');
    const [started, setStarted] = useState(false);

    const reset = () => {
        setBoard(msEmptyBoard());
        setStatus('playing');
        setStarted(false);
    };

    const handleReveal = (r: number, c: number) => {
        if (status !== 'playing' || board[r][c].flagged) return;
        let b = board;
        if (!started) {
            b = msPlantMines(board, r, c);
            setStarted(true);
        }
        if (b[r][c].mine) {
            setBoard(b.map((row) => row.map((cell) => (cell.mine ? { ...cell, revealed: true } : { ...cell }))));
            setStatus('lost');
            return;
        }
        const next = msFloodReveal(b, r, c);
        setBoard(next);
        if (next.every((row) => row.every((cell) => cell.mine || cell.revealed))) setStatus('won');
    };

    const handleFlag = (e: React.MouseEvent, r: number, c: number) => {
        e.preventDefault();
        if (status !== 'playing' || board[r][c].revealed) return;
        const b = board.map((row) => row.map((cell) => ({ ...cell })));
        b[r][c].flagged = !b[r][c].flagged;
        setBoard(b);
    };

    const flagsUsed = board.reduce((sum, row) => sum + row.filter((cell) => cell.flagged).length, 0);

    return (
        <div className='ms-overlay' onClick={onClose}>
            <div className='ms-modal' onClick={(e) => e.stopPropagation()}>
                <div className='ms-head'>
                    <span className='ms-title'>Minesweeper<span className='accent'>.</span></span>
                    <button className='ms-close' onClick={onClose} aria-label='Close'>×</button>
                </div>
                <div className='ms-bar'>
                    <span className='ms-count'>💣 {MS_MINES - flagsUsed}</span>
                    <span className={`ms-status ms-${status}`}>
                        {status === 'won' ? 'You win! 🎉' : status === 'lost' ? 'Boom! 💥' : 'Right-click to flag'}
                    </span>
                    <button className='ms-reset' onClick={reset} aria-label='New game'>↻</button>
                </div>
                <div className='ms-grid'>
                    {board.map((row, r) =>
                        row.map((cell, c) => (
                            <button
                                key={`${r}-${c}`}
                                className={`ms-cell${cell.revealed ? ' is-revealed' : ''}${cell.revealed && cell.mine ? ' is-mine' : ''}`}
                                data-adj={cell.revealed && !cell.mine ? cell.adj : ''}
                                onClick={() => handleReveal(r, c)}
                                onContextMenu={(e) => handleFlag(e, r, c)}
                            >
                                {cell.revealed
                                    ? cell.mine ? '💣' : cell.adj > 0 ? cell.adj : ''
                                    : cell.flagged ? '🚩' : ''}
                            </button>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}


function Main() {

    const [activeSection, setActiveSection] = useState<string>('Home');

    // ----- minesweeper easter egg: 10 clicks on the clock opens it -----
    const [showGame, setShowGame] = useState(false);
    const timeClicks = useRef(0);
    const handleTimeClick = () => {
        timeClicks.current += 1;
        if (timeClicks.current >= 10) {
            timeClicks.current = 0;
            setShowGame(true);
        }
    };

    // ----- custom cursor refs -----
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Feed the cursor's entry/exit point into the button so the fill
    // grows out from exactly where the pointer is.
    const trackCta = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--cx', `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty('--cy', `${e.clientY - rect.top}px`);
    };

    useEffect(() => {
        const el = document.getElementById("time");
        const timer = setInterval(() => {
            if (el) {
                el.innerText = new Date().toLocaleTimeString();
            }
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Reveal a section's blocks once it settles into view. Tied to section
    // position (not entry) so the fades/pops play when you LAND on a section
    // rather than during the paged-scroll glide.
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Lukas Leins';

        const ids = ['Home', 'About', 'Projects', 'Contact'];
        const reveal = () => {
            const vh = window.innerHeight;
            ids.forEach((id) => {
                const sec = document.getElementById(id);
                if (!sec) return;
                if (sec.getBoundingClientRect().top <= vh * 0.55) {
                    sec.querySelectorAll('.fade-in-up').forEach((n) => n.classList.add('visible'));
                }
            });
        };

        window.addEventListener('scroll', reveal, { passive: true });
        reveal();
        const tid = setTimeout(reveal, 120);   // re-check after layout/fonts settle
        return () => {
            window.removeEventListener('scroll', reveal);
            clearTimeout(tid);
        };
    }, []);

    // Highlight the active nav icon based on scroll position
    useEffect(() => {
        const sections = ['Home', 'About', 'Projects', 'Contact'];
        const onScroll = () => {
            let current = 'Home';
            for (const id of sections) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= 140) {
                    current = id;
                }
            }
            setActiveSection(current);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Paged scrolling: one wheel gesture glides smoothly to the next section.
    // Sections taller than the viewport scroll normally inside, then advance
    // once you reach their edge. Mouse/trackpad only — touch scrolls natively.
    useEffect(() => {
        if (window.matchMedia('(max-width: 768px)').matches) return;
        const ids = ['Home', 'About', 'Projects', 'Contact'];
        const EDGE = 80;        // px of slack before a tall section is "at its edge"
        const DURATION = 850;   // glide duration (ms)
        let animating = false;
        let cooldown = false;

        const easeInOutCubic = (t: number) =>
            t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const glideTo = (targetY: number) => {
            animating = true;
            const startY = window.scrollY;
            const dist = targetY - startY;
            const start = performance.now();
            const step = (now: number) => {
                const p = Math.min(1, (now - start) / DURATION);
                window.scrollTo(0, startY + dist * easeInOutCubic(p));
                if (p < 1) {
                    requestAnimationFrame(step);
                } else {
                    animating = false;
                    cooldown = true;
                    setTimeout(() => { cooldown = false; }, 140);
                }
            };
            requestAnimationFrame(step);
        };

        const onWheel = (e: WheelEvent) => {
            if (animating || cooldown) { e.preventDefault(); return; }
            const sections = ids
                .map((id) => document.getElementById(id))
                .filter(Boolean) as HTMLElement[];
            if (sections.length < 2) return;

            const vh = window.innerHeight;
            let curr = 0;
            sections.forEach((el, i) => {
                if (el.getBoundingClientRect().top <= vh * 0.5) curr = i;
            });
            const rect = sections[curr].getBoundingClientRect();

            if (e.deltaY > 0) {
                if (rect.bottom - vh > EDGE) return;        // more of this section below
                if (curr < sections.length - 1) {
                    e.preventDefault();
                    glideTo(window.scrollY + sections[curr + 1].getBoundingClientRect().top);
                }
            } else if (e.deltaY < 0) {
                if (-rect.top > EDGE) return;               // more of this section above
                if (curr > 0) {
                    e.preventDefault();
                    glideTo(window.scrollY + sections[curr - 1].getBoundingClientRect().top);
                }
            }
        };

        window.addEventListener('wheel', onWheel, { passive: false });
        return () => window.removeEventListener('wheel', onWheel);
    }, []);

    // Custom cursor: a dot that tracks exactly + a ring that trails smoothly.
    // Only on fine-pointer (mouse) devices; touch keeps the native pointer.
    useEffect(() => {
        if (!window.matchMedia('(pointer: fine)').matches) return;
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        const interactive = 'a, button, [role="button"], .nav-items, .project-card, .badge, .proj-thumb, .proj-arrow, .proj-track, .side-logo, .contact-email, .time-clock';
        let mx = window.innerWidth / 2, my = window.innerHeight / 2;
        let rx = mx, ry = my;
        let raf = 0;

        document.body.classList.add('custom-cursor');

        const onMove = (e: MouseEvent) => {
            mx = e.clientX; my = e.clientY;
            dot.style.transform = `translate(${mx}px, ${my}px)`;
            dot.style.opacity = '1';
            ring.style.opacity = '1';
            const target = e.target as HTMLElement;
            ring.classList.toggle('cursor-hover', !!target.closest(interactive));
        };
        const onDown = () => ring.classList.add('cursor-down');
        const onUp = () => ring.classList.remove('cursor-down');
        const onLeave = () => { dot.style.opacity = '0'; ring.style.opacity = '0'; };

        const loop = () => {
            rx += (mx - rx) * 0.18;
            ry += (my - ry) * 0.18;
            ring.style.transform = `translate(${rx}px, ${ry}px)`;
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mousedown', onDown);
        window.addEventListener('mouseup', onUp);
        document.addEventListener('mouseleave', onLeave);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mousedown', onDown);
            window.removeEventListener('mouseup', onUp);
            document.removeEventListener('mouseleave', onLeave);
            document.body.classList.remove('custom-cursor');
        };
    }, []);

    // ----- Side-rail icons (clean, uniform stroke icons) -----
    const navItems = [
        {
            id: 'Home',
            label: 'Home',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 10.5 12 3l9 7.5" />
                    <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
                    <path d="M9.5 21v-6h5v6" />
                </svg>
            ),
        },
        {
            id: 'About',
            label: 'About',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M5 21v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1" />
                </svg>
            ),
        },
        {
            id: 'Projects',
            label: 'Projects',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 8-5 4 5 4" />
                    <path d="m15 8 5 4-5 4" />
                </svg>
            ),
        },
        {
            id: 'Contact',
            label: 'Contact',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m4 7 8 6 8-6" />
                </svg>
            ),
        },
    ];

    // ----- About section: two badge groups -----
    const codeIcon = (
        <svg className='badge-icon' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 8-5 4 5 4" />
            <path d="m15 8 5 4-5 4" />
        </svg>
    );
    const stackIcon = (
        <svg className='badge-icon' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 3 9 5-9 5-9-5 9-5Z" />
            <path d="m3.5 12 8.5 4.7L20.5 12" />
        </svg>
    );
    const skillGroups = [
        { title: 'Languages & Frameworks', icon: codeIcon, items: ['React.js', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'PHP'] },
        { title: 'Platforms & Tools', icon: stackIcon, items: ['WordPress', 'Shopify', 'Elementor', 'SQL', 'MongoDB', 'Git', 'AWS', 'Docker'] },
    ];

    // ----- Projects (carousel data) -----
    const mediaIcon = (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M3 9h18" />
            <path d="M6.5 6.5h.01" />
        </svg>
    );
    const projects: { cat: string; title: string; desc: string; tags: string[]; img?: string }[] = [
        { cat: 'Full-Stack', title: 'Coast Machinery Vendor Portal', desc: 'Self-serve vendor portal with WooCommerce integration.', tags: ['Next.js', 'MySQL', 'WooCommerce'] },
        { cat: 'Full-Stack', title: 'Driving School Database', desc: 'Custom student & lesson management system.', tags: ['PHP', 'MySQL'] },
        { cat: 'E-Commerce', title: 'Race Essence', desc: 'WooCommerce store with a steering-wheel configurator.', tags: ['WordPress', 'WooCommerce', 'JavaScript', 'PHP'] },
        { cat: 'Real Estate', title: 'Greg Walton Realtor', desc: 'Listings site with MyRealPage and heavy custom work.', tags: ['WordPress', 'MyRealPage', 'JavaScript', 'PHP'], img: shotGregWalton },
        { cat: 'WordPress', title: 'Glendinning Smith LLP', desc: 'SEO-optimized law firm site built with Elementor.', tags: ['WordPress', 'Elementor', 'JavaScript', 'PHP'], img: shotGlendinning },
        { cat: 'WordPress', title: 'NEXUS Support Society', desc: 'Clean non-profit site with custom JS solutions.', tags: ['WordPress', 'JavaScript', 'PHP'], img: shotNexus },
    ];

    return (
        <div id="Main_Component">

            <div ref={dotRef} className='cursor-dot' aria-hidden='true'></div>
            <div ref={ringRef} className='cursor-ring' aria-hidden='true'></div>

            {showGame && <MinesweeperModal onClose={() => setShowGame(false)} />}

            <div id='main_container'>

                <nav id='side_navbar'>

                    <button type='button' className='side-logo' aria-label='Home' onClick={() => scrollToSection('Home')}>
                        <span className='side-logo-text'>LL</span>
                        <span className='side-logo-dot'></span>
                    </button>

                    <ul className='nav-images-container'>
                        {navItems.map((item) => (
                            <li
                                key={item.id}
                                className={`nav-items ${activeSection === item.id ? 'active' : ''}`}
                                data-label={item.label}
                                onClick={() => scrollToSection(item.id)}
                            >
                                {item.icon}
                            </li>
                        ))}
                    </ul>

                    <a
                        className='side-bottom'
                        data-label='GitHub'
                        href='https://github.com/lleins'
                        target='_blank'
                        rel='noreferrer'
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.36 9.36 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.59.69.49A10.02 10.02 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
                        </svg>
                    </a>

                </nav>

                <div id='content_container'>

                    {/* ===================== HERO ===================== */}
                    <section id='Home' className='hero_container'>

                        <div className='fixed_navbar fade-in-up'>
                            <p className='navbar_name'>Canada, BC</p>
                            <div id="time" className='time-clock' onClick={handleTimeClick}></div>
                        </div>

                        <div className='hero-blur'></div>

                        <div className='hero-inner'>

                            <div className='hero-left'>

                                <div className='hero-socials fade-in-up'>
                                    <a href='https://www.linkedin.com/in/lukas-leins-802474208' target='_blank' rel='noreferrer' aria-label='LinkedIn'>
                                        <svg viewBox="0 0 448 512" height="24" width="24" fill="currentColor">
                                            <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                                        </svg>
                                    </a>
                                    <a href='https://github.com/lleins' target='_blank' rel='noreferrer' aria-label='GitHub'>
                                        <svg viewBox="0 0 496 512" height="24" width="24" fill="currentColor">
                                            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z" />
                                        </svg>
                                    </a>
                                    <a href='mailto:lukas@vasdevdesign.com' aria-label='Email'>
                                        <svg viewBox="0 0 24 24" height="24" width="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="5" width="18" height="14" rx="2" />
                                            <path d="m4 7 8 6 8-6" />
                                        </svg>
                                    </a>
                                </div>

                                <h1 className='hero-title fade-in-up' style={{ transitionDelay: '80ms' }}>Hey, I'm Lukas<span className='accent'>.</span></h1>
                                <h2 className='hero-subtitle fade-in-up' style={{ transitionDelay: '160ms' }}>I'm a <span className='accent'>Full-Stack Developer</span></h2>

                                <p className='hero-desc fade-in-up' style={{ transitionDelay: '240ms' }}>
                                    I build modern web and full-stack applications, with a focus on
                                    reliability, performance, and clean architecture.
                                </p>

                                <button
                                    className='hero-cta fade-in-up'
                                    style={{ transitionDelay: '320ms' }}
                                    onMouseEnter={trackCta}
                                    onMouseLeave={trackCta}
                                    onClick={() => scrollToSection('Contact')}
                                >
                                    <span>Get in Touch</span>
                                </button>

                            </div>

                        </div>
                    </section>
                    {/* =================== END HERO =================== */}


                    {/* ===================== ABOUT ===================== */}
                    <section id='About' className='about-me'>

                        <div className='section-head fade-in-up'>
                            <h2 className='section-title'>About<span className='accent'>.</span></h2>
                            <p className='section-sub'>Skills &amp; Journey</p>
                        </div>

                        <div className='about-me-grid'>

                            <div className='about-me-text fade-in-up'>
                                <p>
                                    Hey! I’m Lukas Leins, a full-stack web developer based in British Columbia, Canada. 
                                    After spending summers doing intense, physically demanding work in construction, on farms, 
                                    and in factories, building applications at a computer feels like a vacation!
                                </p>
                                <p>
                                    After two years in school, studying Computer Science, I took a gap year and used it to teach
                                    myself as much about full-stack development as I possibly could. That bet paid
                                    off &mdash; I landed a role in the field and never needed to head back to school.
                                    I've since been building professionally for over two years, working on everything
                                    from custom CMS sites to complete full-stack applications.
                                </p>
                            </div>

                            <div className='about-me-badges'>
                                {skillGroups.map((group) => (
                                    <div className='badge-group' key={group.title}>
                                        <h4 className='badge-title fade-in-up'>{group.icon}{group.title}</h4>
                                        <div className='badge-list'>
                                            {group.items.map((item, i) => (
                                                <span
                                                    className='badge fade-in-up from-left'
                                                    style={{ transitionDelay: `${i * 55}ms` }}
                                                    key={item}
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </section>
                    {/* =================== END ABOUT =================== */}


                    {/* ===================== PROJECTS ===================== */}
                    <section id='Projects' className='projects'>

                        <div className='section-head fade-in-up'>
                            <h2 className='section-title'>Projects<span className='accent'>.</span></h2>
                            <p className='section-sub'>NDA's keep me from sharing everything I've worked on &mdash; here's a brief snapshot.</p>
                        </div>

                        <div className='proj-grid fade-in-up'>
                            {projects.map((project) => (
                                <article
                                    className='proj-card'
                                    key={project.title}
                                >
                                    <div className={`proj-card-media ${project.img ? 'has-shot' : ''}`}>
                                        {project.img
                                            ? <img src={project.img} alt={`${project.title} website`} loading='lazy' />
                                            : <span className='proj-card-icon'>{mediaIcon}</span>}
                                    </div>
                                    <div className='proj-card-head'>
                                        <div className='proj-card-titles'>
                                            <h3 className='proj-card-title'>{project.title}</h3>
                                            <span className='proj-card-cat'>{project.cat}</span>
                                        </div>
                                        <span className='proj-card-arrow' aria-hidden='true'>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M7 17 17 7" />
                                                <path d="M7 7h10v10" />
                                            </svg>
                                        </span>
                                    </div>
                                    <p className='proj-card-desc'>{project.desc}</p>
                                    <div className='proj-card-tags'>
                                        {project.tags.map((tag) => (
                                            <span className='proj-card-tag' key={tag}>{tag}</span>
                                        ))}
                                    </div>
                                </article>
                            ))}
                        </div>

                    </section>
                    {/* =================== END PROJECTS =================== */}


                    {/* ===================== CONTACT ===================== */}
                    <section id='Contact' className='contact'>
                        <div className='section-head fade-in-up'>
                            <h2 className='section-title'>Get in Touch<span className='accent'>.</span></h2>
                            <p className='section-sub'>Email me directly or check out my LinkedIn.</p>
                        </div>

                        <div className='contact-inner fade-in-up'>
                            <a className='contact-email' href='mailto:lukas@vasdevdesign.com'>lukas@vasdevdesign.com</a>

                            <div className='contact-socials'>
                                <a href='https://www.linkedin.com/in/lukas-leins-802474208' target='_blank' rel='noreferrer' aria-label='LinkedIn'>
                                    <svg viewBox="0 0 448 512" fill="currentColor">
                                        <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                                    </svg>
                                </a>
                                <a href='https://github.com/lleins' target='_blank' rel='noreferrer' aria-label='GitHub'>
                                    <svg viewBox="0 0 496 512" fill="currentColor">
                                        <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z" />
                                    </svg>
                                </a>
                                <a href='mailto:lukas@vasdevdesign.com' aria-label='Email'>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="5" width="18" height="14" rx="2" />
                                        <path d="m4 7 8 6 8-6" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <footer className='site-footer'>
                            <div className='footer-inner'>
                                <span className='footer-name'>Lukas Leins<span className='footer-dot'></span></span>
                                <span className='footer-legal'>© {new Date().getFullYear()} Lukas Leins. All rights reserved.</span>
                            </div>
                        </footer>
                    </section>
                    {/* =================== END CONTACT =================== */}


                </div>
            </div>


        </div>
    );
}

export default Main;
