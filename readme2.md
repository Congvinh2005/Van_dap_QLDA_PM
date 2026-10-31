# Hướng dẫn chạy `index2.html` — Thi thử 7 phút

`index2.html` là trang **thi thử ngẫu nhiên**: mỗi lượt rút câu hỏi từ ngân hàng 38 câu, chạy đồng hồ đếm ngược 7 phút, tự lưu bài làm và tự nộp khi hết giờ.

Trang là web tĩnh, **không cần cài đặt, không cần build, không cần mạng**. Chỉ cần trình duyệt hiện đại (Chrome, Edge, Firefox, Safari).

---

## 1. Chạy nhanh trong 30 giây

### Cách A — Mở trực tiếp bằng trình duyệt

1. Mở thư mục dự án:
   `/Users/vinhdv/Tai_lieu/QL_PTPM/QLDA_THI`
2. Nháy đúp vào `index2.html`, hoặc kéo tệp này thả vào cửa sổ trình duyệt.
3. Bấm **Tạo đề & bắt đầu**.

> Cách này chạy được ngay, nhưng một số trình duyệt (đặc biệt Safari) có thể giới hạn `localStorage` khi mở bằng `file://`. Nếu gặp lỗi lưu bài, hãy dùng cách B.

### Cách B — Chạy qua máy chủ cục bộ (khuyến nghị)

Mở Terminal, chạy:

```bash
cd /Users/vinhdv/Tai_lieu/QL_PTPM/QLDA_THI
python3 -m http.server 8765
```

Sau đó mở trình duyệt tại:

```text
http://localhost:8765/index2.html
```

Hoặc mở trang ôn tập rồi bấm **Thi thử 7 phút** ở sidebar:

```text
http://localhost:8765/
```

Dừng máy chủ: quay lại Terminal và nhấn `Ctrl + C`.

---

## 2. Các cách chạy khác

### Dùng Node.js

Nếu đã cài Node.js:

```bash
cd /Users/vinhdv/Tai_lieu/QL_PTPM/QLDA_THI
npx serve .
```

Mở địa chỉ mà `serve` in ra, sau đó vào `/index2.html`.

### Dùng VS Code + Live Server

1. Mở thư mục dự án bằng VS Code.
2. Cài extension **Live Server**.
3. Chuột phải vào `index2.html` → **Open with Live Server**.

### Dùng XAMPP / MAMP

Chép cả thư mục dự án vào `htdocs` (XAMPP) hoặc `www` (MAMP), rồi mở:

```text
http://localhost/QLDA_THI/index2.html
```

---

## 3. Cách sử dụng trang thi

1. Chọn **số câu trong đề**: 1, 3, 5 hoặc 8 câu (mặc định 3).
2. Bấm **Tạo đề & bắt đầu** — đồng hồ 7 phút chạy ngay.
3. Trả lời trực tiếp vào ô bên dưới mỗi câu. Bài làm **tự động lưu** sau khoảng 0,3 giây.
4. Bấm **Nộp bài** khi xong, hoặc để hết giờ hệ thống tự nộp.
5. Xem lại bài làm và mở **Gợi ý trả lời** cho các câu đã có nội dung (hiện là câu 1–16).
6. Bấm **Tạo đề khác** để làm lượt mới.

### Phím tắt

| Phím | Tác dụng |
| --- | --- |
| `Ctrl + Enter` / `Cmd + Enter` | Mở hộp thoại nộp bài |
| `Esc` | Đóng hộp thoại đang mở |

### Lưu ý khi làm bài

- Đồng hồ tính theo **giờ thực**, không dừng khi chuyển tab.
- Tải lại trang hoặc đóng rồi mở lại: đề, câu trả lời và thời gian còn lại được giữ nguyên.
- Hết 7 phút, bài được nộp tự động; không thể làm tiếp.
- Nút **Hủy đề này** xóa lượt đang làm và cho phép tạo đề mới.

---

## 4. Dữ liệu lưu trên trình duyệt

Trang dùng `localStorage`, không gửi dữ liệu lên máy chủ.

| Khóa | Nội dung |
| --- | --- |
| `pmstudy.exam.v1` | Lượt thi đang làm và kết quả gần nhất |
| `pmstudy.theme` | Giao diện sáng / tối |

### Xóa dữ liệu thi thử

