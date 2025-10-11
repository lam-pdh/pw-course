# Lesson 03 -- Git & JavaScript Basic (Continue)

## 1. Git

### Undo Actions

- **Sửa commit message**
  - `git commit --amend -m "message"` → thay đổi nội dung commit gần
    nhất.
- **Bỏ file khỏi staging**
  - `git restore --staged <file>` → đưa 1 file ra khỏi staging.
  - `git restore --staged .` → bỏ toàn bộ file khỏi staging.
- **Reset commit (un-commit)**
  - `git reset HEAD~1` → quay lại trước 1 commit.
  - `git reset HEAD~N` → quay lại trước N commit.
  - Lưu ý: commit đầu tiên không thể reset, muốn reset phải xóa
    `.git` rồi init lại.

### Branching

- Nhánh giúp tách biệt code để tránh ảnh hưởng tới bản gốc.
- Câu lệnh cơ bản:
  - `git branch` → liệt kê nhánh.
  - `git branch <tên>` → tạo nhánh mới.
  - `git checkout <tên>` → chuyển nhánh.
  - `git checkout -b <tên>` → tạo + chuyển nhánh cùng lúc.
  - `git branch -D <tên>` → xóa nhánh.
- Lưu ý: **luôn `git pull origin main` trước khi tạo nhánh mới.**

### .gitignore

- Dùng để bỏ qua file/folder không cần Git theo dõi.
  - Ignore file: `filename`
  - Ignore folder: `foldername/`

### Kiến thức bổ sung

- **Checkout về revision bất kỳ**
  - Lấy commit hash từ `git log`, sau đó:
  - git checkout <revision>
  - Dùng để quay về trạng thái code trong quá khứ.

## 2. JavaScript

### Coding Conventions

- **snake_case** → ít dùng.
- **kebab-case** → tên file.
- **camelCase** → tên biến, hàm.
- **PascalCase** → tên class.

### Console Log

- Có thể dùng '', "", hoặc ``

- Ví dụ:
  console.log(‘Toi la Nga’);
  console.log(“Toi la Phong”);
  console.log(`${variable_name}`)
  let name = “Nga”;
  console.log(`Toi la ${name}`);
  console.log(“Toi ten la” + name+ “”)

### Object

- Khai báo: let/const <ten_object> = {<thuoc_tinh>: <gia_tri>,...}
- Trong đó:

  - <thuoc_tinh>: giống quy tắc đặt tên biến
  - <gia tri>: có kiểu giống biến, hoặc là 1 object khác.

- Truy vấn:

  - `user.name`
  - `user["name"]`

- Với `const object`, không gán lại object mới nhưng được phép thay đổi thuộc tính.

- Ví Dụ:
  const student = {“name”: “alex”, “age”: 20}
  student = {“name”: “Nagi”, “age”: 18} // lỗi

const student = {“name”: “alex”, “age”: 20}
student.name = “Nagi”; // Hợp lệ

- Xóa thuộc tính: delete user.age;

### Array

- Khai báo mảng: const students = ["An", "Bình", "Châu"];

- Truy cập phần tử: `students[0]`.

- Độ dài mảng: `students.length`.

- Thêm phần tử vào mảng bằng `.push()`.

### Function

- Khai báo:
  function greet(name) {
  return `Hello, ${name}`;
  }

- Tham số, giá trị trả về.

- Có thể tái sử dụng nhiều lần.
