# Lesson 01 -- Getting Started with Playwright

## 1. Tinh thần học

- **Học chủ động**:
  - Tự tìm hiểu, Google trước khi hỏi.
  - Chủ động sync lại với mentor nếu gặp khó khăn.
  - Chủ động đặt câu hỏi khi chưa hiểu.
- **Học chăm chỉ**:
  - Làm đầy đủ bài tập trước buổi học.
- **Học thông minh**:
  - Hệ thống lại kiến thức sau mỗi buổi học.

## 2. Công cụ học

- **Google Classroom**
  - Link lớp học:
    [classroom.google.com](https://classroom.google.com/)
  - Xem lại slide, record, nộp bài tập.
- **Zoom** → dùng cho buổi học online.
- **Tài liệu học**
  - Truy cập trọn đời (slide, record, bài tập).
  - Tài liệu nội bộ, không chia sẻ ra ngoài.

## 3. Giới thiệu Playwright

- Framework automation test, tiền thân là Puppeteer, do **Microsoft
  phát triển**.
- Ra đời: **31/01/2020** -- Version mới nhất: **v1.52**.
- Website: [playwright.dev](https://playwright.dev/)

### Ưu điểm

- Cross-browser.
- Cross-platform.
- Auto-wait.
- Web-first assertion.
- Tracing.
- Code-gen.

### Vì sao chọn Playwright?

- Cú pháp hiện đại, dễ học, dễ tiếp cận.
- Giảm rào cản với người mới.
- Hiểu bản chất có thể áp dụng với tool khác (Selenium, Cypress,
  v.v.).

## 4. Cài đặt công cụ

### NodeJS & NVM

- **NVM (Node Version Manager)** giúp quản lý nhiều version NodeJS.

- Cài đặt:

  - Mac: `brew install nvm`
  - Windows:
    [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)

- Cài NodeJS:

  ```bash
  nvm install v22.9.0
  nvm use v22.9.0
  ```

### Playwright

- Tạo folder project: `pw-course`.

- Chạy lệnh:

  ```bash
  npm init playwright@latest
  ```

- File mẫu: `example.spec.ts` → Run test để kiểm tra.

### Git & GitHub

- Cài Git: [git-scm.com/downloads](https://git-scm.com/downloads).

- Config Git:

  ```bash
  git config --global user.name "Tên"
  git config --global user.email "Email"
  git config --global init.defaultBranch main
  ```

- Tạo tài khoản GitHub:
  [github.com/signup](https://github.com/signup).

  - Nên đặt tên lịch sự, có avatar.

### VS Code

- IDE để code.
- Cài từ [code.visualstudio.com](https://code.visualstudio.com/).
- Extension Playwright:
  [ms-playwright.playwright](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright).

## 5. Kết nối & Push Code lên GitHub

- **SSH Key**:

  - Tạo bằng:

    ```bash
    ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
    ```

  - Thêm key vào GitHub:
    [github.com/settings/ssh/new](https://github.com/settings/ssh/new).

- **Push code**:

  ```bash
  git init
  git remote add origin <ssh_link>
  git add .
  git commit -m "init project"
  git push origin main
  ```

- **Invite Collaborators**:

  - Settings → Access → Add collaborator.
