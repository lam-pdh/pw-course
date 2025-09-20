//Function-1
function multiply(a, b) {
  console.log(`Kết Quả Nhân của a và b là:`, a * b);
}
multiply(2, 8);

//Function-2
function findMin(a, b, c) {
  if (a < b && a < c) {
    console.log(`Giá Trị Nhỏ Nhất Là a = ${a}`);
  } else if (b < a && b < c) {
    console.log(`Giá Trị Nhỏ Nhất Là b = ${b}`);
  } else {
    console.log(`Giá Trị Nhỏ Nhất Là c = ${c}`);
  }
}

findMin(2, 3, 1);

//Function-3
const students = [
  { name: "Lam", score: 86 },
  { name: "Huy", score: 92 },
  { name: "Thao", score: 70 },
  { name: "Trang", score: 95 },
  { name: "Nam", score: 84 },
];
const result = [];

function getTopStudents(students, threshold) {
  for (let i = 0; i < students.length; i++) {
    if (students[i].score >= threshold) {
      result.push(students[i].name);
    }
  }
  return result;
}

getTopStudents(students, 85);
console.log(result);

//Function-4
function calculateInterest(principal, rate, years) {
  const total = principal + (principal * rate * years) / 100;
  console.log(total);
}

calculateInterest(10_000_000, 6.5, 10);
