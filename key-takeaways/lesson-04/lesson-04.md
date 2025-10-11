# Lesson 04 -- JavaScript Basic (Continue)

## 1. Phạm vi của biến (Scope)

- **Global Scope**: biến khai báo ngoài hàm/block, truy cập được ở mọi
  nơi.
- **Function Scope**: biến khai báo bằng `var`/`let`/`const` trong
  hàm, chỉ truy cập trong hàm.
- **Block Scope**: `let` và `const` có block scope, `var` thì không.

```js
if (true) {
  var x = 10; // tồn tại ngoài block
  let y = 20; // chỉ tồn tại trong block
  const z = 30; // chỉ tồn tại trong block
}
console.log(x); // OK
console.log(y); // Error
```

### Hoisting

- JavaScript di chuyển khai báo biến lên đầu scope trước khi chạy
  code.
- Với `var`: được hoisting nhưng giá trị mặc định là `undefined`.
- Với `let` và `const`: hoisting nhưng **không thể dùng trước khi khai
  báo**.

## 2. Câu điều kiện nâng cao

- **if...else**: chạy logic khác nhau theo điều kiện.

- **if...else if...else**: kiểm tra nhiều điều kiện.

- **Ternary operator**: cách viết ngắn gọn.

  ```js
  let age = 20;
  let status = age >= 18 ? "Người lớn" : "Trẻ em";
  ```

- **break**: thoát hẳn vòng lặp khi điều kiện đúng.

- **continue**: bỏ qua vòng lặp hiện tại, chuyển sang vòng tiếp theo.

## 3. Vòng lặp nâng cao

- **for...in**: duyệt qua key của object (không khuyến khích dùng cho
  array).
- **forEach**: method của array, chạy callback cho từng phần tử (không
  break/continue được).

## 4. String Utils (Hàm xử lý chuỗi)

- `trim()`, `trimLeft()`, `trimRight()` → cắt khoảng trắng.
- `toLowerCase()`, `toUpperCase()` → đổi chữ hoa/thường.
- `includes(substr)` → kiểm tra chuỗi con.
- `replace(old, new)` → thay thế.
- `split(separator)` → tách chuỗi thành mảng.
- `substring(start, end)` → lấy chuỗi con.
- `indexOf(substr)` → tìm vị trí chuỗi con.

## 5. Array Utils (Hàm xử lý mảng)

- `map()` → tạo mảng mới bằng cách biến đổi từng phần tử.
- `filter()` → lọc phần tử theo điều kiện.
- `find()` → tìm phần tử đầu tiên thoả điều kiện.
- `reduce()` → tích luỹ giá trị (sum, tính tổng giỏ hàng...).
- `some()` → kiểm tra ít nhất 1 phần tử thoả điều kiện.
- `every()` → kiểm tra tất cả phần tử thoả điều kiện.
- `sort()` → sắp xếp (cần compare function khi sort số).
- `push()` → thêm cuối mảng.
- `pop()` → xoá cuối mảng.
- `shift()` → xoá đầu mảng.
- `unshift()` → thêm đầu mảng.
