//Loop-1
let sum = 0;
for (i = 1; i <= 100; i++) {
  sum += i;
}

console.log(sum);

//Loop-2
for (let n = 2; n <= 9; n++) {
  for (let m = 1; m <= 10; m++) {
    console.log(`Bảng Cửu Chương ${n}: ${n} * ${m} = ${n * m}`);
  }
  console.log();
}

//Loop-3
const arr = [];
for (i = 1; i <= 99; i += 2) {
  arr.push(i);
}
console.log(arr);

//Loop-4
for (i = 1; i <= 10; i++) {
  console.log(`user${i}@example.com`);
}

//Loop-5
const turnovers = [
  { month: 1, total: 100 },
  { month: 2, total: 200 },
  { month: 3, total: 300 },
  { month: 4, total: 400 },
  { month: 5, total: 500 },
  { month: 6, total: 600 },
  { month: 7, total: 700 },
  { month: 8, total: 800 },
  { month: 9, total: 900 },
  { month: 10, total: 1000 },
  { month: 11, total: 1100 },
  { month: 12, total: 1200 },
];

let totalYear = 0;
for (let i = 0; i < turnovers.length; i++) {
  totalYear += turnovers[i].total;
}

console.log("Tổng doanh thu năm:", totalYear);
