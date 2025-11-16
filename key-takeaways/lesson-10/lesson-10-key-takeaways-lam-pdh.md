# Lesson 10 – Class extends & Page Object Model

## 1. TypeScript vs JavaScript

### Khái niệm

- **TypeScript** là _superset_ của JavaScript → mở rộng JS với hệ thống kiểu dữ liệu chặt chẽ.
- Cần biên dịch (`npx tsc <file>.ts`) trước khi chạy bằng Node.js.

### Ưu điểm

- Có hệ thống type rõ ràng.
- Phát hiện lỗi sớm.
- Hỗ trợ `interface`, `type alias`, OOP, `generic`…

### Cách định nghĩa type

```ts
type User = { name: string; age: number };
interface User {
  name: string;
  age: number;
}
```

→ Giúp code rõ ràng và dễ đọc.

## 2. Class & Extends (Inheritance)

### Class

- Mô hình hóa đối tượng qua thuộc tính (property) và phương thức (method).
- Ví dụ:

```ts
class User {
  constructor(public email: string, public name: string, public age: number) {}
  getInfo() {
    return `${this.name} (${this.email}) - ${this.age}`;
  }
  isAdult() {
    return this.age >= 18;
  }
  updateEmail(newEmail: string) {
    this.email = newEmail;
  }
}
```

### Extends – Kế thừa

- Cho phép class con **thừa hưởng** property và method từ class cha.
- Dùng `super()` để gọi constructor của class cha.

```ts
class DashboardPage extends LoginPage {
  titleLoc: string = "";
  constructor() {
    super(); // Gọi constructor cha
  }
}
```

Lợi ích: Tái sử dụng code → Dễ bảo trì → Giảm lặp.

## 3. Page Object Model (POM)

### Định nghĩa

- **POM** = _Page Object Model_ – mẫu thiết kế giúp code test gọn gàng, dễ đọc, dễ bảo trì.
- Mỗi _page_ được đại diện bởi một **class** gồm:
  - **Properties:** đại diện cho các phần tử (locator).
  - **Methods:** đại diện cho các hành động trên trang (ví dụ: `login()`, `clickButton()`).

### Ví dụ so sánh

**Không dùng POM:** locators bị lặp lại, test khó bảo trì.  
**Dùng POM:**

```ts
export class LoginPage {
  constructor(private page: Page) {}
  username = "#username";
  password = "#password";
  loginBtn = 'button[type="submit"]';

  async navigate() {
    await this.page.goto("https://example.com/login");
  }
  async login(user: string, pass: string) {
    await this.page.fill(this.username, user);
    await this.page.fill(this.password, pass);
    await this.page.click(this.loginBtn);
  }
}
```

→ Tests ngắn gọn và dễ hiểu.

### Ưu điểm POM

1. Dễ bảo trì (Maintainable).
2. Dễ đọc (Readable).
3. Tái sử dụng (Reusability).

## 4. Export / Import Modules

- **Export:** cho phép dùng class/biến ở file khác.

```ts
export class LoginPage {}
```

- **Import:**

```ts
import { LoginPage } from "./page/login-page";
```

> Nếu file ở ngoài thư mục hiện tại → dùng `../` hoặc `../../` để đi ra folder cha.

## 5. Refactoring (Code Cleanup)

### Định nghĩa

**Refactoring** = Viết lại code khoa học hơn mà vẫn giữ nguyên chức năng.

### Mục đích

- Không làm chương trình chạy nhanh hơn nhưng giúp:
  - Dễ đọc và hiểu.
  - Dễ bảo trì và mở rộng.

### Khi nào thực hiện

- Khi thêm tính năng mới.
- Khi review code.
- Khi handover (bàn giao).

### Dấu hiệu (code smell)

- Function quá dài.
- Quá nhiều parameters.
- Class quá lớn và thiếu tách biệt nhiệm vụ.


## 6. Tổng Hợp

| Chủ đề                | Ghi nhớ chính                                                           |
| --------------------- | ----------------------------------------------------------------------- |
| **TypeScript**        | Superset của JS → có type system, OOP, phát hiện lỗi sớm.               |
| **Class & Extends**   | Dùng để định nghĩa đối tượng và tái sử dụng qua kế thừa.                |
| **super()**           | Bắt buộc khi class con có constructor và muốn gọi constructor cha.      |
| **Export / Import**   | Cho phép chia code ra nhiều file rõ ràng.                               |
| **Page Object Model** | Mỗi page là một class với locator + actions; dễ bảo trì và tái sử dụng. |
| **Refactoring**       | Làm code gọn gàng, dễ đọc, dễ duy trì mà không đổi chức năng.           |
