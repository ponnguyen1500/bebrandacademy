# Bê Brand Academy — Placeholder + Flow V0.3

Bản duyệt cấu trúc, chưa phải website nội dung chính thức.

- 17 mẫu trang / 95 section từ Wireflow V0.2. Danh sách đầy đủ ở footer.
- `src/reviewPages.js`: nhãn nội dung, mã Pxx-Sxx, tỷ lệ ảnh và liên kết.
- `src/App.jsx`: component placeholder, route, form mô phỏng và 5 buổi Talkshow.
- `src/styles.css`: palette HEX guideline và hai texture riêng. Clash Display được ưu tiên nếu có font hợp lệ; hiện dùng fallback Be Vietnam Pro cho headline, Roboto Slab cho body. Không giả định có file font gốc.
- `public/textures/paper-cream.webp`: crop 320x320 từ Bê Brand Talkshow BG 2.png; `paper-charcoal.webp`: crop 320x320 từ Bê Brand Talkshow BG.png. Vùng giấy trống tại x=650,y=300, nén WebP; không chứa logo, mascot hay poster. Ảnh gốc không bị chỉnh sửa.
- Giữ nguyên logo và GTM từ repository. Những thông tin còn trong content.js được lưu làm tham chiếu, không tự công bố.
- Form chỉ mô phỏng, không gửi hoặc lưu dữ liệu; chỉ nhập thông tin mẫu. Không có thanh toán, giá và lịch chính thức cho các buổi chưa công bố.
- `PREVIEW-WITHOUT-NPM.html` và `PREVIEW-SCREENSHOT.jpg`: lưu bản cũ, không dùng để duyệt bản mới.

## Chạy dự án
```sh
npm ci
npm run dev
npm run build
```

## Luồng duyệt
Homepage → Khóa học → Chi tiết → Tư vấn → Xác nhận mẫu.
Homepage / Sự kiện → Chuỗi Talkshow → Buổi 02–05 → Phương án → Form mẫu → Xác nhận.
Buổi 01 đã diễn ra: không mở bán; chỉ giữ placeholder recap và điều hướng nhận thông báo tiếp theo.
Đổi nhu cầu sang khóa học phải xóa buổi/gói Talkshow đã chọn.
