/**
 * BÊ BRAND ACADEMY — WEBSITE CONTENT / V5
 * Official identity: Bêbrand logo guideline.pdf from shared Google Drive.
 * Sources: the "Brief Landing Page series Talkshow" tab of the shared Google Doc,
 * and the user's explicit confirmation of the first-event date: 21/11/2026.
 *
 * IMPORTANT: The internal roadmap and brief reference 15/11/2026; the user has
 * confirmed 21/11/2026 as the debut. The code uses the user's later instruction.
 *
 * Some prices/formats are still described as subject to confirmation in the brief;
 * these are never represented as finalized ticketing offers on this site.
 */

export const identity = {
  title: 'Bê Brand Academy',
  tagline: 'Buzz and Enjoy Every Branding',
  facebook: 'https://www.facebook.com/BEBrand.branding?locale=vi_VN',
  email: 'bebrandcommunity@gmail.com',
  instagram: 'https://www.instagram.com/be_brandcommunity/'
};

export const talkshow = {
  seriesTitle: 'The Foundation of Branding & Performance',
  seriesSubtitle: 'Một hành trình 05 buổi, từ hiểu đúng nền tảng đến kết nối và ứng dụng thực tế.',
  statement: 'Bán được hôm nay. Điều gì giúp doanh nghiệp tiếp tục được lựa chọn ngày mai?',
  date: '21.11.2026', // confirmed by user; supersedes 15/11 draft in Docs
  dateISO: '2026-11-21',
  title: 'Branding & Performance: Hiểu đúng để tiến xa',
  label: 'BÊ BRAND ACADEMY DEBUT / TALKSHOW 01',
  format: 'Online',
  speakers: ['Ni Nguyễn', 'Đặng Bảo Nhân'],
  ticketPriceBrief: '299.000đ',
  ticketStatus: 'Giá theo brief — chờ xác nhận chính thức',
  registrationUrl: '', // TODO: replace with verified official payment/registration link
  description: 'Tìm hiểu vai trò và giới hạn của Branding lẫn Performance, đồng thời nhìn lại cách doanh nghiệp vừa tạo kết quả hôm nay, vừa tích lũy lý do để khách hàng tiếp tục lựa chọn ngày mai.',
  benefits: [
    'Nhận diện những sai lầm phổ biến khi đầu tư Branding và Performance.',
    'Hiểu mục tiêu, vai trò và giới hạn của từng hoạt động.',
    'Biết cách kết nối giá trị thương hiệu với hiệu quả kinh doanh.'
  ]
};

export const sessions = [
  {
    number: '01',
    title: 'Branding & Performance: Hiểu đúng để tiến xa',
    category: 'THE BIG PICTURE',
    date: '21.11.2026',
    format: 'Online',
    speakers: 'Ni Nguyễn & Đặng Bảo Nhân',
    description: 'Nhìn lại cách Branding và Performance cùng đóng góp cho tăng trưởng. Không chỉ nhìn vào những con số trước mắt mà còn hiểu cách xây dựng giá trị lâu dài.',
    outcomes: ['Nhận diện vai trò và giới hạn của từng lĩnh vực', 'Phân biệt kết quả ngắn hạn và giá trị bền vững', 'Đặt nền tảng cho bốn buổi tiếp theo'],
    confirmedDate: true
  },
  {
    number: '02',
    title: 'Branding Foundation: Phía sau một thương hiệu được lựa chọn',
    category: 'BRANDING FOUNDATION',
    date: 'Sắp công bố',
    format: 'Online / Offline · dự kiến',
    speakers: 'Ni Nguyễn',
    description: 'Từ nghiên cứu 4C đến định vị, khác biệt và hệ thống thương hiệu. Tìm hiểu những nền tảng giúp quyết định truyền thông có định hướng.',
    outcomes: ['Hiểu vai trò nghiên cứu Category, Company, Competitor, Customer', 'Liên kết dữ liệu với định vị', 'Xây dựng tính nhất quán của thương hiệu']
  },
  {
    number: '03',
    title: 'Performance Foundation: Phía sau mỗi quyết định tăng trưởng',
    category: 'PERFORMANCE FOUNDATION',
    date: 'Sắp công bố',
    format: 'Offline / Livestream · dự kiến',
    speakers: 'Đặng Bảo Nhân',
    description: 'Giải mã các yếu tố chi phối quảng cáo, chuyển đổi và doanh thu; hiểu khi nào chỉ số đẹp chưa đồng nghĩa với hiệu quả kinh doanh.',
    outcomes: ['Hiểu cơ chế tối ưu quảng cáo', 'Liên hệ chi phí, chuyển đổi và doanh thu', 'Nhìn Performance trong bức tranh vận hành lớn hơn']
  },
  {
    number: '04',
    title: 'Branding & Performance: Từ nền tảng đến hệ thống phối hợp',
    category: 'INTEGRATED SYSTEM',
    date: 'Sắp công bố',
    format: 'Online · dự kiến',
    speakers: 'Ni Nguyễn & Đặng Bảo Nhân',
    description: 'Kết nối chiến lược thương hiệu và hoạt động tăng trưởng thành một hệ thống có mục tiêu, ưu tiên, nguồn lực và những đánh đổi rõ ràng.',
    outcomes: ['Nắm các điểm giao thoa giữa hai lĩnh vực', 'Đánh giá mục tiêu và nguồn lực', 'Ra quyết định đầu tư có cơ sở']
  },
  {
    number: '05',
    title: 'Showcase & Real Case: Hành trình xây dựng và tăng trưởng thương hiệu',
    category: 'REAL-WORLD PERSPECTIVES',
    date: 'Sắp công bố',
    format: 'Đang cập nhật',
    speakers: 'Ni Nguyễn, Đặng Bảo Nhân & 02 khách mời (chưa công bố)',
    description: 'Đặt lý thuyết cạnh những câu chuyện, quyết định và tình huống thực tế được chia sẻ bởi người trong cuộc.',
    outcomes: ['Đối chiếu kiến thức với các tình huống có thật', 'Hiểu các lựa chọn của doanh nghiệp', 'Mở rộng góc nhìn về tăng trưởng và thương hiệu']
  }
];

