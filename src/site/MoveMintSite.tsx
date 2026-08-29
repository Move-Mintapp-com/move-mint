import { useCallback, useEffect, useState, type MouseEvent } from 'react';
import wordmark from '../assets/mvmt-wordmark.png';
import { Home, How, Rewards, Partners, Apply, Get, Faq, About, Privacy } from './SitePages';
import './site.css';

/* ------------------------------------------------------------------
   Move-Mint marketing site.

   Dark by design: this site never reads prefers-color-scheme and never
   applies the .dark / .light classes the in-app prototype uses. Those
   classes gate several !important rules in globals.css, so leaving them
   off is what keeps this site's palette intact.
   ------------------------------------------------------------------ */

const PAGES = {
  home:     { title: 'Move-Mint — Steps to Rewards',        view: Home },
  how:      { title: 'How it works — Move-Mint',            view: How },
  rewards:  { title: 'Rewards — Move-Mint',                 view: Rewards },
  partners: { title: 'For business — Move-Mint',            view: Partners },
  apply:    { title: 'Partner application — Move-Mint',     view: Apply },
  get:      { title: 'Get the app — Move-Mint',             view: Get },
  faq:      { title: 'FAQ — Move-Mint',                     view: Faq },
  about:    { title: 'About & contact — Move-Mint',         view: About },
  privacy:  { title: 'Privacy — Move-Mint',                 view: Privacy },
} as const;

type PageId = keyof typeof PAGES;

const NAV: Array<[PageId, string]> = [
  ['home', 'Home'],
  ['how', 'How it works'],
  ['rewards', 'Rewards'],
  ['partners', 'For business'],
  ['faq', 'FAQ'],
];

function readHash(): PageId {
  const id = (window.location.hash || '#home').slice(1) as PageId;
  return id in PAGES ? id : 'home';
}

export default function MoveMintSite() {
  const [page, setPage] = useState<PageId>(readHash);

  useEffect(() => {
    const onPop = () => setPage(readHash());
    window.addEventListener('popstate', onPop);
    window.addEventListener('hashchange', onPop);
    return () => {
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('hashchange', onPop);
    };
  }, []);

  useEffect(() => {
    document.title = PAGES[page].title;
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [page]);

  // Keep the app prototype's theme classes off this site. Deliberately do NOT
  // paint <body>: globals.css gives it a background, and any body background
  // paints over the site's fixed z-index:-3 gradient. Clearing it lets the
  // gradient show; index.html paints <html> for the pre-mount ground.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    const prev = document.body.style.background;
    document.body.style.background = 'transparent';
    return () => { document.body.style.background = prev; };
  }, []);

  const navigate = useCallback((id: PageId) => {
    if (readHash() !== id) window.history.pushState(null, '', '#' + id);
    setPage(id);
  }, []);

  // Delegated navigation: any <a data-go="..."> anywhere in the tree.
  const onClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = (e.target as HTMLElement).closest?.('[data-go]');
    if (!el) return;
    const id = el.getAttribute('data-go') as PageId;
    if (!(id in PAGES)) return;
    e.preventDefault();
    navigate(id);
  }, [navigate]);

  const View = PAGES[page].view;

  return (
    <div className="mm-site" onClick={onClick}>
      <div className="spine" />

      <header className="nav">
        <div className="wrap nav-in">
          <a className="wordmark" href="#home" data-go="home">
            <img src={wordmark} width={700} height={350} alt="Move-Mint" />
            <span>Steps to<br />Rewards</span>
          </a>
          <nav className="nav-links">
            {NAV.map(([id, label]) => (
              <a
                key={id}
                className={'navlink' + (page === id ? ' on' : '')}
                href={'#' + id}
                data-go={id}
              >
                {label}
              </a>
            ))}
            <a className="navlink navcta btn" href="#get" data-go="get" style={{ padding: '13px 24px' }}>
              Get the app
            </a>
          </nav>
        </div>
      </header>

      <main>
        <div key={page} className="page on"><View /></div>
      </main>

      <footer>
        <div className="wrap stack g40">
          <div className="fgrid">
            <div className="stack g16">
              <a className="wordmark" href="#home" data-go="home">
                <img src={wordmark} width={700} height={350} loading="lazy" alt="Move-Mint" />
              </a>
              <p className="sm" style={{ maxWidth: '36ch' }}>
                Bahraini steps, turned into something you can spend on your own street.
              </p>
            </div>
            <div>
              <p className="lbl d" style={{ marginBottom: 10 }}>Walking</p>
              <a className="flink" href="#how" data-go="how">How it works</a>
              <a className="flink" href="#rewards" data-go="rewards">Rewards</a>
              <a className="flink" href="#get" data-go="get">Get the app</a>
            </div>
            <div>
              <p className="lbl d" style={{ marginBottom: 10 }}>Business</p>
              <a className="flink" href="#partners" data-go="partners">Why partner</a>
              <a className="flink" href="#apply" data-go="apply">Apply</a>
              <a className="flink" href="#faq" data-go="faq">FAQ</a>
            </div>
            <div>
              <p className="lbl d" style={{ marginBottom: 10 }}>Company</p>
              <a className="flink" href="#about" data-go="about">About &amp; contact</a>
              <a className="flink" href="#privacy" data-go="privacy">Privacy</a>
              <a className="flink" href="mailto:info@move-mintapp.com">info@move-mintapp.com</a>
            </div>
          </div>
          <p className="sm" style={{
            color: 'var(--tx-dim)',
            borderTop: '1px solid rgba(255,255,255,.10)',
            paddingTop: 26,
          }}>
            © 2026 Move-Mint W.L.L., Bahrain · Brand Guidelines v1.0
          </p>
        </div>
      </footer>
    </div>
  );
}
