'use client';

// app/page.tsx — Ema Tosin · Project Manager portfolio (flat redesign)
// Replace your whole app/page.tsx with this file. Needs only Next.js (App Router) + Tailwind.
// EDIT ME: everything you will want to change is in the DATA block below (projects are real now; STATS, email and LinkedIn are still SAMPLE).
// Photo: put a picture in /public (e.g. /ema.jpg) and set PERSON.photo = '/ema.jpg'.
// Project previews: each project's shots[] are image URLs; to use your own, put images in /public and list them like '/talim-1.png'.

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Bricolage_Grotesque, DM_Sans, DM_Mono } from 'next/font/google';

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--f-display' });
const sans = DM_Sans({ subsets: ['latin'], variable: '--f-sans' });
const mono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--f-mono' });

/* ───────────── DATA (edit me) ───────────── */

const PERSON = {
  name: 'Ema Tosin',
  role: 'Project Manager',
  email: 'tosin.ema01@gmail.com',
  phone: '+1 226 606 7046',
  phoneRaw: '+12266067046',
  location: 'Toronto, Ontario',
  linkedin: '#',
  photo: '',
  intro: 'I plan, coordinate and deliver technology projects, keeping people, budgets and deadlines pointing the same way.',
};

const STATS = [
  { v: '24+', l: 'Projects delivered' },
  { v: '94%', l: 'Delivered on time' },
  { v: '120+', l: 'People coordinated' },
  { v: '6 yrs', l: 'In technology' },
];

type Tone = 'blue' | 'green' | 'sand' | 'clay';
type Tag = 'Fintech' | 'Commerce' | 'Impact';
type LinkItem = { label: string; url: string };
type Project = {
  id: string; name: string; tag: Tag; kind: string; status: string; tone: Tone;
  summary: string; outcomes: [string, string][]; features: string[];
  shots: string[]; fit?: 'cover' | 'contain'; links: LinkItem[];
};

const TONES: Record<Tone, { bg: string; ink: string }> = {
  blue: { bg: '#E3E9F6', ink: '#2B4A9B' },
  green: { bg: '#E0EDE4', ink: '#2F6B4B' },
  sand: { bg: '#F2E8D5', ink: '#8A6420' },
  clay: { bg: '#F1E0D8', ink: '#A04A2B' },
};

const L = (label: string, url: string): LinkItem => ({ label, url });

