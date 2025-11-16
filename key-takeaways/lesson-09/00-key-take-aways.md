# Lesson 09 – Git & CSS Selector, Playwright Selector
## 1. Git Overview
### Khái niệm:
Git là **hệ thống quản lý mã nguồn phân tán (Distributed Version Control System)**, giúp nhiều người cùng làm việc trên cùng một dự án mà không ghi đè lên công việc của nhau.  
Cách làm việc nhóm trong Git: **mỗi người làm việc riêng, sau đó gộp (merge) lại**.

## 2. Các khái niệm và thao tác chính trong Git
#### Merge Strategies:
| Loại merge | Mô tả |
|-------------|--------|
| **Fast-forward merge** | Khi nhánh chính không thay đổi kể từ lúc tạo nhánh feature → merge không tạo ra commit merge. |
| **Three-way merge** | Khi cả hai nhánh đều có thay đổi → merge tạo ra **commit merge** để kết hợp lịch sử của cả hai nhánh. |

### 2.2 Conflict
#### Khái niệm:
- Xảy ra khi **hai người cùng chỉnh sửa cùng một vị trí** trong file và cùng merge vào.
- Git không biết nên giữ phần nào → tạo **conflict**.

#### Cấu trúc conflict trong file:
```text
<<<<<<< HEAD
a simple line
=======
A new line
>>>>>>> feature/2
```
- Phần giữa `<<<<<<< HEAD` và `=======` là **code của nhánh hiện tại (Current branch)**  
- Phần giữa `=======` và `>>>>>>> feature/2` là **code của nhánh muốn merge vào (Incoming change)**

#### Quy trình xử lý conflict chuyên nghiệp:
1. Đọc kỹ phần code bị conflict để xác định nguyên nhân.  
2. Giải quyết các conflict nhỏ, dễ hiểu mà không cần hỏi ai.  
3. Với conflict phức tạp → **trao đổi với tác giả (author)** của đoạn code đó để tránh mất logic của người khác.  
4. Sau khi sửa, chạy lại test và **commit lại với message rõ ràng**.

### 2.3 Rebase
#### Khái niệm:
- `git rebase` dùng để **thay đổi base (gốc)** của nhánh hiện tại, giúp lịch sử commit **tuyến tính, sạch sẽ hơn**.
- Lệnh:
  ```bash
  git rebase <branch_name>
  ```

#### Ưu điểm:
- Giúp lịch sử commit dễ đọc, tránh các commit merge không cần thiết.  
- Phù hợp khi muốn **update nhánh feature** với nhánh chính (`main`) mà không tạo commit merge.

### 2.4 Squash
#### Khái niệm:
- **Squash** = gộp nhiều commit nhỏ lẻ thành **một commit duy nhất**, giúp lịch sử commit gọn gàng và dễ đọc.

#### Cú pháp:
```bash
git rebase -i HEAD~<số_lượng_commit_muốn_gộp>
```
Ví dụ:
```bash
git rebase -i HEAD~3
```

#### Cách thực hiện squash trong VIM:
1. Gõ `i` để vào **INSERT mode**  
2. Commit đầu tiên **giữ nguyên `pick`**  
3. Các commit muốn gộp đổi thành `s` hoặc `squash`  
4. Nhấn `ESC` → gõ `:wq` để lưu  
5. Ở màn hình chỉnh sửa message, thêm `#` trước những message không cần giữ  
6. Chỉ giữ lại 1 message chính, sau đó `:wq` để hoàn tất.

#### Trước và sau squash:
**Trước:**
```
- Add Playwright login test
- Fix selector typo
- Add form validation tests
- Update test CSS selectors
```

**Sau:**
```
test: Add complete Playwright login test suite
```

## 3. CSS Selector

### 3.1 Khái niệm:
- **CSS Selector** là cú pháp dùng để chọn (select) các phần tử HTML trong DOM.  
- Được dùng phổ biến trong **CSS styling** và **automation test**.

### 3.2 Ưu điểm:
- Ngắn gọn, hiệu năng cao, dễ đọc.  
- Hỗ trợ chọn theo **id, class, tag, descendant, sibling, attribute**.

### 3.3 Hạn chế:
CSS Selector không thể:
- Chọn **phần tử cha (parent)**.  
- Chọn **anh/chị đứng trước** trong DOM.  
- Chọn **theo text chứa bên trong**.  
→ Khi đó, cần dùng **XPath**.

