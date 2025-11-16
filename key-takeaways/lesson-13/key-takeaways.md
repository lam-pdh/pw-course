# Lesson 13 — Object Destructuring & Fixtures

## 1. Object Destructuring

### Khái niệm

- **Object destructuring** là cú pháp giúp “phá hủy” cấu trúc object và **trích xuất giá trị** của các thuộc tính một cách ngắn gọn.
- Giúp code dễ đọc hơn, thay vì phải truy cập từng property bằng dấu chấm.

### Ví dụ khi không dùng destructuring

```js
const myClass = {
  school: "BBA",
  course: "Full-stack QA",
};

const school = myClass.school;
const course = myClass.course;

console.log(school); // 'BBA'
console.log(course); // 'Full-stack QA'
```

### Ví dụ khi có destructuring

```js
const myClass = {
  school: "BBA",
  course: "Full-stack QA",
};

const { school, course } = myClass;

console.log(school); // 'BBA'
console.log(course); // 'Full-stack QA'
```

### Ưu điểm

- Viết ngắn gọn hơn.
- Dễ đọc và maintain.
- Giúp tránh lỗi khi truy cập nhiều thuộc tính lồng nhau.

## 2. Kiến thức bổ sung — Nâng cao về Object Destructuring

### 2.1 Multiple Property

Dùng trong trường hợp bạn muốn destructuring **nhiều thuộc tính** của object cùng lúc:

```js
const { prop1, prop2, prop3 } = object;
```

### 2.2 Default Value

Dùng khi bạn muốn đặt **giá trị mặc định** cho một thuộc tính (nếu nó không tồn tại trong object):

```js
const { prop = "Default" } = object;
```

### 2.3 Alias

Dùng khi bạn muốn **đặt một tên khác (alias)** cho property:

```js
const { prop: myProp } = object;
```

Ví dụ:

```js
const student = { name: "John" };
const { name: studentName } = student;
console.log(studentName); // John
```

### 2.4 Deep Property

Dùng khi bạn muốn **destructuring các object nằm sâu bên trong object khác**:

```js
const {
  prop: { deepProp },
} = object;
```

Ví dụ:

```js
const person = {
  address: { city: "Hanoi", country: "Vietnam" },
};
const {
  address: { city },
} = person;
console.log(city); // Hanoi
```

## 3. Bài tập thực hành về Destructuring

1. **Basic destructuring**

   ```js
   const person = {
     firstName: "John",
     lastName: "Doe",
     age: 30,
     occupation: "Software Engineer",
   };

   const { firstName, lastName, age } = person;
   console.log(firstName, lastName, age);
   ```

2. **Car object**

   ```js
   const car = {
     brand: "Toyota",
     model: "Camry",
     year: 2022,
     color: "White",
   };
   const { brand, model, year, color } = car;
   console.log(brand, model, year, color);
   ```

3. **Default value**

   ```js
   const user = {};
   const { name = "Guest" } = user;
   console.log(name); // Guest
   ```

4. **Price default value**

   ```js
   const product = {};
   const { price = 0 } = product;
   console.log(price); // 0
   ```

5. **Alias**

   ```js
   const book = { title: "Playwright Handbook" };
   const { title: bookTitle } = book;
   console.log(bookTitle);
   ```

6. **Alias khác**

   ```js
   const movie = { director: "Christopher Nolan" };
   const { director: filmDirector } = movie;
   console.log(filmDirector);
   ```

7. **Deep destructuring**

   ```js
   const person = {
     address: { street: "123 Main St", city: "Hanoi", country: "Vietnam" },
   };
   const {
     address: { street },
   } = person;
   console.log(street);
   ```

8. **Deep destructuring khác**
   ```js
   const product = {
     details: { brand: "Apple", model: "iPhone 15", color: "Black" },
   };
   const {
     details: { model },
   } = product;
   console.log(model);
   ```

## 4. Fixture trong Playwright

### 4.1 Fixture là gì?

