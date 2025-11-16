# Lesson 11 – API Testing

## 1. Khái niệm API

### API là gì?

- **API (Application Programming Interface)** là tập hợp các quy tắc giúp các phần mềm giao tiếp với nhau.
- API hoạt động như “cầu nối” giữa client (ứng dụng) và server.
- Giúp các hệ thống làm việc với nhau mà không cần biết chi tiết nội bộ.

### Ví dụ thực tế

- Ứng dụng thời tiết → gọi API để lấy dữ liệu từ server.
- Website thanh toán → dùng API ngân hàng để xử lý giao dịch.
- Ứng dụng đặt xe → dùng API Google Maps để hiển thị bản đồ.

## 2. Tại sao cần Test API?

1. Đảm bảo hoạt động đúng — dữ liệu và logic xử lý chính xác.
2. Phát hiện lỗi sớm — trước khi ảnh hưởng đến frontend.
3. Kiểm tra bảo mật — tránh truy cập trái phép, rò rỉ dữ liệu.
4. Kiểm tra hiệu năng — đảm bảo API phản hồi nhanh và chịu tải tốt.
5. Giảm phụ thuộc — có thể test backend độc lập với frontend.
6. Dễ bảo trì — khi update, chỉ cần chạy lại test để đảm bảo không hỏng luồng cũ.

## 3. Cấu trúc và Thành phần của API

| Thành phần            | Mô tả                                                   |
| --------------------- | ------------------------------------------------------- |
| **Endpoint (URL)**    | Địa chỉ truy cập tài nguyên                             |
| **HTTP Method**       | Phương thức thao tác: GET, POST, PUT/PATCH, DELETE      |
| **Request**           | Gồm headers, parameters, body (JSON, XML, form-data...) |
| **Response**          | Gồm status code, headers, body (thường là JSON)         |
| **API Documentation** | Tài liệu mô tả API — thường dùng Swagger                |

Ví dụ API doc:  
https://material.playwrightvn.com/api/todo-app/swagger.html

## 4. JSON – Định dạng dữ liệu phổ biến

### Đặc điểm

- Dễ đọc, dễ viết.
- Nhẹ, nhanh.
- Hỗ trợ hầu hết các ngôn ngữ.

### Cấu trúc cơ bản

```json
{
  "name": "Nguyễn Văn A",
  "age": 25,
  "email": "nguyenvana@example.com",
  "address": { "street": "123 Lê Lợi", "country": "Việt Nam" },
  "hobbies": ["đọc sách", "âm nhạc"]
}
```

- key: luôn là chuỗi (string).
- value: có thể là string, number, boolean, null, object, array.

## 5. Cách gọi API

| Công cụ        | Cách sử dụng                          |
| -------------- | ------------------------------------- |
| **cURL**       | Dòng lệnh gọi API trực tiếp           |
| **Postman**    | Giao diện thân thiện để test thủ công |
| **Playwright** | Viết test API tự động bằng code       |

## 6. Gọi API với Playwright

### Cấu trúc cơ bản

```ts
test("Basic API test", async ({ request }) => {
  const url = "https://material.playwrightvn.com/api/todo-app/v1/todos.php";
  const response = await request.get(url);
  expect(response.status()).toBe(200);
});
```

### Lấy dữ liệu từ response

```ts
const text = await response.text();
const json = await response.json();
```

→ json thường dùng để verify dữ liệu.

## 7. Kiểm tra Response

```ts
const response = await request.get(URL);
expect(response.status()).toBe(200);

const data = await response.json();
expect(data.todos.length).toBe(7);
```

## 8. Làm việc với các HTTP Methods

- GET: Lấy dữ liệu.
- POST: Tạo mới.
- PUT/PATCH: Cập nhật.
- DELETE: Xóa.

## 9. Luồng Authentication (Xác thực)

Các bước xử lý:

1. Gọi API /login với username + password → nhận token.
2. Gọi các API khác, đính kèm token trong header:
   ```ts
   const headers = { Authorization: `Bearer ${token}` };
   const response = await request.get("/users", { headers });
   ```
3. Nếu thiếu token → lỗi 401 (Unauthorized).

## 10. API Testing với Postman

### Thành phần giao diện

- Collections: nhóm các API.
- Environments: quản lý biến môi trường (dev, staging…).
- History: lưu lịch sử request.
- Mock Servers, Monitors: giả lập và theo dõi API.

### Thực hành

- Lấy danh sách, tạo, cập nhật, xoá TODO qua Swagger.  
  https://material.playwrightvn.com/api/todo-app/swagger.html

## 11. Thực hành Playwright API Test

Mục tiêu:

- Gọi API qua fixture request mà không cần browser.
- Kiểm tra status code, body, token.

Ví dụ:

```ts
test("Login success", async ({ request }) => {
  const loginRes = await request.post("/login", {
    data: { username: "admin", password: "123456" },
  });

  expect(loginRes.status()).toBe(200);
  const body = await loginRes.json();
  expect(body.access_token).toBeTruthy();
});
```

## 12. Tổng Hợp

| Chủ đề                     | Nội dung chính                                                    |
| -------------------------- | ----------------------------------------------------------------- |
| **API**                    | Giao tiếp giữa client – server qua HTTP.                          |
| **Tại sao test API**       | Đảm bảo đúng chức năng, bảo mật, hiệu năng, và dễ bảo trì.        |
| **HTTP Methods**           | GET, POST, PUT/PATCH, DELETE.                                     |
| **Authentication**         | Lấy token từ /login, dùng trong header để truy cập API khác.      |
| **Playwright API Testing** | Dùng request fixture để gọi API tự động.                          |
| **Postman**                | Công cụ GUI phổ biến để test API thủ công.                        |
| **Swagger**                | Giao diện tài liệu API giúp test nhanh và xem thông tin endpoint. |

### Kiến thức đọc thêm: sử dụng [[Header](https://www.youtube.com/watch?si=B4IYF4DOE_nYEa1J&v=ePCEkWvPRIg&feature=youtu.be)] trong API request.
