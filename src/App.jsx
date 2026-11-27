import { useEffect, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, Menu, X } from 'lucide-react';
import { identity, sessions } from './content.js';

const navigation = [
  ['academy', 'Học viện'], ['talkshow', 'Talkshow'], ['mentors', 'Mentor'],
  ['journal', 'Góc chia sẻ'], ['about', 'Về Bê Brand']
];
const plans = [
  ['single', 'Tham dự một buổi', 'Giá vé lẻ và quyền lợi từng buổi'],
  ['series', 'Tham dự cả chuỗi', 'Giá trọn chuỗi và quyền lợi đi kèm']
];
const sessionLink = (number) => '#/talkshow/' + number;

const legacyPaths = {
  top: '/', main: '/', about: '/about', speakers: '/mentors',
  talkshow: '/talkshow', journey: '/talkshow', register: '/talkshow',
  why: '/talkshow', faq: '/contact'
};

function readLocation() {
  const [path, query] = window.location.hash.slice(1).split('?');
  return { path: Object.hasOwn(legacyPaths, path) ? legacyPaths[path] : path || '/', params: new URLSearchParams(query) };
}

function registrationLink(step, session, plan) {
  const params = new URLSearchParams({ session: session.number });
  if (plan) params.set('plan', plan[0]);
  return '#/register/' + step + '?' + params;
}

function Placeholder({ label, ratio = '4 / 3' }) {
  return <div className="placeholder" style={{ aspectRatio: ratio }}><span>{label}</span></div>;
}

function Action({ href, children, secondary = false }) {
  return <a className={secondary ? 'button secondary' : 'button'} href={href}>{children}<ArrowRight size={17} aria-hidden="true" /></a>;
}

function Back({ href, children }) {
  return <a className="back" href={href}><ArrowLeft size={16} aria-hidden="true" />{children}</a>;
}

function Header({ path }) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  return <header className="header">
    <div className="wrap header-inner">
      <a href="#/" aria-label="Bê Brand Academy — Trang chủ"><img src="/logos/logo-light.png" alt="Bê Brand" /></a>
      <button className="menu" aria-label={open ? 'Đóng menu' : 'Mở menu'} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav id="main-nav" aria-label="Điều hướng chính" className={open ? 'open' : ''}>
        {navigation.map(([slug, label]) => <a key={slug} href={'#/' + slug} aria-current={path === '/' + slug || path.startsWith('/' + slug + '/') ? 'page' : undefined}>{label}</a>)}
        <a href="#/contact" className="header-contact">Liên hệ <ArrowRight size={15} aria-hidden="true" /></a>
      </nav>
    </div>
  </header>;
}

function Footer() {
  return <footer className="footer dark"><div className="wrap footer-inner">
    <a href="#/" aria-label="Bê Brand Academy — Trang chủ"><img src="/logos/logo-light.png" alt="Bê Brand" /></a>
    <p>Bê Brand Academy<br />{identity.tagline}</p>
    <nav aria-label="Liên kết cuối trang"><a href="#/about">Về Bê Brand</a><a href="#/contact">Liên hệ</a><a href={identity.facebook}>Facebook</a></nav>
  </div></footer>;
}

function PageIntro({ label, title, description, image, ratio, children }) {
  return <section className="dark intro"><div className={'wrap intro-inner' + (image ? ' split' : '')}>
    <div><p className="eyebrow">{label}</p><h1>{title}</h1><p className="lede">{description}</p>{children && <div className="actions">{children}</div>}</div>
    {image && <Placeholder label={image} ratio={ratio} />}
  </div></section>;
}

function Section({ title, children, id }) {
  return <section className="wrap section" id={id}><h2>{title}</h2>{children}</section>;
}

const featured = [
  ['academy', 'Học viện', 'Ảnh hoạt động lớp học', 'Giới thiệu lộ trình và chương trình đào tạo.'],
  ['talkshow', 'Chuỗi Talkshow', 'Key visual chuỗi Talkshow', 'Khám phá nội dung và chọn buổi trong chuỗi 5 Talkshow.'],
  ['journal', 'Góc chia sẻ', 'Ảnh bìa bài viết', 'Bài viết và tài liệu về branding và performance.']
];

