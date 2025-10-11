# Lesson 08 – Playwright Tests

## 1. Test Group / Suite (`test.describe`)

### Khái niệm:

- **Test suite** là tập hợp các test case có liên quan, giúp nhóm chúng lại để dễ quản lý, chạy và đọc kết quả.
- Trong **Playwright**, `test.describe()` được dùng để định nghĩa một test suite.

### Cấu trúc cơ bản:

```js
test.describe("User Login Tests", () => {
  test("should login with valid credentials", async ({ page }) => {
    // Test code
  });

  test("should show error for invalid credentials", async ({ page }) => {
    // Test code
  });
});
```

### Lợi ích:

- Giúp **gom nhóm các test cùng chủ đề** (ví dụ: “Login”, “Dashboard”, “Settings”).
- Có thể **đặt hooks riêng cho từng nhóm** (`beforeAll`, `afterEach`, …).
- Khi chạy test report, **kết quả được nhóm theo suite**, giúp debug dễ dàng hơn.

## 2. Hooks trong Playwright

### Khái niệm:

Hooks là **các hàm chạy tự động** tại những thời điểm nhất định trong vòng đời test — trước, trong, hoặc sau khi test chạy.  
Tương tự như “setup” và “teardown” trong các framework test khác.

### Các loại hooks chính:

| Hook         | Mô tả                                                      | Mức độ |
| ------------ | ---------------------------------------------------------- | ------ |
| `beforeAll`  | Chạy **một lần** trước khi tất cả test trong suite bắt đầu | Suite  |
| `beforeEach` | Chạy **trước mỗi test**                                    | Test   |
| `afterEach`  | Chạy **sau mỗi test**                                      | Test   |
| `afterAll`   | Chạy **một lần** sau khi toàn bộ suite hoàn tất            | Suite  |

### Ví dụ:

```js
test.describe("Product Page", () => {
  test.beforeAll(async () => {
    console.log("Start Product Test Suite");
  });

  test.beforeEach(async ({ page }) => {
    await page.goto("https://example.com/products");
  });

  test("should display product list", async ({ page }) => {
    await expect(page.locator(".product")).toHaveCount(10);
  });

  test.afterEach(async () => {
    console.log("Test done");
  });

  test.afterAll(async () => {
    console.log("End Product Test Suite");
  });
});
```

### Ghi nhớ:

- Dùng `beforeEach` cho việc **chuẩn bị dữ liệu hoặc login**.
- Dùng `afterEach` để **xóa dữ liệu test, cleanup hoặc logout**.
- `beforeAll`/`afterAll` chỉ dùng khi setup/teardown chung cho cả suite (ví dụ: khởi tạo server, tạo data test lớn).

## 3. Assertion trong Playwright

### Khái niệm:

- **Assertion** = câu lệnh khẳng định điều kiện **phải đúng** để test pass.
- Nếu điều kiện sai → test fail.
- Giúp xác định kết quả thực tế có đúng với **mong đợi (expected)** hay không.

### Tại sao cần assertion:

- Nếu chỉ “click” hay “navigate” mà không assert → test **không chứng minh được kết quả**.
- Assertion là “linh hồn” của mỗi test.

## 3.1 Generic Assertions (Từ thư viện `expect`)

Sử dụng khi **so sánh giá trị logic, chuỗi, mảng...**  
Không phụ thuộc vào DOM hay UI element.

### Ví dụ:

```js
expect(2 + 3).toBe(5);
expect(["A", "B", "C"]).toHaveLength(3);
expect("Playwright").toContain("Play");
```

## 3.2 Web-first Assertions

Đây là **đặc sản của Playwright** — có khả năng **auto-waiting** cho đến khi điều kiện đúng.  
Tức là test **tự động chờ** (không cần `waitForTimeout`) trước khi fail.

### Ví dụ:

```js
await expect(page.locator("button")).toBeVisible();
await expect(page).toHaveTitle(/Homepage/);
```

## Phân loại Web-first Assertions phổ biến

### 1. Element State

| Kiểm tra         | Ví dụ                                  |
| ---------------- | -------------------------------------- |
| Hiển thị         | `await expect(locator).toBeVisible();` |
| Ẩn               | `await expect(locator).toBeHidden();`  |
| Enabled/Disabled | `await expect(locator).toBeEnabled();` |
| Checked          | `await expect(locator).toBeChecked();` |
| Focused          | `await expect(locator).toBeFocused();` |

### 2. Text & Content

| Kiểm tra       | Ví dụ                                                     |
| -------------- | --------------------------------------------------------- |
| Chứa text      | `await expect(locator).toContainText('Hello');`           |
| Text chính xác | `await expect(locator).toHaveText('Welcome');`            |
| Regex match    | `await expect(locator).toHaveText(/welcome/i);`           |
| Nhiều elements | `await expect(locator).toHaveText(['Item 1', 'Item 2']);` |

### 3. Attributes & Properties

| Kiểm tra      | Ví dụ                                                      |
| ------------- | ---------------------------------------------------------- |
| Attribute     | `await expect(locator).toHaveAttribute('href', '/about');` |
| Class         | `await expect(locator).toHaveClass(/btn-primary/);`        |
| Value (input) | `await expect(locator).toHaveValue('john@example.com');`   |
| Count         | `await expect(locator).toHaveCount(5);`                    |

### 4. Page Assertions

| Kiểm tra      | Ví dụ                                                   |
| ------------- | ------------------------------------------------------- |
| URL chính xác | `await expect(page).toHaveURL('https://example.com/');` |
| URL regex     | `await expect(page).toHaveURL(/.*checkout/);`           |
| Title trang   | `await expect(page).toHaveTitle('My App');`             |

## Kiến thức bổ sung & lưu ý chuyên sâu

1. **Tất cả assertions đều có timeout mặc định (5s)** → có thể thay đổi:
   ```js
   await expect(locator).toBeVisible({ timeout: 10000 });
   ```
2. **Không dùng `page.waitForTimeout()` trừ khi thật sự cần**, vì Playwright assertion **tự chờ điều kiện đúng**.
3. **Khi test fail**, Playwright sẽ **screenshot + trace log** tự động nếu bật trong config (`use: { trace: 'on-first-retry' }`).
4. **Combine assertions**: có thể kiểm tra nhiều điều kiện cùng lúc, ví dụ:
   ```js
   await expect(page.locator(".alert")).toBeVisible();
   await expect(page.locator(".alert")).toHaveText("Success");
   ```
5. **Trong suite**, có thể **override hooks hoặc config** ở từng cấp độ `describe`.

## Tổng kết nhanh

| Chủ đề                  | Nội dung chính                             |
| ----------------------- | ------------------------------------------ |
| **Test Suite**          | Nhóm test case bằng `test.describe()`      |
| **Hooks**               | beforeAll, beforeEach, afterEach, afterAll |
| **Assertion**           | Kiểm tra kết quả mong đợi                  |
| **Web-first Assertion** | Tự động chờ, tránh flaky test              |
| **Page Assertions**     | URL, Title, Elements trên web              |
| **Bổ sung**             | Auto-wait, timeout, trace log, regex       |