export const challenges = [
  {
    id: '01',
    title: 'Branding thiếu nền tảng',
    desc: 'Có nhiều chiến dịch và nội dung, nhưng thương hiệu chưa xây dựng được một lý do lựa chọn rõ ràng và nhất quán.'
  },
  {
    id: '02',
    title: 'Lệ thuộc quảng cáo',
    desc: 'Kết quả phụ thuộc vào ngân sách, chương trình khuyến mãi và chuyển đổi ngắn hạn, thiếu khả năng tích lũy giá trị.'
  },
  {
    id: '03',
    title: 'Hai hướng đi tách rời',
    desc: 'Branding và Performance theo đuổi các mục tiêu riêng, khiến dữ liệu, thông điệp và nguồn lực chưa hỗ trợ nhau.'
  }
];

export const speakers = [
  {
    name: 'Ni Nguyễn',
    role: 'Founder & CEO — BrandBAE Agency',
    expertise: 'Branding Speaker',
    bio: 'Chia sẻ tư duy xây dựng thương hiệu: từ nghiên cứu, định vị và khác biệt đến hệ thống nhận diện và trải nghiệm nhất quán.',
    index: '01'
  },
  {
    name: 'Đặng Bảo Nhân',
    role: 'Marketing Manager — Rượu Ngon',
    expertise: 'Performance Speaker',
    bio: 'Mang đến góc nhìn về quảng cáo, hiệu quả đầu tư, chi phí chuyển đổi và những quyết định tăng trưởng gắn với kinh doanh thực tế.',
    index: '02'
  }
];

export const faqs = [
  {
    question: 'Buổi Talkshow đầu tiên diễn ra ngày nào?',
    answer: 'Theo mốc debut được Bê Brand xác nhận cho website, Talkshow đầu tiên diễn ra ngày 21/11/2026. Giờ bắt đầu và hướng dẫn tham gia sẽ được cập nhật khi công bố chính thức.'
  },
  {
    question: 'Talkshow là chương trình miễn phí hay trả phí?',
    answer: 'Đây là sự kiện trả phí. Brief hiện ghi mức dự kiến 299.000đ cho Buổi 01; vui lòng xác nhận mức giá cuối cùng và chính sách vé với Bê Brand trước khi thanh toán.'
  },
  {
    question: 'Có thể đăng ký riêng từng buổi không?',
    answer: 'Chuỗi được thiết kế gồm 05 buổi có liên kết. Chính sách vé lẻ, vé trọn chuỗi và quyền lợi cụ thể đang được hoàn thiện; hãy theo dõi thông báo chính thức.'
  },
  {
    question: 'Ai phù hợp tham gia chương trình?',
    answer: 'Chương trình hướng đến Young Brander/Marketer, người làm Branding & Performance, nhân sự in-house, nhà quản lý và chủ doanh nghiệp muốn nhìn hai lĩnh vực một cách hệ thống.'
  },
  {
    question: 'Mua vé hoặc hỏi thông tin ở đâu?',
    answer: 'Hiện website demo chưa tích hợp cổng thanh toán hoặc link đăng ký chính thức. Bạn có thể mở fanpage Bê Brand bằng nút Đăng ký / Liên hệ để hỏi thông tin mới nhất.'
  }
];

export const sources = {
  talkshowBrief: 'https://docs.google.com/document/d/1aNkR_Fv02CAcsOUxXArDMl67Njv1DGDqgetwqS0yOaY/edit?tab=t.hfo7di50p5jn',
  logoGuideline: 'https://drive.google.com/file/d/1IAKxunxSFpgwURS7APpq5Z1S2UyWkLLg/view',
  brandBAEGuideline: 'https://drive.google.com/file/d/10dOa3XiSYfZeLMdt3b5C9pvlaImX73b5/view'
};