const PROJECTS: Project[] = [
  {
    id: 'empowerdreamz', name: 'EmpowerDreamz Foundation', tag: 'Impact', kind: 'Website', status: 'Live · 4th water project in progress', tone: 'blue', fit: 'cover',
    summary: 'Website for a Nigerian foundation that builds solar-powered water systems for rural communities. It shows the programmes, project pages, film and photo gallery, and takes donations online.',
    outcomes: [['3', 'Water projects built'], ['3', 'States reached'], ['4,000+', 'Lives changed']],
    features: ['Programmes: clean water now, education from 2027, healthcare from 2028', 'A page for each community project, plus photo gallery and build film', 'Online donations', 'Content managed from an admin area'],
    shots: [
      'https://firebasestorage.googleapis.com/v0/b/empowerdreamz-4a302.firebasestorage.app/o/media%2F1791072191840-whatsapp-image-2026-09-20-at-12.45.23-pm.jpeg?alt=media&token=ba6e138b-96e0-4b16-8a97-8f4c1cd1e066',
      'https://firebasestorage.googleapis.com/v0/b/empowerdreamz-4a302.firebasestorage.app/o/media%2F1790124924404-a.png?alt=media&token=0c268f18-8622-4aa3-a797-54d0e07ca0c5',
      'https://firebasestorage.googleapis.com/v0/b/empowerdreamz-4a302.firebasestorage.app/o/media%2F1790125359564-f.png?alt=media&token=c5f7c0e2-a3de-4359-91b7-7dcc628ad12b',
      'https://www.empowerdreamz.org/assets/carrying-water.jpg',
    ],
    links: [L('Live website', 'https://www.empowerdreamz.org/')],
  },
  {
    id: 'talim', name: 'Talim', tag: 'Impact', kind: 'Website + mobile app', status: 'Live · iOS app out, Android coming', tone: 'green',
    summary: 'School management platform that brings admissions, attendance, timetables, results, fees and messages into one record, with separate portals for administrators, teachers, parents and students.',
    outcomes: [['4', 'Stakeholder portals'], ['6', 'Types of institution'], ['iOS', 'Mobile app live']],
    features: ['Admin, teacher, parent and student portals on one shared record', 'Attendance, timetable, assessments and grading', 'Fee payments, receipts and announcements', 'Mobile app for parents, teachers and learners', 'Verified academic records, on the roadmap'],
    shots: [
      'https://www.mytalim.com/images/landing/product/admin-dashboard-demo.png',
      'https://www.mytalim.com/images/landing/product/classes-demo.png',
      'https://www.mytalim.com/images/landing/product/teacher-dashboard-demo.png',
      'https://www.mytalim.com/images/landing/product/parent-children-demo.png',
    ],
    links: [L('Live website', 'https://www.mytalim.com/'), L('iOS app on the App Store', 'https://apps.apple.com/us/app/mytalim/id6783429017')],
  },
  {
    id: 'ethnihub', name: 'EthniHub', tag: 'Commerce', kind: 'Website + apps', status: 'Live · Helsinki, Vantaa and Espoo', tone: 'clay',
    summary: 'Cultural marketplace in Finland for food, groceries, wellness and events. Customers order from local merchants, riders deliver, and merchants run their own storefronts.',
    outcomes: [['4', 'Services in one app'], ['3', 'Apps: customer, merchant, rider'], ['3', 'Cities served']],
    features: ['EthniEats, EthniMarket, EthniCare and EthniEvent under one account', 'Merchant storefronts with orders and analytics', 'Rider app with earnings and tracking', 'Checkout with real-time order tracking'],
    shots: [
      'https://customer.ethnihub.fi/home/customer-mockup.png',
      'https://customer.ethnihub.fi/home/four-services/eats.png',
      'https://customer.ethnihub.fi/home/four-services/market.png',
      'https://customer.ethnihub.fi/home/four-services/care.png',
    ],
    links: [L('Live website', 'https://customer.ethnihub.fi/')],
  },
  {
    id: 'truust', name: 'Truust', tag: 'Commerce', kind: 'Website + mobile app', status: 'Website live · app coming to iOS and Android', tone: 'sand',
    summary: 'Social marketplace for Nigeria where buyers and sellers chat, lock payment in escrow and choose a rider by live bid, so nobody has to pay first and hope.',
    outcomes: [['3', 'Pillars: chat, escrow, riders'], ['5', 'Steps, listing to payout']],
    features: ['Social feed of listings from people you follow', 'In-app chat and price negotiation', 'Escrow that holds funds until delivery is confirmed', 'Riders bid on each delivery', 'Wallet with bank withdrawals and dispute review'],
    shots: ['https://www.truust.com.ng/truust-hero-1400.webp', 'https://www.truust.com.ng/twitter%20header.png'],
    links: [L('Live website', 'https://www.truust.com.ng/')],
  },
  {
    id: 'skribe', name: 'Skribe', tag: 'Fintech', kind: 'Website + mobile app', status: 'Launching', tone: 'blue',
    summary: 'Subscription tracker built around a real card. Subscriptions are found from card charges, and transfers and bill payments run through the card balance.',
    outcomes: [['2', 'Cards at launch: naira and dollar'], ['Auto', 'Subscription detection']],
    features: ['Naira and dollar cards', 'Subscriptions detected from card charges', 'Card balance for transfers and bill payments', 'Ongoing and expired subscriptions, with a spending view'],
    shots: ['/skribe-1.png', '/skribe-2.png', '/skribe-3.png'],
    links: [L('Live website', 'https://www.skribesub.com/')],
  },
  {
    id: 'payton', name: 'Payton', tag: 'Fintech', kind: 'Mobile app', status: 'Live on Google Play', tone: 'green',
    summary: 'Android app for paying data, airtime and TV subscriptions quickly, with instant notifications and a range of supported providers.',
    outcomes: [['100+', 'Downloads'], ['5.0', 'Play Store rating'], ['3', 'Bill types: data, airtime, TV']],
    features: ['Pay for data, airtime and TV subscriptions', 'Instant payment notifications', 'Wide range of supported providers', 'Data encrypted in transit'],
    shots: [
      'https://play-lh.googleusercontent.com/fjUK_naMYTV_JWRU1lbiyZRkPTGscU6cxAHDm7wutCv-k9CDds8S5XWs-UTrKNkH6NFJXhGveD83b-Qhms9sGg=w526-h296',
      'https://play-lh.googleusercontent.com/kNPfXi5yzidHEpG1-wM2SX_X_66G9YZ8Mr0CbIrsOFTVwvAfupoo3tvhYX221G51yTi5ljK7z5j5rMuskOAdZGQ=w526-h296',
      'https://play-lh.googleusercontent.com/57iU6rHyePIycjDxv8fOa2NsJAafDtc_Bwwc-um-h3_qP3PPRiw3z1DhHwu-MWpVXPLXmInsgppzMp2MHyOY=w526-h296',
    ],
    links: [L('Android app on Google Play', 'https://play.google.com/store/apps/details?id=com.payton.app&hl=en')],
  },
  {
    id: 'chopwell', name: 'Chopwell Rider', tag: 'Commerce', kind: 'Mobile app', status: 'Live on Google Play', tone: 'clay',
    summary: 'Android app for dispatch riders who deliver meals on Chopwell, built so riders can earn from every delivery.',
    outcomes: [['10+', 'Downloads'], ['Android', 'Rider app']],
    features: ['Delivery app for dispatch riders', 'Meal orders for the Chopwell platform', 'Uses rider location during deliveries'],
    shots: [
      'https://play-lh.googleusercontent.com/yX4J1WrRjk2G1z5xykAY9He2AmtCaUOawmD9U-cxOTTeaR9UMRI0rtPFhRKwofEzNNVkQqzVM2yvzdDOG4CV=w526-h296',
      'https://play-lh.googleusercontent.com/48_52uRMPnzcEGBulMfXyoUGazo0dx9NeewcTzMPtzaMHraKY0z8iJ3eWNcERNNHO6X7iilrcaWe8ogIZNpYDQ=w526-h296',
      'https://play-lh.googleusercontent.com/EG9EOK9Lg_bP8NjPemfC9QPWcRkGEpuy5Q6YTdf51-1sB6S1a6sz_NakPEOPEhst-XX3ByjjZ9WqLokZ_MTcyt8=w526-h296',
    ],
    links: [L('Android app on Google Play', 'https://play.google.com/store/apps/details?id=chopwell.rider&hl=en')],
  },
  {
    id: 'circlepay', name: 'CirclePay', tag: 'Fintech', kind: 'Website', status: 'Live', tone: 'sand',
    summary: 'Financial platform for savings circles, cooperatives and community groups, with treasury, governance and group finance tools in place of WhatsApp groups and spreadsheets.',
    outcomes: [['3', 'Core areas: treasury, governance, group finance'], ['Web', 'Platform']],
    features: ['Treasury tools for group funds', 'Governance tools for members', 'Collective finance for savings circles and cooperatives'],
    shots: ['/circlepay-1.png', '/circlepay-2.png'],
    links: [L('Live website', 'https://circlepaytech.com/')],
  },
  {
    id: 'propx', name: 'PropX', tag: 'Commerce', kind: 'Website', status: 'Demo live on Vercel', tone: 'blue', fit: 'cover',
    summary: 'Website for a Port Harcourt property practice, with home, listings, about and contact pages.',
    outcomes: [['4', 'Pages'], ['PH', 'Port Harcourt']],
    features: ['Property listings page', 'About and contact pages', 'Enquiry form'],
    shots: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    ],
    links: [L('Live website', 'https://propx-phi.vercel.app/')],
  },
];

