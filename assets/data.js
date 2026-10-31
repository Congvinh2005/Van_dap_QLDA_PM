/* ============================================================
   PM Study — nội dung môn Quản lý dự án phần mềm
   ------------------------------------------------------------
   CÁCH BỔ SUNG CÂU HỎI:
   Thêm một mục vào object `questions` bên dưới theo mẫu:

   17: {
     title: "Tiêu đề câu hỏi",
     summary: "Một câu tóm tắt ngắn.",
     tags: ["Chủ đề 1", "Chủ đề 2"],
     keyPoints: ["Ý chính 1", "Ý chính 2"],
     content: `
   ## Khái niệm
   Nội dung...

   - Ý thứ nhất
   - Ý thứ hai
   `
   },

   Có thể dùng: ## tiêu đề, ### tiêu đề nhỏ, - danh sách,
   1. danh sách số, **in đậm**, > ghi chú, bảng | a | b |.
   Sau khi lưu, tải lại trang — không cần cơ sở dữ liệu.
   ============================================================ */

window.PM_DATA = {
  modules: [
    {
      id: 1,
      title: "Nền tảng dự án, phẩm chất PM & con người",
      navTitle: "Nền tảng & con người",
      description: "Khái niệm dự án, đặc trưng của dự án phần mềm, phẩm chất người quản lý dự án và những vấn đề nhân sự – giao tiếp thường gặp.",
      icon: "compass",
      color: "#6366f1",
      questionIds: [1, 2, 3, 24, 25]
    },
    {
      id: 2,
      title: "Hợp đồng & đề xuất kiến nghị",
      navTitle: "Hợp đồng & đề xuất",
      description: "Phân biệt các loại hợp đồng theo cách thanh toán và mức độ rủi ro, cùng hai kiểu kiến nghị trong đấu thầu.",
      icon: "file-signature",
      color: "#0284c7",
      questionIds: [4, 5]
    },
    {
      id: 3,
      title: "Tiến trình, Baseline & mô hình quy trình",
      navTitle: "Tiến trình & mô hình",
      description: "Cơ sở dữ liệu tiến trình, baseline, BOK, các mô hình công nghệ phần mềm và cách điều chỉnh – quản lý thay đổi quy trình.",
      icon: "workflow",
      color: "#0d9488",
      questionIds: [6, 7, 8, 9, 10, 11]
    },
    {
      id: 4,
      title: "Ước lượng, lịch biểu & nhân lực",
      navTitle: "Ước lượng & lịch biểu",
      description: "Ước lượng nỗ lực từ dưới lên với SMC, từ trên xuống với điểm chức năng; các yếu tố lập lịch và biến động đội dự án.",
      icon: "calculator",
      color: "#d97706",
      questionIds: [12, 13, 14]
    },
    {
      id: 5,
      title: "Quản lý chất lượng, số đo & SPC",
      navTitle: "Chất lượng & số đo",
      description: "Lỗi phần mềm, nguyên nhân phát sinh, các hoạt động phát hiện – loại bỏ lỗi và tiếp cận định lượng trong quản lý chất lượng.",
      icon: "shield-check",
      color: "#e11d48",
      questionIds: [15, 16, 17, 21, 22, 23, 33, 34, 35]
    },
    {
      id: 6,
      title: "Quản lý rủi ro",
      navTitle: "Quản lý rủi ro",
      description: "Nhận diện, phân tích, lập kế hoạch và ứng phó với các rủi ro có thể ảnh hưởng tới mục tiêu dự án.",
      icon: "alert-triangle",
      color: "#ea580c",
      questionIds: [18, 19, 20]
    },
    {
      id: 7,
      title: "Kế hoạch dự án & quản lý cấu hình",
      navTitle: "Kế hoạch & cấu hình",
      description: "Xây dựng kế hoạch dự án, kiểm soát thay đổi và quản lý các phiên bản cấu hình sản phẩm.",
      icon: "layers",
      color: "#7c3aed",
      questionIds: [26, 27, 28, 29]
    },
    {
      id: 8,
      title: "Hoạt động review & kết thúc dự án",
      navTitle: "Review & kết thúc",
      description: "Các hoạt động xem xét lại, nghiệm thu, bàn giao, tổng kết kinh nghiệm và đóng dự án.",
      icon: "flag",
      color: "#059669",
      questionIds: [30, 31, 32, 36, 37, 38]
    }
  ],

  questions: {
    1: {
      title: "Dự án là gì? Đặc trưng cơ bản và sự khác biệt của dự án phần mềm",
      summary: "Định nghĩa dự án, 6 đặc trưng cơ bản và những điểm khác biệt của dự án phần mềm so với dự án nói chung.",
      tags: ["Khái niệm", "Đặc trưng"],
      keyPoints: [
        "Dự án là tập hợp các hoạt động liên quan, nhằm đạt mục tiêu cụ thể và tạo ra sản phẩm/kết quả riêng biệt.",
        "Chịu ràng buộc về phạm vi, thời gian, nguồn lực và nhân sự.",
        "Sáu đặc trưng: mục đích rõ ràng, thời gian xác định, nguồn lực giới hạn, tính duy nhất, có rủi ro, các công việc liên quan.",
        "Dự án phần mềm vô hình, thay đổi thường xuyên, công nghệ biến động nhanh, phải sửa lỗi/nâng cấp liên tục và có rủi ro cao."
      ],
      content: `
## Khái niệm

Dự án là tập hợp các hoạt động có liên quan tới nhau, được thực hiện nhằm đạt một mục tiêu cụ thể, tạo ra sản phẩm hoặc kết quả riêng biệt, dưới các ràng buộc về **phạm vi, thời gian, nguồn lực và nhân sự**.

## Đặc trưng cơ bản

- Có mục đích và kết quả rõ ràng.
- Có thời điểm bắt đầu và thời điểm kết thúc xác định.
- Nguồn lực bị giới hạn.
- Mang tính duy nhất; sản phẩm hoặc kết quả có đặc điểm riêng.
- Luôn tồn tại rủi ro và những yếu tố có thể ảnh hưởng tới kết quả.
- Các công việc có liên quan tới nhau.

## Dự án phần mềm khác dự án nói chung ở đâu?

- **Vô hình:** khó nhìn thấy trực tiếp và khó đánh giá chính xác mức độ hoàn thành chỉ bằng quan sát.
- **Thường xuyên thay đổi:** yêu cầu và phạm vi có thể thay đổi trong quá trình phát triển.
- **Công nghệ thay đổi nhanh:** dễ phát sinh các vấn đề kỹ thuật mới.
- **Phải sửa lỗi, nâng cấp và cập nhật liên tục.**
- **Rủi ro cao** về kỹ thuật, yêu cầu và nhân lực chuyên môn.

> **Ghi nhớ:** Dự án = mục tiêu rõ ràng + thời hạn xác định + nguồn lực giới hạn + tính duy nhất + rủi ro + các công việc liên quan.
`
    },

    2: {
      title: "Người quản lý dự án cần có những phẩm chất gì?",
      summary: "Phẩm chất của PM và ba nhóm chương trình đào tạo: quản lý dự án, đặc tả yêu cầu khách hàng, kỹ năng mềm.",
      tags: ["PM", "Kỹ năng", "Đào tạo"],
      keyPoints: [
        "Nắm vững nghiệp vụ chuyên môn và có kỹ năng giao tiếp tốt.",
        "Biết thu thập yêu cầu khách hàng, quản lý đội ngũ và am hiểu văn hoá kinh doanh.",
        "Có kỹ năng làm văn bản, báo cáo và thuyết trình.",
        "Ba nhóm đào tạo: quản lý dự án, đặc tả yêu cầu khách hàng, kỹ năng mềm."
      ],
      content: `
## Phẩm chất cần có của người quản lý dự án

- **Nắm vững nghiệp vụ chuyên môn** để hiểu công việc và ra quyết định đúng.
- **Giao tiếp tốt:** tương tác, thu thập yêu cầu từ khách hàng và truyền đạt rõ ràng trong đội ngũ.
- **Quản lý đội ngũ hiệu quả**, biết phân công và theo dõi công việc.
- **Am hiểu văn hoá kinh doanh** của khách hàng và tổ chức.
- **Kỹ năng làm văn bản, báo cáo và thuyết trình.**

## Ba nhóm chương trình đào tạo

### 1. Đào tạo quản lý dự án
- Lập kế hoạch.
- Giám sát và kiểm soát dự án.
- Theo dõi tiến độ và quản lý nguồn lực.

### 2. Đào tạo về đặc tả yêu cầu khách hàng
- Khơi gợi và thu thập yêu cầu.
- Lập tài liệu đặc tả yêu cầu.
- Xác minh và kiểm tra yêu cầu.

### 3. Đào tạo kỹ năng mềm
- Đánh giá và quản lý đội ngũ dự án.
- Chăm sóc và quản lý khách hàng.
- Phát triển khả năng lãnh đạo.
- Rèn luyện quan hệ xã hội và hiểu biết văn hoá.

> **Ghi nhớ:** Chuyên môn vững + giao tiếp tốt + biết quản lý con người.
`
    },

    3: {
      title: "Các vấn đề cơ bản và ảnh hưởng của “thay đổi yêu cầu không kiểm soát”",
      summary: "Chín vấn đề thường gặp và bốn tác động của thay đổi yêu cầu không kiểm soát, dẫn tới nguy cơ thất bại dự án.",
      tags: ["Yêu cầu", "Phạm vi", "Rủi ro"],
      keyPoints: [
        "Vấn đề thường gặp: yêu cầu mơ hồ, thay đổi không kiểm soát, ước lượng sai, thiếu nhân lực, vấn đề kỹ thuật, phụ thuộc bên ngoài, giám sát kém, rủi ro chất lượng, giao tiếp kém.",
        "Ảnh hưởng: trôi phạm vi, chậm tiến độ, tăng chi phí, giảm chất lượng.",
        "Khó quản lý nguồn lực và gây căng thẳng cho đội ngũ.",
        "Hệ quả cuối cùng: nguy cơ thất bại dự án."
      ],
      content: `
## Các vấn đề cơ bản

- Yêu cầu ban đầu không rõ ràng.
- Thay đổi yêu cầu không kiểm soát.
- Ước lượng không chính xác; dự đoán sai nguồn lực, chi phí.
- Thiếu nhân lực có chuyên môn.
- Vấn đề kỹ thuật.
- Phụ thuộc nguồn lực bên ngoài.
- Theo dõi, giám sát không đầy đủ.
- Rủi ro về chất lượng.
- Giao tiếp kém.

## Ảnh hưởng của “thay đổi yêu cầu không kiểm soát”

- **Trôi phạm vi (scope creep):** phạm vi dự án phình ra ngoài kế hoạch.
- **Chậm tiến độ và tăng chi phí.**
- **Giảm chất lượng sản phẩm.**
- **Khó quản lý nguồn lực**, gây căng thẳng cho đội ngũ dự án.

> **Hệ quả:** nếu không kiểm soát, dự án có nguy cơ thất bại.
`
    },

    4: {
      title: "Hợp đồng phí cộng thêm và hợp đồng giá cố định — khái niệm và khác biệt",
      summary: "So sánh hai loại hợp đồng theo 5 tiêu chí: thanh toán, xác định chi phí, yêu cầu dự án, bên chịu rủi ro và tính linh hoạt.",
      tags: ["Hợp đồng", "Chi phí"],
      keyPoints: [
        "Phí cộng thêm: thanh toán chi phí thực tế hợp lý + phí/lợi nhuận đã thoả thuận; tổng chi phí khó xác định từ đầu.",
        "Giá cố định: thống nhất trước một mức giá cho phạm vi và điều kiện đã thoả thuận.",
        "Phí cộng thêm phù hợp khi yêu cầu chưa rõ, dễ thay đổi; khách hàng chịu phần lớn rủi ro chi phí.",
        "Giá cố định phù hợp khi yêu cầu rõ và ổn định; nhà phát triển chịu phần lớn rủi ro chi phí.",
        "Phí cộng thêm linh hoạt hơn; giá cố định ít linh hoạt, thay đổi phải điều chỉnh hợp đồng."
      ],
      content: `
## Hợp đồng phí cộng thêm (Cost-plus)

Khách hàng thanh toán các **chi phí thực tế hợp lý** mà nhà phát triển bỏ ra, cộng thêm một khoản phí hoặc lợi nhuận đã thoả thuận. Tổng chi phí cuối cùng thường chưa xác định chính xác ngay từ đầu mà phụ thuộc vào chi phí thực tế của dự án.

## Hợp đồng giá cố định (Fixed-price)

Hai bên thoả thuận trước một **mức giá** để nhà phát triển thực hiện và bàn giao sản phẩm theo phạm vi, yêu cầu và điều kiện đã thống nhất. Hình thức này phù hợp khi yêu cầu tương đối rõ ràng, ổn định; nếu thay đổi phạm vi, hai bên có thể phải làm thủ tục điều chỉnh hợp đồng.

## So sánh hai loại hợp đồng

| Tiêu chí | Hợp đồng phí cộng thêm | Hợp đồng giá cố định |
| --- | --- | --- |
| Cách thanh toán | Chi phí thực tế + lợi nhuận | Theo mức giá đã thoả thuận |
| Xác định chi phí | Tổng chi phí cuối cùng khó xác định chính xác từ đầu | Giá hợp đồng được xác định trước |
| Yêu cầu dự án | Phù hợp khi yêu cầu chưa rõ ràng hoặc có khả năng thay đổi | Phù hợp khi phạm vi, yêu cầu rõ ràng và đầy đủ từ đầu |
| Bên chịu rủi ro | Khách hàng chịu phần lớn rủi ro khi chi phí tăng | Nhà phát triển chịu phần lớn rủi ro khi chi phí tăng |
| Tính linh hoạt | Linh hoạt hơn khi có thay đổi | Ít linh hoạt hơn; thay đổi cần điều chỉnh giá và hợp đồng |

> **Ghi nhớ:** Phí cộng thêm → khách hàng gánh rủi ro chi phí, linh hoạt. Giá cố định → nhà phát triển gánh rủi ro chi phí, cần yêu cầu rõ.
`
    },

    5: {
      title: "Kiến nghị không do yêu cầu và kiến nghị do yêu cầu — khác nhau cơ bản",
      summary: "Phân biệt kiến nghị chủ động và kiến nghị theo yêu cầu; 5 thành phần của một kiến nghị không do yêu cầu.",
      tags: ["Đề xuất", "Đấu thầu"],
      keyPoints: [
        "Kiến nghị không do yêu cầu: nhà cung cấp chủ động đề xuất khi phát hiện nhu cầu/cơ hội; ít hoặc không có đối thủ trực tiếp.",
        "Kiến nghị do yêu cầu: đáp ứng yêu cầu chính thức của khách hàng, thường qua RFP; cạnh tranh rất cao.",
        "5 thành phần kiến nghị không do yêu cầu: lý do, vấn đề, giải pháp, năng lực nhà cung cấp, kinh phí.",
        "Kiến nghị do yêu cầu được tổ chức như một dự án nội bộ với đội ngũ chuyên nghiệp."
      ],
      content: `
## 1. Kiến nghị không do yêu cầu (Unsolicited proposal)

Nhà cung cấp **chủ động đề xuất** với khách hàng khi phát hiện nhu cầu hoặc cơ hội, trong khi khách hàng chưa đưa ra lời mời thầu hay yêu cầu đề xuất.

Năm thành phần chính:

1. Lý do đệ trình.
2. Mô tả vấn đề cần giải quyết.
3. Mô tả giải pháp đề nghị.
4. Giới thiệu tổ chức, năng lực và kinh nghiệm của nhà cung cấp.
5. Tổng quát về kinh phí.

## 2. Kiến nghị do yêu cầu (Solicited proposal)

Nhà cung cấp lập kiến nghị để **đáp ứng yêu cầu chính thức** của khách hàng, thường dựa trên hồ sơ mời thầu (RFP) hoặc yêu cầu đề xuất.

## 3. Khác nhau cơ bản

| Tiêu chí | Kiến nghị không do yêu cầu | Kiến nghị do yêu cầu |
| --- | --- | --- |
| Nguồn gốc | Nhà cung cấp chủ động khởi xướng | Khách hàng chủ động yêu cầu |
| Tính cạnh tranh | Ít hoặc không có đối thủ cạnh tranh trực tiếp | Cạnh tranh rất cao với các nhà cung cấp khác |
| Cách thức tổ chức | Tự phát, linh hoạt theo nhóm hoặc sáng kiến cá nhân | Được xem như một dự án nội bộ, cần đội ngũ chuyên nghiệp trong thời gian yêu cầu |

> **Ghi nhớ:** Không do yêu cầu = mình tự tìm cơ hội, ít cạnh tranh. Do yêu cầu = khách mời thầu, cạnh tranh cao, làm bài bản như một dự án.
`
    },

    6: {
      title: "Cơ sở dữ liệu tiến trình: khái niệm, vai trò và dữ liệu chính",
      summary: "Cơ sở dữ liệu tiến trình là gì, tại sao cần và 5 nhóm dữ liệu chính thường được lưu giữ.",
      tags: ["CSDL", "Tiến trình"],
      keyPoints: [
        "Cơ sở dữ liệu tiến trình lưu trữ có hệ thống dữ liệu thu thập trong quá trình thực hiện dự án phần mềm.",
        "Dùng để lập kế hoạch, ước lượng, phân tích năng suất và chất lượng, hỗ trợ quản lý và cải tiến dự án sau.",
        "Năm nhóm dữ liệu: đặc trưng dự án, thời gian biểu, nỗ lực, kích thước phần mềm, lỗi sản phẩm.",
        "Mục đích tổng quát: theo dõi – ước lượng – chất lượng – cải tiến – rút kinh nghiệm."
      ],
      content: `
## Khái niệm

Cơ sở dữ liệu tiến trình là nơi lưu trữ **có hệ thống** các dữ liệu được thu thập trong quá trình thực hiện các dự án phần mềm, nhằm phục vụ việc theo dõi, đánh giá và cải tiến.

## Tại sao cần phải có?

Cơ sở dữ liệu tiến trình được sử dụng để **lập kế hoạch, ước lượng, phân tích năng suất và chất lượng**, từ đó hỗ trợ quản lý và cải tiến các dự án tiếp theo.

## Những loại dữ liệu chính

| Nhóm dữ liệu | Nội dung |
| --- | --- |
| Đặc trưng của dự án | Loại dự án, công nghệ sử dụng |
| Thời gian biểu | Thời gian thực hiện các công việc |
| Nỗ lực của dự án | Công sức lao động của đội ngũ |
| Kích thước phần mềm | Quy mô sản phẩm phần mềm |
| Lỗi của sản phẩm | Số lượng và thông tin về lỗi |

> **Ghi nhớ nhanh:** Lưu dữ liệu quá trình → theo dõi, ước lượng, đánh giá chất lượng, cải tiến và rút kinh nghiệm. Dữ liệu: quy mô – công sức – thời gian – chi phí – chất lượng – quy trình – thay đổi và rủi ro.
`
    },

    7: {
      title: "Baseline của tiến trình: khái niệm, vai trò và các loại",
      summary: "Baseline là chuẩn so sánh đã được phê duyệt; vai trò kiểm soát và ba loại baseline chính.",
      tags: ["Baseline", "Kiểm soát"],
      keyPoints: [
        "Baseline là mốc thời gian hoặc tập đặc tả, kế hoạch, sản phẩm trung gian đã được phê duyệt chính thức.",
        "Vai trò: làm chuẩn so sánh, theo dõi – kiểm soát tiến độ/chất lượng, quản lý thay đổi và điều chỉnh sai lệch.",
        "Ba loại: baseline chức năng/yêu cầu, baseline kỹ thuật/thiết kế, baseline sản phẩm/tiến độ và ngân sách."
      ],
      content: `
## Khái niệm

Baseline là một mốc thời gian hoặc tập hợp các đặc tả kỹ thuật, kế hoạch và sản phẩm trung gian đã được **phê duyệt chính thức**, làm chuẩn để theo dõi, kiểm soát và đánh giá tiến độ, chất lượng dự án.

## Vai trò

- Làm chuẩn để so sánh kế hoạch với kết quả thực tế.
- Theo dõi và kiểm soát tiến độ, chất lượng dự án.
- Quản lý thay đổi, phát hiện sai lệch và đưa ra biện pháp điều chỉnh.

## Các loại baseline

| Loại baseline | Nội dung xác định |
| --- | --- |
| Chức năng / yêu cầu | Các yêu cầu chức năng và phi chức năng đã được phê duyệt |
| Kỹ thuật / thiết kế | Cấu trúc kỹ thuật, giải pháp thiết kế và cách phân chia yêu cầu thành các thành phần hệ thống |
| Sản phẩm / tiến độ và ngân sách | Kế hoạch tiến độ, ngân sách và các sản phẩm bàn giao của dự án |

> **Ghi nhớ:** Baseline = mốc đã duyệt → dùng làm thước đo. Ba loại: yêu cầu – thiết kế – sản phẩm/tiến độ/ngân sách.
`
    },

    8: {
      title: "BOK là gì? Kiến thức trong BOK gồm những chủ đề gì, đến từ đâu?",
      summary: "BOK — hệ tri thức chuẩn hoá; 4 nhóm chủ đề chính và nguồn gốc từ thực tiễn, nghiên cứu, chuyên gia.",
      tags: ["BOK", "Tri thức"],
      keyPoints: [
        "BOK (Body of Knowledge) là hệ tri thức được chuẩn hoá để tích luỹ, lưu trữ và chia sẻ kiến thức, kinh nghiệm, thực tiễn tốt nhất.",
        "Bốn nhóm chủ đề: quy trình quản lý, lĩnh vực chuyên môn, công cụ và kỹ thuật, đạo đức và hành vi nghề nghiệp.",
        "Kiến thức đến từ kinh nghiệm thực tế, dự án phần mềm, nghiên cứu, tài liệu chuyên ngành và thực tiễn tốt nhất của chuyên gia, tổ chức."
      ],
      content: `
## BOK là gì?

BOK (Body of Knowledge) là **hệ tri thức được chuẩn hoá** nhằm tích luỹ, lưu trữ và chia sẻ kiến thức, kinh nghiệm cùng các thực tiễn tốt nhất trong lĩnh vực phát triển phần mềm.

## Kiến thức trong BOK gồm những chủ đề gì?

- **Các quy trình quản lý:** từ khởi tạo, lập kế hoạch, thực thi cho đến giám sát và đóng dự án.
- **Các lĩnh vực chuyên môn:** quản lý phạm vi, tiến độ, chi phí, chất lượng, nhân sự, rủi ro và các bên liên quan.
- **Công cụ và kỹ thuật:** phương pháp ước lượng, sơ đồ mạng lưới, biểu đồ Gantt, quản lý cấu hình, các mô hình Agile/Scrum.
- **Nguyên tắc đạo đức và hành vi nghề nghiệp:** trách nhiệm, tính trung thực và tuân thủ các chuẩn mực nghề nghiệp.

## Kiến thức trong BOK đến từ đâu?

Tổng hợp từ **kinh nghiệm thực tế, các dự án phần mềm, kết quả nghiên cứu, tài liệu chuyên ngành và thực tiễn tốt nhất** của các chuyên gia, tổ chức.

> **Ghi nhớ:** BOK = kho tri thức chuẩn hoá. 4 nhóm: quy trình – lĩnh vực chuyên môn – công cụ/kỹ thuật – đạo đức nghề nghiệp. Nguồn: thực tiễn + nghiên cứu + chuyên gia.
`
    },

    9: {
      title: "Các mô hình công nghệ phần mềm và mô hình tiến trình chuẩn ở Infosys",
      summary: "Bảy mô hình công nghệ phần mềm và mô hình tiến trình chuẩn của Infosys cải tiến từ mô hình thác nước.",
      tags: ["Mô hình", "Infosys"],
      keyPoints: [
        "Bảy mô hình: thác nước, chữ V, nguyên mẫu, tăng trưởng, xoắn ốc, RAD, Agile/Scrum.",
        "Mô hình Infosys dựa trên thác nước nhưng chia giai đoạn thành các bước nhỏ hơn để một số hoạt động chạy song song.",
        "Các giai đoạn: phân tích yêu cầu → thiết kế tổng thể → thiết kế chi tiết → xây dựng → kiểm thử đơn vị → tích hợp → kiểm thử hệ thống → nghiệm thu, cài đặt → hỗ trợ sau bàn giao.",
        "Cải tiến: học từ dự án trước, chuẩn hoá quy trình, tăng kiểm soát chất lượng, áp dụng số đo và cơ sở dữ liệu tiến trình."
      ],
      content: `
## Bảy mô hình công nghệ phần mềm

| Mô hình | Cách nhận diện nhanh |
| --- | --- |
| Thác nước (Waterfall) | Tuần tự; hoàn tất giai đoạn trước rồi mới sang giai đoạn sau |
| Chữ V (V-Model) | Nhấn mạnh kiểm chứng, kiểm thử tương ứng với từng giai đoạn phát triển |
| Nguyên mẫu (Prototype) | Xây dựng bản mẫu để làm rõ yêu cầu và thu phản hồi |
| Tăng trưởng (Incremental) | Phát triển và bàn giao sản phẩm theo từng phần tăng dần |
| Xoắn ốc (Spiral) | Lặp theo vòng, kết hợp phát triển với phân tích rủi ro |
| RAD | Phát triển nhanh, dựa trên nguyên mẫu và phản hồi người dùng |
| Agile/Scrum | Lặp ngắn, thích nghi thay đổi, cộng tác liên tục với khách hàng |

## Mô hình tiến trình chuẩn ở Infosys

### Cơ sở xây dựng

Dựa trên **mô hình thác nước**, nhưng chia các giai đoạn thành những bước nhỏ hơn để một số hoạt động có thể thực hiện **song song**.

### Các giai đoạn

Phân tích yêu cầu → thiết kế tổng thể → thiết kế chi tiết → xây dựng → kiểm thử đơn vị → tích hợp → kiểm thử hệ thống → nghiệm thu và cài đặt → hỗ trợ sau bàn giao.

### Cách cải tiến, cải thiện

- Thu thập, phân tích kinh nghiệm từ các dự án trước.
- Chuẩn hoá và điều chỉnh quy trình phù hợp cho từng dự án.
- Tăng cường kiểm soát chất lượng.
- Áp dụng các số đo và cơ sở dữ liệu tiến trình.

> **Ghi nhớ:** 7 mô hình; Infosys = thác nước + chia nhỏ bước + chạy song song + chuẩn hoá, đo lường và cải tiến liên tục.
`
    },

    10: {
      title: "Tại sao phải điều chỉnh tiến trình? Các đặc trưng dự án làm cơ sở điều chỉnh",
      summary: "Không có quy trình chuẩn cho mọi dự án; 4 mục đích điều chỉnh và 8 đặc trưng dự án cần dựa vào.",
      tags: ["Tailoring", "Tiến trình"],
      keyPoints: [
        "Không có một quy trình chuẩn nào áp dụng hoàn hảo cho mọi dự án; mỗi dự án khác nhau về kích thước, độ phức tạp, công nghệ, nhân lực, chất lượng.",
        "Mục đích: giảm chi phí, tối ưu nguồn lực, tăng hiệu quả, đảm bảo chất lượng, phù hợp đặc điểm dự án.",
        "Tám đặc trưng: kích thước, độ phức tạp, công nghệ, kinh nghiệm đội, rủi ro, độ ổn định yêu cầu, yêu cầu chất lượng, thời gian – ngân sách – nguồn lực."
      ],
      content: `
## Vì sao phải điều chỉnh tiến trình?

- Không có một quy trình chuẩn nào có thể được áp dụng hoàn hảo cho mọi dự án.
- Mỗi dự án có sự khác biệt rõ rệt về kích thước, độ phức tạp, công nghệ, nhân lực và yêu cầu chất lượng.

## Mục đích của việc điều chỉnh

- Giảm chi phí và tối ưu nguồn lực.
- Tăng hiệu quả thực hiện.
- Đảm bảo chất lượng sản phẩm bàn giao.
- Phù hợp với đặc điểm riêng của từng dự án.

## Các đặc trưng dự án làm cơ sở điều chỉnh

- Kích thước dự án.
- Độ phức tạp của hệ thống.
- Công nghệ sử dụng.
- Kinh nghiệm của đội dự án.
- Mức độ rủi ro.
- Mức độ ổn định, rõ ràng của yêu cầu.
- Yêu cầu chất lượng.
- Thời gian, ngân sách, chi phí và nguồn lực.

> **Ghi nhớ:** “Không có một cỡ vừa cho tất cả” → điều chỉnh tiến trình theo 8 đặc trưng để giảm chi phí, tăng hiệu quả, đảm bảo chất lượng và phù hợp từng dự án.
`
    },

    11: {
      title: "Quản lý thay đổi yêu cầu: lý do và quy trình ở Infosys",
      summary: "Vì sao phải quản lý thay đổi yêu cầu và quy trình 8 bước tại Infosys.",
      tags: ["Thay đổi", "Yêu cầu", "Infosys"],
      keyPoints: [
        "Yêu cầu khách hàng thường xuyên thay đổi trong suốt quá trình phát triển.",
        "Không quản lý đúng gây trễ tiến độ, tăng chi phí/nguồn lực, giảm chất lượng, mất kiểm soát phạm vi và tiến trình.",
        "Quy trình 8 bước: tiếp nhận → ghi nhận → phân tích tác động → xem xét/phê duyệt → cập nhật kế hoạch → thực hiện → kiểm tra/xác nhận → cập nhật tài liệu."
      ],
      content: `
## Vì sao phải quản lý thay đổi yêu cầu?

Yêu cầu của khách hàng thường xuyên thay đổi trong suốt quá trình phát triển dự án. Nếu không quản lý đúng cách, có thể dẫn đến:

- Trễ tiến độ dự án.
- Tăng chi phí, phát sinh nguồn lực.
- Giảm chất lượng sản phẩm.
- Mất kiểm soát phạm vi và tiến trình dự án.

## Quy trình quản lý thay đổi yêu cầu ở Infosys

1. Tiếp nhận yêu cầu thay đổi.
2. Ghi nhận yêu cầu thay đổi.
3. Phân tích tác động: chi phí, thời gian, chất lượng, rủi ro.
4. Xem xét và phê duyệt.
5. Cập nhật kế hoạch dự án.
6. Thực hiện thay đổi.
7. Kiểm tra và xác nhận.
8. Cập nhật tài liệu liên quan.

> **Ghi nhớ:** Nhận → Ghi → Phân tích → Duyệt → Cập nhật kế hoạch → Thực hiện → Kiểm tra → Cập nhật tài liệu.
`
    },

    12: {
      title: "Ước lượng nỗ lực từ dưới lên với SMC — các bước",
      summary: "Sáu bước ước lượng bottom-up với phân loại Simple – Medium – Complex và mẹo ghi nhớ.",
      tags: ["Ước lượng", "SMC"],
      keyPoints: [
        "SMC = Simple – Medium – Complex (đơn giản – trung bình – phức tạp).",
        "Chia hệ thống thành đơn vị chương trình, phân loại S/M/C.",
        "Dùng baseline hoặc dữ liệu dự án tương tự để xác định nỗ lực trung bình cho mỗi loại.",
        "Điều chỉnh theo đặc thù, tính tổng nỗ lực xây dựng, ước lượng việc khác rồi tinh chỉnh lần cuối.",
        "Mẹo: Phân loại S/M/C → nỗ lực trung bình → tinh chỉnh → tính tổng → ước lượng việc khác → điều chỉnh cuối."
      ],
      content: `
## Các bước ước lượng nỗ lực từ dưới lên với SMC

SMC = **Simple – Medium – Complex** (đơn giản – trung bình – phức tạp).

1. Chia hệ thống thành các đơn vị chương trình và phân loại theo 3 mức S/M/C.
2. Sử dụng baseline của dự án, dữ liệu dự án tương tự hoặc baseline chung để xác định nỗ lực trung bình cho từng loại S/M/C.
3. Điều chỉnh mức ước lượng nỗ lực theo các yếu tố đặc thù của dự án.
4. Tính tổng nỗ lực xây dựng: nhân số lượng chương trình từng loại với nỗ lực trung bình tương ứng rồi cộng lại.
5. Ước lượng các công việc khác để xác định tổng nỗ lực toàn dự án.
6. Tinh chỉnh lần cuối dựa trên đặc điểm thực tế của dự án.

> **Mẹo ghi nhớ:** Phân loại S/M/C → xác định nỗ lực trung bình → tinh chỉnh → tính tổng → ước lượng việc khác → điều chỉnh cuối cùng.

**Công thức trực quan:**

Tổng nỗ lực xây dựng = (Số chương trình S × nỗ lực S) + (Số chương trình M × nỗ lực M) + (Số chương trình C × nỗ lực C).
`
    },

    13: {
      title: "Ước lượng nỗ lực từ trên xuống — các bước",
      summary: "Năm bước ước lượng top-down, bắt đầu từ điểm chức năng và dữ liệu năng suất.",
      tags: ["Ước lượng", "Top-down"],
      keyPoints: [
        "Ước lượng kích thước tổng của phần mềm bằng điểm chức năng (Function Points).",
        "Lấy dữ liệu năng suất từ baseline hoặc dự án tương tự để hiệu chỉnh.",
        "Tính nỗ lực tổng thể từ năng suất và kích thước.",
        "Điều chỉnh theo đặc trưng riêng của dự án.",
        "Dùng dữ liệu phân phối để ước lượng nỗ lực cho từng giai đoạn."
      ],
      content: `
## Các bước ước lượng nỗ lực từ trên xuống

1. Ước lượng kích thước tổng cộng của phần mềm bằng các **điểm chức năng (Function Points)**.
2. Lấy dữ liệu năng suất từ baseline hoặc các dự án tương tự để hiệu chỉnh cho phù hợp với dự án hiện tại.
3. Tính nỗ lực tổng thể của dự án từ năng suất và kích thước.
4. Điều chỉnh kết quả dựa trên các đặc trưng riêng của dự án.
5. Dùng dữ liệu phân phối từ baseline hoặc dự án tương tự để ước lượng nỗ lực cho các giai đoạn khác nhau của dự án.

> **Ghi nhớ:** Kích thước tổng (FP) → năng suất → tổng nỗ lực → điều chỉnh → phân bổ cho từng giai đoạn.
`
    },

    14: {
      title: "Lịch biểu dự án phụ thuộc gì? Kích cỡ đội dự án thay đổi ra sao?",
      summary: "Sáu yếu tố ảnh hưởng lịch biểu và xu hướng tăng – đạt đỉnh – giảm của đội dự án qua ba giai đoạn.",
      tags: ["Lịch biểu", "Nhân lực"],
      keyPoints: [
        "Lịch biểu phụ thuộc: kích thước, độ phức tạp, nguồn lực, nỗ lực, quan hệ phụ thuộc, yêu cầu và thời gian.",
        "Giai đoạn đầu: đội nhỏ và tăng dần, chủ yếu PM, khảo sát, phân tích, lập kế hoạch.",
        "Giai đoạn giữa: nhân sự tăng lên mức cao nhất khi thiết kế, lập trình, kiểm thử chạy đồng thời.",
        "Giai đoạn cuối: giảm dần, giữ lại người làm nghiệm thu, bảo trì, hỗ trợ triển khai và bàn giao."
      ],
      content: `
## Lịch biểu dự án phụ thuộc vào những yếu tố nào?

1. Kích thước dự án.
2. Độ phức tạp.
3. Nguồn lực.
4. Nỗ lực thực hiện.
5. Các mối quan hệ phụ thuộc.
6. Yêu cầu và thời gian.

## Kích cỡ đội dự án thay đổi qua 3 giai đoạn

| Giai đoạn | Xu hướng nhân sự | Công việc chủ yếu |
| --- | --- | --- |
| Đầu dự án | Nhỏ và tăng dần | Quản lý dự án, khảo sát, phân tích yêu cầu, lập kế hoạch |
| Giữa dự án | Tăng lên mức cao nhất | Thiết kế, lập trình và kiểm thử diễn ra đồng thời |
| Cuối dự án | Giảm dần | Nghiệm thu, bảo trì, hỗ trợ triển khai và bàn giao |

## Vì sao kích cỡ đội lại thay đổi như vậy?

- **Đầu dự án:** ít công việc song song, chủ yếu là khảo sát, phân tích và lập kế hoạch nên đội còn nhỏ.
- **Giữa dự án:** khối lượng công việc lớn nhất, nhiều hoạt động diễn ra đồng thời như thiết kế, lập trình và kiểm thử nên cần nhiều nhân sự.
- **Cuối dự án:** công việc gần hoàn thành, chỉ cần một số người xử lý nghiệm thu, bảo trì và bàn giao.

> **Ghi nhớ:** Đội dự án đi theo hình “tăng dần – đạt đỉnh – giảm dần”, tương ứng với khối lượng và mức độ song song của công việc.
`
    },

    15: {
      title: "Lỗi phần mềm: khái niệm, nguyên nhân và hoạt động phát hiện – loại bỏ",
      summary: "Lỗi phần mềm là gì, 6 nguyên nhân thường gặp và 4 hoạt động: rà soát, kiểm thử, gỡ lỗi, kiểm tra lại.",
      tags: ["Lỗi", "Kiểm thử"],
      keyPoints: [
        "Lỗi phần mềm là sai sót trong yêu cầu, thiết kế hoặc mã nguồn khiến phần mềm không đúng mong đợi/yêu cầu.",
        "Nguyên nhân: yêu cầu không rõ, độ phức tạp cao, sai sót con người, công nghệ thay đổi, thiếu kiểm thử, giao tiếp kém.",
        "Bốn hoạt động: rà soát → kiểm thử → gỡ lỗi → kiểm tra lại.",
        "Rà soát kiểm tra tài liệu/thiết kế/mã nguồn; kiểm thử phát hiện lỗi; gỡ lỗi tìm nguyên nhân và sửa; kiểm tra lại xác nhận."
      ],
      content: `
## Khái niệm lỗi phần mềm

Lỗi phần mềm là những sai sót trong yêu cầu, thiết kế hoặc mã nguồn khiến phần mềm không hoạt động đúng với mong đợi hoặc không đáp ứng đúng yêu cầu đặt ra.

## Tại sao phát triển phần mềm hay mắc lỗi?

1. **Yêu cầu không rõ ràng**, thường xuyên thay đổi.
2. **Độ phức tạp cao**, nhiều chức năng liên quan tới nhau.
3. **Sai sót của con người:** lập trình viên có thể hiểu sai hoặc viết code sai.
4. **Công nghệ thay đổi:** cập nhật mới có thể phát sinh vấn đề.
5. **Thiếu kiểm thử:** không kiểm tra đầy đủ chức năng và trường hợp ngoại lệ.
6. **Giao tiếp kém:** không thống nhất được cách triển khai.

## Các hoạt động phát hiện và loại bỏ lỗi

| Hoạt động | Mục đích |
| --- | --- |
| Rà soát (review) | Kiểm tra tài liệu, bản thiết kế, mã nguồn |
| Kiểm thử (testing) | Phát hiện lỗi, sai sót hoặc trường hợp ngoại lệ |
| Gỡ lỗi (debugging) | Tìm nguyên nhân và sửa lỗi đã phát hiện |
| Kiểm tra lại (recheck) | Xác nhận lỗi đã được khắc phục và hệ thống chạy ổn định |

> **Ghi nhớ:** Rà soát → Kiểm thử → Gỡ lỗi → Kiểm tra lại.
`
    },

    16: {
      title: "Một số tiếp cận định lượng để quản lý chất lượng dự án phần mềm",
      summary: "Tiếp cận định lượng dùng số liệu, chỉ số và phép đo để đánh giá, theo dõi, kiểm soát chất lượng.",
      tags: ["Chất lượng", "Định lượng"],
      status: "partial",
      keyPoints: [
        "Tiếp cận định lượng dùng số liệu, chỉ số và phép đo cụ thể để đánh giá, theo dõi, kiểm soát chất lượng phần mềm.",
        "Dự đoán hiệu suất và số lượng lỗi: dùng dữ liệu quá khứ để lập giới hạn kiểm soát, so sánh thực tế và cảnh báo sớm.",
        "Nội dung câu này đang được bổ sung thêm các tiếp cận khác."
      ],
      content: `
## Khái niệm

Tiếp cận định lượng là sử dụng các **số liệu, chỉ số và phép đo cụ thể** để đánh giá, theo dõi và kiểm soát chất lượng phần mềm.

## Một số tiếp cận

### 1. Dự đoán hiệu suất và số lượng lỗi

Sử dụng dữ liệu quá khứ để thiết lập **giới hạn kiểm soát**, so sánh kết quả thực tế với dự đoán nhằm **cảnh báo sớm**.
`
    }
  }
};
