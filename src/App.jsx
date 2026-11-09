import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight, ArrowUp, ArrowUpRight, CalendarDays,
  ChevronDown, ExternalLink, Menu, Moon, Sun, X
} from 'lucide-react';
import { challenges, faqs, identity, sessions, speakers, talkshow } from './content.js';

const firstEventAt = new Date('2026-11-21T00:00:00+07:00').getTime();

function getInitialTheme() {
  try {
    const saved = window.localStorage.getItem('be-academy-theme-v5');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try { localStorage.setItem('be-academy-theme-v5', theme); } catch { /* Storage optional. */ }
  }, [theme]);
  return [theme, () => setTheme((current) => current === 'dark' ? 'light' : 'dark')];
}

function useScrollReveal() {
  useEffect(() => {
    const targets = [...document.querySelectorAll('[data-reveal]')];
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((element) => element.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    }, { rootMargin: '0px 0px -30px 0px', threshold: 0.08 });
    targets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function Logo({ vertical = false, theme = 'light', footer = false, className = '' }) {
  // Use ONLY the official primary (symbol + type) logo supplied by Bê Brand.
  // Both variants have transparent backgrounds. No recoloring or transformations.
  // The dark charcoal logo is placed on the cream header/brand panel; the
  // approved red version remains legible on the near-black footer.
  const colorway = footer ? 'light' : theme;
  return (
    <a className={'brand-mark brand-mark-main ' + (vertical ? 'brand-mark-vertical ' : '') +
      (footer ? 'brand-mark-footer ' : '') + className}
      href="#top" aria-label="Bê Brand Academy — về đầu trang">
      <img
        src={'/logos/logo-' + colorway + '.png'}
        alt="Logo chính thức Bê Brand"
        draggable="false"
        width="900"
        height="1440"
      />
    </a>
  );
}

function Countdown() {
  const [remaining, setRemaining] = useState(() => Math.max(0, firstEventAt - Date.now()));
  useEffect(() => {
    const refresh = () => setRemaining(Math.max(0, firstEventAt - Date.now()));
    const timer = window.setInterval(refresh, 60_000);
    return () => window.clearInterval(timer);
  }, []);
  const days = Math.floor(remaining / 86_400_000);
  return (
    <span className="countdown" aria-live="off">
      {remaining === 0 ? 'NGÀY SỰ KIỆN ĐÃ ĐẾN' : days > 0 ? `CÒN ${days} NGÀY` : 'SẮP DIỄN RA'}
    </span>
  );
}

function ThemeToggle({ theme, toggleTheme }) {
  const isDark = theme === 'dark';
  return (
    <button type="button"
      className={'theme-switch ' + (isDark ? 'is-dark' : 'is-light')}
      role="switch"
      aria-checked={isDark}
      aria-label="Giao diện tối"
      onClick={toggleTheme}
      title={isDark ? 'Chuyển sang Light Mode' : 'Chuyển sang Dark Mode'}>
      <span className="theme-switch-track" aria-hidden="true">
        <span className="theme-switch-thumb">
          {isDark ? <Moon size={16} strokeWidth={1.75} /> : <Sun size={16} strokeWidth={1.75} />}
        </span>
      </span>
    </button>
  );
}

// Keep each Vietnamese full name intact even when surrounding text wraps.
function SpeakerNames({ names }) {
  return <span className="speaker-names">{names.map((name, index) => (
    <span key={name} className="speaker-name-unit">{index > 0 ? ' & ' : ''}{name}</span>
  ))}</span>;
}

function KeepFullNames({ text }) {
  return <>{text.split(/(Đặng Bảo Nhân|Ni Nguyễn)/g).map((part, index) =>
    part === 'Đặng Bảo Nhân' || part === 'Ni Nguyễn'
      ? <span className="person-name" key={index}>{part}</span>
      : part
  )}</>;
}

function Header({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menuOpen]);
  const links = [
    ['#talkshow', 'Talkshow'],
    ['#speakers', 'Diễn giả'],
    ['#journey', 'Lộ trình 05 buổi'],
    ['#about', 'Về Bê']
  ];
  return (
    <>
      <div className="topline">
        <div className="container topline-inner">
          <span>BÊ BRAND ACADEMY DEBUT</span>
          <div><time dateTime={talkshow.dateISO}>21.11.2026</time><Countdown /></div>
          <a href="#talkshow">KHÁM PHÁ TALKSHOW <ArrowUpRight size={14} /></a>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Logo theme={theme} />
          <nav id="main-nav" className={'main-nav ' + (menuOpen ? 'open' : '')} aria-label="Điều hướng chính">
            {links.map(([href, label]) =>
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
            )}
            <a className="mobile-registration" href="#register" onClick={() => setMenuOpen(false)}>Thông tin đăng ký</a>
          </nav>
          <div className="header-tools">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <a className="button button-header" href="#register">ĐĂNG KÝ <ArrowUpRight size={16} /></a>
            <button type="button" className="nav-menu" onClick={() => setMenuOpen((open) => !open)}
              aria-controls="main-nav" aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

/* Independent art direction: a sculptural conversation loop. It is not a version of the logo. */
function ConversationSculpture() {
  const sceneRef = useRef(null);
  const onMove = (event) => {
    if (!sceneRef.current || event.pointerType === 'touch' ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    sceneRef.current.style.setProperty('--yaw', `${x * 12}deg`);
    sceneRef.current.style.setProperty('--pitch', `${-y * 9}deg`);
  };
  const onLeave = () => {
    if (!sceneRef.current) return;
    sceneRef.current.style.setProperty('--yaw', '0deg');
    sceneRef.current.style.setProperty('--pitch', '0deg');
  };
  return (
    <div className="sculpture-scene" onPointerMove={onMove} onPointerLeave={onLeave}
      aria-label="Mô hình điêu khắc 3D lấy cảm hứng từ cuộc đối thoại giữa Branding và Performance" role="img">
      <div className="sculpture-lights" aria-hidden="true" />
      <div className="sculpture" ref={sceneRef} aria-hidden="true">
        <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" focusable="false">
          <defs>
            <linearGradient id="band-top" x1="0%" y1="0%" x2="95%" y2="100%">
              <stop offset="0%" stopColor="#F5A18A" />
              <stop offset="27%" stopColor="#DE6851" />
              <stop offset="65%" stopColor="#C23B27" />
              <stop offset="100%" stopColor="#82271F" />
            </linearGradient>
            <linearGradient id="band-side" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B03929" />
              <stop offset="100%" stopColor="#5D1C18" />
            </linearGradient>
            <linearGradient id="band-inner" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F8A18D" />
              <stop offset="45%" stopColor="#C23B27" />
              <stop offset="100%" stopColor="#722018" />
            </linearGradient>
            <filter id="scene-shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="17" />
            </filter>
          </defs>
          <ellipse cx="310" cy="524" rx="181" ry="33" fill="#080807" opacity="0.2" filter="url(#scene-shadow)" />
          <g transform="rotate(-17 300 300)">
            <path d="M300 71C435 71 519 173 519 304C519 435 430 526 300 526C163 526 77 430 77 301C77 171 161 71 300 71ZM301 169C228 169 176 221 176 301C176 379 228 427 301 427C377 427 420 378 420 304C420 228 374 169 301 169Z"
              fill="url(#band-side)" fillRule="evenodd" transform="translate(24 25)" />
            <path d="M300 71C435 71 519 173 519 304C519 435 430 526 300 526C163 526 77 430 77 301C77 171 161 71 300 71ZM301 169C228 169 176 221 176 301C176 379 228 427 301 427C377 427 420 378 420 304C420 228 374 169 301 169Z"
              fill="url(#band-top)" fillRule="evenodd" />
            <path d="M182 253C198 202 237 169 301 169C374 169 420 228 420 304C420 358 395 396 357 415"
              stroke="url(#band-inner)" strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.72" />
            <path d="M130 205C166 118 230 85 300 82" stroke="#FFD2C2" strokeWidth="7" fill="none" opacity=".45" strokeLinecap="round" />
          </g>
        </svg>
      </div>
      <div className="scene-note"><span>SCULPTURE STUDY</span><span>01 / BRAND DIALOGUES</span></div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-layout">
        <div className="hero-text" data-reveal>
          <p className="eyebrow"><span className="eyebrow-line" /> BÊ BRAND EDUCATION / TALKSHOW SERIES 2026</p>
          <h1>BÁN ĐƯỢC<br />HÔM NAY.<br /><em>AI CHỌN BẠN<br />NGÀY MAI?</em></h1>
          <p className="hero-summary">Branding và Performance không phải hai hướng đi riêng biệt. Cùng Bê Brand hiểu nền tảng để doanh nghiệp tăng trưởng mà vẫn xây dựng giá trị dài lâu.</p>
          <div className="hero-cta-row">
            <a className="button button-primary" href="#talkshow">KHÁM PHÁ TALKSHOW <ArrowUpRight size={18} /></a>
            <a className="inline-link" href="#journey">Xem hành trình 05 buổi <ArrowRight size={17} /></a>
          </div>
          <div className="hero-caption"><span>ACADEMY DEBUT</span><span>21 NOVEMBER 2026</span></div>
        </div>
        <ConversationSculpture />
      </div>
      <a className="container hero-event-rail" href="#talkshow" aria-label="Đến thông tin talkshow 21 tháng 11 năm 2026">
        <div className="rail-date"><strong>21</strong><span>THÁNG 11<br />2026</span></div>
        <span className="rail-divider" aria-hidden="true" />
        <div className="rail-copy"><span>DEBUT / FIRST PAID TALKSHOW</span><strong>{talkshow.title}</strong><p><SpeakerNames names={talkshow.speakers} /><span className="rail-dot" /> <span className="rail-format">Online</span></p></div>
        <ArrowUpRight size={27} className="rail-arrow" />
      </a>
    </section>
  );
}

function SectionHeader({ index, label, heading, summary }) {
  return (
    <header className="section-header" data-reveal>
      <div><div className="section-label"><span>{index}</span> {label}</div><h2>{heading}</h2></div>
      {summary ? <p>{summary}</p> : null}
    </header>
  );
}

function SaveDateButton() {
  const save = () => {
    // All-day event intentionally: the time of the session has not yet been confirmed.
    const dtstamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const parts = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Be Brand Academy//Talkshow//VI',
      'BEGIN:VEVENT', 'UID:be-brand-debut-20261121@bebrand.local',
      `DTSTAMP:${dtstamp}`, 'DTSTART;VALUE=DATE:20261121', 'DTEND;VALUE=DATE:20261122',
      'SUMMARY:Bê Brand Academy Debut - Talkshow 01',
      'DESCRIPTION:Branding & Performance - Hieu dung de tien xa. Gio bat dau dang cho xac nhan.',
      'END:VEVENT', 'END:VCALENDAR'
    ];
    const blob = new Blob([parts.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = 'be-brand-academy-debut-21-11-2026.ics';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 5000);
  };
  return <button className="button button-secondary" type="button" onClick={save}><CalendarDays size={18} /> LƯU NGÀY SỰ KIỆN</button>;
}

function TicketLink({ className = '' }) {
  const hasTicketUrl = Boolean(talkshow.registrationUrl);
  return (
    <a className={'button button-primary ' + className}
      href={hasTicketUrl ? talkshow.registrationUrl : identity.facebook}
      target="_blank" rel="noopener noreferrer">
      {hasTicketUrl ? 'ĐĂNG KÝ THAM GIA' : 'HỎI THÔNG TIN ĐĂNG KÝ'}
      <ExternalLink size={17} />
    </a>
  );
}

function Talkshow() {
  return (
    <section className="section talkshow-section" id="talkshow">
      <div className="container">
        <SectionHeader index="01" label="FEATURED TALKSHOW"
          heading={<>THE FOUNDATION OF<br /><span className="accent-text">BRANDING</span> & PERFORMANCE.</>}
          summary="05 buổi, một hành trình kết nối chiến lược thương hiệu với hiệu quả kinh doanh." />
        <div className="talkshow-grid">
          <div className="series-art" data-reveal>
            <div className="series-top"><span>THE FOUNDATION OF</span><span>BÊ BRAND ACADEMY</span></div>
            <div className="series-headline" lang="en" aria-label="Branding & Performance">
              <span className="series-word series-word-branding">BRANDING</span>
              <span className="series-amp" aria-hidden="true">&</span>
              <span className="series-word series-word-performance">PERFORMANCE</span>
            </div>
            <div className="series-bottom"><span>A FIVE-CHAPTER SERIES</span><strong>21.11.2026</strong></div>
          </div>
          <div className="talkshow-info" data-reveal>
            <span className="eyebrow eyebrow-red">TALKSHOW 01 / ACADEMY DEBUT</span>
            <h3>{talkshow.title}</h3>
            <p className="talkshow-description">{talkshow.description}</p>
            <dl className="event-facts">
              <div><dt>NGÀY</dt><dd><time dateTime={talkshow.dateISO}>{talkshow.date}</time></dd></div>
              <div><dt>HÌNH THỨC</dt><dd>{talkshow.format}</dd></div>
              <div><dt>DIỄN GIẢ</dt><dd><SpeakerNames names={talkshow.speakers} /></dd></div>
              <div><dt>VÉ THAM DỰ</dt><dd><strong>{talkshow.ticketPriceBrief}</strong><small>{talkshow.ticketStatus}</small></dd></div>
            </dl>
            <div className="event-actions"><TicketLink /><SaveDateButton /></div>
            <p className="note">Giờ bắt đầu và liên kết thanh toán chính thức chưa được cung cấp. Nút đăng ký hiện dẫn đến fanpage Bê Brand; website không tự thu tiền hay dữ liệu.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Challenge() {
  return (
    <section className="section challenge-section" id="why">
      <div className="container">
        <SectionHeader index="03" label="THE REAL QUESTION"
          heading={<>ĐẦU TƯ NHIỀU.<br /><span className="accent-text">ĐÃ ĐÚNG CHỖ?</span></>}
          summary="Ba vấn đề doanh nghiệp thường gặp khi Branding và Performance không nằm trong cùng một hệ thống." />
        <div className="challenges">
          {challenges.map((item) => <article className="challenge-item" key={item.id} data-reveal>
            <span className="challenge-index">{item.id}</span>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </article>)}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = sessions[activeIndex];
  return (
    <section className="section journey-section" id="journey">
      <div className="container">
        <SectionHeader index="04" label="FIVE CONNECTED CHAPTERS"
          heading={<>TỪ HIỂU ĐÚNG<br /><span className="accent-text">ĐẾN LÀM ĐÚNG.</span></>}
          summary={talkshow.seriesSubtitle} />
        <div className="journey-layout">
          <div className="session-list" role="group" aria-label="Chọn một trong năm buổi Talkshow">
            {sessions.map((session, i) => (
              <button type="button" key={session.number}
                className={'session-tab ' + (i === activeIndex ? 'selected' : '')}
                aria-pressed={i === activeIndex}
                onClick={() => setActiveIndex(i)}>
                <span className="session-number">{session.number}</span>
                <span className="session-tab-content"><small>{session.category}</small><strong>{session.title}</strong></span>
                <ArrowUpRight size={20} strokeWidth={1.8} />
              </button>
            ))}
          </div>
          <div className="session-detail" aria-live="polite">
            <div className="session-detail-top"><span>CHAPTER {current.number} / 05</span><span>{current.date}</span></div>
            <div key={current.number} className="session-body">
              <div className="session-big-number">{current.number}</div>
              <h3>{current.title}</h3>
              <p>{current.description}</p>
              <h4>BẠN SẼ KHÁM PHÁ</h4>
              <ul>{current.outcomes.map((value) => <li key={value}>{value}</li>)}</ul>
              <div className="session-meta"><span>DIỄN GIẢ</span><strong><KeepFullNames text={current.speakers} /></strong></div>
              <div className="session-meta"><span>HÌNH THỨC</span><strong>{current.format}</strong></div>
            </div>
            <div className="session-detail-foot">Lịch các buổi tiếp theo và chính sách vé sẽ được xác nhận trên kênh chính thức.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Speakers() {
  return (
    <section className="section speakers-section" id="speakers">
      <div className="container">
        <SectionHeader index="02" label="THE SPEAKERS"
          heading={<>GÓC NHÌN TỪ<br /><span className="accent-text">NGƯỜI LÀM NGHỀ.</span></>}
          summary="Hai góc nhìn bổ trợ: xây dựng giá trị thương hiệu và tạo hiệu quả tăng trưởng." />
        <div className="speaker-grid">
          {speakers.map((speaker) => <article key={speaker.name} className="speaker-card" data-reveal>
            <div className="speaker-card-header"><span>PROFILE {speaker.index}</span><span>{speaker.expertise}</span></div>
            <div className="speaker-monogram" aria-hidden="true">{speaker.name.split(' ').slice(-1)[0].slice(0,1)}</div>
            <div className="speaker-data"><h3 className="speaker-full-name">{speaker.name}</h3><span>{speaker.role}</span><p>{speaker.bio}</p></div>
          </article>)}
        </div>
        <p className="speakers-note">Ảnh chân dung và thông tin 02 khách mời của Buổi 05 sẽ được bổ sung sau khi được phê duyệt.</p>
      </div>
    </section>
  );
}

function About({ theme }) {
  return (
    <section className="section about-section" id="about">
      <div className="container about-grid">
        <div className="about-logo-wrap" data-reveal>
          <div className="about-logo-surface"><Logo vertical theme={theme} /></div>
        </div>
        <div className="about-content" data-reveal>
          <div className="section-label"><span>05</span> ABOUT BÊ BRAND ACADEMY</div>
          <h2>MỘT NƠI<br />HỌC BRANDING<br /><span className="accent-text">CÓ CƠ SỞ.</span></h2>
          <p>Bê Brand mang kiến thức chắt lọc từ quy trình làm việc thực tế tại agency vào những cuộc thảo luận gần gũi, có chiều sâu. Tụi tui khuyến khích người học đặt câu hỏi, nhìn đa chiều và biết lý do đằng sau mỗi lựa chọn.</p>
          <p>Chuyên môn là phần cốt lõi. Tinh thần cởi mở và một chút hài hước là cách tụi tui khiến hành trình học dễ tiếp cận hơn.</p>
          <a className="inline-link" href={identity.facebook} target="_blank" rel="noopener noreferrer">KẾT NỐI CÙNG BÊ <ArrowUpRight size={18} /></a>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="section faq-section" id="faq">
      <div className="container faq-grid">
        <div data-reveal>
          <div className="section-label"><span>06</span> FAQ</div>
          <h2>BẠN CÒN<br /><span className="accent-text">THẮC MẮC?</span></h2>
          <p className="faq-intro">Một vài câu trả lời trước khi bạn đồng hành cùng Bê Brand Academy.</p>
        </div>
        <div className="faq-list" data-reveal>
          {faqs.map((item, index) => <details key={item.question} className="faq-item">
            <summary><span>{String(index + 1).padStart(2,'0')}</span><strong>{item.question}</strong><ChevronDown size={19} /></summary>
            <p>{item.answer}</p>
          </details>)}
        </div>
      </div>
    </section>
  );
}

function Register() {
  return (
    <section className="register-section" id="register">
      <div className="container register-layout">
        <div className="register-copy" data-reveal>
          <div className="section-label">BÊ BRAND ACADEMY / DEBUT</div>
          <h2>THAM GIA<br />CUỘC ĐỐI THOẠI<br />ĐẦU TIÊN.</h2>
          <p>21.11.2026 / Branding & Performance: Hiểu đúng để tiến xa.</p>
        </div>
        <div className="register-actions" data-reveal>
          <p>Thông tin vé sẽ được chốt trên kênh chính thức. Hãy nhắn tin cho Bê Brand để nhận hướng dẫn đăng ký và xác nhận giá vé.</p>
          <TicketLink className="register-button" />
          <p className="register-subtext">Website này hiện là bản thiết kế thử nghiệm. Không có chức năng nhận thanh toán trực tiếp.</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand"><Logo footer /><p>{identity.tagline}</p></div>
        <div className="footer-links">
          <a href="#talkshow">Talkshow</a>
          <a href="#speakers">Diễn giả</a>
          <a href="#journey">Lộ trình 05 buổi</a>
          <a href="#about">Về Bê</a>
        </div>
        <div className="footer-contact">
          <span>LET'S STAY IN TOUCH</span>
          <a className="contact-email" href={'mailto:' + identity.email}>{identity.email}</a>
          <a href={identity.facebook} target="_blank" rel="noopener noreferrer">Facebook / Bê Brand <ExternalLink size={15} /></a>
          <a href={identity.instagram} target="_blank" rel="noopener noreferrer">Instagram <ExternalLink size={15} /></a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} BÊ BRAND ACADEMY — CONCEPT WEBSITE V5.3</span>
        <button className="go-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>VỀ ĐẦU TRANG <ArrowUp size={16} /></button>
      </div>
    </footer>
  );
}

export default function App() {
  const [theme, toggleTheme] = useTheme();
  useScrollReveal();
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Đi đến nội dung chính</a>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main id="main">
        <Hero />
        <Talkshow />
        <Speakers />
        <Challenge />
        <Journey />
        <About theme={theme} />
        <FAQ />
        <Register />
      </main>
      <Footer />
    </div>
  );
}
