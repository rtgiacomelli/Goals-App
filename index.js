// hello, world
// const message = "hello, world!"

// {
//   const message = "hello, me!"
//   console.log(message);
// }

// console.log(message);


// arrays, objetos
// let goals = ["Mayk", "alô"]

let goal = {
  value: 'ler um livro por mês',
  address: 2,
  checked: false,
  isChecked: (info) => {
    console.log(info)
  }
}

goal.value = "não é mais ler um livro"
goal.isChecked(goal.value)


// function, arrow function
const createGoal = () => {}

// function createGoal() {}