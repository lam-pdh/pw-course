# Lesson 05 -- DOM Terminology & Playwright Basic

## 1. Functions Advance

- **Function Expression**

  - Gán function vào một biến.

  ```js
  const add = function (a, b) {
    return a + b;
  };
  ```

- **Arrow Function (Lambda)**

  - Cú pháp ngắn gọn, xuất hiện từ ES6.

  ```js
  const add = (a, b) => a + b;
  const double = (x) => x * 2;
  const greet = () => console.log("Hello!");
  ```

- **Anonymous Function**

  - Function không tên, thường dùng làm callback.

  ```js
  setTimeout(function () {
    console.log("Anonymous callback!");
  }, 1000);
  ```

## 2. DOM (Document Object Model)

- DOM là cách trình duyệt "nhìn" website dưới dạng cây có cấu trúc.
- Truy cập DOM: mở DevTools (F12 → tab Elements).
- Cấu trúc một element HTML:

  - **Thẻ mở + Thẻ đóng**:

    ```html
    <option>United States</option>
    ```

  - **Thuộc tính (attribute)**:

    ```html
    <option value="usa">United States</option>
    ```

  - **Thẻ tự đóng**:

    ```html
    <img src="image.jpg" alt="desc" />
    ```

### Các thẻ HTML quan trọng

- **Cấu trúc cơ bản**: `<html>`, `<head>`, `<body>`, `<div>`,
  `<span>`, `<header>`, `<footer>`, `<section>`.
- **Nội dung**: `<h1>..h6>`, `<p>`, `<a>`, `<img>`, `<ul>/<ol>/<li>`.
- **Form** (quan trọng cho testing): `<form>`, `<input>`, `<button>`,
  `<select>/<option>`, `<textarea>`.

## 3. Selector

- Dùng để tìm và tương tác với phần tử trên web.
- **XPath**

  - Linh hoạt, mạnh mẽ, dùng được gần như mọi trường hợp.

  - Ví dụ:

    ```xpath
    // button[normalize-space()='Add to cart']
    // div[@class='title']
    ```

- **CSS Selector**

  - Ngắn gọn, hiệu năng tốt, nhưng ít linh hoạt hơn.

  - Ví dụ:

    ```css
    .add-to-cart #username input[type="text"];
    ```

- **Playwright Selector**

  - Cú pháp ngắn gọn, hướng tới "người dùng nhìn thấy gì".

  - Ví dụ:

    ```js
    page.getByText("Add to cart");
    ```

- Quy tắc ưu tiên: **Playwright Selector \> CSS \> XPath** (nhưng vẫn
  cần biết cả 3).

### XPath cơ bản

- **Tuyệt đối**: `/html/body/div[1]/button`
- **Tương đối**: `//button[@id="submit"]` (nên dùng).

## 4. Playwright Basic Syntax

- **Khai báo test**

  ```js
  import { test } from "@playwright/test";

  test("My first test", async ({ page }) => {});
  ```

- **Step trong test**

  ```js
  await test.step("Step 1", async () => {});
  ```

- **Các thao tác cơ bản**

  - **Navigation**:

    ```js
    await page.goto("https://example.com");
    ```

  - **Locate element**:

    ```js
    const input = page.locator("//input[@id='email']");
    ```

  - **Click**: single, double, right click, click + modifier.

  - **Input**:

    - `fill()` → nhập trực tiếp.
    - `pressSequentially()` → nhập từng ký tự.

  - **Radio/Checkbox**:

    - `isChecked()`, `check()`, `setChecked(false)`.

  - **Select dropdown**:

    ```js
    await page.locator("#country").selectOption({ label: "USA" });
    ```

  - **Upload file**:

    ```js
    await page.locator("#profile").setInputFiles("path/to/file");
    ```

## 5. Kiến thức bổ sung (từ Exercises)

- **Hover**

  ```js
  await page.locator("//button").hover();
  ```

- **text() trong XPath**

  ```xpath
  // div[text()='This is a text']
  ```

- **contains() trong XPath**

  - Dùng khi text có khoảng trắng hoặc giá trị động.

  ```xpath
  // div[contains(text(), 'Tôi là Alex')]
  // div[contains(text(), 'Bây giờ là:')]
  ```

- **Confirmation dialog**

  - Cần xử lý popup confirm (Playwright hỗ trợ qua
    `page.on('dialog', async dialog => dialog. accept())`.
  - Video hướng dẫn: [YouTube
    link](https://youtu.be/S4h4v2wQS6c?si=Cj74VVfnKK0QEzbP).
