# Lesson 06 -- Git & JavaScript Advanced

## 1. Git

### Clone, Pull, Push

- **Clone**: sao chép toàn bộ repo từ server về máy cá nhân.

  ```bash
  git clone <repo-url>
  git clone <repo-url> <tên-thư-mục>
  ```

  - Dùng SSH tiện hơn (không cần nhập password mỗi lần push/pull).

- **Pull**: lấy dữ liệu mới nhất từ remote repo về nhánh hiện tại.

  ```bash
  git pull origin main
  ```

- **Push**: đẩy code từ local repo lên remote.

  ```bash
  git push origin main
  ```

### Stashing

- Lưu tạm thời những thay đổi chưa commit để chuyển qua việc khác.

  ```bash
  git stash       # Lưu thay đổi vào stash
  git stash pop   # Lấy thay đổi ra, áp dụng lại
  ```

### Merge Request & Reviewer

- **Merge Request (Pull Request)**: gộp code từ một branch sang branch
  khác.\
- **Reviewer**: người review code của bạn, giúp phát hiện bug, cải
  thiện chất lượng.

### Convention

- **Branch naming**: `<type>/<short-description>`
  - `feat/login-page` → thêm tính năng mới
  - `fix/cart-bug` → sửa bug
  - `conf/update-config` → thay đổi cấu hình
  - `chore/remove-old-files` → thay đổi nhỏ, dọn dẹp
- **Commit message**: `<type>: <short-description>`
  - Tốt: `feat: add solution for test 1`
  - Không tốt: `fix code`, `abc123`

Convention giúp codebase gọn gàng, dễ quản lý.

## 2. JavaScript -- Class

### Class là gì?

- Khuôn mẫu để tạo object.
- Định nghĩa **thuộc tính (properties)** và **phương thức (methods)**.

### Tại sao dùng Class?

- **Tái sử dụng code**.
- **Tăng tính linh hoạt**.
- Quản lý dữ liệu theo mô hình OOP.

### Cấu trúc cơ bản

```js
class Student {
  constructor(name) {
    this.name = name;
  }
  sayMyName() {
    console.log(`My name is ${this.name}`);
  }
}

const s = new Student("Alex");
s.sayMyName(); // My name is Alex
```

- **Constructor**: khởi tạo object.
- **Property**: thuộc tính (dữ liệu).
- **Method**: hành động (hàm).
- **Method có parameter**: truyền giá trị khi gọi.

### Ví dụ

```js
class LoginPage {
  fillLogin(username, password) {
    console.log(`Login with ${username} - ${password}`);
  }
}
```

## 3. Kiến thức bổ sung từ Exercises

### Quy trình Review Code (mô phỏng thực tế)

1.  **Tạo branch** từ `main` (luôn pull trước).
2.  **Tạo PR (Pull Request)**: thêm title, description, reviewer,
    assignee.
3.  **Post review** trên group để mentor/bạn học vào comment.
4.  **Review code**: comment trực tiếp vào dòng code hoặc cả file.
    - Nếu ok → reply: `"Looks good to me"`.
    - Nếu có vấn đề → comment chi tiết.
5.  **Fix comment**: cập nhật code, push lại, resolve comment, reply
    `"Done"`.

Đây là quy trình teamwork chuẩn trong công ty.

### TypeScript (TS)

- Bổ sung **kiểu dữ liệu** để code rõ ràng, giảm lỗi runtime.
- TS được **transpile** thành JS để chạy.

Ví dụ:

```ts
let age: number = 25;
let name: string = "John";
let teams: string[] = ["Team A", "Team B"];

// Interface
interface Player {
  name: string;
  position: string;
  jerseyNumber: number;
}

let player: Player = { name: "John", position: "Forward", jerseyNumber: 10 };
```

- **Class trong TS**: giống JS nhưng có type.

```ts
class Team {
  name: string;
  players: Player[];

  constructor(name: string) {
    this.name = name;
    this.players = [];
  }

  addPlayer(player: Player): void {
    this.players.push(player);
  }
}
```

- **Run TS**:

```bash
npx ts-node file.ts
npx tsx file.ts
```