const SERVICES = [
  { t: 'Delivery planning', d: 'Roadmaps, milestones and owners agreed up front, so everyone knows what done looks like.' },
  { t: 'Stakeholder management', d: 'One clear line between leadership, technical teams and end users.' },
  { t: 'Budget and vendor control', d: 'Weekly tracking against milestones and firm, fair supplier negotiation.' },
  { t: 'Risk and change', d: 'Risks logged early, scope changes approved simply, surprises kept small.' },
  { t: 'Team coaching', d: 'Short cycles, visible progress and blockers cleared fast.' },
];

const STEPS = [
  { t: 'Discover', d: 'Understand the real problem. Talk to every stakeholder, write a one-page brief and name the risks early.' },
  { t: 'Plan', d: 'Turn the goal into dates, owners and a budget, with a roadmap and agreed responsibilities.' },
  { t: 'Deliver', d: 'Short weekly check-ins, honest status every week and risks tracked until they are closed.' },
  { t: 'Review', d: 'Hand over cleanly, measure what changed and run a lessons-learned session.' },
];

const TOOLS = ['Jira', 'Asana', 'Trello', 'Notion', 'MS Project', 'Confluence', 'Slack', 'Excel', 'Power BI', 'ServiceNow'];
const METHODS = ['Agile and Scrum', 'Waterfall planning', 'RAID logs', 'Budget tracking', 'Vendor management', 'Roadmaps', 'Status reporting', 'Change management', 'IT service delivery', 'Process improvement'];

const PRINCIPLES = [
  { t: 'I speak both languages', d: 'Years on the support desk taught me how technical teams and everyday users each see a problem.' },
  { t: 'Plain, honest updates', d: 'Short notes that say what is done, what is at risk and what I need from you.' },
  { t: 'Calm under pressure', d: 'Deadlines move and plans change. I keep the team steady and the decisions clear.' },
];

/* ───────────── helpers ───────────── */