- Là cơ chế trong Playwright dùng để **tái sử dụng setup/teardown code**.
- Cho phép chia sẻ object giữa các test.
- Tạo môi trường test độc lập và mở rộng các fixture có sẵn (`page`, `context`, `browser`, ...).

### 4.2 Tác dụng

- Giúp code test ngắn gọn, có cấu trúc rõ ràng.
- Dễ dàng mở rộng và tái sử dụng.
- Giảm trùng lặp khi setup môi trường hoặc khởi tạo page.

---

## 5. Built-in Fixtures trong Playwright

| Fixture Name  | Type              | Mô tả                                              |
| ------------- | ----------------- | -------------------------------------------------- |
| `page`        | Page              | Tạo một page riêng biệt cho test.                  |
| `context`     | BrowserContext    | Context riêng biệt cho mỗi test.                   |
| `browser`     | Browser           | Dùng chung giữa các test để tiết kiệm tài nguyên.  |
| `browserName` | string            | Tên browser đang chạy (chromium, firefox, webkit). |
| `request`     | APIRequestContext | Dùng cho các API tests.                            |

---

## 6. Custom Fixture

Sử dụng `test.extend()` để tạo hoặc mở rộng fixture mới:

```ts
import { test as base } from "@playwright/test";

const test = base.extend<{ page2: Page2 }>({{
  page2: async ({}, use) => {
    const page2 = new Page2();
    page2.sayMyName();
    await use(page2);
    console.log("after page2");
  },
}});

export { test };
```

## 7. Practice — Playwright Fixtures

### 7.1 Fixture “context” — Tạo 2 tab khác nhau

```ts
test("Open 2 tabs with context fixture", async ({ context }) => {
  const page1 = await context.newPage();
  await page1.goto("https://material.playwrightvn.com/");

  const page2 = await context.newPage();
  await page2.goto("https://e-commerce-dev.betterbytesvn.com/");
});
```

### 7.2 Fixture “browser” — Tạo 2 trình duyệt khác nhau

```ts
test("Open 2 browsers with browser fixture", async ({ browser }) => {
  const browser1 = await browser.newContext();
  const page1 = await browser1.newPage();
  await page1.goto("https://material.playwrightvn.com/");

  const browser2 = await browser.newContext();
  const page2 = await browser2.newPage();
  await page2.goto("https://e-commerce-dev.betterbytesvn.com/");
});
```

### 7.3 Custom fixture — Material Page

```ts
import { test as base } from '@playwright/test'
...
const test = base.extend<{ page2: Page2 }>({
page2: async ({ }, use) => {
const page2 = new Page2();
page2.sayMyName();
await use(page2);
console.log("after page2");
}
})
export { test };
```

## 8. Test Generator

### Khái niệm

- Là công cụ trong Playwright giúp **tự động sinh code test** từ thao tác thủ công.
- Khi record hành động, Playwright sinh ra mã test tương ứng.

### Cách sử dụng

- `Record new`: tạo file mới và bắt đầu record.
- `Record at cursor`: sinh code tại vị trí con trỏ.
- Có thể sinh cả **assertions** tự động.

### Mục đích

- Tăng tốc độ viết test.
- Hữu ích khi muốn “record một phần” test rồi chỉnh sửa lại bằng tay.

## 9. Video Recording

### Khái niệm

- Là tính năng quay lại quá trình chạy test của Playwright.

### Mục đích

- Giúp debug test dễ dàng hơn.
- Làm bằng chứng (evidence) khi test fail.

### Cấu hình trong `playwright.config.ts`

```ts
use: {
  video: "retain-on-failure"; // các mode: off | on | retain-on-failure | on-first-retry
}
```

## 10. Tổng kết

- **Object destructuring** giúp code JS ngắn gọn, dễ hiểu.
- **Kiến thức nâng cao**: Multiple property, Default value, Alias, Deep property.
- **Fixture** giúp tái sử dụng setup/teardown, mở rộng built-in fixtures.
- **Test generator** giúp tạo nhanh code test.
- **Video recording** giúp debug và lưu evidence test.
