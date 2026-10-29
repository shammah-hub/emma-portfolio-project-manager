'use client';

// app/page.tsx — Ema Tosin · Project Manager portfolio (flat redesign)
// Replace your whole app/page.tsx with this file. Needs only Next.js (App Router) + Tailwind.
// EDIT ME: everything you will want to change is in the DATA block below (all content is SAMPLE).
// Photo: put a picture in /public (e.g. /ema.jpg) and set PERSON.photo = '/ema.jpg'.

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Bricolage_Grotesque, DM_Sans, DM_Mono } from 'next/font/google';

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--f-display' });
const sans = DM_Sans({ subsets: ['latin'], variable: '--f-sans' });
const mono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--f-mono' });

/* ───────────── DATA (edit me) ───────────── */

const PERSON = {
  name: 'Ema Tosin',
  role: 'Project Manager',
  email: 'ema@example.com',
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

type Ext = 'pdf' | 'xlsx' | 'docx' | 'pptx' | 'gantt';
type FileItem = { name: string; ext: Ext; size: string };
type Tone = 'blue' | 'green' | 'sand' | 'clay';
type Project = {
  id: string; name: string; tag: 'Infrastructure' | 'Service' | 'People'; year: string; tone: Tone;
  summary: string; duration: string; team: string;
  outcomes: [string, string][]; milestones: [string, string][]; files: FileItem[];
};

const TONES: Record<Tone, { bg: string; ink: string }> = {
  blue: { bg: '#E3E9F6', ink: '#2B4A9B' },
  green: { bg: '#E0EDE4', ink: '#2F6B4B' },
  sand: { bg: '#F2E8D5', ink: '#8A6420' },
  clay: { bg: '#F1E0D8', ink: '#A04A2B' },
};

const f = (name: string, ext: Ext, size: string): FileItem => ({ name, ext, size });

const PROJECTS: Project[] = [
  {
    id: 'network', name: 'Office Network Rollout', tag: 'Infrastructure', year: '2025', tone: 'blue',
    summary: 'Planned and delivered a new network across six offices with no working days lost, coordinating vendors, site teams and the IT desk.',
    duration: '5 months', team: '14 people',
    outcomes: [['6', 'Sites live'], ['0', 'Days of downtime'], ['+18%', 'Faster connections']],
    milestones: [['Site surveys complete', 'Wk 3'], ['Vendor contracts signed', 'Wk 6'], ['Pilot office live', 'Wk 12'], ['All sites handed over', 'Wk 20']],
    files: [f('Project-Charter', 'pdf', '420 KB'), f('Rollout-Plan', 'gantt', '96 KB'), f('Budget-Tracker', 'xlsx', '210 KB'), f('Vendor-Contracts', 'docx', '1.2 MB'), f('Handover-Report', 'pptx', '860 KB')],
  },
  {
    id: 'helpdesk', name: 'Helpdesk Ticketing Migration', tag: 'Service', year: '2025', tone: 'clay',
    summary: 'Moved the support team from email and spreadsheets to a ticketing system, with training, clear priorities and reporting from day one.',
    duration: '4 months', team: '9 people',
    outcomes: [['-35%', 'Time to first reply'], ['100%', 'Tickets tracked'], ['40', 'Staff trained']],
    milestones: [['Requirements agreed', 'Wk 2'], ['Tool configured', 'Wk 7'], ['Team training', 'Wk 11'], ['Old inbox retired', 'Wk 16']],
    files: [f('Requirements', 'docx', '310 KB'), f('Migration-Plan', 'gantt', '88 KB'), f('Training-Deck', 'pptx', '4.1 MB'), f('Weekly-Status', 'pdf', '540 KB')],
  },
  {
    id: 'devices', name: 'Staff Device Refresh', tag: 'Infrastructure', year: '2024', tone: 'green',
    summary: 'Replaced ageing laptops for the whole company in waves, tracking every device from order to hand-over.',
    duration: '3 months', team: '6 people',
    outcomes: [['210', 'Devices replaced'], ['3%', 'Under budget'], ['4.8/5', 'Staff rating']],
    milestones: [['Inventory audit', 'Wk 2'], ['Devices ordered', 'Wk 4'], ['Waves 1 and 2 handed over', 'Wk 8'], ['Old devices recycled', 'Wk 12']],
    files: [f('Device-Inventory', 'xlsx', '640 KB'), f('Wave-Schedule', 'gantt', '72 KB'), f('Cost-Report', 'pdf', '390 KB')],
  },
  {
    id: 'onboarding', name: 'Digital Onboarding Portal', tag: 'People', year: '2024', tone: 'sand',
    summary: 'Worked with HR and IT to give new joiners one place for forms, accounts and equipment, ready before their first day.',
    duration: '6 months', team: '11 people',
    outcomes: [['3 days', 'Saved per hire'], ['92%', 'Ready on day one'], ['1', 'Single checklist']],
    milestones: [['Process mapped', 'Wk 4'], ['Prototype approved', 'Wk 10'], ['Pilot with 2 teams', 'Wk 18'], ['Company-wide launch', 'Wk 24']],
    files: [f('Process-Map', 'pdf', '730 KB'), f('Launch-Roadmap', 'gantt', '104 KB'), f('Stakeholder-Plan', 'docx', '280 KB'), f('Pilot-Feedback', 'xlsx', '190 KB')],
  },
  {
    id: 'vendors', name: 'Vendor Consolidation', tag: 'Service', year: '2023', tone: 'clay',
    summary: 'Reviewed every IT supplier, merged overlapping contracts and renegotiated terms without disrupting daily support.',
    duration: '4 months', team: '5 people',
    outcomes: [['22', 'Contracts reviewed'], ['-17%', 'Annual spend'], ['9', 'Suppliers kept']],
    milestones: [['Supplier audit', 'Wk 3'], ['Options paper approved', 'Wk 7'], ['New terms signed', 'Wk 13']],
    files: [f('Supplier-Audit', 'xlsx', '520 KB'), f('Options-Paper', 'pdf', '610 KB'), f('Negotiation-Plan', 'docx', '240 KB')],
  },
  {
    id: 'security', name: 'Security Awareness Programme', tag: 'People', year: '2023', tone: 'blue',
    summary: 'Ran a company-wide programme of short trainings and simulated phishing, with simple reporting for leadership.',
    duration: '3 months', team: '4 people',
    outcomes: [['96%', 'Completed training'], ['-60%', 'Phishing clicks'], ['3', 'Campaign rounds']],
    milestones: [['Curriculum agreed', 'Wk 2'], ['Round 1 launched', 'Wk 5'], ['Results briefing', 'Wk 12']],
    files: [f('Programme-Plan', 'pdf', '350 KB'), f('Campaign-Calendar', 'gantt', '64 KB'), f('Results-Summary', 'pptx', '2.6 MB')],
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

const EXT: Record<Ext, { c: string; l: string }> = {
  pdf: { c: '#C4452F', l: 'PDF' },
  xlsx: { c: '#2F6B4B', l: 'XLS' },
  docx: { c: '#2B4A9B', l: 'DOC' },
  pptx: { c: '#C9662A', l: 'PPT' },
  gantt: { c: '#6B4AA8', l: 'GNT' },
};
const wk = (d: string) => parseInt(d.replace(/\D/g, ''), 10) || 1;
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

function Thumb({ file, p }: { file: FileItem; p: Project }) {
  const c = EXT[file.ext].c;
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md border border-[var(--line)] bg-white p-2.5">
      <span className="absolute right-1.5 top-1.5 rounded-sm px-1 py-px text-[7px] font-semibold text-white" style={{ background: c }}>{EXT[file.ext].l}</span>
      {(file.ext === 'pdf' || file.ext === 'docx') && (
        <div className="space-y-[5px] pt-2">
          <div className="mb-2 h-[6px] w-1/2 rounded-sm" style={{ background: c }} />
          {[100, 92, 96, 70, 98, 60].map((w, i) => <div key={i} className="h-[3px] rounded-full bg-black/10" style={{ width: `${w}%` }} />)}
        </div>
      )}
      {file.ext === 'xlsx' && (
        <div className="grid grid-cols-4 gap-[3px] pt-4">
          {Array.from({ length: 24 }, (_, i) => <div key={i} className="h-2.5 rounded-[2px]" style={{ background: i < 4 ? c : 'rgba(0,0,0,.07)' }} />)}
        </div>
      )}
      {file.ext === 'pptx' && (
        <div className="pt-4">
          <div className="aspect-video rounded-sm bg-[var(--ink)] p-1.5 text-[14px] font-semibold leading-none text-white">{p.outcomes[0][0]}</div>
          <div className="mt-1.5 grid grid-cols-3 gap-1">{[0, 1, 2].map((i) => <div key={i} className="aspect-video rounded-[2px] bg-black/10" />)}</div>
        </div>
      )}
      {file.ext === 'gantt' && (
        <div className="space-y-1.5 pt-5">
          {p.milestones.map((m, i) => <div key={i} className="h-2 rounded-sm" style={{ marginLeft: `${i * 14}%`, width: '38%', background: c, opacity: 0.8 - i * 0.12 }} />)}
        </div>
      )}
    </div>
  );
}

function Preview({ file, p }: { file: FileItem; p: Project }) {
  const e = EXT[file.ext];
  const title = file.name.replace(/-/g, ' ');
  const maxW = Math.max(...p.milestones.map((m) => wk(m[1]))) + 2;
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--line)] bg-white">
      <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="rounded-sm px-1.5 py-0.5 text-[9px] font-semibold text-white" style={{ background: e.c }}>{e.l}</span>
          <span className="truncate text-[13px] font-medium">{file.name}.{file.ext}</span>
        </div>
        <span className="text-[11px] text-[var(--mute)]">{file.size}</span>
      </div>
      <div className="p-5">
        <div className="text-[11px] text-[var(--mute)]">{p.name}</div>
        <div className="f-serif mt-1 text-[28px] leading-tight">{title}</div>
        {(file.ext === 'pdf' || file.ext === 'docx') && (
          <div className="mt-4 text-[13px] leading-relaxed text-[var(--ink)]/75">
            <p>{p.summary}</p>
            <ul className="mt-4 space-y-1">
              {p.outcomes.map(([v, l]) => <li key={l}><b className="text-[var(--ink)]">{v}</b> {l.toLowerCase()}</li>)}
            </ul>
          </div>
        )}
        {file.ext === 'xlsx' && (
          <div className="mt-4 overflow-hidden rounded-lg border border-[var(--line)] text-[12.5px]">
            <div className="grid grid-cols-[1fr_60px_60px] bg-[var(--paper)] px-3 py-2 text-[10px] uppercase tracking-wide text-[var(--mute)]"><span>Milestone</span><span>Due</span><span className="text-right">Status</span></div>
            {p.milestones.map(([l, d]) => (
              <div key={l} className="grid grid-cols-[1fr_60px_60px] border-t border-[var(--line)] px-3 py-2"><span className="truncate pr-2">{l}</span><span className="text-[var(--mute)]">{d}</span><span className="text-right font-semibold" style={{ color: e.c }}>Done</span></div>
            ))}
          </div>
        )}
        {file.ext === 'pptx' && (
          <div className="mt-4 aspect-video rounded-lg bg-[var(--ink)] p-5 text-white">
            <div className="text-[10px] text-white/50">{p.year} · {p.duration}</div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {p.outcomes.map(([v, l]) => <div key={l}><div className="f-serif text-[30px] leading-none">{v}</div><div className="mt-1 text-[10px] text-white/60">{l}</div></div>)}
            </div>
          </div>
        )}
        {file.ext === 'gantt' && (
          <div className="mt-4 space-y-3">
            {p.milestones.map(([l, d], i) => {
              const end = (wk(d) / maxW) * 100;
              const start = i === 0 ? 0 : (wk(p.milestones[i - 1][1]) / maxW) * 100;
              return (
                <div key={l}>
                  <div className="mb-1 flex justify-between text-[12px]"><span>{l}</span><span className="text-[var(--mute)]">{d}</span></div>
                  <div className="relative h-2 rounded-full bg-black/[0.06]"><div className="absolute h-full rounded-full" style={{ left: `${start}%`, width: `${Math.max(8, end - start)}%`, background: e.c }} /></div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function Folder({ p }: { p: Project }) {
  const t = TONES[p.tone];
  return (
    <div className="fold relative h-[170px] w-full">
      <div className="absolute left-4 top-0 h-6 w-20 rounded-t-lg" style={{ background: t.ink }} />
      <div className="absolute inset-x-0 bottom-0 top-4 rounded-xl" style={{ background: t.ink }} />
      {p.files.slice(0, 3).map((file, i) => (
        <div key={file.name} className={`fdoc fdoc${i} absolute bottom-10 w-[34%] origin-bottom`} style={{ left: `${9 + i * 21}%`, zIndex: i }}>
          <Thumb file={file} p={p} />
        </div>
      ))}
      <div className="absolute inset-x-0 bottom-0 z-10 h-[56%] rounded-xl" style={{ background: t.bg }}>
        <div className="flex h-full items-end justify-between px-4 pb-3 text-[11px] font-semibold" style={{ color: t.ink }}>
          <span>{p.files.length} files</span><span>{p.year}</span>
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
  const [fileName, setFileName] = useState<string | null>(null);
  const [filter, setFilter] = useState<'All' | Project['tag']>('All');
  const tags: ('All' | Project['tag'])[] = ['All', 'Infrastructure', 'Service', 'People'];
  const list = PROJECTS.filter((p) => filter === 'All' || p.tag === filter);
  const proj = PROJECTS.find((p) => p.id === open) ?? null;
  const t = proj ? TONES[proj.tone] : null;
  const file = proj ? proj.files.find((x) => x.name === fileName) ?? proj.files[0] : null;
  const close = () => { setOpen(null); setFileName(null); };

  return (
    <div>
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

      <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)]">
        <div className="grid lg:grid-cols-[1fr_400px]">
          <div className="min-h-[520px] p-6 md:p-8" key={open ?? 'root'}>
            {!proj ? (
              <div className="up grid grid-cols-1 gap-x-6 gap-y-12 pt-4 sm:grid-cols-2 xl:grid-cols-3">
                {list.map((p) => (
                  <button key={p.id} onClick={() => { setOpen(p.id); setFileName(p.files[0].name); }} className="text-left">
                    <Folder p={p} />
                    <div className="mt-4 text-[17px] font-semibold leading-snug tracking-tight">{p.name}</div>
                    <div className="mt-1 text-[13px] text-[var(--mute)]">{p.outcomes.slice(0, 2).map(([v, l]) => `${v} ${l.toLowerCase()}`).join(' · ')}</div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="up">
                <div className="flex flex-wrap items-center gap-3 text-[12px]">
                  <span className="rounded-full px-3 py-1 font-semibold" style={{ background: t!.bg, color: t!.ink }}>{proj.tag}</span>
                  <span className="text-[var(--mute)]">{proj.year} · {proj.duration} · {proj.team}</span>
                </div>
                <h3 className="f-serif mt-4 text-[clamp(34px,4vw,52px)] leading-[1.05]">{proj.name}</h3>
                <p className="mt-3 max-w-[560px] text-[15.5px] leading-relaxed text-[var(--mute)]">{proj.summary}</p>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {proj.outcomes.map(([v, l]) => (
                    <div key={l} className="rounded-xl p-4" style={{ background: t!.bg }}>
                      <div className="f-serif text-[34px] leading-none" style={{ color: t!.ink }}>{v}</div>
                      <div className="mt-2 text-[12px] text-[var(--ink)]/70">{l}</div>
                    </div>
                  ))}
                </div>
                <div className="mb-3 mt-8 text-[13px] font-semibold">{proj.files.length} files · click one to preview</div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {proj.files.map((x) => {
                    const on = file?.name === x.name;
                    return (
                      <button key={x.name} onClick={() => setFileName(x.name)} className="rounded-xl p-2 text-left transition" style={{ background: on ? t!.bg : 'transparent' }}>
                        <Thumb file={x} p={proj} />
                        <div className="mt-2 truncate px-1 text-[13px] font-medium">{x.name}.{x.ext}</div>
                        <div className="px-1 text-[11px] text-[var(--mute)]">{x.size}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <aside className="border-t border-[var(--line)] p-6 lg:border-l lg:border-t-0" style={{ background: t ? t.bg + '88' : 'var(--paper)' }}>
            {!proj || !file ? (
              <div className="grid h-full min-h-[220px] place-items-center text-center">
                <div>
                  <div className="f-serif text-[28px]">Open a folder</div>
                  <p className="mx-auto mt-2 max-w-[240px] text-[14px] leading-relaxed text-[var(--mute)]">Hover to peek inside. Click to read the plan, the budget and the reports.</p>
                </div>
              </div>
            ) : (
              <div key={proj.id + file.name} className="up">
                <div className="mb-3 text-[13px] font-semibold">Preview</div>
                <Preview file={file} p={proj} />
              </div>
            )}
          </aside>
        </div>
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
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const on = () => setY(window.scrollY);
    window.addEventListener('scroll', on, { passive: true });
    const r = setTimeout(() => setReady(true), 900);
    const still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = still ? undefined : setInterval(() => setIdx((i) => (i + 1) % ROTATE.length), 2200);
    return () => { window.removeEventListener('scroll', on); clearTimeout(r); if (t) clearInterval(t); };
  }, []);
  const initials = PERSON.name.split(' ').map((w) => w[0]).join('');
  const cur = PROJECTS[0];
  const now = wk(cur.milestones[2][1]);
  const total = wk(cur.milestones[cur.milestones.length - 1][1]);
  return (
    <section id="top" className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[var(--acc)] px-5 pb-10 pt-28 text-[var(--paper)] md:px-10">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full bg-[#14503C]" style={{ transform: `translateY(${y * 0.15}px)` }} />
      <div className="pointer-events-none absolute -bottom-52 left-[30%] h-[460px] w-[460px] rounded-full border-[2px] border-[var(--lime)]/25" style={{ transform: `translateY(${y * -0.1}px)` }} />

      <div className="relative mx-auto flex w-full max-w-[1400px] items-center justify-between">
        <div className={`${label} text-[var(--lime)]`}>(&nbsp;{PERSON.role}&nbsp;)</div>
        <div className={`${label} flex items-center gap-2.5`}>
          <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--lime)] opacity-70" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--lime)]" /></span>
          Available for new projects
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
              <span className={`${label} text-[var(--acc)]`}>Now delivering</span>
              <span className="f-mono text-[12px] text-[var(--mute)]">{cur.year}</span>
            </div>
            <div className="f-serif mt-3 text-[22px] leading-tight">{cur.name}</div>
            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-black/10">
              <div className="h-full rounded-full bg-[var(--acc)] transition-all duration-[1600ms] ease-out" style={{ width: ready ? `${(now / total) * 100}%` : '0%' }} />
            </div>
            <div className="f-mono mt-2 flex justify-between text-[11.5px] text-[var(--mute)]">
              <span>{cur.milestones[2][0]}</span><span>Wk {now} / {total}</span>
            </div>
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
          <p className="mt-6 max-w-[520px] text-[18px] leading-relaxed text-[var(--mute)]">Hover a folder to peek inside. Open it to see the plan, the numbers and the paperwork behind it.</p>
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
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => navigator.clipboard?.writeText(PERSON.email).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); }, () => {})}
              className="rounded-full bg-[var(--lime)] px-7 py-3.5 text-[16px] font-semibold text-[var(--ink)] transition hover:-translate-y-1"
            >
              {copied ? 'Copied ✓' : 'Copy email'}
            </button>
            <a href={PERSON.linkedin} className="rounded-full border border-[var(--paper)]/40 px-7 py-3.5 text-[16px] font-semibold transition hover:bg-[var(--paper)] hover:text-[var(--ink)]">LinkedIn &nearr;</a>
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
      <meta name="description" content={`${PERSON.name} is a ${PERSON.role.toLowerCase()}. ${PERSON.intro}`} />
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