function Home() {
  return <>
    <PageIntro label="BÊ BRAND ACADEMY" title={<>Học nền tảng.<br />Làm thương hiệu.</>} description="[Giới thiệu ngắn về học viện, đối tượng học và giá trị chương trình]" image="Key visual Bê Brand Academy · 4:3">
      <Action href="#/talkshow">Khám phá Talkshow</Action><Action href="#/academy" secondary>Xem chương trình</Action>
    </PageIntro>
    <Section title="Khám phá Bê Brand Academy">
      <div className="grid">{featured.map(([slug, title, image, description]) => <a className="card" href={'#/' + slug} key={slug}>
        <Placeholder label={image + ' · 16:9'} ratio="16 / 9" /><h3>{title}<ArrowRight size={18} aria-hidden="true" /></h3><p>{description}</p>
      </a>)}</div>
    </Section>
    <Section title="Đội ngũ đồng hành"><p>[Giới thiệu đội ngũ giảng viên và mentor]</p><Action href="#/mentors" secondary>Xem đội ngũ</Action></Section>
  </>;
}

function SessionList({ items }) {
  return <div className="rows">{items.map(session => <a key={session.number} href={sessionLink(session.number)}>
    <span className="session-number">{session.number}</span><span><strong>{session.title}</strong><small>[Lịch · hình thức · diễn giả]</small></span><ArrowRight size={19} aria-hidden="true" />
  </a>)}</div>;
}

function Talkshow() {
  function showSessions() { document.getElementById('sessions')?.scrollIntoView(); }
  return <>
    <PageIntro label="CHUỖI TALKSHOW · 5 BUỔI" title="Branding & Performance" description="[Mô tả chủ đề, mục tiêu của chuỗi và giá trị sau 5 buổi]" image="Key visual chuỗi Talkshow · 4:3">
      <button className="button" onClick={showSessions}>Xem lịch 5 buổi <ArrowDown size={17} aria-hidden="true" /></button>
    </PageIntro>
    <Section title="Ai nên tham dự?"><p>[Nhóm người tham dự và nhu cầu phù hợp với chuỗi Talkshow]</p></Section>
    <Section title="Lịch 5 buổi Talkshow" id="sessions"><SessionList items={sessions} /></Section>
    <Section title="Chương trình đã diễn ra"><Placeholder label="Ảnh recap chương trình · 16:9" ratio="16 / 9" /><p>[Danh sách buổi đã diễn ra, hình ảnh recap và tài liệu nếu có]</p></Section>
    <Section title="Chương trình sắp diễn ra"><p>[Xác nhận các buổi sắp diễn ra, thời gian và địa điểm]</p><button className="button secondary" onClick={showSessions}>Xem danh sách buổi</button></Section>
    <Section title="Quyền lợi người tham dự"><p>[Tài liệu, phiên hỏi đáp và quyền lợi theo từng phương án]</p></Section>
    <Section title="Bảng giá và chính sách vé"><div className="grid two">{plans.map(([key, label, description]) => <div className="panel" key={key}><h3>{label}</h3><p>[{description}]</p></div>)}</div><p>[Điều kiện ưu đãi, đổi vé và hoàn phí]</p></Section>
    <Section title="Bê Brand và BrandBAE"><p>[Giới thiệu đơn vị tổ chức, cộng đồng và vai trò của mỗi bên]</p><Action href="#/about" secondary>Tìm hiểu về Bê Brand</Action></Section>
  </>;
}