const CSS = `html{scroll-behavior:smooth}
.ema{--ink:#0C1511;--mute:#5E675F;--line:#D9D5C7;--paper:#F4F1E8;--card:#FFFFFF;--acc:#0E3B2C;--lime:#D9F36B;--coral:#FF7A59;--lilac:#CDBEFF}
.f-sans{font-family:var(--f-sans),system-ui,sans-serif}
.f-display{font-family:var(--f-display),system-ui,sans-serif;font-weight:800;letter-spacing:-.045em}
.f-serif{font-family:var(--f-display),system-ui,sans-serif;font-weight:700;letter-spacing:-.03em}
.f-mono{font-family:var(--f-mono),ui-monospace,monospace}
.rv{opacity:0;transform:translateY(32px);transition:opacity .9s cubic-bezier(.2,.7,.2,1),transform .9s cubic-bezier(.2,.7,.2,1)}
.rv.in{opacity:1;transform:none}
.word{display:inline-block;transform:translateY(110%);animation:wordIn .9s cubic-bezier(.2,.8,.2,1) forwards}
@keyframes wordIn{to{transform:none}}
@keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes mqr{from{transform:translateX(-50%)}to{transform:translateX(0)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
@keyframes up{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.mq{animation:mq 38s linear infinite}.mqr{animation:mqr 46s linear infinite}
.mq:hover,.mqr:hover{animation-play-state:paused}
.spin{animation:spin 18s linear infinite}.bob{animation:bob 6s ease-in-out infinite}
.up{animation:up .35s ease both}
.outline{-webkit-text-stroke:2px var(--ink);color:transparent}
.fdoc{transition:transform .4s cubic-bezier(.2,.8,.2,1)}
.fdoc0{transform:rotate(-4deg)}.fdoc1{transform:rotate(0)}.fdoc2{transform:rotate(4deg)}
.fold:hover .fdoc0{transform:translate(-8px,-26px) rotate(-9deg)}
.fold:hover .fdoc1{transform:translate(0,-34px)}
.fold:hover .fdoc2{transform:translate(8px,-26px) rotate(9deg)}
::selection{background:var(--lime);color:var(--ink)}
@media (prefers-reduced-motion:reduce){.rv,.word,.mq,.mqr,.spin,.bob,.fdoc,.up{animation:none!important;transition:none!important;opacity:1!important;transform:none!important}}`;

