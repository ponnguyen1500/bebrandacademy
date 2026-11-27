# Bê Brand Academy — Website Placeholder + Flow

Website công khai đang hoàn thiện nội dung. Bản này giữ cấu trúc 17 mẫu trang / 95 section, placeholder nội dung ngắn và khung ảnh nét đứt; không tự bổ sung giá, lịch, quyền lợi hay thông tin thương mại chưa xác nhận.

## Cấu trúc mã nguồn

- `src/reviewPages.js`: cấu trúc trang, section, mô tả nội dung/ảnh, tỷ lệ ảnh và liên kết. Mã Pxx-Sxx chỉ dùng làm định danh nội bộ.
- `src/App.jsx`: điều hướng bằng hash, các component dùng chung, chuỗi Talkshow 5 buổi và lựa chọn nhu cầu liên hệ.
- `src/styles.css`: giao diện sáng/tối, màu nhận diện và texture. Headline ưu tiên Clash Display nếu có font hợp lệ; fallback Be Vietnam Pro. Body dùng Roboto Slab. Repository chưa kèm file Clash Display.
- `src/content.js`: hiện chỉ dùng `identity`; nội dung Talkshow cũ trong file không tự được công bố.

Đã bỏ thanh duyệt, mã section hiển thị, danh mục duyệt ở footer và ngôn ngữ duyệt nội bộ. Footer thương hiệu, liên hệ và điều hướng thông thường được giữ lại.

## Logo và background

Header/footer dùng `public/logos/logo-light.svg` sẵn có trong repository, với nền ngoài trong suốt; không dùng PNG có nền chữ nhật. Các asset logo gốc được giữ nguyên. Kích thước hiển thị: cao 64 px ở header, 80 px ở footer, chiều rộng theo tỷ lệ gốc.

Hai texture mới được tạo bằng Imagegen dựa trên chất giấy của hai background Talkshow do Founder cung cấp, không chứa logo, mascot hay chữ. Bản PNG 1254 × 1254 px được chuyển WebP chất lượng 92, không đổi kích thước:

| Asset đang sử dụng | Kích thước | Dung lượng |
| --- | --- | --- |
| `public/textures/paper-cream-v2.webp` | 1254 × 1254 px | 59.726 byte |
| `public/textures/paper-charcoal-v2.webp` | 1254 × 1254 px | 75.260 byte |

Nền sáng dùng một lớp nền cố định theo viewport. Các khối nền tối dùng `cover` và `no-repeat`. Không còn lặp các ô crop 320 × 320 px. Các texture cũ được giữ trong source nhưng không còn được CSS tham chiếu.

## Luồng liên hệ công khai

Khách có thể chọn nhu cầu, buổi Talkshow và phương án quan tâm, sau đó mở fanpage Bê Brand bằng nút **Liên hệ Bê Brand qua Facebook**. Các lựa chọn hiện chỉ phục vụ giao diện, không tự gửi sang Facebook.

Không có form thu thập họ tên/email/số điện thoại, backend nhận đăng ký, thanh toán hay thông báo đăng ký thành công giả. Route `/thanks` được giữ như một trang kết nối trung tính; không xác nhận đã gửi dữ liệu. Khi đổi nhu cầu khỏi Talkshow, lựa chọn buổi/gói được xóa.

Buổi 01 đã diễn ra, không mở bán. Buổi 02–05 chưa công bố lịch. Thông tin giá và quyền lợi tiếp tục là placeholder.

## Chạy và triển khai

```sh
npm ci
npm run dev
npm run build
```

Netlify giữ cấu hình build `npm run build`, publish `dist` và SPA fallback trong `netlify.toml`. GTM trong `index.html` được giữ nguyên.

`PREVIEW-WITHOUT-NPM.html` và `PREVIEW-SCREENSHOT.jpg` là bản lưu cũ, không phản ánh giao diện hiện tại. Dùng bản build từ source để kiểm tra website.
