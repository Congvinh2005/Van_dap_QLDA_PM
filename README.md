# PM Study — Ôn thi Quản lý dự án phần mềm

Trang web tĩnh để tra cứu và ôn tập 38 câu hỏi môn **Quản lý dự án phần mềm**, được nhóm thành 8 module theo lộ trình học. Toàn bộ nội dung nằm trong một tệp JavaScript, không cần cơ sở dữ liệu, không cần cài đặt hay build.

## Tính năng

- 8 module kiến thức, mỗi module có danh sách câu hỏi và tiến độ riêng.
- Trang chi tiết từng câu: tóm tắt, ý chính, nội dung đầy đủ, bảng so sánh, ghi chú cá nhân.
- Đánh dấu câu đã học; tiến độ được lưu tự động trong trình duyệt.
- Ôn tập nhanh bằng flashcard: lật thẻ, đánh dấu “Đã nhớ” hoặc “Cần ôn lại”.
- **Thi thử 7 phút** (`index2.html`): tạo bộ đề ngẫu nhiên từ 38 câu, đếm ngược và tự nộp khi hết giờ.
- Tìm kiếm toàn văn, không phân biệt dấu tiếng Việt.
- Giao diện sáng/tối, responsive trên điện thoại, có chế độ in câu hỏi.
- Hoạt động hoàn toàn offline, không gọi API hay tải thư viện bên ngoài.

## Thi thử 7 phút

Mở `index2.html` hoặc bấm **Thi thử 7 phút** ở sidebar trang ôn tập.

- Mỗi lượt rút ngẫu nhiên câu hỏi từ ngân hàng 38 câu; có thể chọn **1, 3, 5 hoặc 8 câu** (mặc định 3).
- Đồng hồ chạy ngay khi bắt đầu và luôn đếm theo giờ thực, kể cả khi tải lại trang.
- Bài làm được tự lưu; đóng tab rồi mở lại sẽ tiếp tục đúng đề và thời gian còn lại.
- Hết 7 phút, hệ thống tự nộp. Sau khi nộp có thể xem lại bài làm và mở gợi ý đáp án cho các câu đã có nội dung trong thư viện (hiện là câu 1–16).
- Ngân hàng câu hỏi lấy từ `BỘ CÂU HỎI ÔN TẬP-2026.docx`, nằm trong `assets/exam-data.js`.

## Chạy trang web

Cách đơn giản nhất: mở trực tiếp tệp `index.html` bằng trình duyệt.

Nếu muốn chạy qua máy chủ cục bộ (khuyến nghị để `localStorage` hoạt động ổn định trên mọi trình duyệt):

```bash
cd /Users/vinhdv/Tai_lieu/QL_PTPM/QLDA_THI
python3 -m http.server 8765
```

Sau đó mở <http://localhost:8765/>.

## Cấu trúc dự án

```text
QLDA_THI/
├── index.html          # Khung trang, sidebar, thanh tìm kiếm, modal
├── index2.html         # Phòng thi ngẫu nhiên 7 phút
├── assets/
│   ├── data.js         # 8 module + nội dung các câu hỏi (nơi cần bổ sung)
│   ├── exam-data.js    # Ngân hàng 38 câu hỏi thi thử
│   ├── app.js          # Điều hướng, render, tìm kiếm, flashcard, lưu trạng thái
│   ├── exam.js         # Tạo đề, đếm ngược, tự lưu và nộp bài
│   ├── styles.css      # Giao diện dùng chung
│   ├── exam.css        # Giao diện phòng thi
│   └── favicon.svg
├── thi.md              # Ghi chú gốc
└── README.md
```

## Trạng thái nội dung

- **Câu 1–16:** đã có nội dung.
- **Câu 16:** đang ở trạng thái “Một phần” vì ghi chú nguồn mới có phần tiếp cận định lượng.
- **Câu 17–38:** đang là chỗ trống “Nội dung đang cập nhật”, sẵn sàng để bổ sung.

## Bổ sung câu hỏi

Mở `assets/data.js`, tìm object `questions` và thêm một mục theo mẫu:

```js
17: {
  title: "Tiêu đề câu hỏi",
  summary: "Một câu tóm tắt ngắn.",
  tags: ["Chủ đề 1", "Chủ đề 2"],
  keyPoints: [
    "Ý chính thứ nhất",
    "Ý chính thứ hai"
  ],
  content: `
## Khái niệm

Nội dung câu trả lời...

- Ý thứ nhất
- Ý thứ hai

| Tiêu chí | Cột A | Cột B |
| --- | --- | --- |
| Ví dụ | ... | ... |
`
},
```

Sau khi lưu tệp, chỉ cần tải lại trang. Câu hỏi sẽ tự xuất hiện trong module tương ứng (theo `questionIds` của module) và trong chế độ ôn tập.

### Các trường nội dung

| Trường | Bắt buộc | Ý nghĩa |
| --- | --- | --- |
| `title` | Có | Tiêu đề câu hỏi. |
| `summary` | Nên có | Tóm tắt một câu, hiển thị dưới tiêu đề và trên flashcard. |
| `tags` | Không | Nhãn chủ đề nhỏ. |
| `keyPoints` | Nên có | Các ý chính, dùng làm đáp án flashcard. |
| `content` | Có | Nội dung đầy đủ; nếu để trống, câu được coi là “đang cập nhật”. |
| `status` | Không | Đặt `"partial"` để hiển thị nhãn “Một phần”. |

### Định dạng Markdown được hỗ trợ

- `## Tiêu đề`, `### Tiêu đề nhỏ`
- `- ý` hoặc `1. ý` cho danh sách
- `**in đậm**`
- `> ghi chú`
- Bảng dạng `| a | b |`
- Đoạn văn cách nhau bằng dòng trống

### Thay đổi cách nhóm module

Trong `assets/data.js`, phần `modules`, sửa mảng `questionIds` của module cần đổi. Mỗi câu chỉ nên thuộc một module để tránh trùng lặp.

## Dữ liệu lưu trên trình duyệt

- Tiến độ học và ghi chú: `localStorage` với khóa `pmstudy.data.v1`.
- Lượt thi thử đang làm và kết quả gần nhất: khóa `pmstudy.exam.v1`.
- Giao diện sáng/tối: khóa `pmstudy.theme`.

Nút **Đặt lại** ở sidebar chỉ xoá tiến độ đã đánh dấu, **giữ nguyên ghi chú cá nhân**. Dữ liệu không được gửi đi đâu và sẽ mất nếu bạn xoá dữ liệu trình duyệt.

## Ghi chú

Nội dung được biên tập lại từ `thi.md` cho dễ đọc hơn (chuẩn hoá chính tả, chia tiêu đề, thêm bảng), nhưng giữ nguyên ý nghĩa của ghi chú gốc. Khi bổ sung câu 17–38, nên đối chiếu lại với tài liệu môn học để bảo đảm tính chính xác.
