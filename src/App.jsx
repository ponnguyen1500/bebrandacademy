import { createElement as h, Fragment as ReactFragment, useEffect, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { identity } from './content.js';
import { pages } from './reviewPages.js';
const pageById=Object.fromEntries(pages.map(p=>[p.id,p]));
const numbers=["01","02","03","04","05"];
const plans=[["single","Theo buổi","Giá từng buổi · Buổi áp dụng · Quyền lợi"],["series","Cả chuỗi","Tổng giá · Buổi bao gồm · Điều kiện buổi đã qua"],["group","Theo nhóm","Số người · Giá theo người/nhóm · Quyền lợi"]];
const topics=[["course","Tư vấn khóa học"],["talkshow","Nhận thông báo Talkshow"],["community","Tham gia cộng đồng"],["other","Liên hệ khác"]];
const legacy={"top":"/","main":"/","about":"/about","speakers":"/mentors","talkshow":"/talkshow","journey":"/talkshow","register":"/contact?topic=talkshow","why":"/talkshow","faq":"/contact","/talkshow/chuoi-5-buoi":"/talkshow","/khoa-hoc":"/academy","/ve-be-brand":"/about","/su-kien":"/events","/kien-thuc":"/journal","/cong-dong":"/community","/lien-he":"/contact","/cam-on":"/thanks","/chinh-sach":"/policies"};
const nav=[["home","Trang chủ"],["courses","Khóa học"],["talkshow","Talkshow 5 buổi"],["events","Sự kiện"],["knowledge","Kiến thức"],["about","Về Bê Brand"]];
function parseQuery(s){const result=Object.create(null);for(const entry of (s||"").split("&")){if(!entry)continue;try{const [key,...parts]=entry.split("=");result[decodeURIComponent(key)]=decodeURIComponent(parts.join("=").replace(/\+/g," "))}catch{}}return result}

function queryString(obj){return Object.entries(obj).filter(([,v])=>v).map(([k,v])=>encodeURIComponent(k)+"="+encodeURIComponent(v)).join("&")}

function parseRoute(hash){
 let [path,query=""]=(String(hash||"").replace(/^#/,"")||"/").split("?");
 let params=parseQuery(query);
 if(Object.hasOwn(legacy,path)){const [alias,additional]=legacy[path].split("?");path=alias;params={...parseQuery(additional),...params}}
 if(/^\/register\/(options|form|confirmation)$/.test(path)){path=path.endsWith("confirmation")?"/thanks":"/contact";params.topic="talkshow"}
 const m=path.match(/^\/talkshow\/(0[1-5])$/);
 return {path,params,page:m?pageById.event:pages.find(p=>p.path===path),number:m?m[1]:""};
}

function cleanContext(input){const topic=topics.some(([key])=>key===input.topic)?input.topic:"other";return {topic,session:topic==="talkshow"&&numbers.slice(1).includes(input.session)?input.session:"",plan:topic==="talkshow"&&plans.some(([key])=>key===input.plan)?input.plan:""}}

function link(id,context={},number){const page=pageById[id];if(!page)return "#/";const path=id==="event"?"/talkshow/"+(numbers.includes(number)?number:"02"):page.path;const q=queryString(context);return "#"+path+(q?"?"+q:"")}

function contextFor(page,number,plan=""){return cleanContext({topic:["talkshow","event","events"].includes(page.id)?"talkshow":["course","courses"].includes(page.id)?"course":page.id==="community"?"community":"other",session:number,plan})}

function status(n){return n==="01"?"Đã diễn ra":"Chưa công bố lịch"}

function note(s){return "["+s+"]"}

function Action({to,label,href,secondary=false}){return h("a",{className:"button"+(secondary?" secondary":""),href:href||link(to)},label,h(ArrowRight,{size:16,"aria-hidden":true}))}

function Placeholder({label}){const m=label.match(/(\d+):(\d+)$/);return h("div",{className:"placeholder",style:{aspectRatio:m?m[1]+" / "+m[2]:"4 / 3"}},h("span",null,label))}

function Header({page,path,dark,setDark}){
 const [open,setOpen]=useState(false);useEffect(()=>setOpen(false),[path]);
 return h("header",{className:"header"},h("div",{className:"wrap header-inner"},h("a",{href:"#/","aria-label":"Bê Brand — Trang chủ"},h("img",{src:"/logos/logo-light.png",alt:"Bê Brand"})),h("button",{type:"button",className:"menu",onClick:()=>setOpen(v=>!v),"aria-label":open?"Đóng menu":"Mở menu","aria-expanded":open,"aria-controls":"main-nav"},h(open?X:Menu)),h("nav",{id:"main-nav",className:open?"open":"","aria-label":"Điều hướng chính"},...nav.map(([id,label])=>h("a",{key:id,href:link(id),"aria-current":page?.id===id?"page":undefined},label)),h("a",{href:link("contact"),className:"header-contact"},"Liên hệ")),h("button",{className:"theme-toggle",type:"button","aria-pressed":dark,onClick:()=>setDark(v=>!v)},dark?"Nền sáng":"Nền tối")));
}

function Footer(){return h("footer",{className:"footer dark"},h("div",{className:"wrap footer-inner"},h("a",{href:"#/","aria-label":"Trang chủ"},h("img",{src:"/logos/logo-light.png",alt:"Bê Brand"})),h("p",null,"Bê Brand Academy",h("br"),identity.tagline),h("nav",{"aria-label":"Liên kết cuối trang"},...[["about","Giới thiệu"],["mentors","Mentor"],["showcase","Showcase"],["community","Cộng đồng"],["contact","Liên hệ"],["policies","Chính sách"]].map(([id,label])=>h("a",{href:link(id),key:id},label)),h("a",{href:identity.facebook},"Facebook")),h("details",{className:"review-map"},h("summary",null,"Danh sách duyệt 17 mẫu trang"),h("div",{className:"review-links"},...pages.map(p=>h("a",{key:p.id,href:link(p.id)},p.code+" · "+p.title))))))}

function SessionList({items=numbers,recap=false}){return h("div",{className:"rows"},...items.map(n=>h("a",{key:n,href:link("event",{},n)},h("span",{className:"session-number"},n),h("span",null,h("strong",null,"Buổi "+n+" · "+status(n)),h("small",null,recap?"[Chủ đề · Nội dung recap đã duyệt]":"[Chủ đề · Lịch · Diễn giả]")),h(ArrowRight,{size:18,"aria-hidden":true}))))}

function Form({page,number,params}){
 const [values,setValues]=useState(()=>cleanContext(page.id==="contact"?params:{topic:"talkshow",session:number,plan:params.plan}));
 const update=(key,value)=>setValues(v=>cleanContext({...v,[key]:value}));
 if(page.id==="event"&&number==="01")return h("div",null,h("p",null,"Buổi 01 đã diễn ra. [Record / Recap chỉ hiển thị khi được duyệt]"),h(Action,{href:link("contact",{topic:"talkshow"}),label:"Nhận thông báo các buổi tiếp theo"}));
 const locked=page.id!=="contact";
 return h("form",{className:"form",onSubmit:e=>{e.preventDefault();window.location.hash=link("thanks",values)}},
 h("p",{className:"review-note"},"Bản thử nghiệm: chỉ nhập dữ liệu mẫu, không gửi đăng ký thật."),
 h("label",null,"Nhu cầu",h("select",{value:values.topic,disabled:locked,onChange:e=>update("topic",e.target.value)},...topics.map(([key,label])=>h("option",{key,value:key},label)))),
 values.topic==="talkshow"&&h("label",null,"Buổi quan tâm",h("select",{value:values.session,onChange:e=>update("session",e.target.value),disabled:page.id==="event"},h("option",{value:""},"Cả chuỗi / Chưa chọn"),...numbers.slice(1).map(n=>h("option",{value:n,key:n},"Buổi "+n+" — chưa công bố")))),
 values.topic==="talkshow"&&h("label",null,"Phương án quan tâm",h("select",{value:values.plan,onChange:e=>update("plan",e.target.value)},h("option",{value:""},"Chưa chọn"),...plans.map(([key,label])=>h("option",{value:key,key},label+" (đề xuất)")))),
 h("label",null,"Họ và tên mẫu",h("input",{required:true,placeholder:"[Tên người tham dự]",autoComplete:"off"})),
 h("label",null,"Email hoặc số điện thoại mẫu",h("input",{required:true,placeholder:"[Một kênh liên hệ]",autoComplete:"off"})),
 h("p",{className:"review-note"},"[Thông báo xử lý dữ liệu / Chính sách được duyệt]"),h("button",{type:"submit",className:"button"},"Thử gửi yêu cầu",h(ArrowRight,{size:16,"aria-hidden":true})));
}

function Context({params}){const ctx=cleanContext(params);return h("div",{className:"panel context"},h("p",null,topics.find(x=>x[0]===ctx.topic)?.[1]),ctx.topic==="talkshow"&&h("p",null,ctx.session?"Buổi "+ctx.session:"Cả chuỗi / Chưa chọn",ctx.plan?" · "+plans.find(x=>x[0]===ctx.plan)?.[1]:""))}

function Pricing({page,number}){if(!["event","talkshow"].includes(page.id))return null;if(page.id==="event"&&number==="01")return h("p",{className:"review-note"},"[Thông tin buổi đã qua — không mở bán]");return h("div",{className:"grid"},...plans.map(([key,title,body])=>h("div",{className:"panel",key},h("h3",null,title),h("p",null,"[Giá chờ duyệt]"),h("p",null,note(body)),h(Action,{href:link("contact",contextFor(page,number,key)),label:"Quan tâm phương án",secondary:true}))))}

function Cards({section}){return h("div",{className:"grid"},...[0,1,2].map(i=>h("div",{className:"card",key:i},section.image&&h(Placeholder,{label:section.image}),h("p",null,note(section.body)),section.cardTo&&h(Action,{to:section.cardTo,label:({course:"Xem chi tiết khóa học",mentor:"Xem hồ sơ",project:"Xem dự án",article:"Đọc bài viết"})[section.cardTo]||"Xem chi tiết",secondary:true}))))}

function Body({page,section,number,params}){
 const l=section.layout;
 if(l==="cards")return h(Cards,{section});
 if(l==="series"||l==="sessionnav")return h(SessionList,{});
 if(l==="upcoming")return h(SessionList,{items:numbers.slice(1)});
 if(l==="past")return h("div",{className:"split"},h(Placeholder,{label:"Ảnh recap buổi 01 được phép công bố · 16:9"}),h(SessionList,{items:["01"],recap:true}));
 if(l==="pricing")return h("div",null,h("p",null,note(section.body)),h(Pricing,{page,number}));
 if(l==="organizers")return h("div",{className:"grid two"},...["Bê Brand","BrandBAE"].map(name=>h("div",{className:"panel",key:name},h(Placeholder,{label:"Logo / ảnh "+name+" gốc · 4:3"}),h("h3",null,name),h("p",null,"[Giới thiệu · Vai trò đã xác nhận]"))));
 if(l==="form")return h(Form,{page,number,params});
 if(l==="context"||l==="success")return h("div",null,l==="success"&&h("p",{className:"review-note"},"Đã hoàn thành luồng mẫu. Không có dữ liệu đăng ký được gửi."),h(Context,{params}));
 if(l==="timeline")return h("div",{className:"grid"},...[1,2,3].map(n=>h("div",{className:"panel",key:n},h("h3",null,"[Bước "+n+"]"),h("p",null,note(section.body)))));
 if(l==="gallery")return h("div",{className:"grid"},...[1,2,3].map(n=>h(Placeholder,{key:n,label:section.image})));
 if(l==="faq")return h("details",{className:"panel"},h("summary",null,"[Câu hỏi thường gặp]"),h("p",null,note(section.body)));
 if(l==="filters"){if(page.id==="events")return h("div",{className:"actions"},...page.sections.filter(s=>s.layout==="upcoming"||s.layout==="past").map(s=>h("button",{type:"button",key:s.code,className:"button secondary",onClick:()=>document.getElementById(page.code+"-"+s.code)?.scrollIntoView({block:"start"})},s.layout==="upcoming"?"Chưa công bố / Sắp tới":"Đã diễn ra")));return h("p",{className:"review-note"},"[Bộ lọc dự kiến: "+section.body+"]")}
 return h("div",{className:section.image?"split":undefined},h("p",null,note(section.body)),section.image&&h(Placeholder,{label:section.image}));
}

function Screen({page,number,params}){return h(ReactFragment,null,...page.sections.map((section,i)=>{
 const first=i===0,hero=section.layout==="hero",title=page.id==="event"&&hero?"Buổi "+number+" — "+status(number):section.title;
 const cta=section.cta&&!(page.id==="event"&&number==="01"&&section.to==="contact")?h(Action,{href:section.to==="contact"?link("contact",contextFor(page,number)):link(section.to),label:section.cta,secondary:!first}):null;
 const children=hero?h("div",{className:"wrap intro-inner"+(section.image?" split":"")},h("div",null,h("p",{className:"eyebrow"},page.code+"-"+section.code+" · "+page.title),h("h1",null,page.id==="home"?"[Headline định vị]":title),h("p",{className:"lede"},note(section.body)),cta&&h("div",{className:"actions"},cta)),section.image&&h(Placeholder,{label:section.image})):h("div",{className:"wrap section"},h("p",{className:"section-code"},page.code+"-"+section.code),h(first?"h1":"h2",null,title),h(Body,{page,section,number,params}),cta&&h("div",{className:"actions"},cta));
 return h("section",{className:hero?"dark intro":"review-section",id:page.code+"-"+section.code,key:section.code},children)
}))}

function App(){const [route,setRoute]=useState(()=>parseRoute(window.location.hash));const [dark,setDark]=useState(false);
 useEffect(()=>{const update=()=>{setRoute(parseRoute(window.location.hash));window.scrollTo(0,0);document.getElementById("main-content")?.focus({preventScroll:true})};window.addEventListener("hashchange",update);return()=>window.removeEventListener("hashchange",update)},[]);
 useEffect(()=>{document.title=(route.page?route.page.title+" — ":"")+"Bê Brand Academy | Bản duyệt"},[route.path]);
 const {page,number,params,path}=route;
 return h("div",{className:"review-site"+(dark?" theme-dark":"")},h("a",{className:"skip-link",href:"#main-content",onClick:e=>{e.preventDefault();document.getElementById("main-content")?.focus()}},"Đến nội dung chính"),h(Header,{page,path,dark,setDark}),h("div",{className:"review-strip"},"Bản duyệt cấu trúc · Nội dung và ảnh chưa phê duyệt"),h("main",{id:"main-content",tabIndex:-1},page?h(Screen,{page,number,params,key:path+"?"+queryString(params)}):h("section",{className:"wrap section"},h("h1",null,"Không tìm thấy trang"),h(Action,{to:"home",label:"Về trang chủ"}))),h(Footer));
}
export default App;