function Session({ session }) {
  return <>
    <PageIntro label={'TALKSHOW · BUỔI ' + session.number} title={session.title} description="[Thời gian, hình thức, địa điểm và tên diễn giả]" image="Key visual riêng của buổi Talkshow · 4:3">
      <Action href={registrationLink('options', session)}>Chọn phương án tham dự</Action>
    </PageIntro>
    <Section title="Nội dung buổi Talkshow"><p>[Mô tả ngắn, các chủ đề chính và điều người tham dự nhận được]</p></Section>
    <Section title="Diễn giả"><div className="portrait"><Placeholder label="Ảnh chân dung diễn giả · 4:5" ratio="4 / 5" /><p>[Tên, chức danh và tiểu sử ngắn]</p></div></Section>
    <Section title="Các buổi khác"><SessionList items={sessions.filter(item => item !== session)} /><Back href="#/talkshow">Về chuỗi Talkshow</Back></Section>
  </>;
}

function Registration({ step, params }) {
  const session = sessions.find(item => item.number === params.get('session'));
  const plan = plans.find(item => item[0] === params.get('plan'));
  if (!session || (step !== 'options' && !plan)) {
    return <Section title="Chọn buổi Talkshow"><p>Hãy chọn buổi bạn quan tâm để tiếp tục.</p><SessionList items={sessions} /></Section>;
  }

  const title = { options: 'Chọn phương án tham dự', form: 'Đăng ký mẫu', confirmation: 'Đã hoàn tất đăng ký mẫu' }[step];
  const back = step === 'options' ? sessionLink(session.number) : registrationLink(step === 'form' ? 'options' : 'form', session, plan);

  function submit(event) {
    event.preventDefault();
    window.location.hash = registrationLink('confirmation', session, plan);
  }

  return <section className="wrap section registration">
    <Back href={back}>{step === 'options' ? 'Về chi tiết buổi' : step === 'form' ? 'Đổi phương án' : 'Về biểu mẫu'}</Back>
    <ol className="steps" aria-label="Tiến độ đăng ký">
      {['Phương án', 'Biểu mẫu', 'Xác nhận'].map((label, index) => <li key={label} aria-current={['options', 'form', 'confirmation'][index] === step ? 'step' : undefined}>{index + 1}. {label}</li>)}
    </ol>
    <h1>{title}</h1><p className="selection">Buổi {session.number} · {session.title}{plan && <><br />{plan[1]}</>}</p>
    {step === 'options' && <div className="grid two">{plans.map(option => <div className="panel" key={option[0]}><h2>{option[1]}</h2><p>[{option[2]}]</p><Action href={registrationLink('form', session, option)}>Chọn phương án</Action></div>)}</div>}
    {step === 'form' && <form className="form" onSubmit={submit}>
      <p>Thử luồng với thông tin mẫu. Biểu mẫu chạy trên trang và không gửi dữ liệu.</p>
      <label>Họ và tên<input required placeholder="Nguyễn Văn A" /></label>
      <label>Email<input required type="email" placeholder="vidu@example.com" /></label>
      <button className="button" type="submit">Xác nhận đăng ký mẫu <ArrowRight size={17} aria-hidden="true" /></button>
    </form>}
    {step === 'confirmation' && <><p>Bạn đã đi hết luồng mẫu. Thông tin trong biểu mẫu chưa được gửi.</p><Action href="#/talkshow">Về chuỗi Talkshow</Action></>}
  </section>;
}