### 3.4 So sánh CSS vs XPath:

| Mục tiêu | CSS Selector | XPath |
|-----------|--------------|-------|
| Tag | `div` | `//div` |
| ID | `#registrationForm` | `//form[@id="registrationForm"]` |
| Class | `.form-group` | `//div[@class='form-group']` |
| Child | `#parent > input` | `//div[@id='parent']/input` |
| Descendant | `#ancestor div` | `//div[@id='ancestor']//div` |
| Combine | `div, input` | `//div | //input` |

**Thực hành:**  
Trang web mẫu: [https://material.playwrightvn.com/01-xpath-register-page.html](https://material.playwrightvn.com/01-xpath-register-page.html)

## 4. Playwright Selector

### 4.1 Khái niệm:
**Playwright Selector (Locator)** là hệ thống mạnh mẽ giúp tìm và tương tác với các phần tử web.  
Cung cấp cú pháp thân thiện, dễ đọc và **đặc biệt an toàn hơn so với XPath**.

---

### 4.2 Các loại Locator thường dùng:

| Loại | Hàm Playwright | Mô tả |
|-------|----------------|-------|
| **Role-based** | `page.getByRole()` | Tìm theo vai trò ARIA của element (button, link, heading...) |
| **Text-based** | `page.getByText()` | Tìm theo text hiển thị |
| **Label-based** | `page.getByLabel()` | Tìm input thông qua `<label>` liên kết |
| **Placeholder-based** | `page.getByPlaceholder()` | Tìm input theo placeholder |
| **Title-based** | `page.getByTitle()` | Tìm element qua thuộc tính `title` |
| **Alt text-based** | `page.getByAltText()` | Tìm theo thuộc tính `alt` (thường dùng cho `<img>`) |
| **Test ID-based** | `page.getByTestId()` | Tìm theo `data-testid` hoặc attribute do bạn định nghĩa |

## 5. Key Notes từ buổi học

### 5.1 Sử dụng VIM
| Hành động | Cú pháp / Mô tả |
|------------|----------------|
| Vào chế độ Insert | Nhấn **`i`** (màn hình hiện “INSERT” ở góc trái dưới) |
| Thoát chế độ Insert | Nhấn **`ESC`** (mất chữ “INSERT”) |
| Lưu & thoát | Gõ `:wq` → Enter (**w** = write, **q** = quit) |
| Thoát mà không lưu | Gõ `:q!` → Enter (**!** = force quit) |

---

### 5.2 Git Commands cơ bản
| Mục đích | Câu lệnh |
|-----------|----------|
| Merge nhánh | `git merge <tên_nhánh_cần_merge>` |
| Rebase nhánh | `git rebase <tên_nhánh_cần_rebase>` |
| Squash 3 commit gần nhất | `git rebase -i HEAD~3` |

---

### 5.3 Force Push
Khi bạn **đã rebase hoặc squash**, lịch sử commit sẽ thay đổi, khiến việc `git push` thông thường bị từ chối.  
Thông báo lỗi thường gặp:
```
failed to push some refs to ...
Updates were rejected because the tip of your current branch is behind
```
Ví dụ:
```bash
git push origin demo-force
# ❌ error: failed to push some refs to ...
```
Cách xử lý:  
Dùng **force push** (tức “push bất chấp”) để ghi đè lịch sử cũ:
```bash
git push -f <remote name> <branch name>
```
Ví dụ thực tế:
```bash
git push -f origin demo-force
```
Kết quả:
```
demo-force -> demo-force (forced update)
```
⚠️ **Lưu ý quan trọng:**  
Force push **rất nguy hiểm**, vì nó **ghi đè toàn bộ lịch sử commit cũ**.  
→ Trước khi force push, **hãy kiểm tra kỹ commit history** để tránh xóa nhầm code của người khác.

## Tổng kết nhanh
| Chủ đề | Nội dung chính |
|--------|----------------|
| **Git** | Merge, Conflict, Rebase, Squash |
| **Conflict handling** | Đọc code, xác định nguyên nhân, giải quyết hoặc trao đổi với author |
| **Squash** | Gộp nhiều commit nhỏ thành một commit duy nhất |
| **CSS Selector** | Cú pháp ngắn gọn, nhanh, hiệu năng cao |
| **Playwright Selector** | Các hàm `getByRole`, `getByText`, `getByLabel`, `getByPlaceholder`, `getByTitle`, `getByAltText`, `getByTestId` |
