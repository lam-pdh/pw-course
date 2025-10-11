//Object-1
const car = {
  make: "Toyota",
  model: "Crorolla",
  year: 2021,
};

console.log(car.year);

//Object-2
const person = {
  name: "Lam Phan",
  address: {
    street: "Nguyen Oanh",
    city: "HCM",
    country: "Ninh Thuan",
  },
};

console.log(person.address.street);

//Object-3
const student = {
  name: "Lam Phan",
  grades: {
    math: 10,
    english: 9,
  },
};

console.log(student["grades"]["math"]);

//Object-4
const settings = {
  volume: 100,
  brightness: 90,
};

settings.volume = 80;

console.log(settings.volume);

//Object-5
const bike = {};

bike.color = "Black";

//Object-6
const employee = {
  name: "Lam Phan",
  age: "29",
};

delete employee.age;

//Object-7
let school = {
  classA: ["An", "Bình", "Châu"],
  classB: ["Đào", "Hương", "Giang"],
};
