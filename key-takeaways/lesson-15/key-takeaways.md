# Lesson 15 – Key Takeaways

## 1. Async / Await – Sử dụng đúng cách

### **Khái niệm**

- **async**: biến hàm thành bất đồng bộ, luôn trả về Promise.
- **await**: yêu cầu đợi Promise chạy xong mới chạy tiếp.

### **Khi nào dùng `await`?**

- Hàm gọi **trả về Promise**.
- Hoặc là **hàm async**.

### **Ví dụ đúng**

```ts
await page.goto("https://playwrightvn.com");
```

### **Ví dụ sai**

```ts
await expect(a).toEqual(b); // toEqual không trả về Promise
```

### **Ví dụ thêm**

```ts
const text = await page.textContent("#title");
```

```ts
await console.log("Hello"); // sai
```

## 2. GitHub Actions – Chạy Playwright Test

### **Workflow cơ bản** (`.github/workflows/playwright.yml`)

```yaml
name: K13 class tests
on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: lts/*
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
```

Xem thêm tại: https://docs.github.com/en/actions

## 3. GitLab CI – Chạy Playwright Test

### **Pipeline cơ bản** (`.gitlab-ci.yml`)

```yaml
stages:
  - test

test-playwright:
  image: mcr.microsoft.com/playwright
  stage: test
  script:
    - npm ci
    - npx playwright install --with-deps
    - npx playwright test
  artifacts:
    paths:
      - playwright-report/**
```

Xem thêm tại: https://docs.gitlab.com/ee/topics/build_your_application.html

## 4. Global Setup & Teardown

### **Ví dụ cấu hình**

`global-setup.ts`

```ts
export default async () => {
  console.log("From global setup - initialize project");
};
```

`global-teardown.ts`

```ts
export default async () => {
  console.log("From global teardown - removing resources");
};
```

`playwright.config.ts`

```ts
globalSetup: './global-setup.ts',
globalTeardown: './global-teardown.ts',
```

## 5. Tư duy Build Test Framework

### **Checklist quan trọng**

- Cấu trúc folder rõ ràng
- Page Object Model chuẩn
- Tách fixtures / utils
- Dùng .env + .gitignore đúng cách
- Documentation tối ưu
- Sample Framework: https://github.com/playwrightvn/playwright-typescript-boilerplate

### **Cấu trúc tham khảo**

```
project
├── README.md
├── constants
├── fixtures
├── node_modules
├── package-lock.json
├── package.json
├── playwright.config.ts
├── pom
├── tests
├── tests-examples
└── utils
```

**Trong đó:**

- README.md: file tài liệu, chứa cách cài đặt, các conventions, lưu ý và các lỗi thường gặp.
- constants: folder chứa các hằng số thường dùng cho toàn bộ dự án.
- playwright.config.ts: file config theo môi trường
- pom: folder chứa các page object model
- utils: folder chứa các hàm utils dùng cho dự án.
- fixtures: folder chứa các fixture viết sẵn cho dự án.
- .gitignore: file chứa các ignore file

### **Ví dụ POM**

```ts
class LoginPage {
  constructor(private page) {}

  username = this.page.locator("#username");
  password = this.page.locator("#password");
  loginBtn = this.page.locator("button[type=submit]");

  async login(user, pass) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
  }
}
```

## 6. CI/CD:

### **CI**

- Tự động build & test khi có code mới
- Phát hiện lỗi sớm, giữ code ổn định

### **CD**

- Tự động triển khai lên môi trường
- Code luôn sẵn sàng để deploy

## 7. Hướng học tiếp (Further Learning)

- “Cày” 1 lượt document: Playwright documentation
- Theo dõi các kênh:
  - [Youtube Playwright Việt Nam](https://www.youtube.com/@playwrightvietnam)
  - [Youtube Playwright Official](https://www.youtube.com/@Playwrightdev)
  - [Discord Playwright Official](https://discord.com/servers/playwright-807756831384403968)
  - [Repo Github Playwright Official](https://github.com/microsoft/playwright/issues/36422)
