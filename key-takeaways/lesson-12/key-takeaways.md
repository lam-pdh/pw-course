# Lesson 12 — POM API & Other POM Styles

## 1. POM cho API

### POM API là gì?

- Tổ chức test API ở dạng **Page Object Model (POM)** để dễ quản lý và tái sử dụng.
- Concept tương tự như POM trong UI testing:
  - **Tên class**: thường mô tả chức năng API (ví dụ: `TodoApiPage`, `ProductsApiPage`).
  - **Thuộc tính**: chứa các yếu tố cần thiết cho API như:
    - `request` (Playwright APIRequestContext)
    - `baseURL`
  - **Phương thức**: chứa các hàm thực thi API (GET, POST, PUT, DELETE, ...).

### Mục tiêu

- Giúp quản lý API test rõ ràng, chia tách theo từng module.
- Tái sử dụng được logic gọi API trong nhiều test case.
- Dễ maintain và mở rộng khi có thay đổi về endpoint.

## 2. Ví dụ thực hành — POM API (Product Catalog)

### API Reference

`https://material.playwrightvn.com/api/product-catalog/swagger.html`

### Yêu cầu

- Tạo POM cho Product Catalog API.
- Có 1 method: `getProducts`
- Viết test case assert: có **10 products** được trả về.

### Example Code

**POM API:**

```ts
import { APIRequestContext, expect } from "@playwright/test";

export class ProductsApiPage {
  request: APIRequestContext;
  baseUrl: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseUrl = "https://material.playwrightvn.com/api/product-catalog/v1";
  }

  // Get Products
  async getProducts() {
    const response = await this.request.get(`${this.baseUrl}/products.php`);
    const responseJson = await response.json();
    expect(response.status()).toBe(200);
    return responseJson;
  }
}
```

**Using POM API:**

```ts
import { test, expect } from "@playwright/test";
import { ProductsApiPage } from "./product.api.page";

test("Get Products", async ({ request }) => {
  const productApiPage = new ProductsApiPage(request);
  const res = await productApiPage.getProducts();
  expect(res.data.products.length).toBe(10);
});
```

## 3. POM nâng cao cho API

- **Lưu baseURL** trong class để các API call ngắn gọn hơn.
- **Thêm thuộc tính token** nếu API cần xác thực.
- Có thể tổ chức nhiều API class trong cùng project (User, Product, Session...).

## 4. Các POM Styles khác

### 4.1 POM Manager

- Dùng để quản lý nhiều Page Object trong 1 class trung tâm.
- Mỗi page object chỉ được khởi tạo khi cần thiết.
- Giúp tái sử dụng và tránh tạo nhiều instance không cần thiết.

```ts
import { Page } from "@playwright/test";
import { LoginPage } from "./00-pom-login";
import { DashboardPage } from "./00-pom-dashboard";

export class PomManager {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getLoginPage() {
    return new LoginPage(this.page);
  }

  getDashboardPage() {
    return new DashboardPage(this.page);
  }
}
```

### 4.2 Return POM from Another POM

- Phương thức của 1 Page Object có thể trả về 1 Page Object khác.
- Thường dùng khi action của 1 trang dẫn đến trang khác (login → dashboard, checkout → confirm).

```ts
import { Page } from "@playwright/test";
import { DashboardPage } from "./00-pom-dashboard";

export class LoginReturnPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login() {
    // thực hiện login và chuyển hướng
    return new DashboardPage(this.page);
  }
}
```

## 5. Async / Await trong Playwright

### Khái niệm

- Dùng để xử lý các tác vụ **bất đồng bộ (asynchronous)** dễ đọc hơn.
- `async`: đánh dấu function là bất đồng bộ, trả về `Promise`.
- `await`: dùng để "chờ" Promise hoàn thành trước khi chạy tiếp.

### Khi nào cần dùng `await`

Phải dùng với:

- `page.goto()`, `page.click()`, `page.fill()`
- `expect()` assertions
- Bất kỳ method nào trả về Promise
- API request (`request.get()`, `request.post()`, ...)

Không cần với:

- `page.locator()` (chỉ tạo locator, chưa tương tác)
- Biến thường, phép toán đồng bộ

## 6. Tổng kết

- POM API giúp cấu trúc test code rõ ràng và dễ bảo trì.
- Có thể mở rộng bằng POM Manager hoặc Return POM.
- Async/Await là cốt lõi khi viết test bất đồng bộ trong Playwright.
- Kiến thức đọc thêm các style khác nhau của POM: [BBA-POM-styles](https://go.betterbytesvn.com/BBA-POM-styles)

## Thực hành

- Todo API: [Todo API](https://material.playwrightvn.com/api/todo-app/swagger.html)
- Product Catalog API: [Product Catalog API](https://material.playwrightvn.com/api/product-catalog/swagger.html)