Mở DevTools (`F12` hoặc `Cmd + Option + I`) → tab **Console**, chạy:

```js
localStorage.removeItem('pmstudy.exam.v1');
location.reload();
```

Hoặc xóa toàn bộ dữ liệu của trang trong phần **Application → Local Storage**.

> Xóa dữ liệu trình duyệt cũng sẽ xóa lượt thi đang làm và kết quả gần nhất.

---

## 5. Các tệp cần thiết

`index2.html` không chạy một mình — cần giữ nguyên cấu trúc thư mục:

```text
QLDA_THI/
├── index2.html
└── assets/
    ├── styles.css      # Giao diện dùng chung
    ├── exam.css        # Giao diện phòng thi
    ├── data.js         # 8 module + gợi ý đáp án câu 1–16
    ├── exam-data.js    # Ngân hàng 38 câu hỏi
    ├── exam.js         # Logic tạo đề, đếm ngược, nộp bài
    └── favicon.svg
```

Không đổi tên hoặc di chuyển riêng `index2.html` ra khỏi thư mục, vì đường dẫn `assets/...` sẽ bị hỏng.

---

## 6. Tùy chỉnh nhanh

### Đổi số câu lựa chọn

Mở `assets/exam.js`, tìm dòng:

```js
const SIZES = [1, 3, 5, 8];
```

Sửa thành các giá trị mong muốn, ví dụ `[2, 4, 6]`. Mặc định số câu chọn lần đầu là `size: 3` trong hàm `defaultStore()`.

### Đổi thời gian làm bài

Cũng trong `assets/exam.js`:

```js
const DURATION = 7 * 60 * 1000;
```

Đổi `7` thành số phút mong muốn. Lưu ý: các chữ “7 phút” trên giao diện (`index2.html`, `exam.js`, `exam.css`) là nội dung tĩnh, cần sửa thêm nếu muốn hiển thị đúng thời lượng mới.

### Sửa ngân hàng câu hỏi

Mở `assets/exam-data.js`, sửa trực tiếp mảng:

```js
window.EXAM_QUESTIONS = [
  { id: 1, prompt: "Nội dung câu hỏi..." },
  // ...
];
```

Mỗi câu cần `id` duy nhất và `prompt` không rỗng. Gợi ý đáp án lấy từ `assets/data.js` (object `questions`).

---

## 7. Xử lý sự cố

| Hiện tượng | Cách khắc phục |
| --- | --- |
| Trang trắng, không có nút bắt đầu | Kiểm tra đã mở đúng `index2.html` trong thư mục dự án; mở Console xem có lỗi tải `assets/*.js` không. |
| Đồng hồ không chạy | Bật JavaScript; tải lại trang. Nếu vừa chỉnh đồng hồ hệ thống, hãy tải lại để tính lại thời gian. |
| Không lưu được bài | Dùng máy chủ cục bộ (Cách B) thay vì mở `file://`; kiểm tra trình duyệt không chặn `localStorage`. |
| `OSError: [Errno 48] Address already in use` | Cổng 8765 đang có tiến trình khác chạy. Kiểm tra bằng `lsof -nP -iTCP:8765 -sTCP:LISTEN`, sau đó hoặc mở luôn `http://localhost:8765/index2.html` nếu tiến trình đó đang phục vụ đúng thư mục, hoặc dừng nó bằng `kill <PID>` rồi chạy lại. Cách khác: dùng cổng 8766 với `python3 -m http.server 8766`. |
| Mở trang qua mạng LAN bị lỗi | Chạy `python3 -m http.server 8765 --bind 0.0.0.0` và truy cập bằng IP máy tính. |
| Muốn làm lại từ đầu | Vào Console chạy `localStorage.removeItem('pmstudy.exam.v1'); location.reload();` |

---

## 8. Kiểm tra nhanh sau khi chạy

- Trang bắt đầu hiện tiêu đề **“Một bộ đề mới, trong 7 phút.”**
- Chọn 3 câu → bấm bắt đầu → thấy đúng 3 thẻ câu hỏi và đồng hồ `07:00`.
- Gõ vài chữ → tải lại trang → câu trả lời và thời gian còn lại vẫn còn.
- Bấm **Nộp bài** → thấy màn hình kết quả và danh sách câu đã làm.

Nếu tất cả đều đúng, trang đã chạy bình thường.