const pages = {
  academy: { label: 'HỌC VIỆN', title: 'Chương trình đào tạo', description: '[Tổng quan chương trình, đối tượng và lộ trình học]', image: 'Ảnh hoạt động lớp học · 4:3', sections: [['Lộ trình học', '[Các cấp độ, thứ tự và thời lượng từng cấp]'], ['Khóa học', '[Tên khóa học, mục tiêu và hình thức học]', ['academy/course', 'Xem khóa học']]] },
  'academy/course': { label: 'KHÓA HỌC', title: '[Tên khóa học]', description: '[Mục tiêu học và đối tượng phù hợp]', image: 'Ảnh bìa khóa học · 4:3', sections: [['Nội dung khóa học', '[Danh sách học phần, lịch học và thời lượng]'], ['Thông tin tham gia', '[Học phí và điều kiện đăng ký]', ['contact', 'Hỏi về khóa học']]] },
  mentors: { label: 'ĐỘI NGŨ', title: 'Mentor và giảng viên', description: '[Giới thiệu đội ngũ và chuyên môn]', sections: [['Hồ sơ mentor', '[Tên · chức danh · chuyên môn · tiểu sử ngắn]', null, 'Ảnh chân dung mentor · 4:5', '4 / 5']] },
  journal: { label: 'GÓC CHIA SẺ', title: 'Bài viết và tài liệu', description: '[Giới thiệu chủ đề và nhóm nội dung]', sections: [['Bài viết', '[Tên bài viết · tóm tắt ngắn]', ['journal/article', 'Xem bài viết'], 'Ảnh bìa bài viết · 16:9', '16 / 9']] },
  'journal/article': { label: 'BÀI VIẾT', title: '[Tiêu đề bài viết]', description: '[Tác giả · ngày xuất bản · mô tả ngắn]', image: 'Ảnh bìa bài viết · 16:9', ratio: '16 / 9', sections: [['Nội dung bài viết', '[Nội dung, hình minh họa và tài liệu tham khảo]', ['journal', 'Về góc chia sẻ']]] },
  about: { label: 'VỀ BÊ BRAND', title: 'Bê Brand và BrandBAE', description: '[Giới thiệu Bê Brand Academy và cộng đồng BrandBAE]', image: 'Ảnh đội ngũ hoặc cộng đồng · 4:3', sections: [['Bê Brand Academy', '[Sứ mệnh và định hướng đào tạo]'], ['BrandBAE', '[Vai trò của cộng đồng và cách tham gia]', ['contact', 'Liên hệ với Bê Brand']]] },
  contact: { label: 'LIÊN HỆ', title: 'Kết nối với Bê Brand', description: '[Bổ sung đầu mối, thời gian và phạm vi hỗ trợ]', sections: [] }
};

function ContentPage({ slug, page }) {
  return <>
    <PageIntro {...page} />
    {page.sections.map(([title, description, link, image, ratio]) => <Section key={title} title={title}>
      {image && <div className={ratio === '4 / 5' ? 'portrait' : 'article-image'}><Placeholder label={image} ratio={ratio} /></div>}
      <p>{description}</p>{link && <Action secondary href={'#/' + link[0]}>{link[1]}</Action>}
    </Section>)}
    {slug === 'contact' && <Section title="Kênh liên hệ"><div className="contact-links"><a href={'mailto:' + identity.email}>{identity.email}</a><a href={identity.facebook}>Facebook</a><a href={identity.instagram}>Instagram</a></div></Section>}
  </>;
}

export default function App() {
  const [location, setLocation] = useState(readLocation);
  const { path, params } = location;
  const slug = path.slice(1);
  useEffect(() => {
    const update = () => {
      setLocation(readLocation());
      window.scrollTo(0, 0);
      document.getElementById('main-content')?.focus({ preventScroll: true });
    };
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);

  const session = sessions.find(item => sessionLink(item.number) === '#' + path);
  const registration = path.match(/^\/register\/(options|form|confirmation)$/);
  let page;
  if (path === '/') page = <Home />;
  else if (path === '/talkshow') page = <Talkshow />;
  else if (session) page = <Session session={session} />;
  else if (registration) page = <Registration key={path + params} step={registration[1]} params={params} />;
  else if (Object.hasOwn(pages, slug)) page = <ContentPage slug={slug} page={pages[slug]} />;
  else page = <PageIntro label="404" title="Không tìm thấy trang" description="Bạn có thể quay về trang chủ để tiếp tục."><Action href="#/">Về trang chủ</Action></PageIntro>;

  return <><button className="skip-link" onClick={() => document.getElementById('main-content')?.focus()}>Đến nội dung chính</button><Header path={path} /><main id="main-content" tabIndex={-1}>{page}</main><Footer /></>;
}
