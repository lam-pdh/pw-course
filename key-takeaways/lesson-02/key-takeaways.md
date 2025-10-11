# Lesson 02 – Git & JavaScript Basic

## 1. Version Control System (VCS)

- Quản lý phiên bản của file và project.
- Các mô hình lưu trữ:
  - **Local**: lưu trên máy cá nhân.
  - **Centralized**: lưu trên máy chủ tập trung.
  - **Distributed**: lưu trên nhiều máy khác nhau.

## 2. Git

### Các trạng thái file trong Git

- **Working Directory** | **Staging Area** | **Repository**.

### Câu lệnh thường dùng

- `git init` → khởi tạo repo.
- `git config user.name "<name>"`
- `git config user.email "<email>"`
- `git add <file>` hoặc `git add .`
- `git status` → xem trạng thái file.
- `git commit -m "message"` → tạo phiên bản.
- `git log` → xem lịch sử commit.

### Commit Convention

- Quy tắc commit giúp teamwork rõ ràng.
- Format: `<type>: <short_description>`
  - **chore**: sửa nhỏ, xóa file, format code.
  - **feat**: thêm tính năng, test case.
  - **fix**: sửa lỗi.
- Ví dụ:
  - `chore: remove unused file`
  - `feat: add code for exercise 2`
  - `fix: fix automation for case 1`

### Simple Workflow

- init → add → commit → push.
- Có thể dùng config global hoặc local repo.

## 3. JavaScript Basic

### Comment

- **1 dòng**: `// code`\
- **Nhiều dòng**:

### Biến và Hằng

- **var / let**: khai báo biến (let an toàn hơn, phạm vi block).
- **const**: khai báo hằng (không thay đổi).
- Quy tắc đặt tên: không chứa khoảng trắng, không trùng từ khóa.
- Best practice: dùng `const` mặc định, chỉ dùng `let` khi cần.

### Kiểu dữ liệu

- **Primitive**: Number, String, Boolean, Undefined, Null, Symbol, BigInt.
- **Reference**: Object.
- Kiểm tra kiểu dữ liệu: `typeof variable`.

### Toán tử

- **So sánh**:
  - `==`: So sánh giá trị sau khi chuyển đổi kiểu
  - `===`: So sánh giá trị và kiểu dữ liệu - không chuyển đổi kiểu (nên dùng).
- **Logic**: `&&` (AND), `||` (OR).
- **Một ngôi**: `++x`, `x++`, `--x`, `x--`.
- **Toán học**: `+`, `-`, `*`, `/` (chia 0 → Infinity).

### Câu điều kiện

- if, if...else, if...else if...else, switch...case.

### Vòng lặp

- Các loại: for (i), for...of, for...in, forEach, while, do...while.
