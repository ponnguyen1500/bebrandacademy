# Bê Brand Academy

Bản Placeholder + Flow để duyệt cấu trúc, điều hướng và nội dung cần chuẩn bị.

## Chạy website

```sh
npm ci
npm run dev
npm run build
```

Netlify phục vụ bản build từ thư mục `dist/`.

## Duyệt luồng Talkshow

Từ Trang chủ, chọn **Khám phá Talkshow** → **Xem lịch 5 buổi** → chọn một buổi → chọn phương án tham dự → điền biểu mẫu mẫu → xem xác nhận. Mã buổi và phương án nằm trong URL hash để giữ lựa chọn khi tải lại trang. Biểu mẫu không gửi thông tin đăng ký.

## Chuẩn bị nội dung

- **`src/App.jsx`** chứa các trang, nhãn nội dung và khung ảnh giữ chỗ. Nhãn khung ảnh ghi rõ chủ đề và tỷ lệ dự kiến.
- **`src/content.js`** chứa thông tin liên hệ và tên 5 buổi Talkshow kế thừa từ bản trước. Duyệt lại tên buổi và nội dung sự kiện trước khi công bố.
- **`public/logos/`** chứa logo gốc. Texture giấy tạm tại **`public/textures/paper.png`** được phối trên nền kem và than. Có thể cập nhật hai nền trong **`src/styles.css`** khi có texture chính thức.

Các file `PREVIEW-WITHOUT-NPM.html` và `PREVIEW-SCREENSHOT.jpg` lưu giao diện phiên bản trước.
