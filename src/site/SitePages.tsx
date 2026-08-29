import { useState, type FormEvent } from 'react';
import badge from '../assets/movemint-badge.png';
import mascotHeart from '../assets/mascot-heart.png';

/* No backend yet, so both forms compose a pre-filled email instead of
   silently doing nothing. Swap for a real endpoint when one exists. */
const INBOX = 'info@move-mintapp.com';

function openMail(subject: string, body: string) {
  window.location.href =
    `mailto:${INBOX}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function fieldValue(form: HTMLFormElement, id: string) {
  const el = form.querySelector('#' + id) as
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
  return el?.value.trim() ?? '';
}

/* ------------------------------------------------------------------
   Nine marketing pages. Navigation is delegated: any <a data-go="id">
   is intercepted by the shell in MoveMintSite.tsx, so pages stay pure.
   ------------------------------------------------------------------ */

const WAVE_A =
  'M0,80 C180,20 360,130 540,80 C720,30 900,130 1080,80 C1260,30 1380,110 1440,80 ' +
  'C1620,20 1800,130 1980,80 C2160,30 2340,130 2520,80 C2700,30 2820,110 2880,80';
const WAVE_B =
  'M0,100 C200,150 400,50 600,100 C800,150 1000,50 1200,100 C1350,135 1400,80 1440,100 ' +
  'C1640,150 1840,50 2040,100 C2240,150 2440,50 2640,100 C2790,135 2840,80 2880,100';
const WAVE_C =
  'M0,60 C240,110 480,10 720,60 C960,110 1200,10 1440,60 ' +
  'C1680,110 1920,10 2160,60 C2400,110 2640,10 2880,60';

export function Waves({ variant = 1 }: { variant?: 1 | 2 | 3 }) {
  const sets: Record<number, Array<[string, string]>> = {
    1: [['w1', WAVE_A], ['w2', WAVE_B], ['w3', WAVE_C]],
    2: [['w2', WAVE_A], ['w1', WAVE_B]],
    3: [['w1', WAVE_A], ['w3', WAVE_B]],
  };
  return (
    <div className="waves" aria-hidden="true">
      <svg viewBox="0 0 1440 150" preserveAspectRatio="none">
        {sets[variant].map(([cls, d], i) => (
          <path key={i} className={cls} d={d} />
        ))}
      </svg>
    </div>
  );
}

/* ---------------- steps → points converter ---------------- */

function note(n: number) {
  if (n < 3000) return 'A desk day. The points still land.';
  if (n < 4000) return 'Just under the Bahrain average.';
  if (n < 6000) return 'Right in the national middle: 4,000 to 6,000 a day.';
  if (n === 6000) return '6,000 steps is one lap of the Corniche — and 600 points.';
  if (n < 10000) return 'Above average. This is a walk you chose to take.';
  if (n < 15000) return 'A strong day. Roughly a coffee every two days.';
  return 'That is a lot of Corniche.';
}

const MIN = 500;
const MAX = 20000;

function Converter() {
  const [steps, setSteps] = useState(6000);
  const fill = ((steps - MIN) / (MAX - MIN)) * 100;
  return (
    <div className="card ink lit">
      <p className="lbl" style={{ marginBottom: 26 }}>Try the maths</p>
      <div className="conv">
        <div>
          <p className="lbl d">Steps today</p>
          <p className="null big">{steps.toLocaleString('en-US')}</p>
        </div>
        <div className="arrow" aria-hidden="true">→</div>
        <div>
          <p className="lbl d">Points earned</p>
          <p className="null big neon">{Math.floor(steps / 10).toLocaleString('en-US')}</p>
        </div>
      </div>
      <label htmlFor="stepRange" style={{ position: 'absolute', left: -9999 }}>
        Steps walked today
      </label>
      <input
        id="stepRange"
        type="range"
        min={MIN}
        max={MAX}
        step={100}
        value={steps}
        onChange={(e) => setSteps(parseInt(e.target.value, 10))}
        style={{ ['--fill' as string]: fill + '%' }}
      />
      <p className="lede" style={{ marginTop: 22 }}>{note(steps)}</p>
    </div>
  );
}

/* ---------------- home ---------------- */

export function Home() {
  return (
    <>
      <section style={{ paddingBottom: 40 }}>
        <div className="wrap">
          <div
            className="grid hero-grid"
            style={{ gridTemplateColumns: '1.02fr .98fr', gap: 'clamp(30px,5vw,70px)', alignItems: 'center' }}
          >
            <div className="stack g28">
              <p className="lbl">Bahrain · Steps to Rewards</p>
              <h1 className="null" style={{ fontSize: 'var(--display)' }}>
                Walk it<br /><span className="neon">off the bill</span>
              </h1>
              <p className="lede" style={{ fontSize: '1.4rem' }}>
                Move-Mint turns the steps you already take into points you spend at
                cafés, restaurants, gyms and shops around Bahrain.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <a className="btn" href="#get" data-go="get">Get the app</a>
                <a className="btn ghost" href="#partners" data-go="partners">Partner with us</a>
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <span className="pill mint">10 steps = 1 point</span>
                <span className="pill">Apple Health</span>
                <span className="pill">Health Connect</span>
              </div>
            </div>

            <div className="badge-wrap">
              <div className="tracks" aria-hidden="true">
                <svg viewBox="0 0 500 500">
                  <g className="trk">
                    <circle cx="250" cy="250" r="243" stroke="#9d57d1" strokeWidth="1.4"
                      opacity="var(--ring)" strokeDasharray="3 14" />
                  </g>
                  <g className="trk rev">
                    <circle cx="250" cy="250" r="256" stroke="#84f2b4" strokeWidth="1"
                      opacity=".4" strokeDasharray="2 20" />
                  </g>
                </svg>
              </div>
              <div className="halo" aria-hidden="true" />
              <img
                src={badge}
                width={815}
                height={820}
                fetchPriority="high"
                alt="Move-Mint badge: the mascot mid-stride, surrounded by reward categories"
              />
            </div>
          </div>
        </div>
      </section>

      <Waves variant={1} />

      <section style={{ paddingBlock: 20 }}>
        <div className="wrap"><Converter /></div>
      </section>

      <section>
        <div className="wrap stack g56">
          <div className="stack g16">
            <p className="lbl">How it works</p>
            <h2 className="null" style={{ fontSize: 'var(--statement)' }}>
              Four steps.<br />Then just walking.
            </h2>
          </div>
          <div className="flow">
            <div className="card ink lit stack g12">
              <h3 style={{ fontSize: 'var(--h3)' }}>Connect your health app</h3>
              <p className="sm">Apple Health or Google Health Connect. One tap, then forget about it.</p>
            </div>
            <div className="card ink stack g12">
              <h3 style={{ fontSize: 'var(--h3)' }}>Walk your day</h3>
              <p className="sm">The commute, the Souq, the school run. Your phone is already counting.</p>
            </div>
            <div className="card pink stack g12">
              <h3 style={{ fontSize: 'var(--h3)' }}>Collect points</h3>
              <p className="sm">Every 10 steps becomes 1 point, added the moment your phone syncs.</p>
            </div>
            <div className="card lit-v stack g12">
              <h3 style={{ fontSize: 'var(--h3)' }}>Spend them locally</h3>
              <p className="sm">Show your code at the counter. The discount comes off there and then.</p>
            </div>
          </div>
        </div>
      </section>

      <Waves variant={2} />

      <section>
        <div className="wrap grid c2" style={{ gap: 24, alignItems: 'stretch' }}>
          <div className="card pink stack g20" style={{ justifyContent: 'center' }}>
            <span className="pill pinkp" style={{ alignSelf: 'flex-start' }}>Did you know</span>
            <p className="null" style={{ fontSize: 'clamp(2.6rem,5.4vw,4.2rem)', color: '#2b0149' }}>
              4,000&ndash;6,000
            </p>
            <p style={{ fontSize: '1.24rem', color: 'rgba(61,1,105,.88)' }}>
              steps is what the average person in Bahrain already walks in a day —
              up to 600 points, before changing a thing.
            </p>
          </div>
          <div className="card ink lit stack g20" style={{ justifyContent: 'center' }}>
            <span className="pill mint" style={{ alignSelf: 'flex-start' }}>The rate</span>
            <p className="null" style={{ fontSize: 'clamp(2.6rem,5.4vw,4.2rem)' }}>
              <span className="neon">10&nbsp;:&nbsp;1</span>
            </p>
            <p className="lede">
              Ten steps, one point. It never changes with tiers, streaks or the time of day —
              so you always know what a walk is worth.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap stack g56">
          <div className="stack g16">
            <p className="lbl">Where points go</p>
            <h2 className="null" style={{ fontSize: 'var(--statement)' }}>
              Five kinds of<br />somewhere to spend
            </h2>
            <p className="lede">Health first — a list that rewards the habit rather than undoing it.</p>
          </div>
          <div className="grid c3">
            <div className="card ink lit stack g16">
              <svg className="icon" viewBox="0 0 24 24">
                <path d="M7 3v8M10 3v8M13 3v5a3 3 0 0 1-3 3M17 3c-2 3-2 5-2 7h4c0-2 0-4-2-7zM17 10v11M10 11v10" />
              </svg>
              <h3 style={{ fontSize: 'var(--h3)' }}>Cafés</h3>
              <p className="sm">Coffee at the end of the walk, part-paid by the walk.</p>
            </div>
            <div className="card ink stack g16">
              <svg className="icon" viewBox="0 0 24 24">
                <path d="M4 9h16v11H4zM4 9l2-5h12l2 5M9 20v-6h6v6" />
              </svg>
              <h3 style={{ fontSize: 'var(--h3)' }}>Healthy restaurants</h3>
              <p className="sm">Places that fit the point of the app, not the ones that fight it.</p>
            </div>
            <div className="card pink stack g16">
              <svg className="icon" viewBox="0 0 24 24">
                <path d="M3 12h18M6 8v8M18 8v8M9 6v12M15 6v12" />
              </svg>
              <h3 style={{ fontSize: 'var(--h3)' }}>Gyms &amp; studios</h3>
              <p className="sm">Classes, day passes and memberships priced partly in steps.</p>
            </div>
            <div className="card ink stack g16">
              <svg className="icon" viewBox="0 0 24 24">
                <circle cx="7" cy="18" r="3" /><circle cx="17" cy="18" r="3" />
                <path d="M9.5 15.5L19 5M14.5 15.5L5 5" />
              </svg>
              <h3 style={{ fontSize: 'var(--h3)' }}>Salons</h3>
              <p className="sm">The appointment you were booking anyway, for fewer dinars.</p>
            </div>
            <div className="card lit-v stack g16">
              <svg className="icon" viewBox="0 0 24 24">
                <path d="M6 2h12l2 6H4zM5 8v14h14V8M10 12h4" />
              </svg>
              <h3 style={{ fontSize: 'var(--h3)' }}>Everyday shops</h3>
              <p className="sm">Groceries, pharmacies and the small places on your street.</p>
            </div>
            <div className="card ink lit-b stack g16" style={{ justifyContent: 'center' }}>
              <p className="lbl b">Partners</p>
              <h3 style={{ fontSize: 'var(--h3)' }}>Run one of these?</h3>
              <a className="btn ghost" href="#partners" data-go="partners" style={{ alignSelf: 'flex-start' }}>
                See the offer
              </a>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="card ink lit stack g28"
            style={{ alignItems: 'center', textAlign: 'center', paddingBlock: 'clamp(46px,7vw,80px)' }}>
            <p className="lbl">Coming soon</p>
            <h2 className="null" style={{ fontSize: 'var(--statement)' }}>Be walking on<br />day one</h2>
            <p className="lede" style={{ textAlign: 'center', maxWidth: '46ch' }}>
              We are finishing the Bahrain partner list now. Leave your email and
              we will tell you the day it opens.
            </p>
            <a className="btn" href="#get" data-go="get">Join the list</a>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------------- how it works ---------------- */

export function How() {
  return (
    <section>
      <div className="wrap stack g56">
        <div className="stack g16">
          <p className="lbl">How it works</p>
          <h1 className="null" style={{ fontSize: 'var(--statement)' }}>
            Your phone already<br />counts. We do the rest.
          </h1>
          <p className="lede">
            Move-Mint does not ask you to log anything, wear anything, or walk further than you
            already do. It reads the step count your phone keeps anyway, converts it at a fixed
            rate, and lets you spend the result.
          </p>
        </div>

        <div className="flow">
          <div className="card ink lit stack g12">
            <h3 style={{ fontSize: 'var(--h3)' }}>Connect</h3>
            <p className="sm">On iPhone that is Apple Health; on Android, Google Health Connect.
              You grant read access to step count only.</p>
          </div>
          <div className="card ink stack g12">
            <h3 style={{ fontSize: 'var(--h3)' }}>Sync</h3>
            <p className="sm">Open the app and your day updates. Steps taken before you joined are
              not backdated.</p>
          </div>
          <div className="card pink stack g12">
            <h3 style={{ fontSize: 'var(--h3)' }}>Earn</h3>
            <p className="sm">10 steps become 1 point, every day, with no cap and no tiers to unlock first.</p>
          </div>
          <div className="card lit-v stack g12">
            <h3 style={{ fontSize: 'var(--h3)' }}>Redeem</h3>
            <p className="sm">Pick a reward, show the code at the counter, and the partner applies it
              before you pay.</p>
          </div>
        </div>

        <div className="stack g28">
          <h2 className="null" style={{ fontSize: 'var(--h2)' }}>The rate, in real numbers</h2>
          <div className="tblwrap">
            <table>
              <thead>
                <tr><th>A day of</th><th>Steps</th><th>Points</th><th>Roughly</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>A quiet desk day</strong></td><td className="num">2,800</td><td className="num">280</td><td>Errands and lunch</td></tr>
                <tr><td><strong>An average Bahrain day</strong></td><td className="num">4,000&ndash;6,000</td><td className="num">400&ndash;600</td><td>The national middle</td></tr>
                <tr><td><strong>One lap of the Corniche</strong></td><td className="num">6,000</td><td className="num">600</td><td>The default daily goal</td></tr>
                <tr><td><strong>A walk plus a shopping trip</strong></td><td className="num">10,400</td><td className="num">1,040</td><td>A strong day</td></tr>
                <tr><td><strong>A month of hitting goal</strong></td><td className="num">180,000</td><td className="num">18,000</td><td>Thirty days at 6,000</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid c2">
          <div className="card pink stack g16">
            <p className="lbl">Streaks</p>
            <h3 style={{ fontSize: 'var(--h3)' }}>Hitting your goal, day after day</h3>
            <p className="sm">Your daily goal starts at 6,000 steps and you can move it. Hit it and the
              streak grows; miss it and the points you already earned stay exactly where they are.
              Nothing expires because you had a slow week.</p>
          </div>
          <div className="card ink lit stack g16">
            <p className="lbl">Your health data</p>
            <h3 style={{ fontSize: 'var(--h3)' }}>Step counts, and nothing else</h3>
            <p className="sm">We read one number: steps. Not heart rate, not workouts, and no location
              today. It is never sold, and partners see a redemption code — never your health data.</p>
            <a className="btn ghost" href="#privacy" data-go="privacy" style={{ alignSelf: 'flex-start' }}>
              Read the privacy page
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- rewards ---------------- */

const AREAS = ['Manama', 'Bahrain Bay', 'Seef', 'Adliya', 'Juffair', 'Muharraq',
  'Riffa', 'Budaiya', 'Saar', 'Amwaj', 'Hidd'];

export function Rewards() {
  return (
    <>
      <section style={{ paddingBottom: 30 }}>
        <div className="wrap stack g40">
          <div className="stack g16">
            <p className="lbl">Rewards</p>
            <h1 className="null" style={{ fontSize: 'var(--statement)' }}>
              What your points<br /><span className="neon">actually buy</span>
            </h1>
            <p className="lede">
              Points are not a loyalty tier or a badge. They come off a real bill, at a real
              counter, in Bahrain. Here is what they are worth and where they work.
            </p>
          </div>
        </div>
      </section>

      <section style={{ paddingBlock: 30 }}>
        <div className="wrap stack g28">
          <div className="stack g12">
            <p className="lbl">1 · What a reward costs</p>
            <h2 className="null" style={{ fontSize: 'var(--h2)' }}>Points, and the walking behind them</h2>
            <p className="lede">Every row shows the same thing three ways: the reward, its price in
              points, and how long that takes at the 6,000-step daily goal.</p>
          </div>
          <div className="tblwrap">
            <table>
              <thead>
                <tr><th>Reward</th><th>Points</th><th>Steps</th><th>Days at goal</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>Coffee at a partner café</strong></td><td className="num">1,500</td><td className="num">15,000</td><td>2&frac12; days</td></tr>
                <tr><td><strong>Fresh juice or smoothie</strong></td><td className="num">1,200</td><td className="num">12,000</td><td>2 days</td></tr>
                <tr><td><strong>10% off your bill</strong></td><td className="num">2,000</td><td className="num">20,000</td><td>3&frac12; days</td></tr>
                <tr><td><strong>Gym day pass</strong></td><td className="num">3,500</td><td className="num">35,000</td><td>6 days</td></tr>
                <tr><td><strong>Salon appointment discount</strong></td><td className="num">4,000</td><td className="num">40,000</td><td>1 week</td></tr>
                <tr><td><strong>Fitness class pack</strong></td><td className="num">5,000</td><td className="num">50,000</td><td>8&frac12; days</td></tr>
              </tbody>
            </table>
          </div>
          <div className="card pink stack g8">
            <p className="lbl">Read this bit</p>
            <p className="sm">These values are worked examples, not a published price list. Each partner
              sets the reward and what it costs in points, and the live figure is always shown in the
              app before you redeem anything.</p>
          </div>
        </div>
      </section>

      <Waves variant={3} />

      <section style={{ paddingBlock: 40 }}>
        <div className="wrap stack g28">
          <div className="stack g12">
            <p className="lbl">2 · Where they work</p>
            <h2 className="null" style={{ fontSize: 'var(--h2)' }}>The areas opening first</h2>
            <p className="lede">Move-Mint launches across these parts of Bahrain. Partner names are
              announced as each one signs — these are the areas, not the shops.</p>
          </div>
          <div className="card ink lit" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {AREAS.map((a) => <span className="pill mint" key={a}>{a}</span>)}
          </div>
        </div>
      </section>

      <section style={{ paddingBlock: 40 }}>
        <div className="wrap stack g28">
          <div className="stack g12">
            <p className="lbl">3 · How to redeem</p>
            <h2 className="null" style={{ fontSize: 'var(--h2)' }}>Four taps at the counter</h2>
          </div>
          <div className="flow">
            <div className="card ink lit stack g12"><h3 style={{ fontSize: 'var(--h3)' }}>Choose</h3>
              <p className="sm">Browse rewards by area or category in the app.</p></div>
            <div className="card ink stack g12"><h3 style={{ fontSize: 'var(--h3)' }}>Lock it in</h3>
              <p className="sm">Points are held the moment you tap redeem.</p></div>
            <div className="card pink stack g12"><h3 style={{ fontSize: 'var(--h3)' }}>Show the code</h3>
              <p className="sm">A one-time code appears. Staff enter it at the till.</p></div>
            <div className="card lit-v stack g12"><h3 style={{ fontSize: 'var(--h3)' }}>Walk home</h3>
              <p className="sm">The reward is applied and your balance updates.</p></div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------------- partners ---------------- */

export function Partners() {
  return (
    <section>
      <div className="wrap stack g56">
        <div className="stack g16">
          <p className="lbl">For business</p>
          <h1 className="null" style={{ fontSize: 'var(--statement)' }}>
            Footfall from people<br />already on their feet
          </h1>
          <p className="lede">
            Move-Mint sends you customers who walked past a dozen other doors to reach yours,
            because yours is the one their points work at. You set the reward. You keep the customer.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a className="btn" href="#apply" data-go="apply">Apply to partner</a>
            <a className="btn ghost" href="#faq" data-go="faq">Read the FAQ</a>
          </div>
        </div>

        <div className="grid c3">
          <div className="card ink lit stack g16">
            <p className="lbl">01 · Reach</p>
            <h3 style={{ fontSize: 'var(--h3)' }}>An audience already moving</h3>
            <p className="sm">Every user opted in to walking more. They are out of the house, in your
              area, and looking for somewhere their points land.</p>
          </div>
          <div className="card pink stack g16">
            <p className="lbl">02 · Control</p>
            <h3 style={{ fontSize: 'var(--h3)' }}>You set the reward</h3>
            <p className="sm">A free coffee at a points threshold, a percentage off, a day pass. You
              decide the value, the volume and the hours. Change it whenever.</p>
          </div>
          <div className="card lit-v stack g16">
            <p className="lbl v">03 · Fit</p>
            <h3 style={{ fontSize: 'var(--h3)' }}>A health-first list</h3>
            <p className="sm">We keep the network tight on purpose. Being on it says something about
              your business — worth more than being on every app in the country.</p>
          </div>
        </div>

        <div className="grid c2">
          <div className="card ink lit stack g16">
            <span className="pill mint" style={{ alignSelf: 'flex-start' }}>What you provide</span>
            <ul className="sm" style={{ margin: 0, paddingLeft: 22, lineHeight: 2 }}>
              <li>One reward, and the rules around it</li>
              <li>Staff who can accept a redemption code</li>
              <li>Your listing details — name, area and hours</li>
            </ul>
          </div>
          <div className="card pink stack g16">
            <span className="pill pinkp" style={{ alignSelf: 'flex-start' }}>What you get</span>
            <ul className="sm" style={{ margin: 0, paddingLeft: 22, lineHeight: 2 }}>
              <li>A listing with your area and category</li>
              <li>Redemption counts, by day and by reward</li>
              <li>A place in the carousel when you launch</li>
            </ul>
          </div>
        </div>

        <div className="stack g28">
          <h2 className="null" style={{ fontSize: 'var(--h2)' }}>Signing up</h2>
          <div className="flow">
            <div className="card ink lit stack g12"><h3 style={{ fontSize: 'var(--h3)' }}>Apply</h3>
              <p className="sm">Send the form. It takes about two minutes.</p></div>
            <div className="card ink stack g12"><h3 style={{ fontSize: 'var(--h3)' }}>Talk it through</h3>
              <p className="sm">We agree the reward and terms that suit your margins.</p></div>
            <div className="card pink stack g12"><h3 style={{ fontSize: 'var(--h3)' }}>Get set up</h3>
              <p className="sm">Your listing is built and your staff get access to redemptions.</p></div>
            <div className="card lit-v stack g12"><h3 style={{ fontSize: 'var(--h3)' }}>Go live</h3>
              <p className="sm">Your listing appears and users in your area are told.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- partner application ---------------- */

export function Apply() {
  const [msg, setMsg] = useState('We read every application and reply by email.');
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const biz = fieldValue(f, 'biz');
    openMail(
      `Partner application — ${biz || 'Move-Mint'}`,
      [
        `Business: ${biz}`,
        `Contact: ${fieldValue(f, 'who')}`,
        `Email: ${fieldValue(f, 'mail')}`,
        `Phone: ${fieldValue(f, 'tel')}`,
        `Category: ${fieldValue(f, 'cat')}`,
        `Area: ${fieldValue(f, 'area')}`,
        '',
        'Reward idea:',
        fieldValue(f, 'reward'),
      ].join('\n'),
    );
    setSent(true);
    setMsg('Opening your email app with the details filled in — press send.');
  };

  return (
    <section>
      <div className="wrap stack g40" style={{ maxWidth: 820 }}>
        <div className="stack g16">
          <p className="lbl">Partner application</p>
          <h1 className="null" style={{ fontSize: 'var(--statement)' }}>Tell us about<br />the place</h1>
          <p className="lede">Nothing here commits you to anything. We read every one and reply by email.</p>
        </div>
        <form
          className="card ink lit stack g28"
          noValidate
          onSubmit={submit}
        >
          <div className="grid c2">
            <div className="field"><label htmlFor="biz">Business name</label><input id="biz" required /></div>
            <div className="field"><label htmlFor="who">Your name</label><input id="who" required /></div>
          </div>
          <div className="grid c2">
            <div className="field"><label htmlFor="mail">Email</label><input id="mail" type="email" required /></div>
            <div className="field"><label htmlFor="tel">Phone</label><input id="tel" type="tel" /></div>
          </div>
          <div className="grid c2">
            <div className="field">
              <label htmlFor="cat">Category</label>
              <select id="cat" defaultValue="Café">
                <option>Café</option><option>Healthy restaurant</option><option>Gym or studio</option>
                <option>Salon</option><option>Shop</option><option>Something else</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="area">Area</label>
              <select id="area" defaultValue="Manama">
                <option>Manama</option><option>Seef</option><option>Adliya</option>
                <option>Juffair</option><option>Muharraq</option><option>Riffa</option>
                <option>Budaiya</option><option>Amwaj</option><option>Elsewhere in Bahrain</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="reward">What reward are you thinking of?</label>
            <textarea id="reward" rows={4}
              placeholder="A free coffee at 1,500 points, 10% off the bill, a free class…" />
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <button className="btn" type="submit">Send application</button>
            <span className="sm" style={sent ? { color: 'var(--mint)' } : undefined}>{msg}</span>
          </div>
        </form>
      </div>
    </section>
  );
}

/* ---------------- get the app ---------------- */

export function Get() {
  const [msg, setMsg] = useState('One email on launch day. Nothing else.');
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = fieldValue(e.currentTarget, 'early');
    openMail(
      'Add me to the Move-Mint launch list',
      `Please let me know when Move-Mint launches.\n\nEmail: ${email}`,
    );
    setSent(true);
    setMsg('Opening your email app — send it and you are on the list.');
  };

  return (
    <section>
      <div className="wrap grid hero-grid"
        style={{ gridTemplateColumns: '1fr 1fr', gap: 'clamp(30px,5vw,70px)', alignItems: 'center' }}>
        <div className="stack g28">
          <p className="lbl">Coming soon</p>
          <h1 className="null" style={{ fontSize: 'var(--display)' }}>
            Almost<br /><span className="neon">ready</span>
          </h1>
          <p className="lede">
            Move-Mint is in final testing with our first Bahrain partners. Leave an email and
            you will hear from us on launch day — once, not weekly.
          </p>
          <form
            className="card ink lit stack g16"
            style={{ maxWidth: 460 }}
            noValidate
            onSubmit={submit}
          >
            <div className="field">
              <label htmlFor="early">Email address</label>
              <input id="early" type="email" placeholder="you@example.com" required />
            </div>
            <button className="btn" type="submit" style={{ alignSelf: 'flex-start' }}>Tell me at launch</button>
            <span className="sm" style={sent ? { color: 'var(--mint)' } : undefined}>{msg}</span>
          </form>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <span className="pill">iOS · Apple Health</span>
            <span className="pill">Android · Health Connect</span>
          </div>
        </div>
        <div className="mascot-hero">
          <img
            src={mascotHeart}
            width={746}
            height={1000}
            loading="lazy"
            alt="The Move-Mint mascot holding a heart"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- faq ---------------- */

type QA = { q: string; a: string };

const USER_QA: QA[] = [
  { q: 'Does it cost anything?', a: 'No. The app is free and there is no subscription. Partners fund the rewards because it brings them customers.' },
  { q: 'Do I need a smartwatch or a band?', a: 'No. Your phone counts steps on its own. If you wear a watch that writes to Apple Health or Health Connect, those steps come through too.' },
  { q: 'How many points is a step worth?', a: 'Ten steps make one point. It does not change with streaks, tiers or time of day.' },
  { q: 'Do my points expire?', a: 'Points you have earned stay in your balance. Individual partner rewards can have their own end dates, and those are always shown before you redeem.' },
  { q: 'Can I cheat by shaking my phone?', a: 'You would be there a while — and we watch for step patterns no human produces. Accounts that fake steps lose their balance.' },
  { q: 'What happens to my health data?', a: 'We read your step count and nothing else — no heart rate, no workouts, and no location today. It is never sold, and partners never see it.' },
  { q: 'Will the app ever use my location?', a: 'Not today — the app does not ask for it. We are considering one use for later: alerting you when you are walking near a partner, so your points get spent. If we add it, you will be asked first, it stays off until you agree, and you can switch it off again at any time.' },
  { q: 'Is it only in Bahrain?', a: 'Yes, for now. The whole point is spending points close to where you walked, so we are building Bahrain properly first.' },
];

const BIZ_QA: QA[] = [
  { q: 'What does it cost to join?', a: 'Commercial terms are agreed per partner, based on the reward you offer and your category. We talk it through before anything is signed.' },
  { q: 'Do I need new hardware at the till?', a: 'No. Staff enter a short code from the customer’s phone. It works with whatever till you already have.' },
  { q: 'Can I change or pause my reward?', a: 'Yes, at any time. You control the value, the volume and the hours it runs.' },
  { q: 'What do I see about customers?', a: 'Redemption counts by day and by reward. You never receive step data or personal health information.' },
  { q: 'Who can apply?', a: 'Any business in Bahrain, though we weight the list toward places that fit a health-first network.' },
];

function Accordion({ items, openFirst }: { items: QA[]; openFirst?: boolean }) {
  return (
    <div>
      {items.map((item, i) => (
        <details key={item.q} open={openFirst && i === 0}>
          <summary><span className="q">{item.q}</span><span className="pl">+</span></summary>
          <p className="a">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Faq() {
  return (
    <section>
      <div className="wrap stack g40" style={{ maxWidth: 920 }}>
        <div className="stack g16">
          <p className="lbl">Questions</p>
          <h1 className="null" style={{ fontSize: 'var(--statement)' }}>The things<br />everyone asks</h1>
        </div>
        <div className="stack g16">
          <p className="lbl d">For people walking</p>
          <Accordion items={USER_QA} openFirst />
        </div>
        <div className="stack g16">
          <p className="lbl b">For businesses</p>
          <Accordion items={BIZ_QA} />
        </div>
      </div>
    </section>
  );
}

/* ---------------- about ---------------- */

export function About() {
  return (
    <section>
      <div className="wrap stack g56">
        <div className="stack g16" style={{ maxWidth: '62ch' }}>
          <p className="lbl">About</p>
          <h1 className="null" style={{ fontSize: 'var(--statement)' }}>
            Movement, made<br />worth something
          </h1>
          <p className="lede">Most of Bahrain already walks four to six thousand steps a day without
            calling it exercise. Move-Mint was built on a simple observation: that effort is real,
            it is happening anyway, and right now it buys nothing.</p>
          <p className="lede">So we connected two things that were already there — the step counter in
            everyone&rsquo;s pocket, and the local businesses who want people through the door.</p>
        </div>

        <div className="grid c3">
          <div className="card ink lit stack g12">
            <p className="lbl">Founder</p>
            <h3 style={{ fontSize: 'var(--h3)' }}>Norhan Hani</h3>
            <p className="sm">Move-Mint W.L.L., Bahrain</p>
          </div>
          <div className="card pink stack g12">
            <p className="lbl">Email</p>
            <h3 style={{ fontSize: '1.2rem' }}>
              <a href="mailto:info@move-mintapp.com" style={{ textDecoration: 'none' }}>info@move-mintapp.com</a>
            </h3>
            <p className="sm">Partnerships, press and brand files</p>
          </div>
          <div className="card lit-v stack g12">
            <p className="lbl v">Phone</p>
            <h3 style={{ fontSize: 'var(--h3)' }}>
              <a href="tel:+97334077656" style={{ textDecoration: 'none' }}>3407 7656</a>
            </h3>
            <p className="sm">Sunday to Thursday</p>
          </div>
        </div>

        <div className="card ink lit stack g16">
          <p className="lbl">Brand files</p>
          <h3 style={{ fontSize: 'var(--h3)' }}>Using the Move-Mint mark</h3>
          <p className="sm">Partners and press should request logo files and fonts before publishing,
            rather than lifting the mark from a screenshot. Write to the address above and we will
            send the badge, the wordmark and the current guidelines.</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- privacy ---------------- */

export function Privacy() {
  return (
    <section>
      <div className="wrap stack g40" style={{ maxWidth: 820 }}>
        <div className="stack g16">
          <p className="lbl">Privacy</p>
          <h1 className="null" style={{ fontSize: 'var(--statement)' }}>
            What we read,<br />and what we don&rsquo;t
          </h1>
          <p className="lede">Move-Mint handles health information, so this page is written to be read
            rather than skipped. Plain summary first; the full legal policy is published before launch.</p>
        </div>

        <div className="grid c2">
          <div className="card ink lit stack g16">
            <p className="lbl">We read</p>
            <ul className="sm" style={{ margin: 0, paddingLeft: 22, lineHeight: 2 }}>
              <li>Daily step count from Apple Health or Health Connect</li>
              <li>The account details you enter yourself</li>
              <li>Which rewards you redeem, and when</li>
            </ul>
          </div>
          <div className="card pink stack g16">
            <p className="lbl">We never read</p>
            <ul className="sm" style={{ margin: 0, paddingLeft: 22, lineHeight: 2 }}>
              <li>Heart rate, sleep, weight or workouts</li>
              <li>Contacts, photos or messages</li>
              <li>Your card details — you pay the partner directly</li>
            </ul>
          </div>
        </div>

        <div className="card lit-v stack g12">
          <p className="lbl v">Location · not today</p>
          <h3 style={{ fontSize: 'var(--h3)' }}>One thing we may ask for later</h3>
          <p className="sm">Move-Mint does not use your location, and the app does not ask for it today.
            There is one use we are considering for the future: letting the app tell you when you are
            walking near a partner, so points get spent rather than saved up and forgotten.</p>
          <p className="sm">If we build it, the app will ask you first and it stays off until you say
            yes. You can turn it off again whenever you like, and nothing about your steps, your points
            or your rewards depends on it. We will update this page before anything changes.</p>
        </div>

        <div className="grid c2">
          <div className="card ink stack g12">
            <h3 style={{ fontSize: 'var(--h3)' }}>We do not sell health data</h3>
            <p className="sm">Step data is never sold, rented or shared for advertising. It works out
              your points balance, and that is all.</p>
          </div>
          <div className="card ink stack g12">
            <h3 style={{ fontSize: 'var(--h3)' }}>Partners see a code, not a person</h3>
            <p className="sm">When you redeem, the business receives a one-time code and the reward
              attached to it — not your step count, balance or health information.</p>
          </div>
        </div>

        <div className="card lit-v stack g12">
          <h3 style={{ fontSize: 'var(--h3)' }}>You can withdraw access at any time</h3>
          <p className="sm">Revoke Move-Mint&rsquo;s permission in Apple Health or Health Connect and
            syncing stops immediately. Delete your account and we remove your step history.</p>
        </div>

        <div className="card ink lit-b stack g8">
          <p className="lbl b">Summary</p>
          <p className="sm">This page is a plain-language summary of how Move-Mint handles your data.
            The full legal policy is published before the app launches. If anything here is unclear,
            write to <a href="mailto:info@move-mintapp.com" style={{ color: 'var(--blush)' }}>
            info@move-mintapp.com</a> and a person will answer.</p>
        </div>
      </div>
    </section>
  );
}