function Shot({ src, p, fit = 'cover', className = '' }: { src?: string; p: Project; fit?: 'cover' | 'contain'; className?: string }) {
  const [bad, setBad] = useState(false);
  const t = TONES[p.tone];
  if (!src || bad) {
    return (
      <div className={`grid place-items-center ${className}`} style={{ background: t.bg, color: t.ink }}>
        <span className="f-display text-[clamp(28px,4vw,56px)]">{p.name.slice(0, 2)}</span>
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" loading="lazy" referrerPolicy="no-referrer" onError={() => setBad(true)} className={`${fit === 'cover' ? 'object-cover' : 'object-contain'} ${className}`} />
  );
}

function Folder({ p }: { p: Project }) {
  const t = TONES[p.tone];
  const n = Math.max(1, Math.min(3, p.shots.length));
  const cls = n === 1 ? [1] : n === 2 ? [0, 2] : [0, 1, 2];
  const left = n === 1 ? [33] : n === 2 ? [20, 46] : [9, 30, 51];
  return (
    <div className="fold relative h-[190px] w-full">
      <div className="absolute left-4 top-0 h-6 w-20 rounded-t-lg" style={{ background: t.ink }} />
      <div className="absolute inset-x-0 bottom-0 top-4 rounded-xl" style={{ background: t.ink }} />
      {cls.map((c, i) => (
        <div key={i} className={`fdoc fdoc${c} absolute bottom-10 w-[34%] origin-bottom`} style={{ left: `${left[i]}%`, zIndex: i }}>
          <div className="aspect-[4/5] w-full overflow-hidden rounded-md border border-[var(--line)] bg-white shadow-[0_6px_16px_rgba(0,0,0,.18)]">
            <Shot src={p.shots[i]} p={p} className="h-full w-full" />
          </div>
        </div>
      ))}
      <div className="absolute inset-x-0 bottom-0 z-10 h-[56%] rounded-xl" style={{ background: t.bg }}>
        <div className="flex h-full items-end justify-between px-4 pb-3 text-[11px] font-semibold" style={{ color: t.ink }}>
          <span>{p.tag}</span><span>{p.kind}</span>
        </div>
      </div>
    </div>
  );
}

/* ───────────── motion helpers ───────────── */

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold, rootMargin: '0px 0px -8% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const [ref, seen] = useInView<HTMLDivElement>();
  return <div ref={ref} className={`rv ${seen ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function Words({ text, start = 0, step = 80 }: { text: string; start?: number; step?: number }) {
  return (
    <>
      {text.split(' ').map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
          <span className="word" style={{ animationDelay: `${start + i * step}ms` }}>{w}&nbsp;</span>
        </span>
      ))}
    </>
  );
}

function CountUp({ to }: { to: number }) {
  const [ref, seen] = useInView<HTMLSpanElement>(0.5);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / 1500);
      setN(Math.round(to * (1 - Math.pow(1 - k, 4))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <span ref={ref} className="tabular-nums">{n}</span>;
}

function Marquee({ items, reverse = false, outline = false, className = '' }: { items: string[]; reverse?: boolean; outline?: boolean; className?: string }) {
  const all = [...items, ...items];
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className={`${reverse ? 'mqr' : 'mq'} flex w-max items-center gap-10 pr-10`}>
        {all.map((t, i) => (
          <span key={i} className="f-display flex items-center gap-10 text-[clamp(36px,5vw,68px)] leading-none">
            <span className={outline ? 'outline' : ''}>{t}</span>
            <span className="text-[0.6em] text-[var(--coral)]">✺</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const label = 'f-mono text-[12.5px] uppercase tracking-[0.14em]';

/* ───────────── sections ───────────── */

function Explorer() {
  const [open, setOpen] = useState<string | null>(null);
  const [shot, setShot] = useState(0);
  const [filter, setFilter] = useState<'All' | Tag>('All');
  const top = useRef<HTMLDivElement>(null);
  const tags: ('All' | Tag)[] = ['All', 'Fintech', 'Commerce', 'Impact'];
  const list = PROJECTS.filter((p) => filter === 'All' || p.tag === filter);
  const proj = PROJECTS.find((p) => p.id === open) ?? null;
  const t = proj ? TONES[proj.tone] : null;
  const close = () => { setOpen(null); setShot(0); };
  const show = (id: string) => { setOpen(id); setShot(0); top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  return (
    <div ref={top} className="scroll-mt-24">
      <div className="flex flex-wrap items-center gap-2">
        {tags.map((tg) => (
          <button
            key={tg}
            onClick={() => { setFilter(tg); close(); }}
            className={`rounded-full border px-4 py-2 text-[14px] transition ${filter === tg ? 'border-[var(--ink)] bg-[var(--ink)] text-white' : 'border-[var(--line)] hover:border-[var(--ink)]'}`}
          >
            {tg === 'All' ? 'All projects' : tg}
          </button>
        ))}
        {proj ? <button onClick={close} className="ml-auto text-[14px] font-medium underline underline-offset-4">&larr; All projects</button> : null}
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6 md:p-10" key={open ?? 'root'}>
        {!proj || !t ? (
          <div className="up grid grid-cols-1 gap-x-6 gap-y-12 pt-2 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((p) => (
              <button key={p.id} onClick={() => show(p.id)} className="text-left">
                <Folder p={p} />
                <div className="mt-4 text-[17px] font-semibold leading-snug tracking-tight">{p.name}</div>
                <div className="mt-1 text-[13px] text-[var(--mute)]">{p.outcomes.slice(0, 2).map(([v, l]) => `${v} ${l.toLowerCase()}`).join(' · ')}</div>
              </button>
            ))}
          </div>
        ) : (
          <div className="up">
            <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start">
              <div>
                <div className="overflow-hidden rounded-2xl" style={{ background: t.bg }}>
                  <div className="aspect-[16/10] w-full">
                    <Shot key={shot} src={proj.shots[shot]} p={proj} fit={proj.fit ?? 'contain'} className="h-full w-full" />
                  </div>
                </div>
                {proj.shots.length > 1 && (
                  <div className="mt-3 flex flex-wrap gap-3">
                    {proj.shots.map((src, i) => (
                      <button
                        key={src}
                        onClick={() => setShot(i)}
                        aria-label={`Show preview ${i + 1}`}
                        className="aspect-[16/10] w-24 overflow-hidden rounded-lg transition"
                        style={{ background: t.bg, outline: i === shot ? `2px solid ${t.ink}` : '2px solid transparent', outlineOffset: 2, opacity: i === shot ? 1 : 0.65 }}
                      >
                        <Shot src={src} p={proj} className="h-full w-full" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3 text-[12px]">
                  <span className="rounded-full px-3 py-1 font-semibold" style={{ background: t.bg, color: t.ink }}>{proj.tag}</span>
                  <span className="text-[var(--mute)]">{proj.kind} · {proj.status}</span>
                </div>
                <h3 className="f-serif mt-4 text-[clamp(34px,4vw,56px)] leading-[1.02]">{proj.name}</h3>
                <p className="mt-4 max-w-[520px] text-[16px] leading-relaxed text-[var(--mute)]">{proj.summary}</p>
                <div className="mt-7 text-[13px] font-medium text-[var(--mute)]">Delivered and in use</div>
                <div className="mt-3 flex flex-wrap gap-3">
                  {proj.links.map((l, i) => (
                    <a
                      key={l.url}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`rounded-full px-6 py-3 text-[15px] font-semibold transition hover:-translate-y-0.5 ${i === 0 ? 'bg-[var(--acc)] text-white hover:bg-[var(--ink)]' : 'border border-[var(--ink)] hover:bg-[var(--lime)]'}`}
                    >
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className={`mt-12 grid border-t border-[var(--ink)] ${proj.outcomes.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'}`}>
              {proj.outcomes.map(([v, l]) => (
                <div key={l} className="border-b border-[var(--line)] py-6 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0">
                  <div className="f-serif text-[clamp(34px,4vw,52px)] leading-none" style={{ color: t.ink }}>{v}</div>
                  <div className="mt-2 text-[14px] text-[var(--ink)]/70">{l}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-[220px_1fr] lg:gap-10">
              <h4 className="f-serif text-[28px] leading-none">What it does</h4>
              <ul className="border-t border-[var(--ink)]">
                {proj.features.map((x) => (
                  <li key={x} className="border-b border-[var(--line)] py-4 text-[16px] leading-relaxed text-[var(--ink)]/85">{x}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



function Nav() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  const links = [['Work', '#work'], ['Services', '#services'], ['Process', '#process'], ['About', '#about']];
  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] h-1"><div className="h-full bg-[var(--lime)]" style={{ width: `${pct}%` }} /></div>
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav className="flex w-full max-w-[880px] items-center justify-between rounded-full bg-[var(--paper)] py-2 pl-5 pr-2 text-[var(--ink)]">
          <a href="#top" className="f-display text-[18px]">{PERSON.name}</a>
          <div className="hidden items-center gap-1 md:flex">
            {links.map(([l, h]) => <a key={l} href={h} className="rounded-full px-4 py-2 text-[14px] font-medium transition hover:bg-[var(--lime)]">{l}</a>)}
          </div>
          <a href="#contact" className="rounded-full bg-[var(--acc)] px-5 py-2.5 text-[14px] font-medium text-white transition hover:bg-[var(--ink)]">Let&rsquo;s talk</a>
        </nav>
      </header>
    </>
  );
}

const ROTATE = ['calmly.', 'on time.', 'on budget.', 'together.'];
const pill = 'h-[0.78em] shrink-0 items-center justify-center overflow-hidden rounded-full align-middle';

function Line({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.1em]">
      <span className="word"><span className="flex items-center gap-[0.2em]">{children}</span></span>
    </span>
  );
}

function Hero() {
  const [y, setY] = useState(0);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const on = () => setY(window.scrollY);
    window.addEventListener('scroll', on, { passive: true });
    const still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = still ? undefined : setInterval(() => setIdx((i) => (i + 1) % ROTATE.length), 2200);
    return () => { window.removeEventListener('scroll', on); if (t) clearInterval(t); };
  }, []);
  const initials = PERSON.name.split(' ').map((w) => w[0]).join('');
  const cur = PROJECTS.find((x) => x.id === 'skribe') ?? PROJECTS[0];
  const link = cur.links[0];
  return (
    <section id="top" className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[var(--acc)] px-5 pb-10 pt-28 text-[var(--paper)] md:px-10">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full bg-[#14503C]" style={{ transform: `translateY(${y * 0.15}px)` }} />
      <div className="pointer-events-none absolute -bottom-52 left-[30%] h-[460px] w-[460px] rounded-full border-[2px] border-[var(--lime)]/25" style={{ transform: `translateY(${y * -0.1}px)` }} />

      <div className="relative mx-auto flex w-full max-w-[1400px] items-center justify-between">
        <div className={`${label} text-[var(--lime)]`}>(&nbsp;{PERSON.role}&nbsp;)</div>
        <div className={`${label} flex items-center gap-2.5`}>
          {PERSON.location}
        </div>
      </div>

      <div className="relative mx-auto my-12 w-full max-w-[1400px]">
        <h1 className="f-display text-[clamp(52px,11.2vw,184px)] leading-[0.88]">
          <Line delay={100}>
            Technology
            <span className={`${pill} inline-flex w-[1.7em] bg-[var(--lime)] text-[0.3em] text-[var(--acc)]`}>
              {PERSON.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={PERSON.photo} alt={PERSON.name} className="h-full w-full object-cover" />
              ) : initials}
            </span>
          </Line>
          <Line delay={250}>
            projects,
            <span className={`${pill} inline-flex w-[1.1em] bg-[var(--coral)] text-[0.5em] text-[var(--ink)]`}><span className="spin inline-block">✺</span></span>
            <span className={`${pill} f-mono hidden w-auto bg-[var(--paper)] px-[0.5em] text-[0.2em] font-medium uppercase tracking-wider text-[var(--ink)] md:inline-flex`}>24+ shipped</span>
          </Line>
          <Line delay={400}>
            delivered
            <span className="inline-grid overflow-hidden pb-[0.12em] text-[var(--lime)]">
              {ROTATE.map((w, i) => (
                <span key={w} className="col-start-1 row-start-1 whitespace-nowrap transition-all duration-700 ease-[cubic-bezier(.2,.8,.2,1)]"
                  style={{ transform: i === idx ? 'none' : i === (idx + ROTATE.length - 1) % ROTATE.length ? 'translateY(-110%)' : 'translateY(110%)', opacity: i === idx ? 1 : 0 }}>
                  {w}
                </span>
              ))}
            </span>
          </Line>
        </h1>
      </div>

      <Reveal delay={800} className="relative mx-auto grid w-full max-w-[1400px] gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-5">
          <p className="max-w-[460px] text-[19px] leading-relaxed text-[var(--paper)]/75">{PERSON.intro}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#work" className="rounded-full bg-[var(--lime)] px-7 py-3.5 text-[16px] font-semibold text-[var(--ink)] transition hover:-translate-y-1">Open project files</a>
            <a href="#contact" className="rounded-full border border-[var(--paper)]/50 px-7 py-3.5 text-[16px] font-semibold transition hover:bg-[var(--paper)] hover:text-[var(--acc)]">Say hello</a>
          </div>
        </div>

        <div className="lg:col-span-4 lg:col-start-7">
          <div className="rounded-2xl bg-[var(--paper)] p-5 text-[var(--ink)]">
            <div className="flex items-center justify-between">
              <span className={`${label} text-[var(--acc)]`}>Latest work</span>
              <span className="f-mono text-[12px] text-[var(--mute)]">{cur.kind}</span>
            </div>
            <div className="f-serif mt-3 text-[22px] leading-tight">{cur.name}</div>
            <p className="mt-2 text-[14px] leading-relaxed text-[var(--mute)]">{cur.status}</p>
            {link?.url ? (
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block rounded-full bg-[var(--acc)] px-5 py-2.5 text-[14px] font-medium text-white transition hover:bg-[var(--ink)]">
                {link.label} ↗
              </a>
            ) : null}
          </div>
        </div>

        <a href="#work" className="hidden justify-end lg:col-span-2 lg:col-start-11 lg:flex" aria-label="Scroll to work">
          <span className="grid h-24 w-24 place-items-center rounded-full border border-[var(--paper)]/50 text-[28px] transition hover:bg-[var(--lime)] hover:text-[var(--ink)]"><span className="bob">&darr;</span></span>
        </a>
      </Reveal>
    </section>
  );
}

function Stats() {
  const nums = [24, 94, 120, 6];
  const suf = ['+', '%', '+', ' yrs'];
  return (
    <section className="bg-[var(--paper)] px-5 py-20 md:px-10">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-12 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.l} delay={i * 100}>
            <div className="border-l-2 border-[var(--ink)] pl-5">
              <div className="f-display text-[clamp(56px,7vw,112px)] leading-none text-[var(--acc)]"><CountUp to={nums[i]} />{suf[i]}</div>
              <div className="mt-3 text-[15px] font-medium">{s.l}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="bg-[#E9E4D3] px-5 py-28 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className={`${label} text-[var(--acc)]`}>01 &mdash; Work</div>
          <h2 className="f-display mt-4 max-w-[1000px] text-[clamp(48px,8vw,124px)] leading-[0.92]">Every project, filed and finished.</h2>
          <p className="mt-6 max-w-[520px] text-[18px] leading-relaxed text-[var(--mute)]">Hover a folder to peek inside. Open it to see what the project is, what it does and where to try it.</p>
        </Reveal>
        <Reveal delay={150} className="mt-14"><Explorer /></Reveal>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="bg-[var(--paper)] px-5 py-28 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className={`${label} text-[var(--acc)]`}>02 &mdash; Services</div>
          <h2 className="f-display mt-4 text-[clamp(48px,8vw,124px)] leading-[0.92]">What I do.</h2>
        </Reveal>
        <div className="mt-14 border-b border-[var(--ink)]">
          {SERVICES.map((s, i) => (
            <Reveal key={s.t} delay={i * 60}>
              <div className="group relative overflow-hidden border-t border-[var(--ink)]">
                <div className="absolute inset-0 translate-y-full bg-[var(--lime)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
                <div className="relative grid items-center gap-3 py-7 sm:grid-cols-[70px_1fr_1fr_50px] sm:px-4">
                  <span className="f-mono text-[14px] text-[var(--mute)] group-hover:text-[var(--ink)]">0{i + 1}</span>
                  <span className="f-display text-[clamp(28px,3.6vw,54px)] leading-none transition-transform duration-500 group-hover:translate-x-3">{s.t}</span>
                  <p className="max-w-[420px] text-[15.5px] leading-relaxed text-[var(--mute)] group-hover:text-[var(--ink)]">{s.d}</p>
                  <span className="hidden text-[34px] transition-transform duration-500 group-hover:-rotate-45 sm:block">&rarr;</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const bg = ['var(--paper)', 'var(--lime)', 'var(--lilac)', '#fff'];
  return (
    <section id="process" className="bg-[var(--coral)] px-5 py-28 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className={label}>03 &mdash; Process</div>
          <h2 className="f-display mt-4 text-[clamp(48px,8vw,124px)] leading-[0.92]">Four steps, no surprises.</h2>
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.t} delay={i * 120}>
              <div className="h-full rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-2" style={{ background: bg[i] }}>
                <div className="f-display text-[96px] leading-none">{i + 1}</div>
                <div className="f-display mt-10 text-[30px] leading-none">{s.t}</div>
                <p className="mt-4 text-[15.5px] leading-relaxed text-[var(--ink)]/75">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Toolkit() {
  return (
    <section className="overflow-hidden bg-[var(--paper)] py-20">
      <Marquee items={TOOLS} />
      <Marquee items={METHODS} reverse outline className="mt-6" />
    </section>
  );
}

function About() {
  return (
    <section id="about" className="bg-[var(--lilac)] px-5 py-28 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className={label}>04 &mdash; About</div>
          <p className="f-display mt-6 max-w-[1150px] text-[clamp(36px,5.6vw,84px)] leading-[0.98]">
            I started in IT support, fixing problems one ticket at a time. Now I make sure the big projects arrive <span className="rounded-full bg-[var(--ink)] px-5 text-[var(--lilac)]">without the drama.</span>
          </p>
        </Reveal>
        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {PRINCIPLES.map((c, i) => (
            <Reveal key={c.t} delay={i * 100}>
              <div className="h-full rounded-3xl bg-[var(--paper)] p-8 transition-transform duration-300 hover:-translate-y-2">
                <div className="f-mono text-[13px] text-[var(--acc)]">0{i + 1}</div>
                <div className="f-display mt-8 text-[30px] leading-tight">{c.t}</div>
                <p className="mt-3 text-[16px] leading-relaxed text-[var(--ink)]/70">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  return (
    <section id="contact" className="bg-[var(--ink)] px-5 pb-8 pt-28 text-[var(--paper)] md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className={`${label} text-[var(--lime)]`}>05 &mdash; Contact</div>
          <h2 className="f-display mt-4 text-[clamp(60px,12vw,200px)] leading-[0.88]">Got a <span className="text-[var(--lime)]">messy</span> project?</h2>
          <p className="mt-8 max-w-[520px] text-[20px] text-[var(--paper)]/65">Tell me what is stuck. I will tell you how I would get it moving.</p>
          <a href={`mailto:${PERSON.email}`} className="group f-display mt-12 flex items-center justify-between gap-6 border-y border-[var(--paper)]/25 py-8 text-[clamp(28px,5vw,76px)] leading-none transition hover:text-[var(--lime)]">
            <span className="min-w-0 truncate">{PERSON.email}</span>
            <span className="transition-transform duration-500 group-hover:-rotate-45">&rarr;</span>
          </a>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2 text-[18px] text-[var(--paper)]/75">
            <a href={`tel:${PERSON.phoneRaw}`} className="transition hover:text-[var(--lime)]">{PERSON.phone}</a>
            <span>{PERSON.location}</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => navigator.clipboard?.writeText(PERSON.email).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); }, () => {})}
              className="rounded-full bg-[var(--lime)] px-7 py-3.5 text-[16px] font-semibold text-[var(--ink)] transition hover:-translate-y-1"
            >
              {copied ? 'Copied ✓' : 'Copy email'}
            </button>
            {PERSON.linkedin !== '#' && (
              <a href={PERSON.linkedin} className="rounded-full border border-[var(--paper)]/40 px-7 py-3.5 text-[16px] font-semibold transition hover:bg-[var(--paper)] hover:text-[var(--ink)]">LinkedIn ↗</a>
            )}
          </div>
        </Reveal>
        <div className="mt-24 flex flex-wrap items-center justify-between gap-4 text-[14px] text-[var(--paper)]/50">
          <span>&copy; {PERSON.name}. All rights reserved.</span>
          <a href="#top" className="transition hover:text-[var(--lime)]">Back to top &uarr;</a>
        </div>
      </div>
    </section>
  );
}

/* ───────────── page ───────────── */

export default function Page() {
  return (
    <div className={`ema ${display.variable} ${sans.variable} ${mono.variable} f-sans min-h-screen overflow-x-hidden bg-[var(--paper)] text-[var(--ink)] antialiased`}>
      <title>{`${PERSON.name} · ${PERSON.role}`}</title>
      <meta name="description" content={`${PERSON.name} is a ${PERSON.role.toLowerCase()} based in ${PERSON.location}. ${PERSON.intro}`} />
      <style>{CSS}</style>
      <Nav />
      <main>
        <Hero />
        <Marquee items={['Planning', 'Budgets', 'Vendors', 'Roadmaps', 'Risk', 'Delivery']} className="bg-[var(--lime)] py-6" />
        <Stats />
        <Work />
        <Services />
        <Process />
        <Toolkit />
        <About />
        <Contact />
      </main>
    </div>
  );
}