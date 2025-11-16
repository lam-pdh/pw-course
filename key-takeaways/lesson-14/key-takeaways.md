# Lesson 14 — Many Concepts

## 1. Visual Comparison

### Khái niệm

- Là kỹ thuật **so sánh ảnh chụp màn hình (screenshot)** giữa bản hiện tại và bản đã được lưu trước đó để kiểm tra sự thay đổi giao diện.
- Được dùng trong **UI regression testing** — giúp phát hiện lỗi hiển thị hoặc layout thay đổi ngoài ý muốn.

### Cách sử dụng

```ts
await page.goto("https://playwright.dev");
await expect(page).toHaveScreenshot("home.png");
```

### Mask locator

- Dùng để **che (mask)** các vùng động trên UI như banner, ads, hoặc timestamp — tránh ảnh hưởng đến kết quả so sánh.
- Có thể chỉ định **màu che (maskColor)**.

```ts
await expect(page).toHaveScreenshot({
  mask: [page.locator("img")],
  maskColor: "#00FF00", // green
});
```

### Cập nhật ảnh chụp (update snapshot)

Khi UI thay đổi hợp lệ, cần cập nhật ảnh chuẩn bằng lệnh:

```bash
npx playwright test -g "@IMAGE" --update-snapshots
```

### Chụp full page

Mặc định, Playwright chỉ chụp trong viewport.  
Để chụp **toàn bộ trang web**, dùng:

```ts
await expect(page).toHaveScreenshot({
  fullPage: true,
});
```

## 2. Video Recording

### Khái niệm

- Ghi lại quá trình chạy test thành video.
- Giúp **debug dễ dàng hơn**, đặc biệt khi test fail.

### Cấu hình

Thêm cấu hình trong `playwright.config.ts`:

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    video: {
      mode: "on",
      size: { width: 640, height: 480 },
    },
  },
});
```

### Các mode khả dụng

- `off`: tắt video recording.
- `on`: ghi video cho tất cả các test.
- `retain-on-failure`: chỉ giữ lại video khi test fail.
- `on-first-retry`: chỉ record khi test được retry lần đầu.

## 3. Test Report

### Khái niệm

- **Reporters** giúp hiển thị kết quả test dưới nhiều định dạng như HTML, JSON, JUnit, v.v.
- Playwright hỗ trợ nhiều reporter mặc định và bên thứ ba.

### Tài liệu tham khảo

[Playwright Test Reporters](https://playwright.dev/docs/test-reporters#third-party-reporter-showcase)

## 4. Test Emulation

### Khái niệm

- **Emulation** cho phép giả lập môi trường chạy test để kiểm thử giao diện hoặc logic trong các điều kiện khác nhau.

### Các yếu tố có thể giả lập

| Loại emulation        | Mô tả                                            |
| --------------------- | ------------------------------------------------ |
| **Devices**           | Giả lập thiết bị di động / máy tính bảng.        |
| **Viewport**          | Kích thước khung nhìn trình duyệt.               |
| **Locale & Timezone** | Ngôn ngữ, định dạng thời gian, múi giờ.          |
| **Color scheme**      | Giao diện sáng (light) hoặc tối (dark).          |
| **Geolocation**       | Vị trí người dùng.                               |
| **Permission**        | Quyền truy cập camera, location, microphone, ... |

### Ví dụ

```ts
import { test, expect } from "@playwright/test";

test.use({
  locale: "es_ES",
  timezoneId: "Europe/Madrid",
  permissions: ["camera"],
});

test("my test with emulation", async ({ page }) => {
  await page.goto(
    "https://material.playwrightvn.com/017-detect-user-agent.html"
  );
  await page.waitForTimeout(60000);
});
```

### Tham khảo thêm

- [Playwright Emulation Docs](https://playwright.dev/docs/emulation)
- [BrowserContext Permissions](https://playwright.dev/docs/api/class-browsercontext#browser-context-grant-permissions)

## 5. Drag and Drop

### Khái niệm

- Là thao tác **kéo và thả phần tử** (drag and drop) — thường dùng trong các bài test UI có tương tác.

### Cách 1: Dùng hàm `dragTo`

```ts
await page
  .locator("#item-to-be-dragged")
  .dragTo(page.locator("#item-to-drop-at"));
```

### Cách 2: Dùng thao tác thủ công (manual drag)

```ts
await page.locator("#item-to-be-dragged").hover();
await page.mouse.down();
await page.locator("#item-to-drop-at").hover();
await page.mouse.up();
```

### Bài tập thực hành

1. Truy cập trang [https://material.playwrightvn.com](https://material.playwrightvn.com)
2. Click vào **Bài học 5: Puzzle drag and drop game**
3. Thực hiện thao tác kéo thả đúng vị trí các ô.

## 6. Global Setup & Teardown

### Khái niệm

- **Global Setup**: chạy **trước tất cả các test**, chỉ **một lần duy nhất**.
- **Global Teardown**: chạy **sau tất cả các test**, chỉ **một lần duy nhất**.

### So sánh với Fixture

| Tính năng    | Fixture                       | Global Setup/Teardown            |
| ------------ | ----------------------------- | -------------------------------- |
| Phạm vi chạy | Chạy lại cho mỗi test         | Chạy một lần duy nhất            |
| Dùng khi     | Mỗi test cần môi trường riêng | Toàn bộ suite cần khởi tạo chung |
| Ví dụ        | Khởi tạo Page, context        | Login sẵn, tạo data chung        |

## 7. Tổng kết

| Chủ đề                    | Mục tiêu chính                           |
| ------------------------- | ---------------------------------------- |
| **Visual Comparison**     | So sánh giao diện, kiểm tra UI thay đổi. |
| **Video Recording**       | Ghi lại video để debug.                  |
| **Test Report**           | Tổng hợp và hiển thị kết quả test.       |
| **Test Emulation**        | Giả lập môi trường test khác nhau.       |
| **Drag and Drop**         | Kiểm thử hành vi kéo thả.                |
| **Global Setup/Teardown** | Chuẩn bị và dọn dẹp môi trường toàn cục. |
